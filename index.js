const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// Middleware for handling multipart/form-data requests (file uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// POST endpoint
app.post('/bfhl', upload.single('file'), (req, res) => {
  const { data } = req.body;
  const { file } = req;

  // Process data array
  const numbers = [];
  const alphabets = [];
  let highestLowercase = '';
  for (const item of data) {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (item.toLowerCase() === item) {
      alphabets.push(item);
      highestLowercase = item > highestLowercase ? item : highestLowercase;
    }
  }

  // Generate user ID (replace with your logic for fullname and dob)
  const userId = "john_doe_17091999";

  // Handle file upload
  let fileValid = false;
  let fileMimeType = '';
  let fileSizeKb = 0;
  if (file) {
    fileValid = true;
    fileMimeType = file.mimetype;
    fileSizeKb = file.size / 1024;
  }

  const response = {
    is_success: true,
    user_id: userId,
    email: "john@xyz.com", // Hardcoded
    roll_number: "ABCD123", // Hardcoded
    numbers,
    alphabets,
    highest_lowercase_alphabet: [highestLowercase],
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb,
  };

  res.json(response);
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  const response = {
    operation_code: 1,
  };
  res.status(200).json(response);
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});