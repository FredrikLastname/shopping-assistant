import React from "react"
import {Alert} from "react-bootstrap"

function AlertComp(props){
    return(
        <>
          <Alert 
          variant={props.variant}>
            <Alert.Heading>{props.alertHeading}</Alert.Heading>
            <p>{props.alertMessage}</p>
            { props.alertDetails && 
              <>
              <hr />
              <p className="alert-text">
                {props.alertDetails}
              </p>
              </>
            }
          </Alert>
        </>
      )
}

export default AlertComp;