import React from "react";
import {Button} from "react-bootstrap";


function NoOffersFilter(props){

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
                Återställ filter
                </Button>
            </div>
        </div>
    )
}

export default NoOffersFilter;