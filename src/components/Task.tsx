import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface TaskProps {
  task: { id: number; title: string; description: string; completed: boolean };
  toggleCompleted: () => void;
  deleteTask: () => void;
  onTaskClick: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, toggleCompleted, deleteTask, onTaskClick}) => {
  return (
    <ListItem
      onClick={() => onTaskClick(task.id)}
      style={
        task.completed
          ? {
              backgroundColor: "rgba(0,0,0,0.1)", // タスクが完了している場合は背景色を少し暗く
              color: "rgba(0,0,0,0.5)", // タスクが完了している場合はテキストの色も少し暗く
            }
          : {}
      }
    >
      {/* チェックマーク */}
      <ListItemIcon>
        <IconButton
          edge="start"
          onClick={(e) => {
            e.stopPropagation();
            toggleCompleted();
          }}
        >
          <CheckCircleOutlineIcon
            color={task.completed ? "success" : "disabled"}
          />
        </IconButton>
      </ListItemIcon>
      {/* タスク名 */}
      <ListItemText
        primary={task.title}
        style={
          task.completed
            ? {
                textDecoration: "line-through",
              }
            : { display: "inline-block" }
        }
      />
      {/* 削除アイコン */}
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Task;
