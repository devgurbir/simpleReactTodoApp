import axios from 'axios'
import { useEffect } from 'react'

function AxiosFetching(){
    const axiosFetch = () => {
        return axios.get("http://localhost:3000/todos?_page=1&_limit=5")
        
        
    }

    useEffect( async () => {
        const data = await axiosFetch();
        console.log(data.headers)
    })

    return (
        <div>
            x
        </div>
    )
}

export default AxiosFetching