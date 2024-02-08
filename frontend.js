// Remove all functions related to DOM manipulation

// New function to handle book upload
function togglePasswordSection() {
    const passwordSection = document.getElementById('passwordSection');
    passwordSection.style.display = passwordSection.style.display === 'none' ? 'block' : 'none';
}

function checkPassword() {
    const password = document.getElementById('password').value;
    // You should replace 'YOUR_PASSWORD' with the actual password stored in your system
    if (password === 'braben') {
        const passwordSection = document.getElementById('passwordSection');
        passwordSection.style.display = 'none';

        const addBookSection = document.getElementById('addBookSection');
        addBookSection.style.display = 'block';
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function cancelAddBook() {
    const addBookSection = document.getElementById('addBookSection');
    addBookSection.style.display = 'none';

    const passwordSection = document.getElementById('passwordSection');
    passwordSection.style.display = 'block';
}

function displayBook(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `
        <div class="description">
            <h3>${book.title}</h3>
            <p>${book.description}</p>
            <a href="${book.downloadLink}" class="download-button" download>Download</a>
        </div>
        <img src="${book.imageUrl}" alt="${book.title}">
    `;
    document.getElementById('bookList').appendChild(bookElement);
}

const fetchAndDisplayBooks = async () => {
    try {
        const response = await fetch('https://gleaming-cuchufli-b12691.netlify.app/.netlify/functions/script');

        if (response.ok) {
            const books = await response.json();
            const bookList = document.getElementById('bookItems');

            // Clear existing list items
            bookList.innerHTML = '';

            // Check if books is an array before iterating
            if (Array.isArray(books)) {
                // Populate the list with fetched books
                books.forEach(book => {
                    const listItem = document.createElement('li');
                    listItem.textContent = book.title; // Display book title, you can modify to display other details
                    bookList.appendChild(listItem);
                });
            } else {
                console.error('Received invalid data format: expected an array');
            }
        } else {
            console.error('Failed to fetch books:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching books:', error);
    }
};

// Call the fetchAndDisplayBooks function to load books when the page loads
window.addEventListener('load', fetchAndDisplayBooks);
