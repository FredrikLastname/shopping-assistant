import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"

import Main from "./Main" //Sidan med tips
import Welcome from "./Welcome" //Inloggningssidan
import Home from "./Home" //Sidan med inköpslista
import PageNotFound from "./PageNotFound"

const Router=()=>(

    <HashRouter>
        <div>
            <Switch>
                <Route path="/" component = { Welcome } exact = {true}/>
                <ProtectedRoute path="/home" component = { Home } />
                <ProtectedRoute path="/2" component = { Main } />
                <Route component ={PageNotFound} />
            </Switch>
        </div>
    </HashRouter>
)

export default Router;