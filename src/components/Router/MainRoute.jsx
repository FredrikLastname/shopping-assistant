import React from "react"
import {Redirect, Route} from "react-router-dom"
import auth from "../../firebase/auth"

//ProtectedRoute tar emot props. Främst component. Övriga "sprids ut" som ...otherProps

function MainRoute({component: Component, ...otherProps}){ 

    return(

        <Route
            {...otherProps} 
            render={(props)=>{
                if(!auth.isAuthenticated()){  //auth.isAuthenticated()
                    console.log(auth.getUid(), " är inte inloggad och har ingen access")
                    // console.log(auth.userID, " är inte inloggad och har ingen access")
                    return(<Component {...props}/>)
                }else{
                    console.log(auth.getUid(), " är inloggad och har access")
                    return (
                        <Redirect to={
                            {
                                pathname: "/home", 
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

export default MainRoute;