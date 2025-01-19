const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express()

app.use(express.json());

app.use(cors())

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('MongoDB connected');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  // Create and export the User model
  const userModel = mongoose.model('users', userSchema);

// Add the app.post method for handling POST requests
app.post("/users", async (req, res) => {
  try {
    const newUser = new userModel(req.body); // Create a new user object from request body
    const savedUser = await newUser.save(); // Save the new user to the database
    res.json({ message: "User created successfully!", user: savedUser }); // Respond with success message and created user data
  } catch (err) {
    console.error('Error creating user:', err);
    // Handle specific errors (e.g., validation errors, database errors)
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message }); // Validation error
    } else {
      res.status(500).json({ message: 'Server error' }); // Generic error
    }
  }
});  

app.get("/users",async (req,res)=>{
    try {
        const users = await userModel.find();  // Fetch all users from MongoDB
        res.json(users);  // Respond with JSON data
      } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error' });
      }
})

app.listen(8000,()=>{
    console.log("Server is up and running")
})