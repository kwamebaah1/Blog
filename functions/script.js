// Remove all functions related to DOM manipulation

// New function to handle book upload
const handleBookUpload = async (formData) => {
    try {
        const response = await fetch('https://gleaming-cuchufli-b12691.netlify.app/.netlify/functions/script', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const newBook = await response.json();
            console.log('Book uploaded successfully:', newBook);
        } else {
            console.error('Upload failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error uploading book:', error);
    }
};

// Define a new handler function for your serverless function
exports.handler = async (event) => {
    // Check if it's a POST request
    if (event.httpMethod === 'POST') {
        // Parse the incoming request body
        const formData = JSON.parse(event.body);
        
        // Pass the form data to the book upload handler function
        await handleBookUpload(formData);
        
        // Respond with a success message
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Book uploaded successfully' })
        };
    } else {
        // Respond with an error for other HTTP methods
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
};
