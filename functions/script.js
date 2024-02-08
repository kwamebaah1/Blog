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

// New function to handle book retrieval
const handleBookRetrieval = async () => {
    try {
        const response = await fetch('https://gleaming-cuchufli-b12691.netlify.app/.netlify/functions/getBooks', {
            method: 'GET'
        });

        if (response.ok) {
            const books = await response.json();
            console.log('Books retrieved successfully:', books);
            // Update the UI to display the retrieved books
        } else {
            console.error('Failed to retrieve books:', response.statusText);
        }
    } catch (error) {
        console.error('Error retrieving books:', error);
    }
};

// Define a new handler function for your serverless function
exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            // Parse the incoming request body if it's not empty
            const formData = event.body ? JSON.parse(event.body) : {};

            // Pass the form data to the book upload handler function
            await handleBookUpload(formData);
            
            // Respond with a success message
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Book uploaded successfully' })
            };
        } catch (error) {
            // Respond with an error if there's an issue parsing the request body
            console.error('Error parsing request body:', error);
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Bad Request' })
            };
        }
    } else if (event.httpMethod === 'GET') {
        // Handle GET requests for retrieving books
        await handleBookRetrieval();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Books retrieved successfully' })
        };
    } else {
        // Respond with an error for other HTTP methods
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
};
