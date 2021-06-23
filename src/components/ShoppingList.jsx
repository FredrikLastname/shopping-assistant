import React from "react"
import {Spinner} from "react-bootstrap";
import { fireDatabase } from "../firebase/init"
import auth from "../firebase/auth"
import {Button, InputGroup, Form, FormControl} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const editIcon = <FontAwesomeIcon icon={faEdit} />

class ShoppingList extends React.Component {
    
    constructor(props){
        super(props)

        this.state ={
            loading: true,
            uid: "",
            tempItem:"",
            items: []
        }

        this.deleteItem = this.deleteItem.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.onButtonClicked = this.onButtonClicked.bind(this)
        this.getShoppingList = this.getShoppingList.bind(this)
        this.getUserID = this.getUserID.bind(this)
        this.saveShoppingList = this.saveShoppingList.bind(this)

    }

    componentDidMount(){

        this.getUserID()
        .then(()=>{
            this.getShoppingList()
        });
    }

    async getUserID(){
        
        const value = auth.getUid()
        this.setState({uid: value})
        // return
        
    }

    getShoppingList(){
        
        const tempArray =[];
        const uid = this.state.uid

        // console.log("Hejsan! ",uid);
        // console.log("fr shoppingList/getShoppingList 1");
        const fetchedList = fireDatabase.collection("lists").doc(uid)

        fetchedList.get()
        .then(doc =>{
            
            if(!doc.exists){
                //console.log("Inköpslista ej tillgänglig");
                this.setState(()=>({loading:false}))
            }else{
                //console.log("Inköpslista tillgänglig");
            }
            
            doc.data().shoppingList.forEach(item=>{
                tempArray.push(item)
            })
            
            this.setState(()=>({items: [...tempArray], loading:false}))

            // console.log("fr shoppingList/getShoppingList 2");

            
        }).catch(err =>{
            console.log(err);
        })
    }

    async saveShoppingList(newList){
        console.log("fr shoppingList/saveShoppingList");
        const uid = auth.getUid()
        // console.log(newList);
        const fetchedList = fireDatabase.collection("lists").doc(uid)
        await fetchedList.set({shoppingList: newList}).then(()=>{this.getShoppingList()})
    }

    onInputChange(event){
        const {value} = event.target;
        this.setState(()=>({tempItem:value}))
    }

    onButtonClicked(){
        // const temp = this.state.tempItem
        const tempArray =[...this.state.items, this.state.tempItem]

        this.setState(prevState=>{
            return {
                items: tempArray, 
                tempItem: ""
            }
        })

        this.saveShoppingList(tempArray)
    }

    deleteItem(clickedItemId){
        // console.log("fr shoppingList/deleteItem - ", clickedItemId, " blev klickad");
        const tempArray = [];
        const id = Number.parseInt(clickedItemId)
        //const tempUid = auth.getUid()

        this.state.items.forEach((thing, index)=>{
            if(index !== id){
                tempArray.push(thing)
            }
        })

        this.saveShoppingList(tempArray).then(()=>{
            
            this.uncheckCheckBoxes();
        })
        // this.getShoppingList(tempUid)
    }

    uncheckCheckBoxes(){

        console.log("fr shoppingList/uncheckCheckBoxes");
        const inputs = document.querySelectorAll("input[type='checkbox']");

        inputs.forEach(input =>{
            input.checked =false;
        })
    }

    render(){
        return(
            
            <div className="post">
                <div className="post-content">
                    <p className="title">Inköpslista</p>
                    {(this.state.items.length ===0 && this.state.loading === false) && <p className="hemText-content">
                    En behändig liten inköpslista så du kommer ihåg vad du tänkte köpa med dig hem från affären!
                    </p>}
                    <Form>
    
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Lägg till en vara"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={this.onInputChange}
                            value={this.state.tempItem}
                            />
                            <Button
                            disabled = {!this.state.tempItem} 
                            variant="outline-success" 
                            id="button-addon2"
                            onClick={this.onButtonClicked}
                            >
                            {editIcon}
                            </Button>
                        </InputGroup> 

                        {this.state.loading && 
                        <div className="spinner">
                            <Spinner 
                            animation ="border" 
                            variant ="primary"
                            className="spinner" 
                            />
                        </div>
                        }

                        <div className="shoppingList">
                            <ul>
                                {
                                    this.state.items.map((listItem, index)=>{
                                        return <ListItem 
                                            key = {index}
                                            id = {index}
                                            title = {listItem}
                                            checkboxChecked = {this.deleteItem}
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

}

export default ShoppingList;


function ListItem(props){

    function handleCheckbox(e){
        const {id} = e.target
        if(e.target.checked){
            setTimeout(()=>{
                props.checkboxChecked(id)
            }, 500)
        }
    }

    return(
        <div>
            <input 
            type="checkbox" 
            id={props.id} 
            name={`${props.title}_${props.id}`} 
            value={`${props.title}_${props.id}`} 
            onChange={handleCheckbox}
            />
            <label 
            > 
            {props.title}
            </label>
        </div>
    )
}