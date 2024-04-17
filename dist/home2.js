

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getDatabase,set, ref, get, child, onChildAdded, push, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
        import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
        import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

   
        
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
        const auth = getAuth(app);
        const db = getDatabase(app);
        const storage = getStorage(app);

        // function saveNote() {
        //     var noteTitle = document.getElementById('noteTitle').value;
        //     var noteContent = document.getElementById('noteContent').value;

        //     // Get a reference to the "notes" node in the Realtime Database
        //     const notesRef = ref(db, 'notes');

        //     // Push a new note to the "notes" node in the Realtime Database
        //     push(notesRef, {
        //         title: noteTitle,
        //         content: noteContent,
        //         timestamp: new Date().toISOString()  // Use current timestamp
        //     })
        //         .then(function (newNoteRef) {
        //             console.log('Note saved with ID: ', newNoteRef.key);
        //         })
        //         .catch(function (error) {
        //             console.error('Error adding note: ', error);
        //         });
        // }


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
        var addNoteBtn = document.getElementById('addNote');
addNoteBtn.onclick = function() {
  // Get the currently authenticated user before calling saveNote
  const user = auth.currentUser;

  if (user) {
    // User is authenticated, call saveNote with the 'auth' object
    saveNote(auth);
  } else {
    console.log('User not authenticated');
  }
};


          
        function saveNote(auth) {
let uploding = document.getElementById('uploading');
uploding.innerHTML = `<div class="flex fixed top-7 right-[45%] z-30 justify-center items-center rounded-lg p-3  bg-white border-black border-2">
<div>
  <img src="assets/ZNeT.gif" class="w-16 h-16" alt="">
</div>
<div class="text-xl text-black ml-2 ">Uploading..</div>
</div>`;

// Set a timeout to remove the div after 2 seconds
setTimeout(() => {
    uploding.innerHTML = '';
}, 4000);

          var noteTitle = document.getElementById('noteTitle').value;
          var noteContent = document.getElementById('noteContent').value;
          var imageInput = document.getElementById('imageInput');
          
        
          var imageFile = imageInput.files[0];
         
        
          // Get the currently authenticated user
          const user = auth.currentUser;
        
          if (user) {
            // Get a reference to the "notes" node in the Realtime Database
            const notesRef = ref(db, 'notes');
        
            // Generate a unique ID for the note
            const newNoteRef = push(notesRef);
        
            // Upload the image to Firebase Storage
            const imageRef = storageRef(storage, 'images/' + user.uid + '/' + newNoteRef.key);
           
            const uploadImage = uploadBytes(imageRef, imageFile);
           
            Promise.all([uploadImage])
              .then(() => {
                // Get the download URLs for the uploaded image and video
                const getImageURL = getDownloadURL(imageRef);
                
                return Promise.all([getImageURL]);
              })
              .then(([imageURL]) => {
                // Save the note data, including the image and video URLs, in the Realtime Database
                return set(newNoteRef, {
                  title: noteTitle,
                  content: noteContent,
                  timestamp: new Date().toISOString(),
                  userId: user.uid,
                  userName: auth.currentUser.displayName || 'Unknown User',
                  imageUrl: imageURL, // Store the image URL in the note
                  
                });
              })
              .then(() => {
                console.log('Note with image  saved successfully');
              })
              .catch((error) => {
                console.error('Error adding note with image : ', error);
              });
          } else {
            console.log('User not authenticated');
          }
          
        
        }
        

        let day1 = new Date().getDate();
        let month1 = new Date().getMonth() + 1;
        let year1 = new Date().getFullYear();
        

  let nav_user = document.getElementById('acc-user');

function displayNotes() {
    // Show the loader while notes are loading
    var loader = document.getElementById('loader');
    loader.style.display = 'block';

    // Listen for child_added events in the "notes" node in the Realtime Database
    onChildAdded(ref(db, 'notes'), function (childSnapshot) {
        var noteData = childSnapshot.val();
        var noteId = childSnapshot.key;  // Retrieve the note's unique ID

        var notesContainer = document.getElementById('container');
        var card = document.createElement('div');
        card.setAttribute("id", "")
        card.classList.add('p-3', 'bg-white', 'width-fit','h-fit', 'custom-shadow', 'rounded-md', 'm-3');

        var time = document.createElement('span');
        time.classList.add('text-xs', 'text-neutral-100', 'mt-5');
      let  created_date = noteData.timestamp;
       const dateCreated = new Date(created_date);
       let formattedDate = dateCreated.toLocaleDateString();
       let formattedTime = dateCreated.toLocaleTimeString();
       time.innerText = "Created at: " + formattedDate + " on " + formattedTime;

        var deleteButton = document.createElement('button');
        deleteButton.classList.add('rounded-3xl');
        deleteButton.textContent = '⛌';
        deleteButton.onclick = function () {
            deleteNote(noteId);
        };

        var titleElement = document.createElement('h2');
        titleElement.classList.add('font-extrabold','mt-3','bold','md:text-2xl',  'text-left', 'text-black', 'text-xl');
        titleElement.textContent = noteData.title || 'Untitled';

        var contentElement = document.createElement('p');
        contentElement.classList.add('font-semibold','mt-3', 'text-left', 'text-black', 'text-lg', 'md:text-xl');
        contentElement.textContent = noteData.content || 'No content';

        // Fetch the user's display name
        var userName = document.createElement('p');
        
        userName.classList.add('text-sm','mt-3','p-2','mb-3','border-b','border-neutral-300','font-semibold');
        getUserInfo(noteData.userId)
            .then(userInfo => {
              
                userName.innerText = userInfo.fullname;
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });

        card.appendChild(deleteButton);
        card.appendChild(userName);
       

        // Check if the note has an imageUrl
        if (noteData.imageUrl) {
            var imageElement = document.createElement('img');
            imageElement.src = noteData.imageUrl;
            imageElement.classList.add('max-w-full','rounded-md', 'my-3');
            imageElement.setAttribute('loading', 'lazy')
            card.appendChild(imageElement);
        }
        // Check if the note has a videoUrl

 

    // Check if the note has a fileUrl (generic file, could be image or video)
    if (noteData.fileUrl) {
      var fileElement = document.createElement('a');
      fileElement.href = noteData.fileUrl;
      fileElement.textContent = 'Download File';
      fileElement.classList.add('max-w-full', 'rounded-md', 'my-3', 'text-blue-500', 'hover:underline', 'cursor-pointer');
      card.appendChild(fileElement);
    }
 card.appendChild(titleElement);
        card.appendChild(contentElement);
        card.appendChild(time);
            
        notesContainer.insertBefore(card, notesContainer.firstChild);

        // Hide the loader after notes are loaded
        loader.style.display = 'none';
      
        
    });
}

// Function to fetch user information based on their user ID
function getUserInfo(userId) {
    return get(ref(db, `UserAuthList/${userId}`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                throw new Error('User information not found');
            }
        });
}

// Call the displayNotes function after the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayNotes();
});





