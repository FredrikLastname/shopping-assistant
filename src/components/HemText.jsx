import React from "react"

function HemText(props){
    return(
        <div className="hemText">
            <div className="hemText-content">
                
                <span>
                    Hej {props.name}!<br/>
                    Glöm inte att kolla om det kommit in några tips på erbjudanden som du kan vara intresserad av!
                </span>                    

            </div>
        </div>
    )
}

export default HemText;