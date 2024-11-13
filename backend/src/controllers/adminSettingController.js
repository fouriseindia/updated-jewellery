const bcrypt = require('bcryptjs');
const Admin = require('../models/adminCredentialsModel'); // Make sure the path is correct

// Change Password Function for Admins
exports.changePassword = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;
  try {
    // Find the Admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    // Compare current password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the Admin's password in the database
    admin.password = hashedPassword;
    await admin.save();  // Save the updated admin document

    res.json({ success: true, message: 'Password changed successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
