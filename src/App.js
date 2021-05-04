import React, { useEffect, useRef, useState } from 'react';
import Todolist from './Todolist';
import uuidv4 from 'uuid/dist/v4'

const LOCAL_STORAGE_ITEM='todoapp.todo';

function App() {
  const [todos,setTodos] = useState([]);
  const todoNameRef=useRef();
  useEffect(()=>{
    const storedTodos=JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM))
    if(storedTodos) setTodos(storedTodos)
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_ITEM,JSON.stringify(todos)) 
   },[todos])

   function toggleTodo(id){
     const newTodos=[...todos]
     const todo=newTodos.find(todo => todo.id ===id)
     todo.complete=!todo.complete;
     setTodos(newTodos)
   }

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if(name === '') return ;
    console.log(name);
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos=todos.filter(todo => !todo.complete);
    setTodos(newTodos)
  }
  return (
    <>
     <Todolist key={todos} toggleTodo={toggleTodo} todos={todos} />
     <input ref={todoNameRef} type="text" />
     <button onClick={handleAddTodo}>Add Todo</button>
     <button onClick={handleClearTodos}>Clear checkedTodo</button>
     <div>{todos.filter(todo => !todo.complete).length} left to do</div>
     </>
  );
}

export default App;
