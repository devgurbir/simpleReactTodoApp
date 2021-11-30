import React from 'react'

function TodoItem({title, status, id, handleToggle, delFn}){
    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: "10px", gap: "10px"}}>
        <div style={{border:"1px solid #ccc", padding: "10px"}}>
            {title}
        </div>
        <div style={{border:"1px solid #ccc", padding: "10px"}}>
            <button onClick = { () => handleToggle(id, status)}>{status ? "Completed" : "Mark as completed"}</button>
        </div>
        <div  style={{border:"1px solid #ccc", padding: "10px"}}>
            <button onClick = { () => delFn(id)}>
                X
            </button>
        </div>
        </div>
    )
}

export default TodoItem