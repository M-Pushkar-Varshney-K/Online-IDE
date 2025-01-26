import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

// Enable CORS for all incoming requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Define the route for code execution
app.post('/execute', async (req, res) => {
  const { code, lang, ver } = req.body;

  try {
    // Send the request to JDoodle API
    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      "clientId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Use your actual clientId
      "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Use your actual clientSecret
      "script": code, // The code sent by the client
      "stdin": "", // Optional: If you want to send input, you can modify this
      "language": lang, // The language specified by the client (e.g., "python3", "cpp")
      "versionIndex": ver, // The version index specified by the client
      "compileOnly": false // Set to false to execute the code
    });

    // Send the JDoodle API response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error executing code:', error);
    res.status(500).json({ error: 'Failed to execute code' });
  }
});

// Set the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
