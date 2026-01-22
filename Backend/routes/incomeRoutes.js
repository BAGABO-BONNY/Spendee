const express = require('express');
const { protect } = require('../middleware/authmiddleware');
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel,
} = require('../controllers/incomeController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/income/add:
 *   post:
 *     summary: Add a new income record
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - source
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0
 *                 example: 5000
 *               source:
 *                 type: string
 *                 example: Salary
 *               description:
 *                 type: string
 *                 example: Monthly salary
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-01-15T00:00:00.000Z
 *     responses:
 *       201:
 *         description: Income added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 income:
 *                   $ref: '#/components/schemas/Income'
 *       400:
 *         description: Bad request - missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/add', protect, addIncome);

/**
 * @swagger
 * /api/v1/income/all:
 *   get:
 *     summary: Get all income records for the authenticated user
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of income records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Income'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/all', protect, getAllIncome);

/**
 * @swagger
 * /api/v1/income/{id}:
 *   delete:
 *     summary: Delete an income record
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Income record ID
 *     responses:
 *       200:
 *         description: Income deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Income not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', protect, deleteIncome);

/**
 * @swagger
 * /api/v1/income/download:
 *   get:
 *     summary: Download income records as Excel file
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Excel file download
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/download', protect, downloadIncomeExcel);

module.exports = router;
