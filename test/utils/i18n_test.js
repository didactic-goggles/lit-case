import { assert } from '@open-wc/testing';
import { t } from '../../src/utils/i18n.js';
import { LocaleManager } from '../../src/lib/locale-manager.js';

suite('t', () => {
  test('is defined', () => {
    assert.isFunction(t);

    const localeManager = new LocaleManager();
    assert.instanceOf(localeManager, LocaleManager);
    localeManager.init();
    assert.equal(localeManager.getCurrentLocale(), 'tr');
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