import React from "react"

const year = new Date().getFullYear();

function Footer(){
    return(
        <footer>
            <p>ⓒ {year} Fredrik Wallin</p>
        </footer>
    )
}

export default Footer;