// script.js
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

document.getElementById('bookUploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('book', document.getElementById('bookFile').files[0]);
    formData.append('title', document.getElementById('bookTitle').value);
    formData.append('description', document.getElementById('bookDescription').value);
    formData.append('image', document.getElementById('bookImage').files[0]);

    try {
        const response = await fetch('https://gleaming-cuchufli-b12691.netlify.app/.netlify/functions/script', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const newBook = await response.json();
            displayBook(newBook);
            cancelAddBook();
        } else {
            console.error('Upload failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error uploading book:', error);
    }
});

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

