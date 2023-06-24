import { SectionWrapper } from "components/wrappers/sectionWrapper";
import Link from "next/link";
import React from "react";

const SetupPage = () => {
  return (
    <SectionWrapper>
      <Link href={"/setup/community"}>Community page setup</Link>
      <Link href={"/setup/author"}>Author page setup</Link>
    </SectionWrapper>
  );
};

export default SetupPage;
