import { db } from "@/app/utils/firebase"
import {collection, getDocs, addDoc, query, doc, deleteDoc, updateDoc} from "firebase/firestore";


function normalizeItemName(value = "") {
  return value
    .normalize("NFKC") // normalize Unicode variants
    .toLowerCase()
    .replace(/\p{Extended_Pictographic}/gu, "") // remove emojis
    .replace(/\s+/g, " ") // collapse repeated spaces
    .trim();
}

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
  const normalizedNewName = normalizeItemName(item?.name?? "");
  if (!normalizedNewName) throw new Error("Item name cannot be empty.");

  const newCategory = String(item?.category ?? "").trim().toLowerCase();
  const newQuantity = parseInt(item?.quantity) || 1;
  
  try{
    const existingItem = await getItems(userId);

    const duplicate = existingItem.find((existing) => {
      const existingName = normalizeItemName(existing?.name?? "");
      const existingCategory = String(existing?.category ?? "").trim().toLowerCase();
      return existingName === normalizedNewName && existingCategory === newCategory;
    });
    
    if (!duplicate) {
      const payload = {...item, quantity: newQuantity};
      const result = await addDoc(collection(db, "users", userId, "items"), payload);
      return {action: "created", id: result.id, item: payload,}; 
    }
    const mergedQuantity = (parseInt(duplicate.quantity) || 0) + newQuantity;

    await updateDoc(doc(db, "users", userId, "items", duplicate.id), {
      quantity: mergedQuantity,
    });

    return {
      action: "merged",
      id: duplicate.id,
      quantity: mergedQuantity,
    };
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