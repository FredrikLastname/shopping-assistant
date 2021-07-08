import auth from "../firebase/auth"
import { fireDatabase} from "../firebase/init"

const getName = async () => {
    const uid = auth.getUid()
    const ref = fireDatabase.collection("users").where("user_id", "==", uid)

    return ref.get()
    .then((querySnapshot) => {
        var temp =""
        querySnapshot.forEach((doc) => {
            temp = doc.data().name
        })
        return temp
    })
    .catch((error) => {
        return error
    })
}

export {getName}