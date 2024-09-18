import { Button, Checkbox, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type PropsType = {
    todo: TodoItemType;
    completeHandler: (id: TodoItemType["id"])=>void
    deleteHandler: (id: TodoItemType["id"])=>void
    editHandler: (id: TodoItemType["id"], newTitle: TodoItemType["title"])=>void
};

const TodoItem = ({todo, completeHandler, deleteHandler, editHandler}: PropsType) => {
  const[editActive, setEditActive] = useState<boolean>(false);
  const[textValue, setTextValue] = useState<string>(todo.title);
 
  return (
    <Paper sx={{padding: "1rem", marginTop: "30px"}}>
      <Stack direction={"row"} alignItems={"center"}>
        {
        editActive ? (
        <TextField 
          sx={{marginRight: "auto"}}
          onKeyDown={(e) => {if((e.key === "Enter" && textValue !== "")){ 
            editHandler(todo.id, textValue)
            setEditActive(false);
          }}} 
          value={textValue} 
          onChange={(e)=>setTextValue(e.target.value)}/>
        ) : (
          <Typography marginRight={"auto"}>{todo.title} </Typography>
        )
        }
        <Checkbox checked={todo.isCompleted} onChange={() => completeHandler(todo.id)}/>
        { 
          editActive ? <Button onClick={() =>{
            editHandler(todo.id, textValue);
            setEditActive(false);
          }}>Done ✔️</Button>: <Button onClick={() => setEditActive((prev) => (!prev))}>Edit ✏️</Button> 
        }
        <Button onClick={() => deleteHandler(todo.id)}>Delete 🗑️</Button>
      </Stack>
    </Paper>
  )
}

export default TodoItem

