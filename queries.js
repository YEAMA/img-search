const mongoose = require('mongoose')
const _ = require('lodash')

var querySchema = new mongoose.Schema({
    term: {
        type: String,
        required: true
    },
    when: {
        type: Number,
        required: true
    }
})

querySchema.methods.toJSON = function() {
    var query = this
    var queryObj = query.toObject()

    queryObj.when = new Date(queryObj.when).toString()
    return _.pick(queryObj, ['term', 'when'])
}

var QUERIES = mongoose.model('QUERIES', querySchema);

module.exports = { QUERIES }