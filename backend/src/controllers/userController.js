const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "Successfully registered" });
  } catch (error) {
    res.status(500).json({ message: "Email id already Exists", error });
  }
};

exports.login = async (req, res) => {    
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({ userId: user._id, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};


  exports.users= async (req,res)=>{
    try {
      const email = req.body.email;
      // Find the user by email
      const user = await User.findOne({ email: email });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
    
  }

  exports.getUsers= async (req,res)=>{
    const users= await User.find({});
    console.log(users)
    res.status(201).json(users)
  }
  
  // Update user details by ID
exports.updateUserById = async (req, res) => {
  const { id } = req.params; // Extract ID from the request parameters
  const updatedData = req.body; // Extract updated data from the request body

  try {
      // Update the user document by ID
      const user = await User.findByIdAndUpdate(id, updatedData, {
          new: true, // Return the updated document
          runValidators: true // Validate data against the schema
      });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ 
          message: 'User updated successfully', 
          user 
      });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ 
          message: 'An error occurred while updating the user', 
          error: error.message 
      });
  }
};

exports.updatePassword = async (req, res) => {
  console.log(req.body)
  const { phone } = req.params; // Fetch phone from URL params
  const { newPassword } = req.body; // Fetch new password from request body

  try {
    // Find user by phone number
    const user = await User.findOne({ mobile: phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get a single user by ID
exports.getSingleUser = async (req, res) => {
  try {
      const userId = req.params.id; // assuming the user ID is passed in the URL
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};


