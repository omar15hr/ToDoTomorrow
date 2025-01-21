import { IconTrash } from "../assets/svg/IconTrash";
import { Todo } from "../interfaces/project.interface";

interface TodoListProps {
  todos: Todo[];
  removeTodo: (id: string) => void;
}

export function TodoList({ todos, removeTodo }: TodoListProps) {
  return (
    <div className="project-todo-list">
        {todos?.map((todo) => (
          <div className="project-todo-card" key={todo.id}>
            <div className="todo-title">
              <button className="button-toggle-completed"></button>
              {todo.title}
            </div>
            <div className="todo-description">
              {todo.description}
            </div>
            <button 
              onClick={() => removeTodo(todo.id)} 
              className="delete-project-button"
            >
              <IconTrash />
            </button>
          </div>
        ))}
      </div>
  )
}