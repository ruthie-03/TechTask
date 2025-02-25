// Function to fetch product data and display the "Bean of the Day"
async function fetchBeanOfTheDay() {
    try {
        // Fetch product data from the server API
        const response = await fetch('/api/products');

        // Check if the response was successful
        if (!response.ok) {
            throw new Error('Error fetching products'); // Handle errors if the server response is not "ok"
        }

        // Convert the response data from JSON format into a JavaScript object
        const products = await response.json();

        // Get today's date in "YYYY-MM-DD" format (e.g., "2025-01-10")
        const today = new Date().toISOString().split('T')[0];

        // Find a product that has today's date listed in its displayDates property
        const beanOfTheDay = products.find(product => product.displayDates.includes(today));

        // Get the HTML element where the product information will be displayed
        const productContainer = document.getElementById('product-list');
        
        // Clear any existing content in the product container
        productContainer.innerHTML = '';

        if (beanOfTheDay) {
            // Create a new div element to hold the product information
            const productDiv = document.createElement('div');
            productDiv.classList.add('product'); // Add a CSS class for styling

            // Create and display the product name
            const productName = document.createElement('h3');
            productName.textContent = beanOfTheDay.name;
            productDiv.appendChild(productName);

            // Create and display the product aroma
            const productAroma = document.createElement('p');
            productAroma.textContent = `Aroma: ${beanOfTheDay.aroma}`;
            productDiv.appendChild(productAroma);

            // Create and display the product color
            const productColor = document.createElement('p');
            productColor.textContent = `Colour: ${beanOfTheDay.colour}`;
            productDiv.appendChild(productColor);

            // Create and display the product price
            const productPrice = document.createElement('p');
            productPrice.textContent = `Price per 100g: £${beanOfTheDay.costPer100g.toFixed(2)}`;
            productDiv.appendChild(productPrice);

            // Create and display the roast level
            const productRoastLevel = document.createElement('p');
            productRoastLevel.textContent = `Roast Level: ${beanOfTheDay.roastLevel}`;
            productDiv.appendChild(productRoastLevel);

            // Create and display the product origin
            const productOrigin = document.createElement('p');
            productOrigin.textContent = `Origin: ${beanOfTheDay.origin}`;
            productDiv.appendChild(productOrigin);

            // If the product has certifications, create and display them as a list
            if (beanOfTheDay.certifications && beanOfTheDay.certifications.length > 0) {
                const productCertifications = document.createElement('p');
                productCertifications.textContent = `Certifications: ${beanOfTheDay.certifications.join(', ')}`;
                productDiv.appendChild(productCertifications);
            }

            // Display the product description if it exists (supports HTML content)
            if (beanOfTheDay.description) {
                const productDescription = document.createElement('p');
                productDescription.innerHTML = beanOfTheDay.description;
                productDiv.appendChild(productDescription);
            }

            // Add the product information div to the product container on the page
            productContainer.appendChild(productDiv);
        } else {
            // If no product matches today's date, display a message to the user
            productContainer.innerHTML = '<p>No Bean of the Day available for today.</p>';
        }
    } catch (error) {
        // If there's an error fetching the product data, log it to the console
        console.error('Error fetching product:', error);

        // Display an error message on the page if fetching product data fails
        document.getElementById('product-list').innerHTML = 
            'Sorry, we couldn\'t load the Bean of the Day..';
    }
}

// Automatically run the fetchBeanOfTheDay function when the page finishes loading
window.onload = fetchBeanOfTheDay;
