import React, {useState} from "react"
import { Redirect } from "react-router";

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AlertComp from "../../components/AlertComp";


import auth from "../../firebase/auth";
import database from "../../firebase/database";

import CryptoJS from "crypto-js";
import { getCookieConsentValue } from "react-cookie-consent";
import slugify from "slugify"

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

const Register = (props) =>{
    
    const classes = useStyles();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] =useState("")
    const[redirect, setRedirect] = useState(false)
    
    const buttonHandler =(e)=>{

      e.preventDefault()

      if(username && email && password){
        regNewUser(username, email, password)
      }else{
        console.log("SignIn - knapp klickad");
      }
    }

    const linkHandler=(e)=>{
      e.preventDefault()
      props.switchPage()
    }

    const onTextfieldInputChange =(e) =>{
        const {name, value} = e.target;
        setErrorMessage("")

        if(name === "username"){
            setUsername((prevState)=>{
                return {...prevState, [name]: value}
            })
        }

        if(name === "email"){
            setEmail((prevState)=>{
                return {...prevState, [name]: value}
            })
        }

        if(name === "password"){
            setPassword((prevState)=>{
                return {...prevState, [name]: CryptoJS.SHA256(value).toString()}
            })
        }
    }

    const regNewUser=(username, email, password)=>{
      
      var tempID = ""
      const acceptsCookies = getCookieConsentValue("shoppingAssistantConsentCookie");
      
      const slug = slugify(username.username, {
        replacement: "-",
        remove: /[$*_+~.()'"!\\:@]/g,
        lower: true
      })

      database.verifyObject("users", slug)
      .then(res=>{
        
        if(!res){

          console.log("anvädarnamn ledigt");
          //Registrera ny användare
          auth.signup(email.email, password.password, acceptsCookies)
          .then(() =>{
                     
            if(auth.getUid()){
              tempID = auth.getUid();
              // console.log("från Welcome/signup ", tempID);
            }else{
              console.log("inget UID");  
            }
          })
          .then(()=>{

            database.storeObject("users", slug, {
              user_id: tempID,
              name: username.username,
              alias: slug,
              email: email.email
            })

          })
          .then(()=>{
            console.log("Tycks ha gått bra");
            letUserIn(tempID);
          })
          .catch(error => {
            setErrorMessage(error.message)
          })

        }else{
          //console.log("anvädarnamn upptaget");
          setErrorMessage("anvädarnamn upptaget")
        }

      }).catch(err =>{
        setErrorMessage(err)
      });
    }

    const letUserIn = (uid) =>{
      sessionStorage.setItem("loggedInUser", JSON.stringify(uid))
      setRedirect(true)
    }

    return(
        <div>

          {redirect && <Redirect to="/home" />}            

          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
            
            <Grid item xs={12}>
                <h4>Registrera ett nytt konto</h4>
            </Grid>

            <Grid item xs={12}>
              {errorMessage && <AlertComp 
              variant ={"danger"}
              alertHeading = "Error"
              alertMessage = {errorMessage}
              />}
            </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Användarnamn"
                  autoFocus
                  onChange={onTextfieldInputChange}
                />
              </Grid>
            
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="e-postadress"
                  name="email"
                  autoComplete="email"
                  onChange={onTextfieldInputChange}
                />
              </Grid>
            
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Lösenord"
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={onTextfieldInputChange}
                />
              </Grid>
              
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={buttonHandler}
            >
              Sign Up!
            </Button>
            
            <Grid container justify="flex-end">
              <Grid item>
                <Link 
                  onClick={linkHandler}
                  // href="#" 
                  variant="body2"
                >
                  Har du redan ett konto? Logga in!
                </Link>
              </Grid>
            </Grid>

          </form>
          </div>
    )
}

export default Register