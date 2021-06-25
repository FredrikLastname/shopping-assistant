import React from "react";
import Footer from "./Footer";
import Router from "./Router"
import auth from "../firebase/auth"


class App extends React.Component{

    render(){
        auth.checkAuth()
        return(
            <div>
                <Router />
                <Footer />
            </div>
        )
    }
}

export default App;