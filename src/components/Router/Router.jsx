import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"
import MainRoute from "./MainRoute";

import Main from "../Main" //Sidan med tips
// import Welcome from "./Welcome" //Inloggningssidan
import Home from "../Home" //Sidan med inköpslista
import PageNotFound from "../PageNotFound"

import FrontPage from "../../Pages/Auth/FrontPage"

const Router=()=>(

    <HashRouter>
        <div>
            <Switch>
                {/* <Route path="/" component = { FrontPage } exact = {true}/> */}
                
                <MainRoute exact path="/" component = { FrontPage } />
                <ProtectedRoute path="/home" component = { Home } />
                <ProtectedRoute path="/2" component = { Main } />
                <Route component ={PageNotFound} />
            </Switch>
        </div>
    </HashRouter>
)

export default Router;