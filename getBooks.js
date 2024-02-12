 // Import the functions you need from the SDKs you need
 const firebaseConfig = {
   apiKey: "AIzaSyD_4ID3gqnsuaXfZxlOVTYMeqTnea9j1zU",
   authDomain: "bookform-f06cd.firebaseapp.com",
   databaseURL: "https://bookform-f06cd-default-rtdb.firebaseio.com",
   projectId: "bookform-f06cd",
   storageBucket: "bookform-f06cd.appspot.com",
   messagingSenderId: "222833193309",
   appId: "1:222833193309:web:c3d8635444e35cc761b8b4",
   measurementId: "G-NZM0THPWLV"
 };

 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 import{getDatabase, ref, get, child} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

 const db = getDatabase();

 let bookItems = document.getElementById("bookItems");
 function getBooks(){
     const dbref = ref(db);

     get(child(dbref, 'BookForm')).then((books) => {
         books.forEach(std => {
             AddBookAsListItem(std);
         })
     })
 }

 function AddBookAsListItem(std){
     let key = std.key;
     let value = std.value;

     let bookTitle = document.createElement('li');
     let bookDescription = document.createElement('li');
     let bookImage = document.createElement('li');
     let bookFile = document.createElement('li');

     bookTitle.innerHTML = "Book Title:" + value.bookTitle;
     bookDescription = "Book Description:" + value.bookDescription;
     bookImage = "Book Image:" + value.bookImage;
     bookFile = "Book File:" + value.bookFile; 

     let ul = document.createElement('ul');
     ul.append(bookTitle, bookDescription, bookImage, bookFile);

     bookItems.append(ul);

 }

 window.addEventListener('load', getBooks);