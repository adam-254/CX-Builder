# Firebase Setup Guide

## Firestore Database Setup

### Required Indexes

For optimal performance, you should create the following composite indexes in your Firestore database:

#### 1. Documents Collection Index
- **Collection ID**: `documents`
- **Fields to index**:
  - `userId` (Ascending)
  - `updatedAt` (Descending)

#### 2. Documents by Type Index
- **Collection ID**: `documents`
- **Fields to index**:
  - `userId` (Ascending)
  - `type` (Ascending)
  - `updatedAt` (Descending)

### How to Create Indexes

1. **Automatic Creation (Recommended)**:
   - When you first use the app and get the index error, Firebase will provide a direct link
   - Click the link in the browser console error message
   - This will take you directly to the Firebase Console with the index pre-configured
   - Click "Create Index"

2. **Manual Creation**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project (`jobs-portal-95d84`)
   - Navigate to Firestore Database → Indexes
   - Click "Create Index"
   - Add the fields as specified above

### Firestore Security Rules

Make sure your Firestore security rules allow authenticated users to read/write their own documents:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own documents
    match /documents/{documentId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### Environment Variables

Ensure your `.env` file contains all required Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Authentication Setup

### Enable Authentication Methods

1. Go to Firebase Console → Authentication → Sign-in method
2. Enable the following providers:
   - **Email/Password**: For traditional sign-up/sign-in
   - **Google**: For Google OAuth sign-in

### Google OAuth Setup

1. In the Google provider settings, add your domain to authorized domains
2. For local development, `localhost` should already be included
3. For production, add your production domain

## Notes

- The app includes fallback logic that will work even without indexes (with client-side sorting)
- Indexes significantly improve query performance, especially with large datasets
- All authentication and database operations are handled securely through Firebase SDK