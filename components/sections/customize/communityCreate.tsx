import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { Formik } from "formik";
import { Flex } from "@chakra-ui/react";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { communityCreationState } from "state/slices";
import { CommunityInput } from "components/form/CommunityInput";
import { PrimaryButton } from "components/items/primaryButton";
import { getCommunityCreationInfo } from "api";

interface Props {
  onNext: () => void;
}

export const CommunityCreate: React.FC<Props> = ({ onNext }) => {
  const [_communityInfo, setCommunityInfo] = useRecoilState(
    communityCreationState
  );

  return (
    <SectionWrapper>
      <Formik
        initialValues={{ title: "", about: "" }}
        validate={({ title, about }) => {
          const errors: any = {};

          if (!title) errors.title = "Required!";
          if (!about) errors.about = "Required!";

          return errors;
        }}
        onSubmit={async ({ title, about }) => {
          const { fee, username, wif } = await getCommunityCreationInfo();

          setCommunityInfo({
            about,
            title,
            fee,
            wif,
            communityHiveID: username,
          });
          onNext();
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <CustomizeWrapper gap="2rem" mb="0.5rem">
              <CommunityInput
                title="Title"
                error={errors.title ?? ""}
                isInvalid={!!errors.title}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                placeHolder="SPK Network"
              />
              <CommunityInput
                title="About"
                error={errors.about ?? ""}
                isInvalid={!!errors.about}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.about}
                name="about"
                placeHolder="..."
              />
            </CustomizeWrapper>
            <Flex justifyContent="center">
              <PrimaryButton type="submit">Continue</PrimaryButton>
            </Flex>
          </form>
        )}
      </Formik>
    </SectionWrapper>
  );
};

const CustomizeWrapper = styled(Flex)`
  flex-wrap: wrap;
`;