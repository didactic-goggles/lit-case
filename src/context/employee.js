import {LitElement, html} from 'lit';
import {createContext, ContextProvider} from '@lit/context';
import mockEmployees from '../data/employees.js';
import {StorageManager} from '../lib/storage-manager.js';
import {t} from '../utils/i18n.js';
import '../components/ui/alert-dialog/index.js';
import {
  setSearchFilters,
  getSearchFilters,
  setMultipleSearchFilters,
} from '../utils/search-filters.js';
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
        viewAs: getSearchFilters('viewAs') || 'table',
        selectedEmployee: this.selectedEmployee,
        searchValue: getSearchFilters('search') || '',
        pagination: {
          page: getSearchFilters('page') || 1,
          pageSize: getSearchFilters('pageSize') || 10,
        },
        openDeleteDialog: this.openDeleteDialog,
        onOpenDeleteDialog: this.onOpenDeleteDialog.bind(this),
        onDeleteDialogClose: this.onDeleteDialogClose.bind(this),
        onDeleteDialogConfirm: this.onDeleteDialogConfirm.bind(this),
        deleteEmployee: this.deleteEmployee.bind(this),
        filterEmployees: this.filterEmployees.bind(this),
        onViewAsChange: this.onViewAsChange.bind(this),
        onSearchValueChange: this.onSearchValueChange.bind(this),
      },
    });

    this.filterEmployees();
  }

  deleteEmployee(id) {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    const newValue = {
      ...this._provider.value,
      employees: [...this.employees],
    };
    this._provider.setValue(newValue);

    StorageManager.setItem(this.STORAGE_KEY, JSON.stringify(this.employees));
  }

  filterEmployees() {
    const currentValue = this._provider.value;

    const filteredEmployees = this.allEmployees.filter((employee) =>
      employee.firstName
        .toLowerCase()
        .includes(currentValue.searchValue.toLowerCase())
    );
    this.employees = filteredEmployees.slice(
      0,
      currentValue.pagination.pageSize * currentValue.pagination.page
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

  onViewAsChange(viewAs) {
    console.log('onViewAsChange', viewAs);
    this._provider.setValue({
      ...this._provider.value,
      viewAs: viewAs,
    });
    setMultipleSearchFilters([
      ['viewAs', viewAs],
      ['page', 1],
      ['pageSize', 10],
    ]);
  }

  onSearchValueChange(searchValue) {
    console.log('onSearchValueChange', searchValue);
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

  onPaginationChange(pagination) {
    this._provider.setValue({
      ...this._provider.value,
      pagination: pagination,
    });
    setSearchFilters('page', pagination.page);

    this.filterEmployees();
  }

  render() {
    return html`<slot></slot>

      <lit-alert-dialog
        .open=${this._provider.value.openDeleteDialog}
        .title=${t('components.employeesTable.deleteAlert.title')}
        .message=${t('components.employeesTable.deleteAlert.message', {
          firstName: this._provider.value.selectedEmployee?.firstName,
          lastName: this._provider.value.selectedEmployee?.lastName,
        })}
        .confirmText=${t('components.employeesTable.deleteAlert.buttonSave')}
        @close=${this.onDeleteDialogClose}
        @confirm=${this.onDeleteDialogConfirm}
      ></lit-alert-dialog> `;
  }
}

customElements.define('employee-context-provider', EmployeeContextProvider);

export const employeeContext = createContext('employeeContext');
