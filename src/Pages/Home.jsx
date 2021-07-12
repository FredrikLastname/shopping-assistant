//Sida som är tänkt att utgöra ramen för innehållet
import React from "react"
import ShoppingList from "../components/ShoppingList"
import HemText from "../components/HemText"
import HeaderTwo from "../components/Header/HeaderTwo"
import { getName } from "../scripts/getName"

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

        getName().then(res =>{
            // console.log("res: ", res);
            this.setState(()=>({userName: res}))
        })
    }

    render(){
        
        return(
            <div>
                <HeaderTwo/>
                <div className ="wrapper__content_home">
                    <HemText name = {this.state.userName} />
                    <ShoppingList/>
                </div>   
            </div>
        )

    }


}
export default Home