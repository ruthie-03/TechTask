// Import required modules
const express = require('express'); // Import 'express' for handling HTTP requests and creating the server
const fs = require('fs'); // Import 'fs' (file system) to read and write files
const path = require('path'); // Import 'path' to manage file paths across different systems

// Create an express application
const app = express();

// Define the port number where the server will listen for requests
const PORT = 3000;

// Middleware to automatically parse incoming JSON data in requests
app.use(express.json()); // This will allow us to handle JSON data sent by users (like product details)

// Serve static files (like images, stylesheets, etc.) from the 'public' folder
app.use('/', express.static(path.join(__dirname, 'public'))); // Serve public files at the root path

// Serve static files from the 'admin' folder for admin-related requests
app.use('/admin', express.static(path.join(__dirname, 'admin'))); // Serve admin files under the '/admin' path

// Define the file path where product data is stored in JSON format
const dataFilePath = path.join(__dirname, 'data', 'data.json');
let products = []; // This array will hold all the products we get or add

// Check if the 'data.json' file exists and load the product data from it
if (fs.existsSync(dataFilePath)) { // If the file exists, we can read the data
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8'); // Read the file content as text
        products = JSON.parse(fileContent); // Parse the JSON string into a JavaScript object (array of products)
        console.log('Products loaded:', products); // Log the loaded products to the console
    } catch (error) {
        console.error('Error reading data.json:', error.message); // Log any error if reading the file fails
    }
} else {
    console.warn('data.json file not found. Starting with an empty product list.'); // If the file doesn't exist, start with an empty list
}

// Endpoint to get all products (this is an API route)
app.get('/api/products', (req, res) => {
    res.json(products); // Send the products array as a JSON response to the client
});

// Endpoint to add a new product (this is an API route)
app.post('/api/products', (req, res) => {
    // Get the new product data from the request body (this comes from the user)
    const { name, aroma, colour, costPer100g, description, roastLevel, origin, certifications, displayDates } = req.body;

    // Validate the required fields (make sure the data is valid)
    if (!name || !aroma || !colour || isNaN(costPer100g) || !/^\d+(\.\d{1,2})?$/.test(costPer100g)) { //'!/^\d+(\.\d{1,2})?$/' defines expectation of a number with 2 decimal places, as this is a currency value
        // If any of the required fields are missing or the price is invalid, return an error
        return res.status(400).json({ error: 'Invalid product data: Please check your inputs.' });
    }

    // Validate that displayDates is a valid array of dates
    const validatedDates = Array.isArray(displayDates) 
        ? displayDates.filter(date => !isNaN(new Date(date).getTime())) // Check if each date is valid
        : []; // If not, return an empty array

    // Create a new product object with the given data
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1, // Create a unique ID for the product (based on the current list of products)
        name,
        aroma,
        colour,
        costPer100g: parseFloat(costPer100g).toFixed(2), // Ensure the price is a number with two decimal places
        description: description || '', // If no description is provided, set it as an empty string
        roastLevel: roastLevel || '', // Same for roastLevel
        origin: origin || '', // Same for origin
        certifications: Array.isArray(certifications) ? certifications : [], // Ensure certifications is an array, even if empty
        displayDates: validatedDates // Use the validated dates (valid date strings)
    };

    products.push(newProduct); // Add the new product to the products array

    // Try saving the updated products list back to the 'data.json' file
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8'); // Save the products array as a formatted JSON string
        res.status(201).json(newProduct); // Return the newly added product as the response
    } catch (error) {
        console.error(`Error writing to data.json: ${error.message}`); // Log any error if saving the file fails
        res.status(500).json({ error: 'Error saving product data' }); // Return an error response if the save fails
    }
});

// Start the server and make it listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log a message to the console to confirm the server is running
});
