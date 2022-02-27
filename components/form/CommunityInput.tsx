import React from "react";
import { Input, Text } from "@chakra-ui/react";

interface Props {
  title?: string;
  isInvalid: boolean;
  value: string;
  onChange: any;
  onBlur: any;
  error: string;
  name: string;
  placeHolder: string;
}

export const CommunityInput: React.FC<Props> = ({
  title,
  isInvalid,
  value,
  onChange,
  onBlur,
  error,
  name,
  placeHolder,
}) => {
  return (
    <div>
      <Text fontSize="md" color="blackAlpha.700">
        {title}
      </Text>
      <Input
        mb={isInvalid ? 0 : 3}
        placeholder={placeHolder}
        name={name}
        isInvalid={isInvalid}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {!!error && (
        <Text mb={3} mt={0.5} fontSize="md" color="red.400">
          {error}
        </Text>
      )}
    </div>
  );
};
