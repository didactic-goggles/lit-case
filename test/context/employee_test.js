import {assert, fixture, html} from '@open-wc/testing';
import {EmployeeContextProvider} from '../../src/context/employee.js';
import {Router} from '@vaadin/router';

const TEMP_EMPLOYEE = {
  firstName: 'Dijwar',
  lastName: 'Bozyel',
  email: 'dijwarbozyel@icloud.com',
  phone: '+(90) 532 123 45 67',
  department: 'tech',
  position: 'senior',
  dateOfBirth: '1995-04-28',
  dateOfEmployment: '2025-09-21',
};

suite('employee-context', () => {
  let originalGo;
  let goCalls = [];

  function setQuery(q = '?view=table&page=1&pageSize=10') {
    const path = window.location.pathname || '/';
    const hash = window.location.hash || '';
    const normalized = q ? (q.startsWith('?') ? q : `?${q}`) : '';
    window.history.replaceState({}, '', `${path}${normalized}${hash}`);
  }

  setup(() => {
    setQuery('?view=table&page=1&pageSize=10');

    originalGo = Router.go;
    goCalls = [];

    Router.go = (url) => {
      goCalls.push(url);
    };
  });

  teardown(() => {
    Router.go = originalGo;
    
    setQuery('');

    // localStorage.removeItem('employees');
  });

  suite('EmployeeContextProvider', () => {
    test('is defined', () => {
      const el = document.createElement('employee-context-provider');
      assert.instanceOf(el, EmployeeContextProvider);
    });

    test('initializes with default values', async () => {
      const el = await fixture(
        html`<employee-context-provider></employee-context-provider>`
      );

      assert.isArray(el.allEmployees);
      assert.isArray(el.employees);
      assert.isNull(el.selectedEmployee);
      assert.isFalse(el.openDeleteDialog);
    });

    test('addEmployee', () => {
      const el = document.createElement('employee-context-provider');
      el.addEmployee(TEMP_EMPLOYEE);

      assert.isTrue(el.employees[0].firstName === TEMP_EMPLOYEE.firstName);
    });

    test('filterEmployees', () => {
      const el = document.createElement('employee-context-provider');
      el.onSearchValueChange('Dijwar');
      el.filterEmployees();

      assert.isTrue(el.employees.length === 1);
    });

    test('getEmployee', () => {
      const el = document.createElement('employee-context-provider');
      const employee = el.getEmployee(151);

      assert.isTrue(employee.firstName === 'Dijwar');
    });

    test('onViewChange', () => {
      const el = document.createElement('employee-context-provider');
      el.onViewChange('grid');

      assert.isTrue(el._provider.value.view === 'grid');
    });

    test('onSearchValueChange', () => {
      const el = document.createElement('employee-context-provider');
      el.onSearchValueChange('Dijwar');

      assert.isTrue(el._provider.value.searchValue === 'Dijwar');
    });

    test('updateEmployee', () => {
      const el = document.createElement('employee-context-provider');
      el.updateEmployee({
        ...TEMP_EMPLOYEE,
        id: 151,
        firstName: 'Dijwarrr',
      });

      assert.isTrue(el.employees[0].firstName === 'Dijwarrr');
    });

    test('onPageChange', () => {
      const el = document.createElement('employee-context-provider');
      el.onPageChange(2);

      assert.isTrue(el._provider.value.pagination.page === 2);
    });

    test('onOpenDeleteDialog', () => {
      const el = document.createElement('employee-context-provider');
      el.onOpenDeleteDialog({
        ...TEMP_EMPLOYEE,
        id: 151,
      });

      assert.isTrue(el._provider.value.openDeleteDialog === true);
      assert.isTrue(el._provider.value.selectedEmployee.firstName === 'Dijwar');
    });

    test('onOpenDeleteDialog', () => {
      const el = document.createElement('employee-context-provider');
      el.onOpenDeleteDialog({
        ...TEMP_EMPLOYEE,
        id: 151,
      });

      assert.isTrue(el._provider.value.openDeleteDialog === true);
      assert.isTrue(el._provider.value.selectedEmployee.firstName === 'Dijwar');

      el.onDeleteDialogClose();

      assert.isTrue(el._provider.value.openDeleteDialog === false);
      assert.isTrue(el._provider.value.selectedEmployee === null);

      el.onOpenDeleteDialog({
        ...TEMP_EMPLOYEE,
        id: 151,
      });
      
      el.onDeleteDialogConfirm();

      assert.isTrue(el._provider.value.openDeleteDialog === false);
      assert.isTrue(el._provider.value.selectedEmployee === null);
      assert.isTrue(el.employees[0].firstName !== 'Dijwarrr');
    });

    test('deleteEmployee', () => {
      const el = document.createElement('employee-context-provider');
      const firstEmployeeId = el.employees[0].id;
      el.deleteEmployee(firstEmployeeId);

      assert.isTrue(el.employees[0] !== firstEmployeeId);
    });
  });
});
