import { fireDatabase} from "../firebase/init"

//Bör implementeras som en molnfunktion

function removePost(id){

    //
    // fireDatabase.collection("tips").doc(id).delete().then(()=>{
    //     console.log(id, " borttaget från databasen");
    // }).catch((err)=>{
    //     console.log(id, " gick inte att uppdatera i databasen", err);
    // })

    //console.log(id, " har gått ut");

    fireDatabase.collection("tips").doc(id).update({
        status: "expired"
    }).then(()=>{
        console.log(id, " uppdaterades i databasen");
    }).catch((err)=>{
        console.log(id, " gick inte att uppdatera i databasen", err);
    })
}


export {removePost}


/** 
 * fireDatabase.collection("tips").doc(id).delete()
        .then(()=>{
            console.log("dokumentet borttaget");
        }).catch(error =>{
            console.log("Error removing document: ", error);
        })
*/