import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../supabase";
import { TodoItem } from "../common/types";

type UpdateTodo = {
  completed: boolean;
  id: number;
};

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchTodos: builder.query<TodoItem[], void>({
      queryFn: async () => {
        const { data, error } = await supabase.from("todos").select();
        if (error) return { error };
        return { data: data.sort((a, b) => b.id - a.id) };
      },
    }),
    createTodo: builder.query({
      queryFn: async (name: string) => {
        const { data, error } = await supabase.from("todos").insert([{ name }]);
        if (error) return { error };
        return { data };
      },
    }),
    updateTodo: builder.query({
      queryFn: async (args: UpdateTodo) => {
        const { data, error } = await supabase
          .from("todos")
          .update({ completed: args.completed })
          .eq("id", args.id);
        if (error) return { error };
        return { data };
      },
    }),
    deleteTodo: builder.query({
      queryFn: async (id: number) => {
        const { data, error } = await supabase
          .from("todos")
          .delete()
          .eq("id", id);
        if (error) return { error };
        return { data };
      },
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useLazyFetchTodosQuery,
  useLazyCreateTodoQuery,
  useLazyUpdateTodoQuery,
  useLazyDeleteTodoQuery,
} = todosApi;
