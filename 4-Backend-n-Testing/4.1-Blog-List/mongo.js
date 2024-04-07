// const mongoose = require('mongoose')
// const {connect} = require("mongoose");
// require('dotenv').config()
//
// const url = process.env.MONGODB_URI
//
// mongoose.set('strictQuery', false)
//
// console.log(url)
//
// mongoose.connect(url)
//
// const blogSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number
// })
//
// const Blog = mongoose.model('BlogList', blogSchema)
//
// if(process.argv[5] === undefined || process.argv[5] === ""){
//   console.log("blog posts")
//   Blog.find({}).then( result => {
//     result.forEach(blog => {
//       console.log(blog.title)
//       console.log(blog.author)
//       console.log(blog.url)
//       console.log(blog.likes)
//     })
//     mongoose.connection.close()
//     process.exit()
//   })
// } else {
//   const blog = new Blog ({
//     title: process.argv[2],
//     author: process.argv[3],
//     url: process.argv[4],
//     likes: process.argv[5],
//   })
//   blog.save().then(result => {
//     console.log('added post')
//     mongoose.connection.close()
//     process.exit()
//   })
// }


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri ="mongodb+srv://ans9868:OagUgBQ8fopUJ0Qn@cluster0.idnniv8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

