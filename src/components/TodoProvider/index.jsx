import { useEffect, useState } from "react";
import TodoContext from "./TodoContext";

const TODOS = "todos";

export function TodoProvider({ children }) {
  // Read do localstorage
  const savedTodos = localStorage.getItem(TODOS);

  // Cria estado com lista de todos inicial
  const [todos, setTodos] = useState(savedTodos ? JSON.parse(savedTodos) : []);

  // UseEffect executa função sempre que o Array de Todos é alterado
  useEffect(() => {
    localStorage.setItem(TODOS, JSON.stringify(todos));
  }, [todos]);

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
