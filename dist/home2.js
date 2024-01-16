

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getDatabase, ref, get, child, onChildAdded, push, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

        const firebaseConfig = {
            apiKey: "AIzaSyDfCQQgNYDMEdZGvnR0Udr4LPF42IJc16g",
            authDomain: "notes-app-b6d5d.firebaseapp.com",
            databaseURL: "https://notes-app-b6d5d-default-rtdb.firebaseio.com",
            projectId: "notes-app-b6d5d",
            storageBucket: "notes-app-b6d5d.appspot.com",
            messagingSenderId: "288599577112",
            appId: "1:288599577112:web:b86d96f5f30dd5c132e96d",
            measurementId: "G-2S09PHH330"
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

