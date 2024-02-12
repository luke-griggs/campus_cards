import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Function to add a message to Firestore
export const addMessage = async (phoneNumber, messageContent) => {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      phoneNumber: phoneNumber,
      message: messageContent,
      paymentStatus: false, // Assume false initially
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error('Failed to add message');
  }
};
