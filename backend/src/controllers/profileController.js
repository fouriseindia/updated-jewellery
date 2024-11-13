const Profile = require('../models/profileModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new profile
exports.createProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, address, password } = req.body;

        if (!fullName || !email || !phoneNumber || !address || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new profile
        const newProfile = new Profile({
            fullName,
            email,
            phoneNumber,
            address, // Assuming address is a single string
            password: hashedPassword
        });

        await newProfile.save();
        res.status(201).json({ message: 'Profile created successfully!', profile: newProfile });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create profile', error: error.message });
    }
};

// Update profile
exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const { fullName, email, phoneNumber, address, occupation } = req.body;

    try {
        const updatedProfile = await Profile.findByIdAndUpdate(id, {
            fullName,
            email,
            phoneNumber,
            address, // Update with a single address object
            occupation
        }, { new: true });

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
//fetch all users
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find(); // Fetch all profiles from the database
        res.status(200).json({ customers: profiles }); // Return all profiles
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profiles' });
    }
};
// Get a profile
exports.getProfile = async (req, res) => {
    try {
        const profileId = req.params.id;
        const profile = await Profile.findById(profileId);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
    }
};
// Delete a user profile
exports.deleteProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProfile = await Profile.findByIdAndDelete(id);

        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete profile', error: error.message });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login attempt with email:', email);

        const profile = await Profile.findOne({ email });
        if (!profile) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, profile.password);
        if (!isPasswordValid) {
            console.log('Invalid credentials');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: profile._id, email: profile.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            profile: {
                _id: profile._id,
                fullName: profile.fullName,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
                address: profile.address,
            }
        });
    } catch (error) {
        console.error('Login error:', error); // Log the error
        res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
};


// Add Address controller
exports.addAddress = async (req, res) => {
    try {
        const profileId = req.params.id;
        const { street, city, state, zipCode, country } = req.body;

        const profile = await Profile.findById(profileId);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        // Set the address directly
        profile.address = { street, city, state, zipCode, country }; // Set the address as a single object

        await profile.save();
        res.status(200).json({ message: 'Address added successfully!', profile });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add address', error: error.message });
    }
};

// Update Address controller
exports.updateAddress = async (req, res) => {
    try {
        const profileId = req.params.id;
        const { street, city, state, zipCode, country } = req.body;

        const profile = await Profile.findById(profileId);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        // Update the address directly
        profile.address = { street, city, state, zipCode, country };

        await profile.save();
        res.status(200).json({ message: 'Address updated successfully!', profile });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update address', error: error.message });
    }
};

// Delete Address controller
exports.deleteAddress = async (req, res) => {
    try {
        const profileId = req.params.id;

        const profile = await Profile.findById(profileId);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        profile.address = null; // Clear the address

        await profile.save();
        res.status(200).json({ message: 'Address deleted successfully!', profile });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete address', error: error.message });
    }
};
