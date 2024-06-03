import { AppShell, Center, Container, rem } from "@mantine/core";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";
function App() {
  return (
    <AppShell header={{ height: 90 }}>
      <AppShell.Header>
        <Center>
          <h1>Todo List</h1>
        </Center>
      </AppShell.Header>
      <AppShell.Main pt={`calc(${rem(90)} + var(--mantine-spacing-md))`}>
        <Container>
          <AddTodo />
          <TodoList />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
