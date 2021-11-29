import React, {useState, useEffect} from 'react'
import TodoInput from "./TodoInput"
import {v4 as uuid} from 'uuid'
import Paginate from "./Paginate"
var parse = require('parse-link-header');

function Todo(){

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [todos, setTodos] = useState([]);
    const [todoTxt, setTodoTxt] = useState("");
    const [linkHeader, setLinkHeader] = useState("");
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)


    const fetchData = async () => {
        setIsLoading(true);
        await fetch("http://localhost:3000/todos").then( res => res.json()).then(res => setTotalResults(res.length))
        return fetch(`http://localhost:3000/todos?_page=${currentPage}&_limit=5`)
        .then(res => {
            // setLinkHeader(res.headers.get('link'));
            return res.json();
        })
    }

    const submitTodo = async (txt) => {
        const payload = {
            title: txt,
            status: false
        }

         await fetch(`http://localhost:3000/todos`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        setTodoTxt(txt);
    }

    useEffect( () => {
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
        handleFetch();
    }, [todoTxt, currentPage])

    const handlePaginate = (e) => {
        setCurrentPage(Number(e.target.innerText));
    }

    return(
        <>
            <TodoInput handleTodo = {submitTodo} />
            {isError && <div>Something wen't wrong</div>}
            { isLoading ? <h3>Is Loading....</h3> : todos.map( el => <div key={uuid()}>{el.title}</div>) }
            <Paginate totalResults = {totalResults} handlePaginate = {handlePaginate} />
        </>
    )
}

export default Todo