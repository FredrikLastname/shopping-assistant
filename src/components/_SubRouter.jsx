import React from "react"

import {HashRouter, Switch, Route, useRouteMatch} from "react-router-dom"
// import {PageTwoContent as Text} from "../components/PageTwoContent"
// import {PageTwoMoreContent as MoreText} from "../components/PageTwoMoreContent"

import Home from "./Home"
import Main from "./Main"

function SubRouter(){

    const {path} = useRouteMatch();
    return(
        <HashRouter>
            <Switch>
            {/* <Route path={path} component={ Main } exact></Route> */}
            {/* <Route path={path} component={ Home } exact></Route> */}
            {/* <Route to={`${path}/b`} component={ MoreText }></Route> */}
            </Switch>
        </HashRouter>
    )

}

export default SubRouter;