const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(rand).populate('department');
    if (!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).populate('department');
    if (!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Department({
      firstName,
      lastName,
      department,
    });
    await newEmployee.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const emp = await Employee.findById(req.params.id);
    const { id } = req.params;
    if (emp) {
      await Employee.updateOne(
        { id },
        {
          $set: {
            firstName,
            lastName,
            department,
          },
        }
      );
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const emp = await Employee.findById(id);
    if (emp) {
      await Employee.deleteOne({ id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
