const _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)

  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.map((blog) => blog.likes).reduce((acc, curr) => acc + curr, 0)

  return sum
}

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.reduce(
    (max, obj) => (obj.likes > max.likes ? obj : max),
    blogs[0]
  )

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  }
}

const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')

  const blogCounts = _.map(groupedByAuthor, (authorBlogs, author) => ({
    author,
    blogs: authorBlogs.length,
  }))

  const mostBlogsAuthor = _.maxBy(blogCounts, 'blogs')

  return {
    author: mostBlogsAuthor.author,
    blogs: mostBlogsAuthor.blogs,
  }
}

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')

  const likeCounts = _.map(groupedByAuthor, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes'),
  }))

  const mostLikedAuthor = _.maxBy(likeCounts, 'likes')

  return {
    author: mostLikedAuthor.author,
    likes: mostLikedAuthor.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
