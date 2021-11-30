import React from 'react'

export default function Card({data}){
    return (
        <div style={{marginTop: "30px", display: "flex", justifyContent: "center", gap: "10px", alignItems: "center", border: "1px solid #ccc"}}>
            <div>
                {data.login}
            </div>
            <div>
                <a href={data.html_url}>{data.id}</a>
            </div>
            <div>
                <img src={data.avatar_url} height={100}/>
            </div>
        </div>
    )
}