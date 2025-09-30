import { useState ,useEffect} from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { ThemeContext } from '../contexts/ThemeContext';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    
      document.body.style.backgroundColor=dark?"black":"white";
      document.body.style.color=dark?"white":"black";
    
  }, [dark]);
  

  useEffect(() => {
    let todostring=localStorage.getItem("todos");
    if (todostring) {
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  
    
  }, [])
  
  
  function savetols() {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  function handleEdit(e,id) {
    let t=todos.filter(i=>i.id===id);
    setTodo(t[0].todo);
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos);
    savetols();
  }
  function handleDelete(id) {
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos);
    savetols();
  }
  function handleAdd() {
    setTodos([...todos,{id:uuidv4(),todo, isCompleted: false}])
    setTodo("")
    savetols();
  }
  
  function handleChange(e) {
    setTodo(e.target.value)
    
  }
  function handleCheckbox(e) {
    let id =e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
    savetols();
  }
  function handlefinished() {
    setshowfinished(!showfinished);

  }

  return (
    <>
    <ThemeContext.Provider value={{dark,setDark}}>
    <Navbar/>
     <div className="md:container bg-gray-200 mx-auto my-5 p-5 rounded-2xl min-h-[80vh] md:w-[50vw] space-y-3 " style={{background:dark? "white":"black",color:dark?"black":"white"}}>
      <h1 className='text-center font-bold text-3xl md:text-4xl'>Todo Manager - All at one place</h1>
      <div className="addtodo bg-gray-300 rounded-2xl px-5 py-4">
        <h2 className='text-2xl font-bold text-center pb-2'>Add a Todo</h2>
        <div className='flex justify-center'>
        <input type="text" onChange={handleChange} value={todo} className='border-[0.2px] border-gray-500 text-white bg-gray-400 rounded-lg py-1 px-1.5 w-1/2' placeholder='Enter your todo' />
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-black text-white px-2 py-1 rounded-lg mx-2  cursor-pointer hover:text-yellow-400 font-bold w-15 flex justify-center items-center'><IoIosSave /></button>
        </div>
        <input type="checkbox" onChange={handlefinished} className='mt-3' checked={showfinished} /> Show Finished Todos
      </div>
        
        <div className="todos p-3 space-y-2 ">
          <h2 className='text-2xl font-bold'>Your Todos</h2>
          {todos.length===0 && <div className='text-2xl'>No todos to display</div>}
          {todos.map((item)=>(
            (showfinished || !item.isCompleted)&&
          <div key={item.id} className="todo flex justify-between hover:bg-gray-300 rounded-lg p-2 transition-colors">
            <div className='flex gap-3 items-center'>
            <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className=" flex buttons space-x-2">
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-black text-white px-2 py-1 rounded-lg cursor-pointer hover:text-yellow-400 font-bold h-fit'><FaEdit /></button>
              <button onClick={()=>handleDelete(item.id)} className='bg-black text-white px-2 py-1 rounded-lg cursor-pointer hover:text-yellow-400 font-bold h-fit'><MdDelete /></button>
            </div>
          </div>
          ))}
        </div>
      
     </div>
     </ThemeContext.Provider>
    </>
  )
}

export default App
