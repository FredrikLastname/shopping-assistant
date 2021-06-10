import {fireAuth} from "./init"
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
        })
        .then(()=>{
            // console.log("signup 2");
            this.authenticated = true;
        }).catch(error=>{
            console.log(error);
        })

    }

    // login(email, password){
        
    //     this.authenticated = true;
        
    //     fireAuth.signInWithEmailAndPassword(email, password)
    //     .then(cred =>{
            
    //         if(cred.user.uid){
    //             this.userID = cred.user.uid;
                
    //             this.authenticated = true;
    //             console.log("1 - auth.login - Användare inloggad - ", this.userID)

    //         }else{
    //             console.log("bajs");
    //         }

    //     }).catch(error =>{
    //         console.log(error.code, " ", error.message)
    //     })
    // }


    login = async (email, password)=>{
        return fireAuth.signInWithEmailAndPassword(email, password)
        .then(cred =>{
            // console.log("login 1");
            this.userID = cred.user.uid;
        }).then(()=>{
            // console.log("login 2");
            this.authenticated = true;
        }).catch(error =>{
            console.log(error.code, " ", error.message)
        })
    }



    logout(){
        //this.authenticated = false;
        // console.log("Bye...")
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
        // console.log(this.userID);
        return this.userID;
    }
}

export default new Auth();