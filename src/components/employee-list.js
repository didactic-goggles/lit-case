import {LitElement, html} from 'lit';
import {t, updateWhenLocaleChanges} from '../utils/i18n.js';
import './ui/table/index.js';
import './employee-edit-dialog.js';
import './ui/alert-dialog/index.js';
import './ui/toggle-group/index.js';
import {getSearchFilters, setSearchFilters} from '../utils/search-filters.js';
import {ContextConsumer} from '@lit/context';
import {employeeContext} from '../context/employee.js';

export class EmployeeList extends LitElement {
  _employeeContext = new ContextConsumer(this, {context: employeeContext});

  static properties = {
    columns: {type: Array},
    selectedEmployee: {type: Object},
    openEditDialog: {type: Boolean},
    openDeleteDialog: {type: Boolean},
  };

  constructor() {
    super();
    this.selectedEmployee = null;
    this.openEditDialog = false;
    this.openDeleteDialog = false;
    this.searchOptions = {
      onChange: (event) => this.onSearchFiltersChange(event),
      value: '',
      placeholder: t('components.employeeList.searchPlaceholder'),
    };
    updateWhenLocaleChanges(this);
  }

  getColumns() {
    return [
      {
        id: 'firstName',
        header: t('components.employeesTable.columns.firstName'),
      },
      {
        id: 'lastName',
        header: t('components.employeesTable.columns.lastName'),
      },
      {
        id: 'email',
        header: t('components.employeesTable.columns.email'),
      },
      {
        id: 'phone',
        header: t('components.employeesTable.columns.phone'),
      },
      {
        id: 'department',
        header: t('components.employeesTable.columns.department'),
      },
      {
        id: 'position',
        header: t('components.employeesTable.columns.position'),
      },
      {
        id: 'dateOfBirth',
        header: t('components.employeesTable.columns.dateOfBirth'),
      },
      {
        id: 'dateOfEmployment',
        header: t('components.employeesTable.columns.dateOfEmployment'),
      },
      {
        id: '',
        header: t('components.employeesTable.columns.actions'),
        cell: (row) =>
          html`<lit-button variant="primary" href="/employees/${row.id}"
              >${t('components.employeesTable.columns.details')}</lit-button
            >
            <lit-button
              @click=${() => this.onEmployeeDeleteClick(row)}
              variant="destructive"
              >${t('components.employeesTable.columns.delete')}</lit-button
            >`,
      },
    ];
  }

  getToggleGroupOptions() {
    return [
      {
        icon: 'table',
        value: 'table',
      },
      {
        icon: 'grid',
        value: 'grid',
      },
    ];
  }

  onToggleGroupChange(event) {
    setSearchFilters('viewAs', event.detail.value);
  }

  onSearchFiltersChange(event) {
    console.log(event.detail.value);
    setSearchFilters('search', event.detail.value);
  }

  onEmployeeEditClick(employee) {
    this.selectedEmployee = employee;
    this.openEditDialog = true;
  }

  onEmployeeDeleteClick(employee) {
    this.selectedEmployee = employee;
    this.openDeleteDialog = true;
  }

  onEditDialogClose() {
    this.selectedEmployee = null;
    this.openEditDialog = false;
  }

  onDeleteDialogClose() {
    this.selectedEmployee = null;
    this.openDeleteDialog = false;
  }

  onDeleteDialogConfirm() {
    this._employeeContext.value.deleteEmployee(this.selectedEmployee.id);
    this.selectedEmployee = null;
    this.openDeleteDialog = false;
  }

  render() {
    return html`<lit-table
        .data=${this._employeeContext.value.employees}
        .columns=${this.getColumns()}
        searchable
        .searchOptions=${this.searchOptions}
      >
        <lit-toggle-group
          .value=${getSearchFilters('viewAs') || 'table'}
          .options=${this.getToggleGroupOptions()}
          @change=${this.onToggleGroupChange}
          slot="header-actions"
        >
        </lit-toggle-group>
      </lit-table>

      <employee-edit-dialog
        .open=${this.openEditDialog}
        .employee=${this.selectedEmployee}
        @close=${this.onEditDialogClose}
      ></employee-edit-dialog>

      <lit-alert-dialog
        .open=${this.openDeleteDialog}
        .title=${t('components.employeesTable.deleteAlert.title')}
        .message=${t('components.employeesTable.deleteAlert.message')}
        .confirmText=${t('components.employeesTable.deleteAlert.buttonSave')}
        @close=${this.onDeleteDialogClose}
        @confirm=${this.onDeleteDialogConfirm}
      ></lit-alert-dialog> `;
  }
}

customElements.define('employee-list', EmployeeList);
