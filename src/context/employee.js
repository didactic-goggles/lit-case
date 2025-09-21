import {LitElement, html} from 'lit';
import {createContext, ContextProvider} from '@lit/context';
import mockEmployees from '../data/employees.js';
import {StorageManager} from '../lib/storage-manager.js';
import '../components/employee-delete-alert-dialog.js';
import {
  setSearchFilters,
  getSearchFilters,
  setMultipleSearchFilters,
} from '../utils/search-filters.js';
import {generateUUID} from '../utils/uuid.js';

export class EmployeeContextProvider extends LitElement {
  static properties = {
    allEmployees: {type: Array},
    employees: {type: Array},
    selectedEmployee: {type: Object},
    openDeleteDialog: {type: Boolean},
  };

  STORAGE_KEY = 'employees';

  constructor() {
    super();

    this.STORAGE_KEY = 'employees';
    this.allEmployees = StorageManager.getItem(this.STORAGE_KEY, mockEmployees);
    this.employees = this.allEmployees;
    this.selectedEmployee = null;
    this.openDeleteDialog = false;

    this._provider = new ContextProvider(this, {
      context: employeeContext,
      initialValue: {
        employees: this.employees,
        view: getSearchFilters('view') || 'table',
        selectedEmployee: this.selectedEmployee,
        searchValue: getSearchFilters('search') || '',
        pagination: {
          page: getSearchFilters('page') ? Number(getSearchFilters('page')) : 1,
          pageSize: getSearchFilters('pageSize')
            ? Number(getSearchFilters('pageSize'))
            : 10,
          totalPages: getSearchFilters('totalPages')
            ? Number(getSearchFilters('totalPages'))
            : 1,
        },
        addEmployee: this.addEmployee.bind(this),
        updateEmployee: this.updateEmployee.bind(this),
        deleteEmployee: this.deleteEmployee.bind(this),
        getEmployee: this.getEmployee.bind(this),
        openDeleteDialog: this.openDeleteDialog,
        onOpenDeleteDialog: this.onOpenDeleteDialog.bind(this),
        onDeleteDialogClose: this.onDeleteDialogClose.bind(this),
        onDeleteDialogConfirm: this.onDeleteDialogConfirm.bind(this),
        filterEmployees: this.filterEmployees.bind(this),
        onViewChange: this.onViewChange.bind(this),
        onSearchValueChange: this.onSearchValueChange.bind(this),
        onPageChange: this.onPageChange.bind(this),
      },
    });

    this.filterEmployees();
  }

  addEmployee(employee) {
    this.allEmployees = [
      {
        ...employee,
        id: generateUUID(this.allEmployees),
      },
      ...this.allEmployees,
    ];
    StorageManager.setItem(this.STORAGE_KEY, JSON.stringify(this.allEmployees));

    this.filterEmployees();
  }

  updateEmployee(employee) {
    console.log('updateEmployee', employee);
    const tempAllEmployees = [...this.allEmployees];
    const index = this.allEmployees.findIndex((e) => e.id === employee.id);
    if (index > -1) {
      tempAllEmployees[index] = employee;
    }
    console.log('tempAllEmployees', tempAllEmployees);
    this.allEmployees = tempAllEmployees;
    StorageManager.setItem(this.STORAGE_KEY, JSON.stringify(this.allEmployees));

    this.filterEmployees();
  }

  getEmployee(id) {
    return this.allEmployees.find((employee) => employee.id === id);
  }

  deleteEmployee(id) {
    const newEmployees = this.allEmployees.filter(
      (employee) => employee.id !== id
    );
    this.allEmployees = newEmployees;

    StorageManager.setItem(this.STORAGE_KEY, JSON.stringify(newEmployees));

    this.filterEmployees();
  }

  filterEmployees() {
    const currentValue = this._provider.value;

    const filteredEmployees = this.allEmployees.filter((employee) =>
      employee.firstName
        .toLowerCase()
        .includes(currentValue.searchValue.toLowerCase())
    );
    this.employees = filteredEmployees.slice(
      currentValue.pagination.pageSize * (currentValue.pagination.page - 1),
      currentValue.pagination.pageSize * currentValue.pagination.page
    );
    this._provider.value.pagination.totalPages = Math.ceil(
      filteredEmployees.length / currentValue.pagination.pageSize
    );
    this._provider.value.employees = this.employees;
  }

  onOpenDeleteDialog(employee) {
    this._provider.setValue({
      ...this._provider.value,
      selectedEmployee: employee,
      openDeleteDialog: true,
    });

    this.requestUpdate();
  }

  onDeleteDialogClose() {
    this._provider.setValue({
      ...this._provider.value,
      selectedEmployee: null,
      openDeleteDialog: false,
    });
  }

  onDeleteDialogConfirm() {
    this.deleteEmployee(this._provider.value.selectedEmployee.id);

    this._provider.setValue({
      ...this._provider.value,
      selectedEmployee: null,
      openDeleteDialog: false,
    });
  }

  onViewChange(view) {
    if (view === this._provider.value.view) return;

    this._provider.setValue({
      ...this._provider.value,
      view: view,
    });
    setMultipleSearchFilters([
      ['view', view],
      ['page', 1],
      ['pageSize', 10],
    ]);
  }

  onSearchValueChange(searchValue) {
    this._provider.setValue({
      ...this._provider.value,
      searchValue: searchValue,
    });
    setMultipleSearchFilters([
      ['search', searchValue],
      ['page', 1],
      ['pageSize', 10],
    ]);

    this.filterEmployees();
  }

  onPageChange(page) {
    this._provider.setValue({
      ...this._provider.value,
      pagination: {
        ...this._provider.value.pagination,
        page: page,
      },
    });
    setSearchFilters('page', page);

    this.filterEmployees();
  }

  render() {
    return html`<slot></slot>

      <employee-delete-alert-dialog></employee-delete-alert-dialog> `;
  }
}

customElements.define('employee-context-provider', EmployeeContextProvider);

export const employeeContext = createContext('employeeContext');
