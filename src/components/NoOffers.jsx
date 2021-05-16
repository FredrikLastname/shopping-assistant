import React from "react";
import {Button} from "react-bootstrap";


function NoOffers(props){

    function resetFilters(e){
        e.preventDefault();
        props.resetClicked();
    }

    return(
        <div className="post">
            <div className="post-content">
                <p className="title">Inga erbjudanden passade dina sökkriterier!</p>
                <Button className="button" variant="danger" onClick = {resetFilters}>Återställ filter</Button>
            </div>
        </div>
    )
}

export default NoOffers;