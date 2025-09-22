import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required']
  },
  industry: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 0
  },
  founded: {
    type: Number,
    default: null
  }
}, {
  timestamps: true
});

const Company = mongoose.model('Company', companySchema);
export default Company;
