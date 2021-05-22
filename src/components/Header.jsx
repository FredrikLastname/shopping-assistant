import React, {useState} from "react"
import { useHistory} from "react-router-dom";
import {Button, Dropdown, DropdownButton, Form, Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import firebase from "firebase"
import { fireAuth } from "../firebase/init"

import { faListUl } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faGifts } from '@fortawesome/free-solid-svg-icons'

const listIcon = <FontAwesomeIcon icon={faListUl} />
const locationIcon = <FontAwesomeIcon icon={faMapMarkedAlt} />
const signOutIcon = <FontAwesomeIcon icon={faSignOutAlt} />
const editIcon = <FontAwesomeIcon icon={faEdit} />
const giftsIcon = <FontAwesomeIcon icon={faGifts} />


function Header (props){

    //Behövs den här?
    const[addOffer, setAddOffer] = useState(false)

    function onCategoryClick(e){
        e.preventDefault();
        props.categoryClicked(e.target.name)
    }

    function onLocationClick(e){
        e.preventDefault();
        props.locationClicked(e.target.name)
    }

    function onAddOfferClicked(e){
        e.preventDefault();
        setAddOffer(!addOffer)
        props.addClicked();
    }

    function LogOutButton(){

        const history = useHistory();

        function handleClick(){

            sessionStorage.removeItem("loggedInUser")
            
            fireAuth.signOut().then(()=>{
                history.push("/");
            })
        }

        return(

            <Button
            className="button" 
            variant="outline-danger"
            onClick={handleClick}
            >
            
            {signOutIcon}
            </Button>
        )
    }

    return(
        <header>
            <Form>
                <Form.Row>
                    <Col>
                    <Form.Label className="button-label">Varukategori</Form.Label>
                    <DropdownButton
                        disabled = {props.pageState}
                        id="dropdown-basic-button"
                        variant="outline-primary"
                        className="button"
                        title={listIcon}>
                        {props.categories.map((cont, index)=>{
                            return(
                                <Dropdown.Item
                                key = {index}
                                name={cont}
                                onClick={onCategoryClick}
                                >
                                {cont}
                                </Dropdown.Item>)
                        })}
                    </DropdownButton>
                    </Col>
                    
                    <Col>
                    <Form.Label className="button-label">Ort</Form.Label>
                    <DropdownButton
                        disabled = {props.pageState}
                        className="button"
                        id="dropdown-basic-button"
                        variant="outline-primary"
                        title={locationIcon}>
                            {props.location.map((cont, index)=>{
                            return(<Dropdown.Item
                            key = {index}
                            name={cont}
                            onClick={onLocationClick}
                            >
                            {cont}
                            </Dropdown.Item>)
                            })}
                    </DropdownButton>
                    </Col>
                    
                    <Col>
                        {props.pageState ? 
                            <Form.Label className="button-label">Läs tips</Form.Label> : 
                            <Form.Label className="button-label">Lägg till</Form.Label>
                        }   
                        
                        {props.regState && 
                            <Button
                                className="button"
                                variant="outline-success"
                                onClick={onAddOfferClicked}>
                                {props.pageState ? giftsIcon : editIcon}
                            </Button>
                        }
                    </Col>
                    
                    <Col>
                        <Form.Label className="button-label">Logga ut</Form.Label>
                        <LogOutButton />
                    </Col>
                </Form.Row>
            </Form>
        </header>
    )
}

export default Header;