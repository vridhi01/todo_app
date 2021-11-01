import React,{useState,useEffect} from 'react';
import {addTodo,deleteTodo,editTodoButton} from '../action/index';
import {useDispatch, useSelector} from "react-redux";

import { db } from '../firebase_config';
import './todo.css';

function Todo() {
  const [state, setstate] = useState('');
  const [todos, setTodos] =useState([]);
 // const list =useSelector((state)=>state.todoReducers.list);
 const [isEditItem , setIsEditItem] = useState(null);
  const [ediTodo, seteditTodo] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodo();
  }, []);

  const editTodo = (id) => {
    
    let neweditItem = todos.find((elems)=>{
         return elems.id === id;
    });
    setstate(neweditItem.todo);
    seteditTodo(false);
    setIsEditItem(id);
 
   }
  const getTodo = () => {
       db.collection("todos").onSnapshot(function(querySnapshot){
        setTodos(
          querySnapshot.docs.map((doc)=>({
            id: doc.id,
            todo:doc.data().todo,
            inprogress:doc.data().inprogress
          }))
        );
      }); 
  }
  return (
    <div className="page-content page-container" id="page-content">
    <div className="padding">
        <div className="row container d-flex justify-content-center">
            <div className="col-md-12">
                <div className="card px-3">
                    <div className="card-body">
                        <h4 className="card-title">Todo list</h4>
                        <div className="add-items d-flex"> 
                            <input type="text" 
                            className="form-control todo-list-input" 
                            value={state}
                            placeholder="What do you need to do today?"
                            onChange ={(e)=> setstate(e.target.value)} 
                            /> 
                            {ediTodo ?
                            <button 
                            className="add btn btn-primary font-weight-bold todo-list-add-btn" onClick={()=>{dispatch(addTodo(state),setstate(''))}} >Add</button>
                            :<button 
                            className="add btn btn-primary font-weight-bold todo-list-add-btn" onClick={()=>{dispatch(editTodoButton(state,isEditItem),setstate(''),seteditTodo(true))}}>Edit</button> }
                            
                        </div>
                        <div className="list-wrapper">
                            <ul className="d-flex flex-column todo-list">
                                  {
                                    todos.map((elem)=>{
                                      return (
                                        <li key={elem.id}>
                                            <div className="form-check">
                                            <label className="form-check-label"> 
                                                  <input className="checkbox" type="checkbox"/>{elem.todo} 
                                                  <i className="input-helper"></i>
                                                </label> 
                                            </div> 
                                            <div className="buttons">
                                                 <i className="fa fa-edit" onClick={()=>{editTodo(elem.id)}}></i>
                                                <i className="remove mdi mdi-close-circle-outline" onClick={() => {dispatch(deleteTodo(elem.id))}}></i>
                                            </div>
                                        </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Todo
