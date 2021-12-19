const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if there is lack of any arg', () => {
    const emp = new Employee({}); // create new Employee, but don't set any attr value

    emp.validate((err) => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
      expect(err.errors.salary).to.exist;
    });
  });
  after(() => {
    mongoose.models = {};
  });
  it('should throw an error if args after processing of mongoose are not a string', () => {
    const cases = [
      {
        firstName: 'Adam',
        lastName: 'Szostak',
        department: { id: '123', name: 'PR & Marketing' },
        salary: 1,
      },
      {
        firstName: 'Adam',
        lastName: 'Szostak',
        department: ['12345', 'PR & Marketing'],
        salary: 1,
      },
      {
        firstName: 'Ada',
        lastName: { id: '123', lastName: 'Kowalska' },
        department: 'Jakikolwiek',
        salary: 1,
      },
      {
        firstName: 'Ada',
        lastName: ['123', 'Kowalska'],
        department: 'Jakikolwiek',
        salary: 1,
      },
      {
        firstName: { id: '123', lastName: 'Oskar' },
        lastName: 'Rykowski',
        department: 'Notarialny',
        salary: 1,
      },
      {
        firstName: ['123', 'Oskar'],
        lastName: 'Rykowski',
        department: 'Notarialny',
        salary: 1,
      },
      {
        firstName: 'Oskar',
        lastName: 'Rykowski',
        department: 'Notarialny',
        salary: { id: '123', quote: 123 },
      },
      {
        firstName: 'Oskar',
        lastName: 'Rykowski',
        department: 'Notarialny',
        salary: [1, 2, 3],
      },
    ];
    for (let arg of cases) {
      const emp = new Employee(arg);

      emp.validate((err) => {
        expect(err).to.exist;
      });
    }
  });

  it("shouldn't throw an error if args are ok", () => {
    const cases = [
      {
        firstName: 'Adam',
        lastName: 'Szostak',
        department: 'PR & Marketing',
        salary: 7000,
      },
    ];
    for (let arg of cases) {
      const emp = new Employee(arg);

      emp.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
