const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./src/models/adminCredentialsModel'); // Ensure the path is correct

// MongoDB Atlas connection setup (replace with your credentials)
mongoose.connect('mongodb+srv://sudhirrpatil2001:milkoza123@cluster0.zbhrpsg.mongodb.net/Jwellery_project?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Function to encrypt the existing password
async function encryptExistingPassword(username) {
  try {
    // Fetch the admin record by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      console.log('Admin not found');
      return;
    }

    // Check if the password is already hashed (optional step)
    const isPasswordHashed = admin.password.startsWith('$2a$');
    if (isPasswordHashed) {
      console.log('Password is already hashed');
      return;
    }

    // Hash the plain-text password
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    // Update the admin record with the hashed password
    admin.password = hashedPassword;
    await admin.save();

    console.log('Password encrypted successfully!');
  } catch (error) {
    console.log('Error encrypting password:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Call the function to encrypt the password for a specific username
encryptExistingPassword('Shank@3268');
// JewellerShank@321