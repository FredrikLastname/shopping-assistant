import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./Main"
import Welcome from "./Welcome"
import PageNotFound from "./PageNotFound"

const Router=()=>(

    <BrowserRouter basename='/shopass'>
        <div>
            <Switch>
                <Route path="/" component = { Welcome } exact = {true}/>
                <Route path="/2" component = { Main } />
                <Route component ={PageNotFound} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default Router;