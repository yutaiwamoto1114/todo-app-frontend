// frontend/src/App.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  // 環境変数からバックエンドのURLをセット
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  axios.defaults.baseURL = backendURL;

  const [tasks, setTasks] = useState<
    { id: number; title: string; completed: boolean }[]
  >([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  const toggleTask = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    try {
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`/api/tasks/${id}`, updatedTask);
      const updatedTasks = tasks.map((t) => (t.id === id ? updatedTask : t));
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      const remainingTasks = tasks.filter((task) => task.id !== id);
      setTasks(remainingTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="App">
      <TodoList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
