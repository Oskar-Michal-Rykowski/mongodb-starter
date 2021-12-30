const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const employeeOne = new Employee({
        firstName: 'Anna',
        lastName: 'Gajda',
        department: 'Marketing',
        // salary: 1,
      });
      await employeeOne.save();

      const employeeTwo = new Employee({
        firstName: 'Mateusz',
        lastName: 'Morawiecki',
        department: 'Bankowość',
        // salary: 1,
      });
      await employeeTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const firstName = await Employee.findOne({ firstName: 'Anna' });
      const lastName = await Employee.findOne({ lastName: 'Gajda' });
      const department = await Employee.findOne({ department: 'Marketing' });
      const salary = await Employee.findOne({ salary: 1 });
      expect(firstName.firstName).to.be.equal('Anna');
      expect(lastName.lastName).to.be.equal('Gajda');
      expect(department.department).to.be.equal('Marketing');
      // expect(salary.salary).to.be.equal(1);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with insertOne method.', async () => {
      const employee = new Employee({
        firstName: 'Anna',
        lastName: 'Gajda',
        department: 'Marketing',
        // salary: 1,
      });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const employeeOne = new Employee({
        firstName: 'Anna',
        lastName: 'Gajda',
        department: 'Marketing',
        // salary: 1,
      });
      await employeeOne.save();

      const employeeTwo = new Employee({
        firstName: 'Mateusz',
        lastName: 'Morawiecki',
        department: 'Bankowość',
        // salary: 1,
      });
      await employeeTwo.save();
    });

    it('should properly update one document with updateOne method', async () => {
      await Employee.updateOne(
        {
          firstName: 'Anna',
          lastName: 'Gajda',
          department: 'Marketing',
          // salary: 1,
        },
        {
          $set: {
            firstName: '=Anna=',
            lastName: '=Gajda=',
            department: '=Marketing=',
            // salary: 2,
          },
        }
      );
      const updatedEmployee = await Employee.findOne({
        firstName: '=Anna=',
        lastName: '=Gajda=',
        department: '=Marketing=',
        // salary: 2,
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({
        firstName: 'Anna',
        lastName: 'Gajda',
        department: 'Marketing',
        // salary: 1,
      });
      employee.firstName = '=Anna=';
      employee.lastName = '=Gajda=';
      employee.department = '=Marketing=';
      // employee.salary = 2;
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        firstName: '=Anna=',
        lastName: '=Gajda=',
        department: '=Marketing=',
        // salary: 2,
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
      const employees = await Employee.find({ firstName: 'Updated!' });
      expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const employeeOne = new Employee({
        firstName: 'Anna',
        lastName: 'Gajda',
        department: 'Marketing',
        // salary: 1,
      });
      await employeeOne.save();

      const employeeTwo = new Employee({
        firstName: 'Mateusz',
        lastName: 'Morawiecki',
        department: 'Bankowość',
        // salary: 2,
      });
      await employeeTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'Anna' });
      const removeDepartment = await Employee.findOne({ firstName: 'Anna' });
      expect(removeDepartment).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Anna' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'Anna' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });
});
