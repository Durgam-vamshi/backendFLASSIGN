
class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'search'];
    excludeFields.forEach(el => delete queryObj[el]);

    this.query = this.query.find(queryObj);
    return this;
  }

search() {
  if (this.queryString.search) {
    const regex = new RegExp(this.queryString.search, 'i');

    this.query = this.query.find({
      $or: [
        { name: regex },
        { industry: regex },
        { location: regex },
      ]
    });
  }

  return this;
}


  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default ApiFeatures;










































