import {LitElement, html} from 'lit';
import {t, updateWhenLocaleChanges} from '../utils/i18n.js';
import {ContextConsumer} from '@lit/context';
import {employeeContext} from '../context/employee.js';
import {formatDate} from '../utils/format-date.js';
import './ui/table/index.js';
import './ui/toggle-group/index.js';
import './ui/alert-dialog/index.js';
import {debounce} from '../utils/debounce.js';
export class EmployeeList extends LitElement {
  _employeeContext = new ContextConsumer(this, {
    context: employeeContext,
    subscribe: true,
  });

  static properties = {
    columns: {type: Array},
  };

  constructor() {
    super();

    updateWhenLocaleChanges(this);
  }

  get columns() {
    return [
      {
        id: 'checkbox',
      },
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
        cell: (cellData) => formatDate(cellData),
      },
      {
        id: 'dateOfEmployment',
        header: t('components.employeesTable.columns.dateOfEmployment'),
        cell: (cellData) => formatDate(cellData),
      },
      {
        id: '',
        header: t('components.employeesTable.columns.actions'),
        cell: (row) =>
          html`<lit-button
              variant="text"
              size="icon"
              href="/employees/${row.id}"
            >
              <lit-icon name="edit"></lit-icon>

              <span class="sr-only"
                >${t('components.employeesTable.columns.details')}</span
              >
            </lit-button>
            <lit-button
              @click=${() => this.onEmployeeDeleteClick(row)}
              variant="text"
              size="icon"
            >
              <span class="sr-only"
                >${t('components.employeesTable.columns.delete')}</span
              >
              <lit-icon name="trash"></lit-icon>
            </lit-button>`,
      },
    ];
  }

  get data() {
    return this._employeeContext.value.employees;
  }

  get toggleGroupOptions() {
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
    this._employeeContext.value.onViewAsChange(event.detail.value);
  }

  onEmployeeDeleteClick(employee) {
    this._employeeContext.value.onOpenDeleteDialog(employee);
  }

  onPageChange(event) {
    this._employeeContext.value.onPageChange(event.detail.page);
  }

  render() {
    return html`<lit-table
      .data=${this.data}
      .columns=${this.columns}
      searchable
      .searchValue=${this._employeeContext.value.searchValue}
      .searchPlaceholder=${t('components.employeeList.searchPlaceholder')}
      @search-value-changed=${debounce(
        (event) =>
          this._employeeContext.value.onSearchValueChange(event.detail.value),
        500
      )}
      .pagination=${true}
      .page=${this._employeeContext.value.pagination.page}
      .totalPages=${this._employeeContext.value.pagination.totalPages}
      @page-change=${this.onPageChange}
    >
      <lit-toggle-group
        .value=${this._employeeContext.value.viewAs}
        .options=${this.toggleGroupOptions}
        @change=${this.onToggleGroupChange}
        slot="header-actions"
      >
      </lit-toggle-group>
    </lit-table> `;
  }
}

customElements.define('employee-list', EmployeeList);
