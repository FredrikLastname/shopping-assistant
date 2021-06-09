//Sida som är tänkt att utgöra ramen för innehållet
import React from "react"
import ShoppingList from "./ShoppingList"
import HemText from "./HemText"
import HeaderTwo from "./HeaderTwo"

import auth from "../firebase/auth"
import { fireDatabase } from "../firebase/init"


class Home extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            userName: ""
        }
    }
    
    componentDidMount(){
        this.getUserName()
    }

    getUserName(){
        
        const uid = auth.getUid();
        const ref = fireDatabase.collection("users").where("user_id", "==", uid)

        ref.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log("username -> ", doc.data().name);
            
            this.setState(()=>({userName: doc.data().name}))
        });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })

    }

    render(){
        
        return(
            <div>
                
                <HeaderTwo/>
                <div className ="wrapper__content_home">
                    <HemText name = {this.state.userName} />
                    <ShoppingList uid={auth.getUid()}/>
                </div>   
            </div>
        )

    }


}
export default Home