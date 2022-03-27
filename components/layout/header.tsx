/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import hive from "@hiveio/hive-js";
import styled from "styled-components";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { ModalWrapper } from "components/wrappers/modalWrapper";
import { useRecoilState } from "recoil";
import { userState } from "state/user/slice";
import { login } from "utils";

export const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userStor = window.localStorage.getItem("user");
    if (userStor) {
      setUser(JSON.parse(userStor));
    }
  }, []);

  const handleLogin = async () => {
    const response: any = await login(username);
    if (response.success && response.data.username === username) {
      hive.api.getAccounts([username], async (err: any, res: any) => {
        if (err) throw new Error(err);
        if (res.length) {
          setUser(res[0]);
          localStorage.setItem("user", JSON.stringify(res[0]));
          setOpenLogin(false);
        }
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdown(false);
  };

  return (
    <ContentWrapper>
      <HeaderWrapper>
        <Flex width="15rem" justifyContent="flex-start">
          <ul>
            <Link passHref={true} href="/setup">
              <li>Setup</li>
            </Link>
            <a href="#how-to">
              <li>How to</li>
            </a>
          </ul>
        </Flex>
        <Link passHref={true} href="/">
          <Logo src="/logo.svg" alt="logo" width={85} height={85} />
        </Link>
        <Flex width="15rem" justifyContent="flex-end">
          <ul>
            {user ? (
              <Flex position="relative">
                <a onClick={() => setDropdown(!dropdown)}>
                  <li>{user.name}</li>
                </a>
                {dropdown && (
                  <Button
                    onClick={handleLogout}
                    position="absolute"
                    bottom={-10}
                    left={-2}
                  >
                    Logout
                  </Button>
                )}
              </Flex>
            ) : (
              <a onClick={() => setOpenLogin(true)}>
                <li>Login</li>
              </a>
            )}
          </ul>
        </Flex>
      </HeaderWrapper>
      {openLogin && (
        <ModalWrapper onClose={() => setOpenLogin(false)}>
          <Flex direction="column" alignItems="center" gap={3}>
            <Text fontSize="2xl">Login</Text>
            <Input
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <Button onClick={handleLogin} backgroundColor="gray.400">
              <Image
                src="/keychain.png"
                alt="Hive keychain logo"
                width={120}
                height={25}
              />
            </Button>
          </Flex>
        </ModalWrapper>
      )}
    </ContentWrapper>
  );
};

const Logo = styled(Image)`
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  margin: 0 1rem;
  align-items: center;
  max-width: 70rem;
  width: 100%;
  justify-content: space-between;
  z-index: 999;

  ul {
    text-decoration: none;
    list-style: none;
    display: flex;
    gap: 1.1rem;
    padding: 0;

    li {
      cursor: pointer;

      &:hover {
        color: grey;
        text-decoration: underline;
      }
    }
  }
`;
