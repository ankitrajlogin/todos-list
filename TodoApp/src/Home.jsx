import React, { useState } from "react" 
import { useEffect } from "react"
import Create from "./Create"
import axios from "axios"

// import './Home.css'
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from "react-icons/bs";

function Home(){
    const [todos , setTodos] = useState([]) 

    useEffect(()=>{
        
        axios.get('http://localhost:3001/get')
        .then((result) => {
            console.log(result) 
            console.log(result.data) 
            setTodos(result.data)
        })
        .catch(err => resizeBy.json(err))
    } , [])


    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
        .then(result => {
            location.reload() ; 
        })
        .catch(err => console.log(err))
    }

    const handleDelete = async (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
        .then(result => {
            location.reload() 
        }) 
        .catch( (e) => {
            console.log(e)
            console.log("randi rona") ;
        })
    }

    return (
        <>
        <div >
            <h2 className="header"> Task Manager</h2>
            <Create />
            {   
                todos.length === 0 
                ?
                <div><h2 className="record">No Record</h2> </div>
                :
                todos.map(todo =>(
                    <div className="task">
                        <div className="checkbox" onClick = {() => handleEdit(todo._id)}>
                            {todo.done 
                            ?
                               <BsFillCheckCircleFill className = 'icon' />
                            :
                            <BsCircleFill className = 'icon' />
                            }

                            <p className={todo.done ? "line_through" : ""}
                            > {todo.task}  </p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className ="icon" onClick = {() => handleDelete(todo._id) }/></span>
                        </div>
                    </div>
                ))
            }
        </div>
        
        </>
    )
}

export default Home  ;