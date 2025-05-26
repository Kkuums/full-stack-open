const DataLoader = require('dataloader')
const Book = require('../models/book')

const batchBookCounts = async (authorIds) => {
  const counts = await Book.aggregate([
    { $match: { author: { $in: authorIds } } },
    {
      $group: {
        _id: '$author',
        count: { $sum: 1 },
      },
    },
  ])

  const countMap = new Map()
  counts.forEach((item) => {
    countMap.set(item._id.toString(), item.count)
  })

  return authorIds.map((id) => countMap.get(id.toString()) || 0)
}

module.exports = () => new DataLoader(batchBookCounts)
