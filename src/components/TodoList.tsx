import { SegmentedControl, Skeleton, Stack, Title } from "@mantine/core";
import { TodoDetail } from "./TodoDetail";
import { useEffect, useMemo, useState } from "react";
import {
  useFetchTodosQuery,
  useLazyDeleteTodoQuery,
  useLazyFetchTodosQuery,
  useLazyUpdateTodoQuery,
} from "../store/todosApi";
// import { TodoItem } from "../common/types";

enum TodoStatus {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
}

const selectStatus = [
  { label: "All", value: TodoStatus.ALL },
  { label: "Active", value: TodoStatus.ACTIVE },
  { label: "Completed", value: TodoStatus.COMPLETED },
];

export const TodoList = () => {
  const [currentTodosStatus, setCurrentTodosStatus] = useState<string>(
    TodoStatus.ALL
  );
  const [isLoading, setIsLoading] = useState(false);
  const [itemCurrentlyUpdated, setItemCurrentlyUpdated] = useState<
    number | null
  >();

  const { data: todos } = useFetchTodosQuery();
  const [getData] = useLazyFetchTodosQuery();
  const [updateData] = useLazyUpdateTodoQuery();
  const [deleteData] = useLazyDeleteTodoQuery();

  useEffect(() => {
    setIsLoading(true);
    getData().finally(() => setIsLoading(false));
  }, []);

  const handleDelete = (id: number) => {
    setIsLoading(true);
    setItemCurrentlyUpdated(id);
    deleteData(id)
      .then(() => getData())
      .finally(() => {
        setIsLoading(false);
        setItemCurrentlyUpdated(null);
      });
  };
  const handleChecked = (completed: boolean, id: number) => {
    setIsLoading(true);
    updateData({ completed, id })
      .then(() => getData())
      .finally(() => setIsLoading(false));
  };

  const currentTodos = useMemo(() => {
    if (!todos) return [];
    switch (true) {
      case currentTodosStatus === TodoStatus.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case currentTodosStatus === TodoStatus.COMPLETED:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, currentTodosStatus]);

  return (
    <Stack>
      <SegmentedControl
        value={currentTodosStatus}
        onChange={setCurrentTodosStatus}
        data={selectStatus}
      />
      {isLoading && !currentTodos.length && (
        <>
          <Skeleton height={40} radius="md" />
          <Skeleton height={40} radius="md" />
          <Skeleton height={40} radius="md" />
          <Skeleton height={40} radius="md" />
        </>
      )}
      {!isLoading && !currentTodos.length ? (
        <Title>No Todo</Title>
      ) : (
        currentTodos.map((item) => (
          <TodoDetail
            key={item.id}
            item={item}
            onChecked={handleChecked}
            onDelete={handleDelete}
            isLoading={isLoading && itemCurrentlyUpdated === item.id}
          />
        ))
      )}
    </Stack>
  );
};
