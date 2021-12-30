const Employee = require('../models/employee.model');
const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(rand).populate('department');
    if (!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).populate('department');
    if (!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postNew = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;

    const departmentData = await Department.findOne({ name: department });
    const departmentId = departmentData._id;

    if (!departmentData) {
      res.status(400).json({ message: 'No such department' });
    } else {
      const newEmployee = new Employee({
        firstName,
        lastName,
        department: departmentId,
      });
      await newEmployee.save();
      res.json({ message: 'OK' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.editDoc = async (req, res) => {
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
};

exports.removeDoc = async (req, res) => {
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
};
