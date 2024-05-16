const express=require('express')//import Express.js
const app=express();//creates an Express application instance. we use this "app" object to configure routes and middleware for your server
const PORT=3000//set the port number

app.use(express.json())//Middleware to parse JSON requests

let todos=[]//in-memory storage for todos

//route to get all todos
app.get('/todos',(req,res)=>{
    res.send(todos);
})
//Route to add a new todo
app.post('/todos',(req,res)=>{
    const newTodo=req.body;//body contains the data sent bby the client
    newTodo.id=todos.length+1;//provide an ID to the new task
    todos.push(newTodo);//add the new task to the end of the todos array
    res.status(201).json(newTodo)//201 created :the new todo item has been successfully created and added to the server's storage.
})

//start the server
app.listen(PORT,()=>{
    console.log(`Server is listening in the port ${PORT}`)
})