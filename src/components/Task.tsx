import { useState } from "react";
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
}

const Task: React.FC<TaskProps> = ({ task, toggleCompleted, deleteTask }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <IconButton
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

      <ListItemText
        primary={task.title}
        style={
          task.completed
            ? {
                textDecoration: "line-through",
                width: "200px",
                display: "inline-block",
              }
            : { width: "200px", display: "inline-block" }
        }
      />
      <ListItemSecondaryAction>
        <IconButton
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
