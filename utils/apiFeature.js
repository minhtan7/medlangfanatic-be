class APIFeature {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }
    filter() {
        const queryObj = { ...this.queryString }
        const excludedFields = ['page', 'limit', 'sort', 'fields']
        excludedFields.forEach(el => delete queryObj[el])
        // queryObj.title = decodeURIComponent(queryObj.title)

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/(gte|gt|lte|lt)/g, match => `$${match}`)
        this.query.find(JSON.parse(queryStr))
        return this
    }
    sortFields() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ")
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort("-createdAt")
        }
        return this
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ")
            console.log(fields)
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select("-__v")
        }
        return this
    }
    paginate() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
    search() {
        const text = this.queryString.text
        this.query = this.query.find(
            { $text: { $search: `\"${text}\"` } },
            { title: 1, content: 1 }
        )
            .sort(
                { score: { $meta: "textScore" } }
            ).limit(3)
        console.log(this.query)
        return this
    }
}

module.exports = APIFeature