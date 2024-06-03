import { ActionIcon, Loader } from "@mantine/core";
import { FaTrash } from "react-icons/fa";

interface Props {
  onDelete: () => void;
  isLoading: boolean;
}

export const DeleteTodo = ({ onDelete, isLoading }: Props) => {
  return (
    <ActionIcon
      color="red"
      size="lg"
      variant={isLoading ? "transparent" : "subtle"}
      radius={20}
      onClick={onDelete}
      disabled={isLoading}
    >
      {isLoading ? <Loader color="red" size="xs" /> : <FaTrash />}
    </ActionIcon>
  );
};
