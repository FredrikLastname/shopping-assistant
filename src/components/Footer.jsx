import React from "react"

const year = new Date().getFullYear();

function Footer(){
    return(
        <footer>
            <p>ⓒ {year} Fredrik Wallin - <a href="https://www.waldrik.se/" target="_blank" rel="noreferrer">waldrik.se</a> </p>
        </footer>
    )
}

export default Footer;