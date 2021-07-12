import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"
import MainRoute from "./MainRoute";

import Main from "../../Pages/Main" //Sidan med tips
import Home from "../../Pages/Home" //Sidan med inköpslista
import PageNotFound from "../../Pages/PageNotFound"
import FrontPage from "../../Pages/Auth/FrontPage"

const Router=()=>(

    <HashRouter>
        <div>
            <Switch>
                <MainRoute exact path="/" component = { FrontPage } />
                <ProtectedRoute path="/home" component = { Home } />
                <ProtectedRoute path="/2" component = { Main } />
                <Route component ={PageNotFound} />
            </Switch>
        </div>
    </HashRouter>
)

export default Router;