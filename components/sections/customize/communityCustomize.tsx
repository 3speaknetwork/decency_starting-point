import React, { useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { SectionWrapper } from "components/wrappers/sectionWrapper";
import { Input, Text } from "@chakra-ui/react";
import { CommunityInput } from "components/form/CommunityInput";

interface Props {
  onNext: () => void;
}

export const CommunityCustomize: React.FC<Props> = ({ onNext }) => {
  const [info, setInfo] = useState({
    title: "",
    tags: [],
  });

  return (
    <SectionWrapper>
      <CustomizeWrapper>
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
          onSubmit={() => {}}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
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
                placeHolder="Tags"
              />
            </form>
          )}
        </Formik>
      </CustomizeWrapper>
    </SectionWrapper>
  );
};

const CustomizeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
