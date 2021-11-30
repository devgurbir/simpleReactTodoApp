import React, {useState, useEffect} from 'react'
import TodoInput from "./TodoInput"
import {v4 as uuid} from 'uuid'
import Paginate from "./Paginate"
import TodoItem from './TodoItem'
import axios from 'axios'

var parse = require('parse-link-header');

function Todo(){

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [todos, setTodos] = useState([]);
    const [todoTxt, setTodoTxt] = useState("");
    const [linkHeader, setLinkHeader] = useState("");
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const toggleStatus = async (id, currentStatus) => {
        await axios.patch(`http://localhost:3000/todos/${id}`, {
            status: !currentStatus
        })
        handleFetch()
        
    }

    const fetchData = async () => {
        setIsLoading(true);
        await axios.get("http://localhost:3000/todos").then( res => res.data).then(res => setTotalResults(res.length))
        return axios.get(`http://localhost:3000/todos?_page=${currentPage}&_limit=5`)
        .then(res => {
            // setLinkHeader(res.headers.get('link'));
            return res.data;
        })
    }

    const submitTodo = async (txt) => {
        const payload = {
            title: txt,
            status: false
        }

        //  await fetch(`http://localhost:3000/todos`, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(payload)
        // })

        await axios({
            method: "post",
            url: "http://localhost:3000/todos",
            data: payload
        })

        setTodoTxt(txt);
    }

    const handleFetch = async () => {
        setIsLoading(true);

        try{
            const data = await fetchData();
            console.log(data)
            setTodos(data);
        }
        catch{
            setIsError(true)
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect( () => {        
        handleFetch();
    }, [todoTxt, currentPage])

    const handlePaginate = (e) => {
        setCurrentPage(Number(e.target.innerText));
    }

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:3000/todos/${id}`)
        handleFetch()
    }
    

    return(
        <>
            <TodoInput handleTodo = {submitTodo} />
            {isError && <div>Something wen't wrong</div>}
            { isLoading ? <h3>Is Loading....</h3> : todos.map( el => <TodoItem delFn = {deleteTask} key={el.id} id = {el.id} title={el.title} status={el.status} handleToggle = {toggleStatus} />) }
            <Paginate totalResults = {totalResults} handlePaginate = {handlePaginate} />
        </>
    )
}

export default Todo