const mongoose = require('mongoose')
const {connect} = require("mongoose");
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log(url)

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('BlogList', blogSchema)


db.yourCollection.find({ URL: { $exists: false } }) // Find documents without the URL field
  .sort({ /* field to sort by */ }) // Sort the documents
  .forEach(function(doc) { // Iterate over each document
    db.yourCollection.deleteOne({ _id: doc._id }); // Delete the document
  });

//end of shenanigans

if(process.argv[5] === undefined || process.argv[5] === ""){
  console.log("blog posts")
  Blog.find({}).then( result => {
    result.forEach(blog => {
      console.log(blog.title)
      console.log(blog.author)
      console.log(blog.url)
      console.log(blog.likes)
    })
    mongoose.connection.close()
    process.exit()
  })
} else {
  const blog = new Blog ({
    title: process.argv[2],
    author: process.argv[3],
    url: process.argv[4],
    likes: process.argv[5],
  })
  blog.save().then(result => {
    console.log('added post')
    mongoose.connection.close()
    process.exit()
  })
}
