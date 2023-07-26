import { Flex, Text } from "@chakra-ui/react";
import { CommunityInput } from "components/form/CommunityInput";
import { PrimaryButton } from "components/items/primaryButton";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { Formik } from "formik";
import { Errors } from "helpers/errors";
import React, { FC } from "react";
import { useRecoilState } from "recoil";
import { serverInfoState } from "state/slices";
import styled from "styled-components";

interface Props {
  onNext: () => void;
}

const ServerInformation: FC<Props> = ({ onNext }) => {
  const [info, setInfo] = useRecoilState(serverInfoState);

  return (
    <SectionWrapper>
      <Text mb={2} fontSize="1.5rem">
        Server information
      </Text>
      <Text mb={8} maxW="35%">
        You have to buy your own server to get a break-away community up and
        running... You can get one, by following this link -&gt;{" "}
        <PrivexLink
          href="https://www.privex.io/"
          target="_blank"
          rel="noreferrer"
        >
          privex
        </PrivexLink>
        .{" "}
        <Red>
          Make sure that the server has an IPv4 address. (We suggest using the
          Privex &quot;WebBox&quot;)
        </Red>
        <br />
        <br />
        By using this platform, you give us permission to connect to your given
        server and download the needed software for the break-away communities.
        All of the software is open-source, you can check it out, by following
        this link{" "}
        <PrivexLink
          href="https://github.com/spknetwork/ecency_starting-point_be"
          target="_blank"
          rel="noreferrer"
        >
          Github repo
        </PrivexLink>
      </Text>
      <Formik
        initialValues={{
          password: info.password,
          ip: info.ip,
          username: info.username,
        }}
        validate={async ({ password, ip, username }) => {
          const errors: any = {};
          const regexExp =
            /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

          if (password === "") {
            errors.password = Errors.REQ;
          } else if (ip === "") {
            errors.ip = Errors.REQ;
          } else if (username === "") {
            errors.username = Errors.REQ;
          } else if (!regexExp.test(ip)) {
            errors.ip = Errors.IP_INVALID;
          }

          return errors;
        }}
        onSubmit={(values) => {
          setInfo(values);
          localStorage.setItem("serverInfo", JSON.stringify(values));
          onNext();
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <>
            <CustomizeWrapper gap="2rem" mb="0.5rem">
              <CommunityInput
                title="IPv4 address"
                error={errors.ip ?? ""}
                isInvalid={!!errors.ip}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ip}
                name="ip"
                placeHolder="127.0.0.1"
              />
              <CommunityInput
                title="root username"
                error={errors.username ?? ""}
                isInvalid={!!errors.username}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                placeHolder="root"
              />
              <CommunityInput
                title="root password"
                error={errors.password ?? ""}
                isInvalid={!!errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                placeHolder=""
                type="password"
              />
            </CustomizeWrapper>
            <PrimaryButton onClick={handleSubmit}>Continue</PrimaryButton>
          </>
        )}
      </Formik>
    </SectionWrapper>
  );
};

const Red = styled.span`
  color: red;
`;

const PrivexLink = styled.a`
  color: blue;
  text-decoration: underline;
`;

const CustomizeWrapper = styled(Flex)`
  flex-wrap: wrap;
`;

export default ServerInformation;
