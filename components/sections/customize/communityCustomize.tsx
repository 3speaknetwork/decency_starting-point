import React, { useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { CommunityInput } from "components/form/CommunityInput";
import { PrimaryButton } from "components/items/primaryButton";
import { useRecoilState } from "recoil";
import { infoState } from "state/user/slice";

interface Props {
  onNext: () => void;
}

export const CommunityCustomize: React.FC<Props> = ({ onNext }) => {
  const [info, setInfo] = useRecoilState(infoState);

  return (
    <SectionWrapper>
      <Formik
        initialValues={{ title: "", tags: "" }}
        validate={({ title, tags }) => {
          const errors: any = {};

          if (title === "") {
            errors.title = "Required!";
          } else if (tags === "") {
            errors.tags = "Required!";
          }

          return errors;
        }}
        onSubmit={({ title, tags }) => {
          setInfo({
            title: title,
            tags: tags.split(" "),
          });

          console.log(info);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <>
            <CustomizeWrapper>
              <CommunityInput
                title="Title"
                error={errors.title ?? ""}
                isInvalid={!!errors.title}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                placeHolder="Title"
              />
              <CommunityInput
                title="Tags"
                error={errors.tags ?? ""}
                isInvalid={!!errors.tags}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tags}
                name="tags"
                placeHolder="tag1 tag2 tag3"
              />
            </CustomizeWrapper>
            <PrimaryButton onClick={handleSubmit}>Continue</PrimaryButton>
          </>
        )}
      </Formik>
    </SectionWrapper>
  );
};

const CustomizeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 1rem;
`;