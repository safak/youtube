import { useEffect } from "react"
import { useLocation } from "react-router"
import { userRequest } from "../requestMethods"

const Success = () => {
    const location = useLocation()
    const data = location.state.data

    //TODO
    //Create an order

    return (
        <div style={{height:"100vh",display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
            Successfull. Your order is being prepared...
            <button style={{padding:10, marginTop:20}}>Go to Homepage</button>
        </div>
    )
}

export default Success
