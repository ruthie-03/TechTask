// Attach a "submit" event listener to the form with ID 'product-form'
// This listener will handle the form submission
document.getElementById('product-form').addEventListener('submit', async (e) => {

    // Stop the form from automatically refreshing the page (default form behavior)
    e.preventDefault();

    // ---- Collecting user input from the form ----

    // Get the product name entered by the user (e.g., "Colombian Coffee")
    const name = document.getElementById('name').value;

    // Get the product aroma (e.g., "Rich, Earthy")
    const aroma = document.getElementById('aroma').value;

    // Get the product color (e.g., "Dark Brown")
    const colour = document.getElementById('colour').value;

    // Get the product price and convert it from text to a number (e.g., "9.99" becomes 9.99)
    const costPer100g = parseFloat(document.getElementById('costPer100g').value);

    // Get the product description (e.g., "Smooth and rich coffee from Colombia.")
    const description = document.getElementById('description').value;

    // Get the roast level of the product (optional input)
    const roastLevel = document.getElementById('roastLevel').value;

    // Get the origin of the product (e.g., "Colombia")
    const origin = document.getElementById('origin').value;

    // Get a list of certifications, separated by commas (e.g., "Organic, Fair Trade")
    // The result is an array: ["Organic", "Fair Trade"]
    const certifications = document.getElementById('certifications').value
        .split(',')
        .map(item => item.trim()); // Remove extra spaces around each certification

    // Get a list of display dates separated by commas (e.g., "2025-01-01,2025-01-10")
    const displayDates = document.getElementById('product-dates').value
        .split(',')
        .map(date => date.trim()); // Remove extra spaces around each date

    // ---- Creating a JSON-ready object ----

    // Generate a unique product ID using the current timestamp (number of milliseconds since 1970)
    const id = Date.now();

    // Bundle all form data into a JavaScript object, ready to be converted to JSON
    const newProduct = {
        id,            // Unique product ID
        name,          // Product name
        aroma,         // Product aroma
        colour,        // Product color
        costPer100g,   // Cost per 100 grams
        description,   // Description of the product
        roastLevel,    // Roast level of the product
        origin,        // Product's country or region of origin
        certifications, // List of certifications as an array
        displayDates,  // List of dates when the product should be displayed
    };

    // ---- Sending the JSON data to the server ----

    try {
        // Make a request to send the product data to the server
        const response = await fetch('/api/products', {
            method: 'POST', // Specify that we're using POST to submit data
            headers: { 'Content-Type': 'application/json' }, // Tell the server we're sending JSON
            body: JSON.stringify(newProduct) // Convert the product object to JSON text to send
        });

        // Example of the JSON being sent to the server:
        // {
        //   "id": 1673312412841,
        //   "name": "Colombian Coffee",
        //   "aroma": "Rich, Earthy",
        //   "colour": "Dark Brown",
        //   "costPer100g": 9.99,
        //   "description": "Smooth and rich coffee from Colombia.",
        //   "roastLevel": "Medium",
        //   "origin": "Colombia",
        //   "certifications": ["Organic", "Fair Trade"],
        //   "displayDates": ["2025-01-01", "2025-01-10"]
        // }

        // Check if the server accepted the product data
        if (response.ok) {
            alert('Product added successfully!'); // Let the user know it worked
            document.getElementById('product-form').reset(); // Clear the form for the next product entry
        } else {
            alert('Failed to add product.'); // Let the user know something went wrong
        }

    } catch (error) {
        // Handle any unexpected issues, such as network errors
        console.error('Error adding product:', error);
    }

    // ---- End of event listener function ----
});
