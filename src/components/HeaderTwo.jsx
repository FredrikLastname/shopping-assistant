import React from "react"
import {NavLink, useHistory } from "react-router-dom"
import { Button, Form, Col } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
// import { faExclamation } from '@fortawesome/free-solid-svg-icons'
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faGrinAlt } from '@fortawesome/free-solid-svg-icons'
import auth from "../firebase/auth"

const smile = <FontAwesomeIcon icon={faGrinAlt} />
const signOutIcon = <FontAwesomeIcon icon={faSignOutAlt} />
// const exclamation = <FontAwesomeIcon icon={faExclamation} />
// const shoppingCart = <FontAwesomeIcon icon={faShoppingCart} />


function HeaderTwo(){
    // const {url} = useRouteMatch();
    const history = useHistory();
    return(
        <header className="header-main">
            <Form>
                <Form.Row>

                    <Col></Col>

                    {/* <Col>
                        <Form.Label>Varukategori</Form.Label>      
                        <NavLink to={`${url}/`}>
                            <Button
                            variant="outline-success"
                            className="button"
                            >
                            {shoppingCart}</Button>
                        </NavLink>

                    </Col> */}
                    
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
                            onClick = {()=>{
                                auth.logout();
                                history.push("/")
                            }}
                        >{signOutIcon}</Button>
                        
                        {/* <NavLink to="/">{
                            <Button 
                            variant="outline-danger"
                            className="button"
                            >
                            {signOutIcon}
                            </Button>}
                        </NavLink> */}

                    </Col>

                    <Col></Col>

                </Form.Row>

            </Form>    
        </header>
    )
}

export default HeaderTwo;