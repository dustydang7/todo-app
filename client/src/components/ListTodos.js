import React, { Fragment, useState, useEffect } from "react";
import moment from 'moment';
import EditTodo from "./EditTodos";

const ListTodos = () => {
    
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState('');
    const [filterType, setFilter] = useState([]);
    
    //delete todo
    const deleteTodo = async (id) => {
        try {
            //fetch server data to the specified id for deletion
            const deleteTodo = await fetch(`http://localhost:3001/todos/${id}`, {
                method: "DELETE"
            });
            //filter the todo so we don't need to refresh for changes
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    //get all todo
    const getTodos = async() => {
        try {
            const response = await fetch('http://localhost:3001/todos');
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    //render all todo
    useEffect(() => {
        getTodos();
    }, []);
 
    //render filter
    useEffect(() => {
        //filter the todo list based on the Type
        setFilter(
            todos.filter((todo => 
                todo.type.toLowerCase().includes(search.toLowerCase())))
        );
    }, [search, todos]); //render the changes

    return (
        <Fragment>
            {" "}
            <table className="table mt-5 text center">
                <thead>
                    <tr>
                        <th>Date Created</th>
                        <th><input type="text" placeholder="search" onChange ={e => setSearch(e.target.value)}></input><br/>Type</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filterType.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{moment(todo.date_start).format('DD-M-YYYY')}</td> 
                            <td>{todo.type}</td>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo} />
                            </td>
                            <td><button className="btn btn-danger" 
                            onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                        ))}
                </tbody>
            </table>
        </Fragment>
    )
};

export default ListTodos;