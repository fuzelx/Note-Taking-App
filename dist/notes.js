
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getDatabase, set, ref }  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
        import { getFirestore }  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
      
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
       
        
        
    firebase.initializeApp(firebaseConfig);
    const db = getFirestore();

    function saveNote() {
      var noteTitle = document.getElementById('noteTitle').value;
      var noteContent = document.getElementById('noteContent').value;
      
      db.collection('notes').add({
        title: noteTitle,
        content: noteContent,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function(docRef) {
        console.log('Note saved with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding note: ', error);
      });
    }

    function displayNotes() {
      db.collection('notes')
        .orderBy('timestamp', 'desc')
        .onSnapshot(function(querySnapshot) {
          var notesContainer = document.getElementById('notesContainer');
          notesContainer.innerHTML = '';

          querySnapshot.forEach(function(doc) {
            var noteData = doc.data();

            var card = document.createElement('div');
            card.className = 'note-card';

            var titleElement = document.createElement('h2');
            titleElement.textContent = noteData.title || 'Untitled';

            var contentElement = document.createElement('p');
            contentElement.textContent = noteData.content || 'No content';

            card.appendChild(titleElement);
            card.appendChild(contentElement);

            notesContainer.appendChild(card);
          });
        });
    }
    var addNoteBtn = document.getElementById('addNote');

   addNoteBtn.onclick = saveNote;
    displayNotes();