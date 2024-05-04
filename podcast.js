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

        const addPodcastSection = document.getElementById('addPodcastSection');
        addPodcastSection.style.display = 'block';
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function cancelAddPodcast() {
    const addPodcastSection = document.getElementById('addPodcastSection');
    addPodcastSection.style.display = 'none';

    const passwordSection = document.getElementById('passwordSection');
    passwordSection.style.display = 'block';
}

function displayPodcast(podcast) {
    const episodeContainer = document.createElement('div');
    episodeContainer.classList.add('episode');

    const linkElement = document.createElement('a');
    linkElement.href = podcast.downloadLink;
    linkElement.classList.add('episode-link'); // Add a class for styling purposes

    const plusIcon = document.createElement('i');
    plusIcon.classList.add('fa-solid', 'fa-plus');

    const titleSpan = document.createElement('span');
    titleSpan.textContent = podcast.title;

    // Append the plus icon and the title span inside the link
    linkElement.appendChild(plusIcon);
    linkElement.appendChild(titleSpan);

    // Append the link to the episode container
    episodeContainer.appendChild(linkElement);

    // Append the episode container to the podcast items list
    document.getElementById('podcastItems').appendChild(episodeContainer);
}








