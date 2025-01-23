PROJECT:  All The Beans

Overview
This project is a simple web based coffee bean store page which advertises the 'Bean of the Day' to the public.  
There is an admin panel designed for updating new 'Bean of the Day' product listings.  This admin panel can be used 
by you to update the 'Bean of the Day' JSON directly - providing an efficient way for the bean seller to manage the 
'Bean of the Day' listings without needing to write directly in the JSON.
Creators note:  This was beyond my current knowledge and experience in coding, however it provided a really good
opportunity to stretch myself!  It is written in JavaScript as I have not yet studied C#.  I conducted a lot of research, 
using web based resources:  W3Schools, MDN Web Docs and Chat GPT.  
I used Chat GPT to create my own personal tutorial to put the project I envisioned for this task together.
A lot of reading, note taking and understanding new information took place as part of this project, which was great!

•	Admin Panel: Add 'Bean of the Day' adverts.
•	Customer Page: Displays information about the featured coffee bean of the day.

Features
•	View the featured bean of the day.
•	Manage coffee beans via an admin interface.
•	JSON-based storage for product data.

Technologies Used
•	Code Editor:  VSCode
•	Backend: Node.js, Express
•	Frontend: HTML, CSS, JavaScript
•	Data Storage: JSON file (data.json)
__________________
______________________
Setup Instructions

1. Prerequisites
•	Ensure you have Node.js and npm installed.
•	Download from https://nodejs.org.

2. Extract the Zip File
•	Extract the zip file you received via email.

3. Navigate to the Project Directory
•	Open a terminal or command prompt.
•	Use the cd command in terminal to navigate to the folder where the extracted files are located. For example:
    cd "path-to-extracted-folder/RuthEnglishTECHTASK"

4. Install Dependencies (Use code editor terminal to run the following command:)
npm install

5. Run the Server
Start the application by running the following command in the terminal:
node server.js
The server will start at http://localhost:3000.  This link can be followed directly from the terminal or copy and pasted into the browser.

Project Structure
coffee-bean-store/
│
├── admin/               # Admin panel files for managing 'Bean of the Day' listings
│   ├── index.html       # Admin page interface for product management
│   ├── script.js        # JavaScript logic for handling form submissions and updates
│   └── styles.css       # CSS styles for the admin page
│
├── data/                # Data storage directory
│   └── data.json        # JSON file storing product information for display
│
├── node_modules/        # Automatically generated folder containing project dependencies
│                         # Installed by npm, not manually edited or tracked in version control
│
├── public/              # Customer-facing web page files
│   ├── index.html       # Main webpage displaying the 'Bean of the Day'
│   ├── script.js        # JavaScript logic for fetching and displaying product data
│   └── styles.css       # CSS styles for the customer-facing page
│
├── .gitignore            # Specifies files and directories to be excluded from Git version control
│
├── package-lock.json     # Auto-generated file to lock specific dependency versions for consistency
│
├── package.json          # Defines project metadata, scripts, and dependency list
│
├── README.md             # Documentation for setting up and using the project
│
└── server.js             # Node.js and Express server handling API requests and serving web pages
      

Admin Panel Usage
1.	Navigate to the admin page at http://localhost:3000/admin.  This link can be followed directly from the terminal or copy and pasted into the browser.
2.	Add products by filling out the form.
3.  Review data.json to confirm the new product has been added.
________________________________________
Known Issues
•	Ensure the data/data.json file has correct read-write permissions.
•	On Windows systems, additional permissions may be required for JSON file updates.
________________________________________
Contact
For questions or support, contact:
[Ruth English]
•	Email: ruthenglish10@outlook.com
________________________________________


