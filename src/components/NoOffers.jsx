import React from "react";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
const editIcon = <FontAwesomeIcon icon={faEdit} />

function NoOffers(props){

    function handleClick(e){
        e.preventDefault();
        props.buttonClicked();
    }

    return(
        <div className="post">
            <div className="post-content">
                <p className="title">{props.postText}</p>
                <Button 
                    className="button" 
                    variant={props.variant}
                    onClick = {handleClick}
                >
                {props.listEmpty ? editIcon : "Återställ filter"}
                </Button>
            </div>
        </div>
    )
}

export default NoOffers;