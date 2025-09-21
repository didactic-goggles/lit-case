import { assert } from '@open-wc/testing';
import { t } from '../../src/utils/i18n.js';

suite('t', () => {
  test('is defined', () => {
    assert.isFunction(t);
  });

  test('should return the value of the key', () => {
    const text = t('layout.header.employees');

    assert.equal(text, 'Çalışanlar');
  });

  test('should return the value of the key with params', () => {
    const tempEmployee = {
      firstName: 'Dijwar',
      lastName: 'Bozyel',
    };
    const text = t('employeesUpdate.helperMessage', {
      firstName: tempEmployee.firstName,
      lastName: tempEmployee.lastName,
    });

    assert.equal(text, 'Dijwar Bozyel adlı çalışanı düzenlemektesiniz');
  });

  test('should return the key if the value is not found', () => {
    const text = t('layout.header.employeess');

    assert.equal(text, 'layout.header.employeess');
  });
});