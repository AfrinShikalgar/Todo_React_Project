import React, { useEffect, useState } from "react";
import "./style.css"

const getLocalData = () =>{
  const lists = localStorage.getItem("mytodolist")

  if(lists){
    return JSON.parse(lists)
  }
  else{
    return [];
  }
}

const Todo = () =>{
  const[inputvalue,setinputvalue] = useState("");
  const[items,setItems] = useState(getLocalData());
  const[isEditItem,setIsEditItem] = useState("");
  const[togglebtn,settogglebtn] = useState(false);

  const addItem = () =>{
    if(!inputvalue){
      alert("plzz enter data")
    }
    else if(inputvalue && togglebtn){
       setItems(
        items.map((curr)=>{
          if(curr.id === isEditItem){
            return {...curr, name:inputvalue}
          }  
          return curr;
        })
       )
        setinputvalue("");
        setIsEditItem(null)
        settogglebtn(false);
    }
    else{
      const mynewInputData = {
        id:new Date().getTime().toString(),
        name:inputvalue,
      }
      setItems([...items,mynewInputData])
      setinputvalue("")
    }
  };
  const deleteItem =(id)=>{
   const updateItem = items.filter((curr)=>{
    return curr.id !== id;
   })
   setItems(updateItem);
  };

  const editItem = (index) =>{
        const item_todo_edited = items.find((curr) =>{
          return curr.id === index;
        })
        setinputvalue(item_todo_edited.name);
        setIsEditItem(index)
        settogglebtn(true);
        
  }

  useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(items))
  })

    return(
        <>
        <div className="main-div">
          <div className="child-div">
            <figure>
                <img src="https://hienphan0111.github.io/to-do-list/todolist-logo.png"/>
                <figcaption>Add Your List here</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" placeholder="🖊️Add Item" className="form-control"
                value={inputvalue}
                onChange ={(e)=>setinputvalue(e.target.value)}/>

                {togglebtn ? ( <i className="fa fa-edit" aria-hidden="true" onClick={addItem}></i>)

                : <i className="fa fa-plus" aria-hidden="true" onClick={addItem}></i>}
               
            </div>
            <div className="showItems">
              {items.map((curr)=>{
              return(
                <div className="eachItem" key={curr.id}>
                <h3>{curr.name}</h3>
                <div className="todo-btn">
                <i className="fa fa-pencil-square add-btn" onClick={()=>
                  editItem(curr.id) }></i>
                <i className="fa fa-trash add-btn" onClick={()=>deleteItem(curr.id)}></i>
                
                </div>
            </div>
              )
              })}
             
               

            </div>
            <div className="showItems">
              <button className="btn effect04" data-sm-link-text="Remove All" onClick={()=>{
                setItems([])
              }}><span>
                CHECK LIST
              </span>
                
              </button>

            </div>
          </div>
        </div>
        </>
    )
}

export default Todo;