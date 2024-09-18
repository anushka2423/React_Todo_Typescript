import { AppBar, Button, Container, Stack, TextField, Typography } from "@mui/material"
import TodoItem from "./components/TodoItem"
import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "./utils/features";

function App() {

  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());

  const [title, setTitle] = useState<TodoItemType["title"]>("");

  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTodo: TodoItemType[] = todos.map(i=>{
      if(i.id === id) i.isCompleted = !i.isCompleted;
      return i;
    });

    setTodos(newTodo);
  };

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodo: TodoItemType[] = todos.filter(i=>i.id !== id);

    setTodos(newTodo);
  };

  const editHandler = (id: TodoItemType["id"], newTitle: TodoItemType["title"]): void => {
    const newTodo: TodoItemType[] = todos.map(i=>{
      if(i.id === id) i.title = newTitle;
      return i;
    });

    setTodos(newTodo);
  };

  const submitHandler = ():void => {
    const newTodo: TodoItemType= {
      title,
      isCompleted:false,
      id:String(Math.random()*100),
    };

    setTodos(prev => ([...prev, newTodo]));
    setTitle("");
  } 

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <Container maxWidth="sm" sx={{ height: "100vh", marginTop: "40px" }}>
      <AppBar position="static" sx={{ padding:"20px", marginBottom: "20px", borderRadius: "10px" }}>
        <Typography>
          Todo App
        </Typography> 
      </AppBar>

      <TextField value={title} onKeyDown={(e) => {if(e.key === "Enter" && title !== ""){submitHandler()}}} onChange={(e) => setTitle(e.target.value)} fullWidth label={"New Task"} sx={{ marginBottom: "10px"}}/>
      <Button fullWidth variant="contained" disabled={title === ""} onClick={submitHandler}>ADD</Button>

      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {
          todos.map((i) => (
            <TodoItem 
              key={i.id}
              todo={i}
              completeHandler={completeHandler} deleteHandler={deleteHandler} editHandler={editHandler}
            />
          ))
        }
      </Stack>


    </Container>
  )
}

export default App
