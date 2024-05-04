const firebaseConfig = {
    apiKey: "AIzaSyDjy3W4MsYLmnTqqUtT85HbPG4RikaTMUg",
    authDomain: "podcastform-bb3d1.firebaseapp.com",
    databaseURL: "https://podcastform-bb3d1-default-rtdb.firebaseio.com",
    projectId: "podcastform-bb3d1",
    storageBucket: "podcastform-bb3d1.appspot.com",
    messagingSenderId: "532922085796",
    appId: "1:532922085796:web:ef5a9f579130f1f8031131"
};

  firebase.initializeApp(firebaseConfig);

  var podcastFormDB = firebase.database().ref('podcastForm')

  document.getElementById('podcastUploadForm').addEventListener("submit", submitForm);

  function submitForm(e){
    e.preventDefault();

    var bookFile = getElementVal('bookFile')
    var bookTitle = getElementVal('bookTitle')

    saveMessages(bookFile, bookTitle);

    // enable alert
    document.querySelector('.alert').style.display = "block";

    // remove alert
    setTimeout(() =>{
        document.querySelector('.alert').style.display = "none";
    }, 3000);

    //reset form
    document.getElementById('podcastUploadForm').reset();
  }

  const saveMessages = (bookFile, bookTitle) => {
    var newPodcastForm = podcastFormDB.push();

    newPodcastForm.set({
        'Book File': bookFile,
        'Book Title': bookTitle,
    })
  }

  const getElementVal = (id) => {
    return document.getElementById(id).value;
  }

  function displayData() {
    podcastFormDB.on('value', function(snapshot) {
        // Clear previous data
        document.getElementById('podcastItems').innerHTML = '';

        // Convert snapshot to an array
        var podcastItems = [];
        snapshot.forEach(function(childSnapshot) {
            podcastItems.unshift(childSnapshot.val()); // Add items to the beginning of the array
        });

        // Iterate over the reversed array
        podcastItems.forEach(function(childData) {
            // Create a div for each podcast item
            var podcastItem = document.createElement('div');
            podcastItem.classList.add('episode', 'dynamic'); // Add 'dynamic' class for dynamically generated items

            // Create anchor element for the link
            var linkElement = document.createElement('a');
            linkElement.href = childData["Book File"]; // Use correct field name
            linkElement.classList.add('episode-link'); // Add class for styling

            // Create icon element
            var plusIcon = document.createElement('i');
            plusIcon.classList.add('fa-solid', 'fa-plus');

            // Create paragraph element for title
            var titleElement = document.createElement('p');
            titleElement.textContent = childData["Book Title"]; // Use correct field name

            // Append icon and title to the link
            linkElement.appendChild(plusIcon);
            linkElement.appendChild(titleElement);

            // Append the link to the podcast item
            podcastItem.appendChild(linkElement);

            // Append the podcast item to the podcastItems element
            document.getElementById('podcastItems').appendChild(podcastItem);
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    displayData();
});
