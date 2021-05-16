import React, {useState} from "react";
import {Modal, Button} from "react-bootstrap"


function PopUp(props) {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
  
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
            {props.title}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
          {props.message}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="outline-primary" onClick={handleClose}>
              Stäng
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default PopUp;