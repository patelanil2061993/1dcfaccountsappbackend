const app = require('./app'); // Correctly import the Express app
const cors = require('cors'); // Import the cors middleware
const BASE_URL = process.env.BASE_URL

// Use the cors middleware with appropriate options
app.use(cors({
  origin: `${BASE_URL}`, // Allow requests from this origin (your frontend)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});