import { SectionWrapper } from "components/wrappers/sectionWrapper";
import React, { FC } from "react";

interface Props {
  onNext: () => void;
}

const CommunityCount: FC<Props> = ({ onNext }) => {
  return <SectionWrapper>CommunityCount</SectionWrapper>;
};

export default CommunityCount;
