import React from "react"
import {Redirect, Route} from "react-router-dom"
import auth from "../../firebase/auth"

//ProtectedRoute tar emot props. Främst component. Övriga "sprids ut" som ...otherProps

function ProtectedRoute({component: Component, ...otherProps}){ 

    return(
        <Route
            {...otherProps} 
            render={(props)=>{
                if(auth.isAuthenticated()){
                    //console.log(auth.getUid(), "Inloggad och har access")
                    return(<Component {...props}/>)
                }else{
                    // console.log(auth.getUid(), "Inte inloggad och har ingen access")
                    return (
                        <Redirect to={
                                {
                                    pathname: "/", 
                                    state: {from:props.location}
                                }
                            }
                        />
                    )
                }
            }} 
        />
    )
}

export default ProtectedRoute;