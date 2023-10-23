// frontend/src/components/TaskList.tsx
import { List, ListItem } from "@mui/material";
import Task from "./Task";

interface TaskListProps {
  tasks: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  onTaskClick: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTask,
  deleteTask,
  onTaskClick,
}) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          button
          onClick={() => onTaskClick(task.id)}
          style={
            // タスクが完了している場合は背景色とテキストをグレーアウト
            task.completed
              ? {
                  backgroundColor: "rgba(0,0,0,0.1)", // タスクが完了している場合は背景色を少し暗く
                  color: "rgba(0,0,0,0.5)", // タスクが完了している場合はテキストの色も少し暗く
                }
              : {}
          }
        >
          <Task
            key={task.id}
            task={task}
            toggleCompleted={() => toggleTask(task.id)}
            deleteTask={() => deleteTask(task.id)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
