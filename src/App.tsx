import React, { useState } from 'react';
import { useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore';
import db from './firebase';


function App(){

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<any>([]);
  const usersCollectionRef = collection(db,'tasks');
  const [editable, setEditable] = useState(false);
  const [updatedTask, setUpdated] = useState('');
  const [editableId, setEditableId] = useState('');

  const addUser = async () =>{
    await addDoc(usersCollectionRef,{task : newTask, completed: false});
    getUsers();
  }
  const completeTask = async (id: string, completed : boolean) => {
    const taskDoc = doc(db, 'tasks', id);
    const complete = {completed : completed};
    await updateDoc(taskDoc, complete);
    getUsers();
  }
   const deleteUser = async (id: string) =>{
    const taskDoc = doc(db,'tasks',id);
    await deleteDoc(taskDoc);
    getUsers();
  }
  const editableState = (id : string) =>{
    setEditable(true);
    setEditableId(id)
  };

  const updateTask = async (id : any, updated : string) =>{
    const taskDoc = doc(db, 'tasks', id);
    const taskUpdated = {task : updated};
    setEditable(false);
    await updateDoc(taskDoc, taskUpdated);
    getUsers();
  }

  const getUsers = async () =>{
    const rawData = await getDocs(usersCollectionRef);
    const data = rawData.docs.map((doc)=>({...doc.data(), id: doc.id}));
    setTasks(data)
  }
  useEffect(()=>{ 
    getUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="App">
        <input 
        type="text" 
        placeholder='Add a task' 
        onChange={e=>setNewTask(e.target.value)} />
        <button 
        onClick={()=> addUser()}>
          Add
        </button>
      {
        tasks.map((task : any)=>{
          return(
            <div key={task.id}>
              <h1>Task: 
                {
                  (task.completed)
                  ?
                  <s>{task.task}</s>
                  :
                  <span>{task.task}</span>
                }
              </h1>
              <span>Completed :</span>
              <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={(e)=> completeTask(task.id, e.target.checked)}/>
              <button 
              onClick={()=> deleteUser(task.id)} >Delete task
              </button>
              {
              (editable && editableId === task.id)
              ?
              <>
              <input type="text" 
              defaultValue={task.task} 
              onChange={(e)=>{setUpdated(e.target.value)}}/>
              <button 
              onClick={(e)=>{updateTask(task.id, updatedTask)}}>editar</button> 
              </>
              : 
              <button 
              onClick={()=> editableState(task.id)} >Edit task</button>
              }
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
