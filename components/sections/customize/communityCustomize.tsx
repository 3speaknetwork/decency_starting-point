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
        initialValues={{
          hive_id: info.hive_id ?? "",
          tags: info.tags.join(" ") ?? "",
        }}
        validate={({ hive_id, tags }) => {
          const errors: any = {};

          if (hive_id === "") {
            errors.title = "Required!";
          } else if (tags === "") {
            errors.tags = "Required!";
          }

          return errors;
        }}
        onSubmit={({ hive_id, tags }) => {
          setInfo({
            hive_id: hive_id,
            tags: tags.split(" "),
          });

          localStorage.setItem(
            "communityInfo",
            JSON.stringify({
              hive_id,
              tags: tags.split(" "),
            })
          );
          onNext();
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <>
            <CustomizeWrapper>
              <CommunityInput
                title="Community hive ID"
                error={errors.hive_id ?? ""}
                isInvalid={!!errors.hive_id}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hive_id}
                name="hive_id"
                placeHolder="hive-112019"
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