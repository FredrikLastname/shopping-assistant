import React from "react";
import { Redirect } from "react-router";
import {Form, Button} from "react-bootstrap"
import CryptoJS from "crypto-js";
import slugify from "slugify"
import { fireDatabase } from "../firebase/init"
import auth from "../firebase/auth"
import AlertComp from "./AlertComp";
import PopUp from "./PopUp"
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

class Welcome extends React.Component{
    
  constructor(props){
    super(props)

    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.rensaAnv = this.rensaAnv.bind(this);
    this.alertSwitch = this.alertSwitch.bind(this);

    this.state={
      member: true,
      redirect: false,
      buttonActive: false,

      name: "",
      alias: "",
      email:"",
      password: "",
      passwordConf: "",

      alertNumber:0,
      alertMessage: "",

      pwOk: false,
      pwConfOk: false
    }
  }

  onInputChange(e){
    const {name, value} = e.target
    const regExpRegel = /(((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]))).{6,}/

    this.setState(prevState =>{
      if(name === "name"){
        return {...prevState, [name]: value}
      } else if(name === "email"){
        return {...prevState, [name]: value}
      } else if(name === "password") { 
        
        if(regExpRegel.test(value)){
          return {
            ...prevState,
            buttonActive: true, 
            [name]: CryptoJS.SHA256(value).toString()
          }
        }

      }else if(name === "passwordConf"){
        return {
          ...prevState,
          [name]: CryptoJS.SHA256(value).toString()
        }
      }
    })
  }


  rensaAnv(){
    
    //Tar bort data från this.state
    this.setState(()=>({
      name: "",
      alias: "",
      email:"",
      password: "",
      passwordConf: "",
      buttonActive: false
    }))
    
    //Rensar lösenordsfälten om man skrivit fel
    if(document.getElementById("pw")){
      document.getElementById("pw").value="";
    }
    if(document.getElementById("pwConf")){
      document.getElementById("pwConf").value="";
    }
  }


  //Undersök om den tar emot uid.
  letUserIn(uid){
    sessionStorage.setItem("loggedInUser", JSON.stringify(uid))
    this.setState(()=>({
      redirect: true
    }))
  }

  async verifyUser(){
    
    let acceptsCookies = getCookieConsentValue("shoppingAssistantConsentCookie")

    //Vid registrering av ny användare
    if(!this.state.member){

      const email = this.state.email.trim()
      const name = this.state.name;
      const password =this.state.password
      var tempID = ""
    
      const slug = slugify(this.state.name, {
        replacement: "-",
        remove: /[$*_+~.()'"!\\:@]/g,
        lower: true
      })

      // Kollar om db innehåller användarnamnets "slug" - Är användarnamnet upptaget?
      const ref = fireDatabase.collection("users").doc(slug)

      ref.get().then(doc =>{
        if(doc.exists){
          //Användarnamnet (slug) är upptaget
          this.setState(() =>({alertNumber:5}))
        }else{
          //Användarnamnet är ledigt -> Registrera ny användare
          //fireAuth.createUserWithEmailAndPassword(email, password)
          
          auth.signup(email, password, acceptsCookies)
          .then(() =>{
                     
            if(auth.getUid()){
              tempID = auth.getUid();
              // console.log("från Welcome/signup ", tempID);
            }else{
              console.log("inget UID");  
            }
          })
          .then(()=>{

            fireDatabase.collection("users").doc(slug).set({
              user_id: tempID,
              name: name,
              alias: slug,
              email: email
            })

          })
          .then(()=>{
            this.rensaAnv();
            this.letUserIn(tempID);
          })
          .catch(error => {
            console.log(error.message);
          })

        }
      })

    }else{

      //Inloggning av registrerad användare
      if(this.state.email && this.state.password){

        auth.login(this.state.email, this.state.password, acceptsCookies)
        .then(()=>{
          
          if(auth.getUid()){
            const temp = auth.getUid()
            // console.log("2- från Welcome ", temp);
            this.letUserIn(temp)

          }else{
            console.log("inget UID");
          }
        })
      }
    }
  }

  handleCheckbox(event){
    this.setState(()=>({
      member: !event.target.checked, 
      alertNumber: this.state.member ? 2 : 0
    }))
  }
  
  alertSwitch(alertNumber){
    switch (alertNumber) {
      case 0:
        return <AlertComp 
                variant ={"secondary"}
                alertHeading = "Hej!"
                alertMessage = "Logga in och se vad du tycker! :)"
                alertDetails = "Du kan prova att registrera en ny användare eller så använder du 'waldrik[at]test.ba' och 'abc123' för att logga in."
              />
        // break;
      case 1:
        return <AlertComp 
                variant ={"danger"}
                alertHeading = "Hoppsan..."
                alertMessage = "Nu blev det fel!"
                alertDetails = "Ditt lösenord måste bestå av minst 8 tecken. Stora och små bokstäver. Och siffror."
              />
        // break;
      case 2:
        return <AlertComp 
                variant ={"primary"}
                alertHeading = "Registrera ett konto"
                // alertMessage = "Registrera dig genom att ange ett användarnamn. Välj sedan ett lösenord och bekräfta ditt lösenord genom att upprepa det."
                alertDetails = "Ditt lösenord måste bestå av minst 8 tecken. Stora och små bokstäver. Och siffror."
              />
        // break;
      case 3:
        return <AlertComp 
                variant ={"danger"}
                alertHeading = "Hoppsan..."
                alertMessage = "Välj ett lösenord och bekräfta sedan ditt lösenord genom att upprepa det."
                alertDetails = "Ditt lösenord måste bestå av minst 8 tecken. Stora och små bokstäver. Och siffror."
              />
        // break;
      case 4:
        return <AlertComp 
                variant ={"danger"}
                alertHeading = "Hoppsan..."
                alertMessage = "Avändarnamnet kunde inte hittas"
                // alertDetails = "Du kanske"
              />
        // break;
      case 5:
        return <AlertComp 
                variant ={"danger"}
                alertHeading = "Hoppsan..."
                alertMessage = "Det valda användarnamnet är upptaget"
                // alertDetails = "Du kanske"
              />
        // break;
      case 6:
        return <AlertComp 
                variant ={"danger"}
                alertHeading = "Hoppsan..."
                alertMessage = "Det valda användarnamnet är upptaget"
                // alertDetails = "Du kanske"
              />
        // break;
      case 7:
        return <AlertComp 
                variant ={"danger"}
                alertHeading = "Hoppsan...!"
                alertMessage = {this.state.alertMessage}
              />
        // break;
    
      default:
        break;
    }
  }

  render(){
    return(
      
      <div className="post">
          <PopUp
            title = {<div>Innan vi börjar...</div>} 
            message = {<div><p>Tanken med programmet är att användare ska kunna lämna tips om rabatterade priser och/eller andra erbjudanden till andra användare. Och att användaren sedan enkelt ska kunna ta del av tips som andra lämnat.</p>
            <p>Programmet är under utveckling och data som sparats kan komma att försvinna under arbetets gång.</p>
            <p>De främsta 'byggstenarna' i projektet bör väl anses vara React, React-bootstrap och Firebase.</p>
            <p>Senast uppdaterad 26 juni 2021 med främst en del pyssel under ytan...</p>
            <br/><p>/Fredrik</p></div>}
          />
          
          {this.state.redirect && <Redirect to="/home" />}

          <div className="post-content">
          
            {this.alertSwitch(this.state.alertNumber)}
              
            <Form>
                {!this.state.member && 
                  <Form.Group 
                  >
                    <Form.Control
                      autoComplete="off"
                      name ="name"
                      type="text" 
                      placeholder="Användarnamn" 
                      value ={this.state.name}
                      onChange ={this.onInputChange}
                    />
                </Form.Group>
                }
                <Form.Group 
                >
                <Form.Control
                  autoComplete="off" 
                  name = "email"
                  type="email" 
                  placeholder="e-postadress"
                  value = {this.state.email}
                  onChange = {this.onInputChange} 

                />
                <Form.Text className="text-muted">
                  Den stannar mellan oss!
                </Form.Text>
                </Form.Group>

                <Form.Group 
                >
                    <Form.Control
                      autoComplete="off"
                      id="pw"
                      name="password" 
                      type="password" 
                      placeholder="Lösenord"
                      onChange ={this.onInputChange}
                    />
                    
                </Form.Group>
                
                {!this.state.member && 
                  <Form.Group 
                  >
                    <Form.Control
                      autoComplete="off"
                      id="pwConf"
                      name="passwordConf"
                      type="password" 
                      placeholder="Upprepa lösenordet"
                      onChange ={this.onInputChange}  
                    />
                  </Form.Group>
                }
                <Form.Row>
                  <p className="cb-text">Registrera nytt konto</p>
                  <Form.Group controlId="formBasicCheckbox">
                  <Form.Check onChange={this.handleCheckbox} type="checkbox"  
                  />
                  </Form.Group>

                </Form.Row>

                <SubmitButton 
                  isRegistered = {this.state.member}
                  verify = {this.verifyUser}
                  buttonActive = {this.state.buttonActive}                  
                />
            </Form>
            <CookieConsent
                    location="bottom"
                    enableDeclineButton
                    flipButtons
                    buttonText="Ok!"
                    declineButtonText ="Inga kakor..."
                    cookieName="shoppingAssistantConsentCookie"
                    style={{ background: "#2B373B" }}
                    buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                    expires={1}
            >
            Den lilla shoppingassistenten använder ett par små cookies för att göra livet lite enklare för användaren. Ok?
            </CookieConsent>
          </div>
      </div>
    )

  }  
}

function SubmitButton(props){

  function handleClick(){
    props.verify();
  }

  return (
      <Button
        disabled={!props.buttonActive}
        className="mx-auto" 
        variant="primary"
        onClick={handleClick}>
        { props.isRegistered ? "Logga in" : "Registrera" }
      </Button>
  )
}

export default Welcome;