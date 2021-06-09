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
            uid: null,
            tempItem:"",
            items: []
            //items: ["Bananer", "Ägg", "Yoghurt", "Jordgubbar"]
        }

        this.deleteItem = this.deleteItem.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.onButtonClicked = this.onButtonClicked.bind(this)
        this.getShoppingList = this.getShoppingList.bind(this)
        this.saveShoppingList = this.saveShoppingList.bind(this)

    }

    // const [tempItem, setTempItem] = useState("")
    // const [ item, setItem] = useState(["Bananer", "Ägg", "Yoghurt", "Jordgubbar"])

    componentDidMount(){
        
        const tempUid = auth.getUid()
        this.getShoppingList(tempUid);
    }

    getShoppingList(uid){
        const tempArray =[];
        // const uid = this.state.uid

        console.log(uid);


        const fetchedList = fireDatabase.collection("lists").doc(uid)

        fetchedList.get()
        .then(doc =>{
            doc.data().shoppingList.forEach(item=>{
                tempArray.push(item)
                
            })
            
            this.setState(()=>({items: [...tempArray], loading:false}))
            
        }).catch(err =>{
            console.log(err);
        })
    }

    saveShoppingList(newList){
        const uid = auth.getUid()

        console.log(newList);

        const fetchedList = fireDatabase.collection("lists").doc(uid)
        fetchedList.set({shoppingList: newList})
    }

    onInputChange(event){
        const {value} = event.target;
        
        this.setState(()=>({tempItem:value}))
        
        //setTempItem(() =>(value))
    }

    onButtonClicked(){
        const temp = this.state.tempItem
        const tempArray =[...this.state.items, this.state.tempItem]

        this.setState(prevState=>{
            return {items: tempArray, 
            tempItem: ""}

        })
        
        // console.log(tempArray);

        this.saveShoppingList(tempArray)
        

        // setItem(prevState =>([...prevState, this.state.tempItem]))
        //setTempItem(()=>"")
    }

    deleteItem(clickedItemId){
        console.log(clickedItemId, " blev klickad");
        const tempArray = [];
        const id = Number.parseInt(clickedItemId)
        const tempUid = auth.getUid()

        this.state.items.forEach((thing, index)=>{
            if(index !== id){
                tempArray.push(thing)
            }
        })

        this.saveShoppingList(tempArray)
        this.getShoppingList(tempUid)
        // this.setState(()=>{return {items: tempArray}})

        this.uncheckCheckBoxes();
    }

    uncheckCheckBoxes(){
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