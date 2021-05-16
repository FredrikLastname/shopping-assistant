import React from "react";
import Form from 'react-bootstrap/Form'

function RequiredFieldSmallAlert(){
    return(
      <Form.Control.Feedback type="invalid">
        Fältet är obligatoriskt
      </Form.Control.Feedback>
    )
}

export default RequiredFieldSmallAlert;

