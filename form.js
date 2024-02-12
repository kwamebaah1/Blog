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

  firebase.initializeApp(firebaseConfig);

  //reference database
  var bookformDB = firebase.database().ref("BookForm");

  document.getElementById('bookUploadForm').addEventListener("submit", submitForm);

  function submitForm(e){
    e.preventDefault();

    var bookFile = getElementVal('bookFile');
    var bookTitle = getElementVal('bookTitle');
    var bookDescription = getElementVal('bookDescription');

    savedMessages(bookFile, bookTitle, bookDescription);

    // enable alert
    document.querySelector('.alert').style.display = "block";

    // remove alert
    setTimeout(() =>{
        document.querySelector('.alert').style.display = "none";
    }, 3000);

    //reset form
    document.getElementById('bookUploadForm').reset();
  }

    const savedMessages = (bookFile, bookTitle, bookDescription) => {
        var newBookForm = bookformDB.push();

        newBookForm.set({
            bookFile : bookFile,
            bookTitle : bookTitle,
            bookDescription : bookDescription,
        })
    };

  const getElementVal = (id) => {
    return document.getElementById(id).value;
  }

  // Function to read data from Firebase and display it on the website
function displayData() {
  bookformDB.on('value', function(snapshot) {
      document.getElementById('bookItems').innerHTML = ''; // Clear previous data
      snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          var listItem = document.createElement('li');
          listItem.textContent = `${childData.bookTitle}: ${childData.bookDescription}`;
          document.getElementById('bookItems').appendChild(listItem);
      });
  });
}

// Call the displayData function to initially display data when the page loads
displayData();