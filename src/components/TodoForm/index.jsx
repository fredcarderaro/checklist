import "./Todo-form.style.css";
import { Button } from "../Button";
import { TextInput } from "../TextInput";

export function TodoForm({ onSubmit, defaultValue }) {
  return (
    <form action={onSubmit} className="todo-form">
      <TextInput
        placeholder="Digite o item que deseja adicionar"
        name="description"
        defaultValue={defaultValue}
        required
      />
      <Button>Salvar item</Button>
    </form>
  );
}
