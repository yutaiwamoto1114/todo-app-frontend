import { useState } from "react";
import {
  Drawer,
  TextField,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface TaskDetailPaneProps {
  task: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  };
  open: boolean;
  onClose: () => void;
  toggleTask: (id: number) => void;
  updateTitle: (id: number, title: string) => void;
  updateDescription: (id: number, description: string) => void;
  deleteTask: (id: number) => void;
}

const TaskDetailPane: React.FC<TaskDetailPaneProps> = ({
  task,
  open,
  onClose,
  toggleTask,
  updateTitle,
  updateDescription,
  deleteTask,
}) => {
  const [description, setDescription] = useState(task.description);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // タスクの完了状態を切り替える
  const handleToggleCompletion = async () => {
    toggleTask(task.id);
  };

  // タスクのタイトルのテキストボックスを編集する
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  // タスクのメモのテキストボックスを編集する
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  // タスクのタイトルの変更を反映する
  const handleTitleBlur = async () => {
    if (newTitle.trim() === "") {
      // タスクのタイトルが空になってしまったときは元のタイトルに戻す
      setNewTitle(task.title);
    } else if (newTitle !== task.title) {
      // タスクのタイトルが変更されたときは変更を反映する
      updateTitle(task.id, newTitle);
    }
    setIsEditTitle(false);
  };

  // タスクのメモの変更を反映する
  const handleDescriptionBlur = async () => {
    if (description !== task.description) {
      updateDescription(task.id, description);
    }
  };

  // タスクを削除する
  const handleDeleteConfirmed = async () => {
    await deleteTask(task.id);
    setConfirmDialogOpen(false);
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: "300px", padding: "16px" }}>
        <ListItem>
          <ListItemIcon onClick={task ? handleToggleCompletion : undefined}>
            <CheckCircleOutlineIcon
              color={task.completed ? "success" : "disabled"} // 完了した場合は"primary"、そうでない場合は"disabled"の色を適用します
            />
          </ListItemIcon>
          {isEditTitle ? (
            <TextField
              value={task ? newTitle : ""}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (newTitle.trim() === "") {
                    setNewTitle(task.title); // 元のタイトルに戻す
                  }
                  handleTitleBlur();
                }
              }}
              autoFocus
              disabled={!task}
            />
          ) : (
            <ListItemText
              primary={task ? task.title : "タスクが選択されていません"}
              onClick={() => setIsEditTitle(true)}
            />
          )}
          <IconButton
            onClick={() => setConfirmDialogOpen(true)}
            disabled={!task}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
        <TextField
          label="メモ"
          multiline
          fullWidth
          value={task ? description : ""}
          onChange={handleDescriptionChange}
          onBlur={handleDescriptionBlur}
          variant="outlined"
          disabled={!task}
        />
      </div>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>タスクを削除</DialogTitle>
        <DialogContent>
          <DialogContentText>タスクを削除しますか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleDeleteConfirmed} color="primary">
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default TaskDetailPane;
