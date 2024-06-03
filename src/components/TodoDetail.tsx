import { Checkbox, Paper } from "@mantine/core";
import { TodoItem } from "../common/types";
import { DeleteTodo } from "./DeleteTodo";

interface Props {
  onDelete: (id: number) => void;
  onChecked: (completed: boolean, id: number) => void;
  item: TodoItem;
  isLoading: boolean;
}

export const TodoDetail = ({ item, onDelete, onChecked, isLoading }: Props) => {
  if (!item) return null;

  return (
    <Paper
      shadow="xs"
      withBorder
      display="flex"
      p={20}
      style={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Checkbox
        size="lg"
        onChange={() => onChecked(!item.completed, item.id)}
        checked={item.completed}
        label={item.name}
        color="gray"
        style={item.completed ? { textDecoration: "line-through" } : undefined}
      />
      <DeleteTodo onDelete={() => onDelete(item.id)} isLoading={isLoading} />
    </Paper>
  );
};
