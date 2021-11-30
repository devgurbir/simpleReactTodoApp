import React, {useState} from 'react'
import axios from 'axios'
import Card from './Card'

function Github(){

    const [query, setQuery] = useState('')
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const data = await axios('https://api.github.com/search/users', {
            params: {
                q: query
            }
        })
        console.log(data)
        setUsers(data.data.items)
    }

    return(
        <div>
            <div>
                <input value = {query} onChange = { (e) => setQuery(e.target.value) } />
                <button onClick = {fetchUsers}>Search</button>
            </div>
            <div style = {{display: "flex", flexWrap: "wrap", flex: "1 1 30%", gap: "20px", justifyContent: 'center'}}>
                {users.map( el => <Card data = {el} />)}
            </div>
        </div>
    )
}

export default Github