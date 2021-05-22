import React, {useState} from "react";
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import AlertComp from "./AlertComp";
import RequiredFieldSmallAlert from "./RequiredFieldSmallAlert";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const submitIcon = <FontAwesomeIcon icon={faShareSquare} />
const exclamationIcon = <FontAwesomeIcon icon={faExclamationCircle} />
const descriptionLength = 150;

function AddOffer(props){
  const [offer, setOffer] = useState({
  category: "",
  title: "",
  offer: "",
  store: "",
  description: "",
  location: ""
  })    

  const [validation, setValidation] = useState(true)

  function onInputChange(e){
    const {name, value} = e.target
    setOffer(prevState =>{
      if(name === "description"){
        return {...prevState, description: value.substring(0, descriptionLength)}
      } else if(value === "Välj kategori") {
        return {...prevState, category: ""} 
      } else {
        return {...prevState, [name]: value} 
      }
    })
  }

  function onSubmitClick(){

    if(validateOffer()){
      //Generera timestamp
      const publishedDate = Date.now().toString();
      const createdBy = props.user;
      const newOffer ={date: publishedDate, createdBy, ...offer}
      
      props.submitClicked(newOffer);
    }
  }
  
  function validateOffer(){
    
    if(!offer.category || !offer.title || !offer.offer || !offer.store || !offer.location){
      setValidation(false)
      return false;
    }else{
      setValidation(true)
      return true;
    }
  }

  return(
    <div className="addPost">
      <AlertComp 
        variant = "info"
        alertMessage = "Tipsa andra om ett erbjudande!"
        // alertDetails = ""
      />

      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
            {(!validation && !offer.category) && <RequiredFieldAlert />}
            <Form.Control 
              as="select"
              name="category"
              onChange={onInputChange}
              className="dropdown"
            >
              <option className="option">Välj kategori</option>
              <option className="option">Livsmedel</option>
              <option className="option">Hygien</option>
              <option className="option">Nöje/Fritid</option>
              <option className="option">Kläder</option>
              <option className="option">Hemelektronik</option>
              <option className="option">Utförsäljning</option>
            </Form.Control>
            
        </Form.Group>

        <Form.Row>
            <Col>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  required
                  isInvalid = {!validation && !offer.title}
                  name="title" 
                  onChange={onInputChange}
                  placeholder="Vara" 
                  value={offer.title} 
                  autoComplete="off"
                />
                <RequiredFieldSmallAlert />
              </Form.Group>
            </Col>
            
            <Col>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                  required
                  isInvalid = {!validation && !offer.offer} 
                  type="text" 
                  name="offer"
                  onChange={onInputChange}
                  placeholder="Erbjudande"
                  value={offer.offer} 
                  autoComplete="off"  
                  />
                  <RequiredFieldSmallAlert />
              </Form.Group>
            </Col>
        </Form.Row>

        <Form.Row>
            <Col>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                required
                isInvalid = {!validation && !offer.store}  
                type="text"
                name="store" 
                onChange={onInputChange}
                placeholder="Affär" 
                value={offer.store}
                autoComplete="off"
                />
                <RequiredFieldSmallAlert />
              </Form.Group>
            </Col>
          
            <Col>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                required
                isInvalid = {!validation && !offer.location}  
                type="text" 
                name="location"
                onChange={onInputChange}
                placeholder="Ort" 
                value={offer.location}
                autoComplete="off"  
                />
                <RequiredFieldSmallAlert />
                
              </Form.Group>
            </Col>
        </Form.Row>
        <Form.Row>
            <Col>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                type="date"
                name="expires" 
                onChange={onInputChange}
                placeholder="erbjudandet upphör den..." 
                // value={offer.expires}
                autoComplete="off"
                />
                <RequiredFieldSmallAlert />
              </Form.Group>
            </Col>
          
            <Col>
              <Form.Text>Om inget datum anges upphör erbjudandet gälla efter 10 dagar</Form.Text>
            </Col>

        </Form.Row>

        
        
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control 
          as="textarea" 
          rows={3} 
          name="description"
          onChange={onInputChange}
          placeholder="Valfri och kort beskrivning av erbjudandet"
          value={offer.description}
          autoComplete="off"
          />
          <Form.Text className="text-muted">
          {descriptionLength - offer.description.length} tecken kvar
          </Form.Text>
        </Form.Group>
        
          
        <Form.Row>
          <Button
            className="mx-auto" 
            block
            variant="success"
            onClick={onSubmitClick}
            >
            {submitIcon}
          </Button>
          
        </Form.Row>

      </Form>
    </div>
  );
}


function RequiredFieldAlert(){

  return(
    <Form.Text className="text-danger">
      {exclamationIcon} Fältet är obligatoriskt
    </Form.Text>
  )

}

export default AddOffer;