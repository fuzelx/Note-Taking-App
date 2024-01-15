require('dotenv').config();

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getDatabase, ref, get, child, onChildAdded, push, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

        const firebaseConfig = {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID,
            measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);

        function saveNote() {
            var noteTitle = document.getElementById('noteTitle').value;
            var noteContent = document.getElementById('noteContent').value;

            // Get a reference to the "notes" node in the Realtime Database
            const notesRef = ref(db, 'notes');

            // Push a new note to the "notes" node in the Realtime Database
            push(notesRef, {
                title: noteTitle,
                content: noteContent,
                timestamp: new Date().toISOString()  // Use current timestamp
            })
                .then(function (newNoteRef) {
                    console.log('Note saved with ID: ', newNoteRef.key);
                })
                .catch(function (error) {
                    console.error('Error adding note: ', error);
                });
        }


        function deleteNote(noteId) {
            // Get a reference to the specific note in the Realtime Database
            const noteRef = ref(db, `notes/${noteId}`);

            // Remove the note from the database
            remove(noteRef)
                .then(function () {
                    console.log('Note deleted successfully');
                })
                .catch(function (error) {
                    console.error('Error deleting note: ', error);
                });
        }


        function displayNotes() {
            // Listen for child_added events in the "notes" node in the Realtime Database
            onChildAdded(ref(db, 'notes'), function (childSnapshot) {
                var noteData = childSnapshot.val();

                var noteId = childSnapshot.key;  // Retrieve the note's unique ID


                var notesContainer = document.getElementById('container');
                var card = document.createElement('div');
                card.classList.add('p-3', 'bg-sky-200', 'custom-shadow', 'rounded-md', 'm-3', 'w-full');

                var deleteButton = document.createElement('button');
                deleteButton.classList.add('rounded-3xl')
                deleteButton.textContent = '⛌';
                deleteButton.onclick = function () {
                    deleteNote(noteId);
                }

                var titleElement = document.createElement('h2');
                titleElement.classList.add('font-bold', 'text-left', 'text-sky-700', 'text-2xl');
                titleElement.textContent = noteData.title || 'Untitled';

                var contentElement = document.createElement('p');
                contentElement.classList.add('font-semibold', 'text-left', 'text-sky-600', 'text-xl');
                contentElement.textContent = noteData.content || 'No content';



                card.appendChild(deleteButton);
                card.appendChild(titleElement);
                card.appendChild(contentElement);
             

                notesContainer.appendChild(card);
            })
        }





        var addNoteBtn = document.getElementById('addNote');
        addNoteBtn.onclick = saveNote;
        displayNotes();

