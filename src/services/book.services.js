import {db} from "../firebase"

import { collection, getDocs,getDoc,addDoc, updateDoc,deleteDoc, doc, serverTimestamp,query,orderBy } from "firebase/firestore"
export const bookCollectionRef = collection(db,'new')
console.log("bookCollectionRef",bookCollectionRef);
class BookDataService {

    addBooks = (newBook)=>{
        return addDoc(bookCollectionRef, newBook)
    }

    updateBook = (id, updatedBook)=>{
        const bookDoc = doc(db, 'new',id)

        return updateDoc(bookDoc,updatedBook)
    }

    deleteBook = (id)=>{
        const bookDoc = doc(db, 'new', id)
        return deleteDoc(bookDoc)
    }

    getAllBooks = ()=>{
        return getDocs(bookCollectionRef)
    }

    getBook = (id)=>{
        const bookDoc = doc(db,'new',id)
        return getDoc(bookDoc)
    }
}

export default new BookDataService