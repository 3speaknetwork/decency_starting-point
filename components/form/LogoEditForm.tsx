import React from "react";
import styled from "styled-components";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

interface Props {
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}

export const EditForm: React.FC<Props> = ({ onDelete, onEdit }) => {
  return (
    <EditFormWrapper>
      <Button onClick={onDelete as () => void} color="#cd001a">
        <BsFillTrashFill />
      </Button>
      <Button onClick={onEdit as () => void} color="#528AAE">
        <FiEdit />
      </Button>
    </EditFormWrapper>
  );
};

const Button = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
`;

const EditFormWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  gap: 1.5rem;
  height: 100%;
  animation: fade 0.2s linear;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);

  @keyframes fade {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;
