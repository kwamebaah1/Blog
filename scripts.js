document.addEventListener('DOMContentLoaded', function() {
    const paragraphs = document.querySelectorAll('#dropdown-content p');
  
    paragraphs.forEach(paragraph => {
      paragraph.addEventListener('click', function() {
        const message = paragraph.getAttribute('data-message');
        toggleDropdownMessage(message, paragraph);
      });
    });
  
    function toggleDropdownMessage(message, paragraph) {
      const existingMessage = paragraph.nextElementSibling;
  
      if (existingMessage && existingMessage.classList.contains('message-container')) {
        // If the message is already displayed, remove it
        existingMessage.parentElement.removeChild(existingMessage);
        paragraph.classList.remove('clicked');
      } else {
        // Otherwise, show the message
        const messageElement = document.createElement('p');
        messageElement.classList.add('message-container');
        messageElement.textContent = message;
  
        // Insert the message element right after the clicked paragraph
        paragraph.insertAdjacentElement('afterend', messageElement);
        paragraph.classList.add('clicked');
      }
    }
  });
  