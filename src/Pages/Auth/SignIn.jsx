import React, {useState} from "react"
import { Redirect } from "react-router";

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

import CryptoJS from "crypto-js";
import { getCookieConsentValue } from "react-cookie-consent";
import AlertComp from "../../components/AlertComp";
import auth from "../../firebase/auth";

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

const SignIn = (props) =>{
    
    const classes = useStyles();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] =useState("")
    const[redirect, setRedirect] = useState(false)

    const buttonHandler =(e)=>{
        e.preventDefault()

        if(email && password){
            signInUser(email, password)
            .then(()=>{
                // clearFields()
            })
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

        if(name === "email"){
            setEmail(value)
        }

        if(name === "password"){
            setPassword(CryptoJS.SHA256(value).toString())
        }
    }

    const signInUser = async (email, password) =>{
        
        const acceptsCookies = getCookieConsentValue("shoppingAssistantConsentCookie")
        
        auth.login(email, password, acceptsCookies)
        .then((resp)=>{
          
          if(auth.getUid()){
            const temp = auth.getUid()
            letUserIn(temp)

          }else{
            console.log("inget UID");
          }

          if(resp){
                console.log("SignIn!! - ", resp);
                setErrorMessage(resp)
            }

        })
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
                        {errorMessage && <AlertComp 
                        variant ={"danger"}
                        alertHeading = "Error"
                        alertMessage = {errorMessage}
                        />}
                    </Grid>

                    <Grid item xs={12}>
                        <h4>Logga in</h4>
                    </Grid>
                
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="e-postadress"
                            name="email"
                            autoComplete="email"
                            value={email}
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
                    Logga in!
                </Button>
                
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link 
                            variant="body2"
                            onClick={linkHandler}
                        >
                            Har du inget konto? Registrera ett nytt konto!
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default SignIn