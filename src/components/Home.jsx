//Sida som är tänkt att utgöra ramen för innehållet
import React from "react"
import ShoppingList from "./ShoppingList"
function Home(){

    return(
        <div>
            <div className ="wrapper__content">
                
                <ShoppingList />
            </div>   
        </div>
    )

}
export default Home