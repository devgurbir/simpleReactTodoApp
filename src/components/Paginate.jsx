import React from 'react'

function Paginate({totalResults, handlePaginate}){

    const totalPages = Math.ceil(totalResults / 5)
    const pages = new Array(totalPages).fill(0).map( (el, i) => <button onClick={handlePaginate}>{i+1}</button>)
    
    return(
        <div style = {{display: "flex", justifyContent: "center", marginTop:"20px"}}>
            {pages}
        </div>
    )
}

export default Paginate