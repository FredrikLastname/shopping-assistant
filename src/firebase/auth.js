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
            this.userID = cred.user.uid;

            if(acceptsCookies){
                setCookie(cred.user.uid)
            }
        })
        .then(()=>{
            this.authenticated = true;
        }).catch(error=>{
            console.log(error);
        })

    }

    login = async (email, password, acceptsCookies)=>{
        return fireAuth.signInWithEmailAndPassword(email, password)
        .then(cred =>{
            this.userID = cred.user.uid;
            
            if(acceptsCookies){
                setCookie(cred.user.uid)
            }

        }).then(()=>{
            this.authenticated = true;
            
        }).catch(error =>{
            console.log(error.code, " ", error.message)
            return error.message
        })
    }

    logout = async () =>{
        return fireAuth.signOut() //return är viktig!
        .then(()=>{
            removeCookie()
            this.authenticated = false;
            this.userID = null;
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
        return this.userID;
    }
}

export default new Auth();