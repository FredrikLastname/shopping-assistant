import {fireAuth} from "./init"
import {setCookie, readCookie, removeCookie} from "../cookie/cookie"

class Auth{
    constructor(){
        this.authenticated = false;
        this.userID = "";
    }
    
    //-------------------------------------------------------------------

    signup = async (email, password, acceptsCookies) =>{
        return fireAuth.createUserWithEmailAndPassword(email, password)
        .then(cred =>{
            // console.log("signup 1");
            this.userID = cred.user.uid;

            if(acceptsCookies){
                setCookie(cred.user.uid)
            }
        })
        .then(()=>{
            // console.log("signup 2");
            this.authenticated = true;
        }).catch(error=>{
            console.log(error);
        })

    }

    login = async (email, password, acceptsCookies)=>{
        return fireAuth.signInWithEmailAndPassword(email, password)
        .then(cred =>{
            // console.log("login 1");
            this.userID = cred.user.uid;
            
            if(acceptsCookies){
                setCookie(cred.user.uid)
            }
        }).then(()=>{
            // console.log("login 2");
            this.authenticated = true;
        }).catch(error =>{
            console.log(error.code, " ", error.message)
        })
    }

    logout = async () =>{
        // console.log("auth/logout 1")
        return fireAuth.signOut() //return är viktig!
        .then(()=>{
            removeCookie()
            // console.log("auth/logout 2 - Kakan borttagen - ");
            this.authenticated = false;
            this.userID = null;
            // console.log("auth/logout 3 - Användare utloggad - ");
        })
    }

    //--------------------------------------------------

    checkAuth = async() =>{
        const cookie = readCookie()
        
        if(cookie) {
            this.userID = cookie
            this.authenticated = true
            console.log("kakan läst: ", cookie);
        }
    }

    isAuthenticated = () =>{
        return this.authenticated
    }

    getUid = () => {
        // console.log(this.userID);
        return this.userID;
    }
}

export default new Auth();