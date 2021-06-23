import {fireAuth} from "./init"
import {setCookie, readCookie, removeCookie} from "../cookie/cookie"

class Auth{
    constructor(){
        this.authenticated = false;
        this.userID = "";
    }

    signup = async (email, password) =>{
        return fireAuth.createUserWithEmailAndPassword(email, password)
        .then(cred =>{
            // console.log("signup 1");
            this.userID = cred.user.uid;
            setCookie(cred.user.uid)
        })
        .then(()=>{
            // console.log("signup 2");
            this.authenticated = true;
        }).catch(error=>{
            console.log(error);
        })

    }

    login = async (email, password)=>{
        return fireAuth.signInWithEmailAndPassword(email, password)
        .then(cred =>{
            // console.log("login 1");
            this.userID = cred.user.uid;
            setCookie(cred.user.uid)
        }).then(()=>{
            // console.log("login 2");
            this.authenticated = true;
        }).catch(error =>{
            console.log(error.code, " ", error.message)
        })
    }

    logout(){
        // console.log("Bye...")
        fireAuth.signOut()
        .then(()=>{
            this.authenticated = false;
            this.userID = null;
            removeCookie()
            //console.log("Användare utloggad - ");
        })
    }

    isAuthenticated = async() =>{
        const cookie = readCookie()
        
        if(cookie) {
            console.log("kakan läst: ", cookie);
            this.uid = cookie
            this.authenticated = true
        }
        
        if(this.authenticated){
            return this.authenticated
        }
        // if()
    }

    // isAuthenticated(){
    //     // console.log(this.authenticated)
    //     return this.authenticated;
    // }

    getUid(){
        // console.log(this.userID);
        return this.userID;
    }
}

export default new Auth();