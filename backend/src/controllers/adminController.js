const bcrypt = require('bcryptjs');
const AdminCredentials = require('../models/adminCredentialsModel');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the admin by username only
        const admin = await AdminCredentials.findOne({ username });

        if (!admin) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (isPasswordValid) {
            res.status(200).send({ message: 'Login successful' });
        } else {
            res.status(401).send({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
};

const getAdminCredentials = async (req, res) => {
    try {
        const adminCredentials = await AdminCredentials.find({});
        res.status(200).json(adminCredentials);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { login, getAdminCredentials };
