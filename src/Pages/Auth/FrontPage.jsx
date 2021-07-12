import React, {useState} from "react"

import CookieConsent from "react-cookie-consent";

import HeaderFrontPage from "../../components/Header/HeaderFrontPage";
import Register from "./Register"
import SignIn from "./SignIn"
import PopUp from "../../components/PopUp"

const FrontPage = () =>{
    
    const [isLoginPage, setIsLoginPage] = useState(true)

    const switchPage = () =>{
        setIsLoginPage(!isLoginPage)
    }

    return(
        <>
            <PopUp
            title = {<div>Innan vi börjar...</div>} 
            message = {<div><p>Tanken med programmet är att användare ska kunna lämna tips om rabatterade priser och/eller erbjudanden till andra användare. Och att användaren sedan enkelt ska kunna ta del av tips som andra lämnat. En inköpslista får man också med!</p>
            <p>Programmet är under utveckling och data som sparats kan komma att försvinna under arbetets gång.</p>
            <p>De främsta 'byggstenarna' i projektet bör väl anses vara React, React-bootstrap och Firebase. Material UI har på senare tid börjat smyga sig in...</p>
            <p>Senast uppdaterad 6 juli 2021. </p>
            <br/><p>/Fredrik</p></div>}
          />

            <HeaderFrontPage />
            
            <div className="wrapper__content">
                <div className="post post-white post-content">
                    
                    {isLoginPage ? 
                    <SignIn 
                        // signInUser = {signInUser}
                        switchPage ={switchPage}
                    /> : 
                    <Register 
                        // regNewUser = {registerUser}
                        switchPage ={switchPage}
                    />}
                    
                    <CookieConsent
                            location="bottom"
                            enableDeclineButton
                            flipButtons
                            buttonText="Ok!"
                            declineButtonText ="Inga kakor..."
                            cookieName="shoppingAssistantConsentCookie"
                            style={{ background: "#2B373B" }}
                            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                            expires={4}
                    >
                    Den lilla shoppingassistenten använder ett par små cookies för att göra livet lite enklare för användaren. Ok?
                    </CookieConsent>
                </div>
            </div>
        </>
    )
}

export default FrontPage