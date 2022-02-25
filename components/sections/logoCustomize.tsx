/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { SectionWrapper } from "../wrappers/sectionWrapper";
import styled from "styled-components";
import { EditForm } from "../form/EditForm";
import { useRecoilState } from "recoil";
import { logoSlice } from "../../state/user/slice";

interface Props {
  onNext: () => void;
}

export const LogoCustomize: React.FC<Props> = ({ onNext }) => {
  const [logo, setLogo] = useRecoilState(logoSlice);
  const [edit, setEdit] = useState(false);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    imageList[0] ? setLogo([imageList[0].dataURL] as string[]) : setLogo([]);
  };

  useEffect(() => {
    console.log(logo);
  }, [logo]);

  return (
    <SectionWrapper>
      <ImageUploading
        acceptType={["jpeg", "png"]}
        value={[]}
        maxNumber={1}
        onChange={onChange}
      >
        {({
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {logo.length ? (
              logo.map((image, index) => (
                <PlaceHolder
                  onMouseLeave={() => setEdit(false)}
                  onMouseEnter={() => setEdit(true)}
                  key={`logo_image_${index}`}
                >
                  {image && <img src={image} alt="" width="100%" />}
                  {edit && (
                    <EditForm onEdit={onImageUpdate} onDelete={onImageRemove} />
                  )}
                </PlaceHolder>
              ))
            ) : (
              <PlaceHolder>
                <PrimaryButton
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Upload logo
                </PrimaryButton>
              </PlaceHolder>
            )}
          </div>
        )}
      </ImageUploading>
      {logo[0] && (
        <ButtonWrapper>
          <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
        </ButtonWrapper>
      )}
    </SectionWrapper>
  );
};

const ButtonWrapper = styled.div`
  margin: 2rem 0;
`;

const PlaceHolder = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  border 2px solid black;

  

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

`;

const PrimaryButton = styled.button`
  cursor: pointer;
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  background-color: black;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
  overflow: hidden;

  &:hover {
    color: #000000;
    background-color: #ffffff;
  }
`;
