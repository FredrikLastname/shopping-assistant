import React from "react";
import Footer from "./Footer";
import Router from "./Router"



class App extends React.Component{

    render(){
        return(
            <div>
                
                <Router />
                <Footer />
            </div>
        )
    }
}

export default App;