import React, { Fragment, useState} from 'react';
import styled from 'styled-components';

const Wrapper = styled.form `
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
    justify-content: center;
    alignt-items: center;
`; 

const InputTodo = () => {

    const [description, setDescription] = useState("");
    const [date_start, setStartDate] = useState(new Date());
    const handleDateChange = e => setStartDate(e.target.value);
    const [type, setType] =  useState("Work");
    const handleTypeChange = e => setType(e.target.value);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {type, description, date_start};
            const response = fetch("http://localhost:3001/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location="/";
        } catch (err){
            console.error(err.message);
        }
    }

    return (
    <Fragment>
        <h1 className="text-center mt-5">Todo List</h1>
        <Wrapper onSubmit={onSubmitForm}>
            <label>Date</label>
            <input type='date' onChange={handleDateChange} value={date_start}/>
            <label>Type</label>
            <select onChange={handleTypeChange} value={type}>
                <option value="Work">Work</option>
                <option value="Chores">Chores</option>
                <option value="Urgent">Urgent</option>
                <option value="Other">Others</option>
            </select>
            <label>Description</label>
            <input type='text' style={{height: '100px', paddingBottom: "70px"}} value={description} onChange={e => setDescription(e.target.value)}/>
            <button className="btn btn-success">Add</button>
        </Wrapper>
    </Fragment>
    )};

export default InputTodo;