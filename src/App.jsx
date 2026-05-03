import { useState } from "react";
import { ChecklistsWrapper } from "./components/ChecklistsWrapper";
import { Container } from "./components/Container";
import { Dialog } from "./components/Dialog";
import { FabButton } from "./components/FabButton";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Heading } from "./components/Heading";
import { IconPlus, IconSchool } from "./components/icons";
import { SubHeading } from "./components/SubHeading";
import { ToDoItem } from "./components/ToDoItem";
import { ToDoList } from "./components/ToDoList";
import { TodoForm } from "./components/TodoForm";

/* const todos = [
  {
    id: 1,
    description: "JSX e componentes",
    completed: false,
    createdAt: "2022-10-31",
  },
  {
    id: 2,
    description: "Props, state e hooks",
    completed: false,
    createdAt: "2022-10-31",
  },
  {
    id: 3,
    description: "Ciclo de vida dos componentes",
    completed: false,
    createdAt: "2022-10-31",
  },
  {
    id: 4,
    description: "Testes unitários com Jest",
    completed: false,
    createdAt: "2022-10-31",
  },
];

const completed = [
  {
    id: 5,
    description: "Controle de inputs e formulários controlados",
    completed: true,
    createdAt: "2022-10-31",
  },
  {
    id: 6,
    description: "Rotas dinâmicas",
    completed: true,
    createdAt: "2022-10-31",
  },
];
 */

function App() {
  // Cria estado de controle de exibição do modal Dialog
  const [showDialog, setShowDialog] = useState(false);

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

  // Exibir ou ocultar modal Dialog
  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

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

    toggleDialog();
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
    <main>
      <Container>
        <Header>
          <Heading>
            <IconSchool /> Plano de estudos
          </Heading>
        </Header>

        <ChecklistsWrapper>
          <SubHeading>Para estudar</SubHeading>
          <ToDoList>
            {todos
              .filter((task) => !task.completed)
              .map(function (task) {
                return (
                  <ToDoItem
                    key={task.id}
                    item={task}
                    onToggleCompleted={toggleTodoCompleted}
                    onDeleteTodo={deleteTodo}
                  />
                );
              })}
          </ToDoList>
          <SubHeading>Concluído</SubHeading>
          <ToDoList>
            {todos
              .filter((task) => task.completed)
              .map(function (task) {
                return (
                  <ToDoItem
                    key={task.id}
                    item={task}
                    onToggleCompleted={toggleTodoCompleted}
                    onDeleteTodo={deleteTodo}
                  />
                );
              })}
          </ToDoList>
          <Footer>
            {/* Dialog */}
            <Dialog isOpen={showDialog} onClose={toggleDialog}>
              <TodoForm onSubmit={addTodo} />
            </Dialog>
            <FabButton onClick={toggleDialog}>
              <IconPlus />
            </FabButton>
          </Footer>
        </ChecklistsWrapper>
      </Container>
    </main>
  );
}

export default App;
