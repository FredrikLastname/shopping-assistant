//Sida som är tänkt att utgöra ramen för innehållet
import React from "react"
import ShoppingList from "./ShoppingList"
import HemText from "./HemText"
function Home(){

    return(
        <div>
            <div className ="wrapper__content_home">
                <HemText />
                <ShoppingList />
            </div>   
        </div>
    )

}
export default Home