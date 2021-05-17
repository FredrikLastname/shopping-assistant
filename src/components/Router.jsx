import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import Main from "./Main"
import Welcome from "./Welcome"
import PageNotFound from "./PageNotFound"

const Router=()=>(

    <HashRouter>
        <div>
            <Switch>
                <Route path="/" component = { Welcome } exact = {true}/>
                <Route path="/2" component = { Main } />
                <Route component ={PageNotFound} />
            </Switch>
        </div>
    </HashRouter>
)

export default Router;