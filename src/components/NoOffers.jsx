import React from "react";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
const editIcon = <FontAwesomeIcon icon={faEdit} />

function NoOffers(props){

    function addOffer(e){
        e.preventDefault();
        props.addOfferClicked();
    }

    return(
        <div className="post">
            <div className="post-content">
                <p className="title">Det finns inga erbjudanden upplagda. Har du något du vill tipsa om?</p>
                <Button 
                    className="button" 
                    variant="outline-success"
                    onClick = {addOffer}
                >
                {editIcon}
                </Button>
            </div>
        </div>
    )
}

export default NoOffers;