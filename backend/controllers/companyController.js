import Company from "../models/companyModel.js";
import ApiFeatures from "../utils/apiFeatures.js";

// GET /api/companies
export const getCompanies = async (req, res) => {
  try {
    const features = new ApiFeatures(Company.find(), req.query)
      .filter()
      .search()
      .paginate();

    const companies = await features.query;
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/companies/:id
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/companies
// export const createCompany = async (req, res) => {
//   try {
//     const company = new Company(req.body);
//     const savedCompany = await company.save();
//     res.status(201).json(savedCompany);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };



export const createCompany = async (req, res) => {
  try {
    const companies = req.body;

    if (!Array.isArray(companies) || companies.length === 0) {
      return res.status(400).json({ message: "Request body must be a non-empty array of companies." });
    }

    const savedCompanies = await Company.insertMany(companies);
    res.status(201).json(savedCompanies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// PUT /api/companies/:id
export const updateCompany = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCompany) return res.status(404).json({ message: "Company not found" });
    res.json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/companies/:id
export const deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) return res.status(404).json({ message: "Company not found" });
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
