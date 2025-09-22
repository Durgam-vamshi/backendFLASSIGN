import express from 'express';
import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
} from '../controllers/companyController.js';

const router = express.Router();

router.get('/', getCompanies);               // GET all with filters
router.get('/:id', getCompanyById);          // GET by ID
router.post('/', createCompany);             // POST create
router.put('/:id', updateCompany);           // PUT update
router.delete('/:id', deleteCompany);        // DELETE

export default router;
