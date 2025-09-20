import {LitElement, html} from 'lit';
import {createContext, ContextProvider} from '@lit/context';
import mockEmployees from '../data/employees.js';
import {StorageManager} from '../lib/storage-manager.js';
import {t} from '../utils/i18n.js';
import '../components/ui/alert-dialog/index.js';
export class EmployeeContextProvider extends LitElement {
  STORAGE_KEY = 'employees';

  _provider = new ContextProvider(this, {
    context: employeeContext,
    initialValue: {
      employees: [],
      viewAs: 'table',
      selectedEmployee: null,
      searchValue: '',
      filterParams: {
        search: '',
        page: 1,
        pageSize: 10,
      },
      openDeleteDialog: false,
      onOpenDeleteDialog: this.onOpenDeleteDialog.bind(this),
      onDeleteDialogClose: this.onDeleteDialogClose.bind(this),
      onDeleteDialogConfirm: this.onDeleteDialogConfirm.bind(this),
      deleteEmployee: this.deleteEmployee.bind(this),
      filterEmployees: this.filterEmployees.bind(this),
    },
  });

  constructor() {
    super();
    this.STORAGE_KEY = 'employees';

    this._provider.value.employees = StorageManager.getItem(
      this.STORAGE_KEY,
      mockEmployees
    );
  }

  deleteEmployee(id) {
    const currentValue = this._provider.value;
    const updatedEmployees = currentValue.employees.filter(
      (employee) => employee.id !== id
    );
    this._provider.value.employees = updatedEmployees;

    StorageManager.setItem(this.STORAGE_KEY, JSON.stringify(updatedEmployees));

    this.requestUpdate();
  }

  filterEmployees(search) {
    const currentValue = this._provider.value;
    const filteredEmployees = currentValue.employees.filter((employee) =>
      employee.firstName.includes(search)
    );
    this._provider.value.employees = filteredEmployees;

    this.requestUpdate();
  }

  onOpenDeleteDialog(employee) {
    console.log("onOpenDeleteDialog", employee, this._provider.value);
    this._provider.value.selectedEmployee = employee;
    this._provider.value.openDeleteDialog = true;

    this.requestUpdate();
  }

  onDeleteDialogClose() {
    this._provider.value.openDeleteDialog = false;
    this._provider.value.selectedEmployee = null;

    this.requestUpdate();
  }

  onDeleteDialogConfirm() {
    this.deleteEmployee(this._provider.value.selectedEmployee.id);
    this._provider.value.openDeleteDialog = false;
    this._provider.value.selectedEmployee = null;

    this.requestUpdate();
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
