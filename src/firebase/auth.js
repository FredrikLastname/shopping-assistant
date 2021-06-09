import {fireAuth} from "./init"
class Auth{
    constructor(){
        this.authenticated = false;
        this.userID = null;
    }

    async signup(){

    }

    async login(email, password){
        
        this.authenticated = true;
        
        fireAuth.signInWithEmailAndPassword(email, password)
        .then(cred =>{
            this.authenticated = true;
            this.userID = cred.user.uid;
            
            console.log("Användare inloggad - ", cred.user.uid)

        })
        .catch(error =>{
            console.log(error.code, " ", error.message)
        })
    }

    logout(){
        //this.authenticated = false;
        console.log("Bye...")
        fireAuth.signOut()
        .then(()=>{
            this.authenticated = false;
            this.userID = null;
            console.log("Användare utloggad - ");
        })

        // cb();
    }

    isAuthenticated(){
        console.log(this.authenticated)
        return this.authenticated;
    }

    getUid(){
        return this.userID;
    }
}

export default new Auth();