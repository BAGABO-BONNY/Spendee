const express = require('express');
const { protect } = require('../middleware/authmiddleware');
const { getDashboardData } = require('../controllers/dashboardController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/dashboard/data:
 *   get:
 *     summary: Get dashboard data including summary, recent transactions, and analytics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardData'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/data', protect, getDashboardData);

module.exports = router;
