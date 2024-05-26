const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
    return Blog.find({ author: { $exists: false } }).exec()
  })
  .then(docs => {
    docs.forEach(doc => {
      Blog.deleteOne({ _id: doc._id })
        .then(() => {
          console.log('Document deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting document:', error);
        });
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Define the schema
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

// Define the model using the 'test' database
const Blog = mongoose.model('bloglists', blogSchema);
