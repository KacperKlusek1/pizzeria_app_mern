const express = require('express');
const { submitLawsuit, getAllLawsuits } = require('../controllers/lawsuitController');
const { authMiddleware, requireAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');

const router = express.Router();

router.post('/', upload.array('documents'), submitLawsuit);
router.get('/', authMiddleware, requireAdmin, getAllLawsuits);

module.exports = router;
