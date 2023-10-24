// frontend/src/TodoApp.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskDetailPane from "./components/TaskDetailPane";
import AddTaskForm from "./components/AddTaskForm";
import { Container, Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const App: React.FC = () => {
  // 環境変数からバックエンドのURLをセット
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  axios.defaults.baseURL = backendURL;

  // すべてのタスクを管理するステート
  const [tasks, setTasks] = useState<
    { id: number; title: string; description: string; completed: boolean }[]
  >([]);
  // 選択中のタスクのIDを管理するステート
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  // プログレスバーのために、すべてのタスク数と完了したタスク数を取得
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progressPercentage = totalTasks
    ? (completedTasks / totalTasks) * 100
    : 0;

  // タスクがクリックされたとき
  const handleTaskClick = (id: number) => {
    setSelectedTaskId(id);
  };

  // // タスクの取得ロジック
  // useEffect(() => {
  //   async function fetchTasks() {
  //     try {
  //       const response = await axios.get(`${backendURL}/api/tasks`);
  //       setTasks(response.data);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     }
  //   }
  //   fetchTasks();
  // }, []);

  // タスクの取得ロジック
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get(`${backendURL}/api/tasks`);
        const sortedTasks = response.data.sort((a: any, b: any) =>
          a.completed === b.completed ? 0 : a.completed ? 1 : -1
        );
        setTasks(sortedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, []);

  // タスクの追加
  const addTask = async (title: string) => {
    try {
      const newTask = { title, description: "", completed: false }; // 必要に応じてdescriptionを適切に設定
      const response = await axios.post(`${backendURL}/api/tasks`, newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("タスクの追加に失敗しました:", error);
    }
  };

  // タスクの完了状態を切り替える
  const toggleTask = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    try {
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`${backendURL}/api/tasks/${id}`, updatedTask);
      const updatedTasks = tasks.map((t) => (t.id === id ? updatedTask : t));
      setTasks(updatedTasks);
    } catch (error) {
      console.error("タスクの完了ステータス切り替えに失敗しました:", error);
    }
  };

  // タスクのタイトルを変更する
  const updateTaskTitle = async (id: number, title: string) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    const updatedTask = { ...task, title };
    await axios.put(`${backendURL}/api/tasks/${id}`, updatedTask);
    const updatedTasks = tasks.map((t) => (t.id === id ? updatedTask : t));
    setTasks(updatedTasks);
  };

  // タスクのメモを変更する
  const updateTaskDescription = async (id: number, description: string) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    const updatedTask = { ...task, description };
    await axios.put(`${backendURL}/api/tasks/${id}`, updatedTask);
    const updatedTasks = tasks.map((t) => (t.id === id ? updatedTask : t));
    setTasks(updatedTasks);
  };

  // タスクの削除
  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${backendURL}/api/tasks/${id}`);
      const remainingTasks = tasks.filter((task) => task.id !== id);
      setTasks(remainingTasks);
    } catch (error) {
      console.error("タスクの削除に失敗しました:", error);
    }
  };

  // 詳細ペインを閉じる
  const handleCloseDetailPane = () => {
    setSelectedTaskId(null);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          To Do
        </Typography>
        <Box width="100%" mb={2}>
          {/* プログレスバーの変更部分 */}
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{
              height: "8px",
              backgroundColor: "#e0e0e0", // バーの背景色
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#4caf50", // 緑色
              },
            }}
          />
          <Typography align="right" variant="caption" color="textSecondary">
            {completedTasks}/{totalTasks}
          </Typography>
          <AddTaskForm onAdd={addTask} />
          <TaskList
            tasks={tasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            onTaskClick={handleTaskClick}
          />
          {/* タスクが選択されたとき、そのタスクの詳細ペインを表示 */}
          {selectedTaskId && (
            <TaskDetailPane
              task={
                selectedTask as {
                  id: number;
                  title: string;
                  description: string;
                  completed: boolean;
                }
              }
              open={!!selectedTaskId}
              onClose={handleCloseDetailPane}
              toggleTask={toggleTask}
              updateTitle={updateTaskTitle}
              updateDescription={updateTaskDescription}
              deleteTask={deleteTask}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default App;
