const dummy = (blogs) => {
    // return blogs.length ? 1 : 0
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce( (sum, blog) => { return sum + blog.likes }, 0)
}

const favoriteBlog = (blogs) => {
   if(blogs.length === 0){ return { error: "blogs is empty"} }

   var dummyBestPost = {likes: -1}
   return blogs.reduce( (currentFavPost, blog) => { return currentFavPost.likes > blog.likes ? currentFavPost : blog }, dummyBestPost)
}


module.exports = {dummy, totalLikes, favoriteBlog}