import { Button, Group, Loader, TextInput } from "@mantine/core";
import React, { useState } from "react";
import {
  useLazyCreateTodoQuery,
  useLazyFetchTodosQuery,
} from "../store/todosApi";

export const AddTodo = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [createTodo] = useLazyCreateTodoQuery();
  const [getData] = useLazyFetchTodosQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      createTodo(text)
        .then(() => getData())
        .finally(() => {
          setText("");
          setIsLoading(false);
        });
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group mb={20}>
        <TextInput
          type="text"
          placeholder="Add Item"
          value={text}
          disabled={isLoading}
          size="xl"
          onChange={(e) => setText(e.target.value)}
        />
        <Button size="xl" type="submit" disabled={!text || isLoading}>
          {isLoading ? <Loader color="blue" /> : "Add Item"}
        </Button>
      </Group>
    </form>
  );
};
