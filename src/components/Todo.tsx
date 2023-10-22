import {
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TodoProps {
  task: { id: number; title: string; completed: boolean };
  toggleCompleted: () => void;
  deleteTask: () => void;
}

const Todo: React.FC<TodoProps> = ({ task, toggleCompleted, deleteTask }) => {
  return (
    <ListItem
      style={{
        border: "1px solid gray",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
        marginBottom: "8px",
        borderRadius: "4px",
      }}
    >
      {/* ○のような完了ボタンを追加 */}
      <Button
        onClick={toggleCompleted}
        style={{
          margin: "0 8px 0 0",
          background: task.completed ? "green" : "transparent",
          border: "2px solid green",
          borderRadius: "50%",
          height: "25px",
          width: "25px",
        }}
      />
      <ListItemText
        primary={task.title}
        style={
          task.completed
            ? { textDecoration: "line-through", color: "gray" }
            : {}
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={deleteTask}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
