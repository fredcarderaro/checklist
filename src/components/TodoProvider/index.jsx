import { useState } from "react";
import TodoContext from "./TodoContext";

export function TodoProvider({ children }) {
  // Cria estado com lista de todos inicial
  const [todos, setTodos] = useState([
    {
      id: 1,
      description: "JSX e componentes",
      completed: false,
      createdAt: "2022-10-31",
    },
    {
      id: 2,
      description: "Props, state e hooks",
      completed: true,
      createdAt: "2022-10-31",
    },
    {
      id: 3,
      description: "Ciclo de vida dos componentes",
      completed: false,
      createdAt: "2022-10-31",
    },
  ]);

  // Adicionar todo à lista
  const addTodo = (formData) => {
    const description = formData.get("description");

    setTodos((prevState) => {
      const todo = {
        id: prevState.length + 1,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      return [...prevState, todo];
    });

    // toggleDialog();
  };

  // Funcao executa o toggle no item todo completed
  const toggleTodoCompleted = (todo) => {
    setTodos((prevState) => {
      return prevState.map((item) => {
        if (item.id == todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      });
    });
  };

  // Funcao exclui item todo
  const deleteTodo = (todo) => {
    setTodos((prevState) => {
      return prevState.filter((item) => {
        return item.id != todo.id;
      });
    });
  };

  return (
    <TodoContext value={{ todos, addTodo, toggleTodoCompleted, deleteTodo }}>
      {children}
    </TodoContext>
  );
}
