import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {Button} from "react-bootstrap";

const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />

function Offer(props){

    function deletePost(e){
        e.preventDefault();
        props.deleteClicked(props.offerId);
    }

    return(
        <div className="post">
            <div className="post-content">
                <p className="title">{props.title}</p>
                <p className="post-subtitle">{props.offer}</p>
                <p>{props.store}, {props.location}</p>
                <p className="post-description">{props.description}</p>

                {(props.expires) && 
                    <p className="post-date">Erbjudandet upphör den {new Date(parseInt(props.expires)).toLocaleDateString()}</p>
                }

                {(props.createdBy && props.date) &&
                    <p className="post-date">Upplagt den {new Date(parseInt(props.date)).toLocaleDateString()} av {props.createdBy}</p>
                }
                
                {props.createdBy === props.currentUser &&
                    <div>
                        <Button className="button" variant="outline-danger" onClick = {deletePost}>{deleteIcon}</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Offer;