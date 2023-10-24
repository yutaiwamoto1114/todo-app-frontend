// frontend/src/components/TaskList.tsx
import { List } from "@mui/material";
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
        <Task
          key={task.id}
          task={task}
          toggleCompleted={() => toggleTask(task.id)}
          deleteTask={() => deleteTask(task.id)}
          onTaskClick={() => onTaskClick(task.id)}
        />
      ))}
    </List>
  );
};

export default TaskList;
