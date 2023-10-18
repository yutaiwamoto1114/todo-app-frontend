// frontend/src/components/Todo.tsx
import { Button, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoProps {
  task: { id: number; title: string; completed: boolean };
  toggleCompleted: () => void;
  deleteTask: () => void;
}

const Todo: React.FC<TodoProps> = ({ task, toggleCompleted, deleteTask }) => {
  return (
    <ListItem>
      <ListItemText primary={task.title} style={task.completed ? { textDecoration: 'line-through' } : {}} />
      <ListItemSecondaryAction>
        <Button onClick={toggleCompleted}>
          {task.completed ? '未完了にする' : '完了'}
        </Button>
        <IconButton edge="end" aria-label="delete" onClick={deleteTask}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
