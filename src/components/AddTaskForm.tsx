// frontend/src/components/AddTaskForm.tsx
import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

interface AddTaskFormProps {
  onAdd: (title: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle(""); // タスク追加後、テキストボックスを空にする
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        gap={2}
      >
        <TextField
          label="新しいタスク"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          追加
        </Button>
      </Box>
    </form>
  );
};

export default AddTaskForm;
