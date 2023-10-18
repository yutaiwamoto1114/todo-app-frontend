// frontend/src/components/TodoList.tsx
import { List } from '@mui/material';
import Todo from './Todo';

interface TodoListProps {
  tasks: { id: number; title: string; completed: boolean }[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <List>
      {tasks.map(task => (
        <Todo
          key={task.id}
          task={task}
          toggleCompleted={() => toggleTask(task.id)}
          deleteTask={() => deleteTask(task.id)}
        />
      ))}
    </List>
  );
};

export default TodoList;
