import { fireDatabase } from "./init";

class Database{

    verifyObject = async (collection, document)=>{
        const ref = fireDatabase.collection(collection).doc(document)

        return ref.get()
        .then(doc =>{
            return doc.exists
        })
    }

    storeObject = async (collection, document, item)=>{

        const { user_id, name, alias, email } = item

        return fireDatabase.collection(collection).doc(document).set({
            user_id,
            name,
            alias,
            email
        })

    }
}

export default new Database();