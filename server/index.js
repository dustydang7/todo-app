const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

//middleware
app.use(cors()); //HTTP cross-origin resource sharing
app.use(express.json()); // parses incoming requests with JSON -> req.body

//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard

app.use("/dashboard",require("./routes/dashboard"));




//create a todo

app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body;
        const {type} = req.body;
        const {date_start} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO simple_todo (type, description, date_start) VALUES($1,$2,$3) RETURNING *",
            [type, description, date_start]);     
        res.json("Todo created!");                                                                                                                                                                                                                                                                                        
    }
    catch (err) {
        console.error(err.message);
    }
});

//get all todo

app.get("/todos", async(req,res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM simple_todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);   
    }
})

//get a todo

app.get("/todos/:id", async (req,res) => {
    try{
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM simple_todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE simple_todo SET description = $1 WHERE todo_id = $2",
        [description,id]);

        res.json("Todo was update!");
        
    } catch (err) {
        console.error(err.message);
    }
})

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM simple_todo WHERE todo_id = $1",
        [id]);
        res.json("Todo was delete!")
    } catch (err) {
        console.error(err.message);
    }
})


app.listen(3001, () => {
    console.log("running on port 3001");
});