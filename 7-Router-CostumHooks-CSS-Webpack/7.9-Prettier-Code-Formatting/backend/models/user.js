const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bloglists',
    },
  ],
  /*
    the 'ref' here is a reference to the mongo db name of where the other objectId's are
    although techinically its better practice for the model name to be 'Blog' like everyhting else
    I think it helps me learn to differentiate the different tools for the model name to be different
   */
})
//^ possibly put `blogs: [{ ... }] ` of the blog posts put in

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
