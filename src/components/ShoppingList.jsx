import React, { useState} from "react"
import {Button, InputGroup, Form, FormControl} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const editIcon = <FontAwesomeIcon icon={faEdit} />

function ShoppingList(){
    
    const [tempItem, setTempItem] = useState("")
    const [ item, setItem] = useState(["Bananer", "Ägg", "Yoghurt", "Jordgubbar"])

    function onInputChange(event){
        const {value} = event.target;
        setTempItem(() =>(value))
    }

    function onButtonClicked(){
        setItem(prevState =>([...prevState, tempItem]))
        setTempItem(()=>"")
    }

    function deleteItem(clickedItemId){
        console.log(clickedItemId, " blev klickad");
        const tempArray = [];
        const id = Number.parseInt(clickedItemId)


        item.forEach((thing, index)=>{
            if(index !== id){
                tempArray.push(thing)
            }
        })

        setItem(()=>{return tempArray})

        uncheckCheckBoxes();
    }

    function uncheckCheckBoxes(){
        const inputs = document.querySelectorAll("input[type='checkbox']");

        inputs.forEach(input =>{
            input.checked =false;
        })
    }

    return(
        
        <div className="post">
            <div className="post-content">
                <p className="title">Inköpslista</p>

                <Form>

                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Lägg till en vara"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={onInputChange}
                        value={tempItem}
                        />
                        <Button
                        disabled = {!tempItem} 
                        variant="outline-success" 
                        id="button-addon2"
                        onClick={onButtonClicked}
                        >
                        {editIcon}
                        </Button>
                    </InputGroup>   
                    <div className="shoppingList">
                        <ul>
                            {
                                item.map((listItem, index)=>{
                                    return <ListItem 
                                        key = {index}
                                        id = {index}
                                        title = {listItem}
                                        checkboxChecked = {deleteItem}
                                    />
                                })

                            }

                        </ul>

                    </div>

                </Form>

            </div>

        </div>
    )
}

export default ShoppingList;


function ListItem(props){

    // const [isChecked, setIsChecked] = useState(false)

    function handleCheckbox(e){
        const {id} = e.target
        // e.stopPropagation();
        // e.preventDefault();
        // setIsChecked(!isChecked)
        if(e.target.checked){
            setTimeout(()=>{
                
                props.checkboxChecked(id)
            }, 500)

        }

        // props.checkboxChecked(id)
    }

    return(
        <div>
            <input 
            type="checkbox" 
            id={props.id} 
            name={`${props.title}_${props.id}`} 
            value={`${props.title}_${props.id}`} 
            // defaultChecked ={isChecked}
            // checked={isChecked}
            onChange={handleCheckbox}
            />
            <label 
            //for={`${props.title}_${props.id}`}
            > 
            {props.title}
            </label>
        </div>
    )
}