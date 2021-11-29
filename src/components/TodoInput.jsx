import React from 'react'

function TodoInput({handleTodo}){
    const [val, setVal] = React.useState("")

    const handlingTodo = () => {
        handleTodo(val);
        setVal("")
    }

    return(
        <div>
            <input type='text' value={val} onChange = { (e) => setVal(e.target.value) }  />
            <button onClick = {handlingTodo}>Add Todo</button>
        </div>
    )
}

export default TodoInput