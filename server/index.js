const express = require("express") 
const mongoose = require('mongoose')
const cors = require('cors') 
const TodoModel = require('./Models/Todo')

const app = express() 
app.use(cors()) 

app.use(express.json()) 


mongoose.connect('mongodb://127.0.0.1:27017/taskmanager')

app.get('/get' , (req , res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => console.log(err)) 
})

app.post('/add' , (req , res)=> {
    const task = req.body.task ; 

    TodoModel.create({
        task : task 
    }).then(result => res.json(result))
    .catch(err => res.json(err)) 
})

app.put('/update/:id' , (req , res) =>{
    // console.log(req) ; 
    // const {id} = req.params ;
    // // console.log(id) ; 
    // TodoModel.findByIdAndUpdate({_id : id} , {done : true})
    // .then(result => res.json(result))
    // .catch(err => res.json(err)) 

    const {id} = req.params ; 

    TodoModel.findById(id)
    .then(todo => {
        TodoModel.findByIdAndUpdate(
            id,
            {done : !todo.done} , 
        )
        .then(result => result.json(result))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err)) ; 

})

app.delete('/delete/:id' , (req, res) => {
    
    const {id} = req.params ; 
    console.log(id); 
    TodoModel.findByIdAndDelete({_id : id})

    .then((result) => {
        res.json(result)
    })
    .catch(err => res.json(err)) 
})



app.listen(3001  , ()=>{
    console.log("server is running")          
})