import React from "react"
import {NavLink, useHistory } from "react-router-dom"
import { Button, Form, Col } from "react-bootstrap"
import auth from "../firebase/auth"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faGrinAlt } from '@fortawesome/free-solid-svg-icons'

const smile = <FontAwesomeIcon icon={faGrinAlt} />
const signOutIcon = <FontAwesomeIcon icon={faSignOutAlt} />

function HeaderTwo(){
    // const {url} = useRouteMatch();
    const history = useHistory();
    
    function logout(){
        // console.log("logout klickad");
        auth.logout()
        .then(()=>{
            // console.log("HederTwo/logout");
            history.push("/")
        })
        
    }

    return(
        <header className="header-main">
            <Form>
                <Form.Row>

                    <Col></Col>
                    
                    <Col>
                        <Form.Label className="button-label">Tips</Form.Label>
                        <NavLink to="/2">
                            <Button
                            variant="outline-success"
                            className="button"
                            >
                            {smile}</Button>
                        </NavLink>

                    </Col>
                    
                    <Col>
                        <Form.Label className="button-label">Logga ut</Form.Label>
                        <Button
                            variant="outline-danger"
                            className="button"
                            onClick = {
                                // ()=>{
                                // auth.logout();
                                // history.push("/")
                                // }
                                logout
                            }
                        >
                        {signOutIcon}
                        </Button>

                    </Col>

                    <Col></Col>

                </Form.Row>

            </Form>    
        </header>
    )
}

export default HeaderTwo;