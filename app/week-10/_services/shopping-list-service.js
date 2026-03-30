import { db } from "@/app/utils/firebase"
import {collection, getDocs, addDoc, query, doc, deleteDoc} from "firebase/firestore";


/*
async getItems function retrieves all items for a specific user from Firestore. 
It takes a userId as a parameter, 
and uses it to query a subcollection named items under a document in the users collection with the same userId. 
It fetches the documents in the items subcollection, 
and for each document, it adds an object to the items array containing the document ID and data. 
It then returns this items array.
*/
export async function getItems(userId){
  if (!userId){
    return [];
  }

  try{
    const items = [];
    const itemsRef = collection(db, "users", userId, "items");
    const q = query(itemsRef);
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return items;
  } catch( error ){
    console.error("Error getting items.", error);
    return [];
  }
}

/*
async addItem function adds a new item to a specific user's list of items in Firestore. 
It takes a userId and an item as parameters. 
It uses the userId to reference the items subcollection of a document in the users collection, 
and then adds the item to this subcollection. It returns the id of the newly created document.
*/
export async function addItem(userId, item){
  if (!userId) throw new Error("Missing User ID.");
  try{
    const itemRef = collection(db, "users", userId, "items");
    const result = await addDoc(itemRef, item);
    return result.id;
  } catch (error) {
    console.error("Error adding item.", error);
    return null;
  }
}

// Week-10 Extra: Delete an item from the shopping list in Firestore

export async function deleteItem(userId, itemId){
  if (!userId) throw new Error("Missing User ID.");
  if (!itemId) throw new Error("Missing Item ID.");
  try{
    const itemRef = doc(db, "users", userId, "items", itemId);
    await deleteDoc(itemRef);
    return true;
  } catch (error) {
    console.error("Error deleting item.", error);
    return false;
  }
}