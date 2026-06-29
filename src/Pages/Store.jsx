import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
function Store()
{   
   
    const {slug}=useParams()
    return(
        <div>
            <h1>
                Store belongs to {slug}
            </h1>
        </div>
    )
}

export default Store