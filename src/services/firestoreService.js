import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Save a resume or cover letter
export async function saveDocument(userId, documentData, type) {
  try {
    const docRef = await addDoc(collection(db, 'documents'), {
      ...documentData,
      userId,
      type, // 'resume' or 'cover-letter'
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving document:', error);
    throw error;
  }
}

// Update an existing document
export async function updateDocument(documentId, documentData) {
  try {
    const docRef = doc(db, 'documents', documentId);
    await updateDoc(docRef, {
      ...documentData,
      updatedAt: serverTimestamp()
    });
    return documentId;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

// Delete a document
export async function deleteDocument(documentId) {
  try {
    await deleteDoc(doc(db, 'documents', documentId));
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

// Get all documents for a user
export async function getUserDocuments(userId) {
  try {
    // First try with orderBy, if it fails due to missing index, fall back to simple query
    let q;
    try {
      q = query(
        collection(db, 'documents'),
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return documents;
    } catch (indexError) {
      // If index is missing, fall back to simple query and sort client-side
      console.warn('Firestore index missing, falling back to client-side sorting');
      q = query(
        collection(db, 'documents'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Sort client-side by updatedAt
      return documents.sort((a, b) => {
        const aTime = a.updatedAt?.toDate?.() || a.updatedAt || 0;
        const bTime = b.updatedAt?.toDate?.() || b.updatedAt || 0;
        return new Date(bTime) - new Date(aTime);
      });
    }
  } catch (error) {
    console.error('Error getting user documents:', error);
    throw error;
  }
}

// Get documents by type for a user
export async function getUserDocumentsByType(userId, type) {
  try {
    // First try with orderBy, if it fails due to missing index, fall back to simple query
    let q;
    try {
      q = query(
        collection(db, 'documents'),
        where('userId', '==', userId),
        where('type', '==', type),
        orderBy('updatedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return documents;
    } catch (indexError) {
      // If index is missing, fall back to simple query and sort client-side
      console.warn('Firestore index missing, falling back to client-side sorting');
      q = query(
        collection(db, 'documents'),
        where('userId', '==', userId),
        where('type', '==', type)
      );
      const querySnapshot = await getDocs(q);
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Sort client-side by updatedAt
      return documents.sort((a, b) => {
        const aTime = a.updatedAt?.toDate?.() || a.updatedAt || 0;
        const bTime = b.updatedAt?.toDate?.() || b.updatedAt || 0;
        return new Date(bTime) - new Date(aTime);
      });
    }
  } catch (error) {
    console.error('Error getting user documents by type:', error);
    throw error;
  }
}

// Get a specific document
export async function getDocument(documentId) {
  try {
    const docRef = doc(db, 'documents', documentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
}