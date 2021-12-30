const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value

    dep.validate((err) => {
      expect(err.errors.name).to.exist;
    });
  });
  after(() => {
    mongoose.models = {};
  });
  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should throw an error if "name" is smaller then 5 and longer then 20 characters', () => {
    const cases = ['IT', 'Department of Marketing and Administration'];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
      //Dlaczego tutaj nie trzeba używać metody after()?
    }
  });
  it('shouldn\'t throw an error if "name" is ok', () => {
    const cases = ['Games', 'Litigation', 'Criminal Litigations'];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err).to.not.exist;
      });
      //Dlaczego tutaj nie można zastosować tego co poniżej?
      //   dep.validate((name) => {
      //     expect(name);
      //   });
    }
  });
});
