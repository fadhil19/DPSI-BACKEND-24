const express = require('express');
const { authenticate } = require("../middleware/auth");
const router = express.Router();
const Supplier = require("../models/supplier");

// Get all suppliers
router.get('/', authenticate, async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get supplier by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);
        if (supplier) {
            res.json(supplier);
        } else {
            res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new supplier
router.post('/', authenticate, async (req, res) => {
    try {
        const newSupplier = await Supplier.create(req.body);
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
