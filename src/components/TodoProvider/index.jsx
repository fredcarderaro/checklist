import { useEffect, useState } from "react";
import TodoContext from "./TodoContext";

const TODOS = "todos";

export function TodoProvider({ children }) {
  // Read do localstorage
  const savedTodos = localStorage.getItem(TODOS);

  // Cria estado com lista de todos inicial
  const [todos, setTodos] = useState(savedTodos ? JSON.parse(savedTodos) : []);

  // Cria estado de controle de exibição do modal Dialog
  const [showDialog, setShowDialog] = useState(false);

  // Cria estado para carregar todo a ser editado
  const [selectedTodo, setSelectedTodo] = useState();

  // Função de abertura e edição de item
  const openFormTodoDialog = (todo) => {
    if (todo) {
      setSelectedTodo(todo);
    }

    setShowDialog(true);
  };

  // Ocultar modal Dialog
  const closeFormTodoDialog = () => {
    setShowDialog(false);
    setShowDialog(null);
  };

  // UseEffect executa função sempre que o Array de Todos é alterado
  useEffect(() => {
    localStorage.setItem(TODOS, JSON.stringify(todos));
  }, [todos]);

  // Adicionar todo à lista
  const addTodo = (formData) => {
    const description = formData.get("description");

    setTodos((prevState) => {
      const todo = {
        id: selectedTodo ? selectedTodo.id : prevState.length + 1,
        description,
        completed: selectedTodo ? selectedTodo.completed : false,
        createdAt: selectedTodo ? selectedTodo.createdAt : Date().toISOString(),
      };

      return [...prevState.filter((item) => item.id != todo.id), todo].sort(
        (a, b) => a.id - b.id,
      );
    });

    closeFormTodoDialog();
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
    <TodoContext
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodoCompleted,
        showDialog,
        openFormTodoDialog,
        closeFormTodoDialog,
        selectedTodo,
      }}
    >
      {children}
    </TodoContext>
  );
}
