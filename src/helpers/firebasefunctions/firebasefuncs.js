import { app } from "../../utlis/firebase";
import {
  doc,
  setDoc,
  getFirestore,
  addDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  query,
  where,
  updateDoc as firestoreUpdateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);

// Add document
export const addnewdocumenttofiretore = async (
  collectionname = "users",
  body = {},
  id = null || ""
) => {
  try {
    if (id === null) {
      const docRef = collection(db, collectionname);
      const data = await addDoc(docRef, body);
      return data;
    } else {
      const docRef = doc(db, collectionname, id);
      const data = await setDoc(docRef, body);
      return data;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

// Delete document
export const deletdoc = async (collectionname, id) => {
  try {
    const docRef = doc(db, collectionname, id);
    const data = await deleteDoc(docRef); // This seems to be missing, you might need to implement it.
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// Update document
export const updatedoc = async (collectionname, id, body) => {
  try {
    const docRef = doc(db, collectionname, id);
    const data = await firestoreUpdateDoc(docRef, body);
    return data;
  } catch (e) {
    console.log("Err updating", e);
    return false;
  }
};

// Get single document
export const getsingledoc = async (collectionname, id) => {
  try {
    const docRef = doc(db, collectionname, id);
    const data = await getDoc(docRef);
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// Get group of docs
// You can implement this function if needed
// Get all documents in a collection
export const getAllDocs = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
};

// Get documents in a collection based on a specific user ID
export const getDocsByUserId = async (collectionName, userId) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, collectionName), where("userid", "==", userId))
    );
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error getting documents by user ID: ", error);
    return [];
  }
};

//notifications
// Get documents in a collection based on a specific user ID
export const getNotificationsByUserId = async (userId) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "notifications"), where("to", "==", userId))
    );
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error getting notifications by user ID: ", error);
    return [];
  }
};

// Upload image to storage
export const uploadImage = async (folder, imageFile) => {
  try {
    let filename = "";
    if (imageFile?.fileName) {
      filename = removeSlashes(imageFile?.fileName);
    }
    const timeModified = removeSlashes(new Date().toLocaleString());
    const storageRef = ref(storage, `${folder}/${filename}${timeModified}`);
    const img = await fetch(imageFile?.uri);
    const bytes = await img.blob();
    const snapshot = await uploadBytes(storageRef, bytes);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return {
      status: true,
      message: "uploaded",
      url: downloadURL,
      name: filename,
    };
  } catch (e) {
    console.log("i am error", e);
    return {
      status: false,
      message: "failed to upload",
      url: "",
      name: "",
    };
  }
};

function removeSlashes(inputString) {
  return inputString?.replace(/[\/\\]/g, "");
}
