import {LitElement, css, html} from 'lit';
import {t, updateWhenLocaleChanges} from '../utils/i18n.js';
import {ContextConsumer} from '@lit/context';
import {employeeContext} from '../context/employee.js';
import {formatDate} from '../utils/format-date.js';
import './ui/button/index.js';
import './ui/table/index.js';
import './ui/toggle-group/index.js';
import './ui/alert-dialog/index.js';
import {debounce} from '../utils/debounce.js';
import './ui/card-grid/index.js';
import './ui/card/index.js';
import './employee-card.js';

export class EmployeeList extends LitElement {
  static styles = css`
    div {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
  `;
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
        header: t('components.employeeList.columns.firstName'),
      },
      {
        id: 'lastName',
        header: t('components.employeeList.columns.lastName'),
      },
      {
        id: 'dateOfEmployment',
        header: t('components.employeeList.columns.dateOfEmployment'),
        cell: (cellData) => formatDate(cellData),
      },
      {
        id: 'dateOfBirth',
        header: t('components.employeeList.columns.dateOfBirth'),
        cell: (cellData) => formatDate(cellData),
      },
      {
        id: 'phone',
        header: t('components.employeeList.columns.phone'),
      },
      {
        id: 'email',
        header: t('components.employeeList.columns.email'),
      },
      {
        id: 'department',
        header: t('components.employeeList.columns.department'),
        cell: (cellData) => t(`common.department.${cellData}`),
      },
      {
        id: 'position',
        header: t('components.employeeList.columns.position'),
        cell: (cellData) => t(`common.position.${cellData}`),
      },
      {
        id: 'actions',
        header: t('components.employeeList.columns.actions'),
        cell: (row) =>
          html`<lit-button
              variant="ghost"
              size="icon"
              href="/employees/update/${row.id}"
            >
              <lit-icon name="edit"></lit-icon>

              <span class="sr-only"
                >${t('components.employeeList.columns.details')}</span
              >
            </lit-button>
            <lit-button
              @click=${() => this.onEmployeeDeleteClick(row)}
              variant="ghost"
              size="icon"
            >
              <span class="sr-only"
                >${t('components.employeeList.columns.delete')}</span
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
    this._employeeContext.value.onViewChange(event.detail.value);
  }

  onEmployeeDeleteClick(employee) {
    this._employeeContext.value.onSingleDeleteDialogOpen(employee);
  }

  onPageChange(event) {
    this._employeeContext.value.onPageChange(event.detail.page);
  }

  onAllCheckboxChange(event) {
    this._employeeContext.value.onAllCheckboxChange(event.detail.value);
  }

  onCheckboxChange(event) {
    this._employeeContext.value.onCheckboxChange(
      event.detail.value,
      event.detail.employeeId
    );
  }

  renderListViewToggleGroup() {
    return html`<lit-toggle-group
      .value=${this._employeeContext.value.view}
      .options=${this.toggleGroupOptions}
      @change=${this.onToggleGroupChange}
    ></lit-toggle-group>`;
  }

  renderDeleteButton() {
    if (this._employeeContext.value.selectedEmployees.length === 0) {
      return null;
    }

    return html`
      <lit-button
        variant="solid"
        color="primary"
        @click=${() => this._employeeContext.value.onMultipleDeleteClick()}
        >${this._employeeContext.value.selectedEmployees.length > 1
          ? t('components.employeeList.deleteAll')
          : t('components.employeeList.delete')}</lit-button
      >
    `;
  }

  renderCardGrid(item) {
    return html`<employee-card .employee=${item}></employee-card>`;
  }

  render() {
    return html`
      ${this._employeeContext.value.view === 'table'
        ? html`<lit-table
            .data=${this.data}
            .columns=${this.columns}
            search
            .searchValue=${this._employeeContext.value.searchValue}
            .searchPlaceholder=${t('components.employeeList.searchPlaceholder')}
            @search-value-changed=${debounce(
              (event) =>
                this._employeeContext.value.onSearchValueChange(
                  event.detail.value
                ),
              500
            )}
            .pagination=${true}
            .page=${this._employeeContext.value.pagination.page}
            .totalPages=${this._employeeContext.value.pagination.totalPages}
            @page-change=${this.onPageChange}
            @all-checkbox-change=${this.onAllCheckboxChange}
            @checkbox-change=${this.onCheckboxChange}
            .allSelected=${this._employeeContext.value.allSelected}
            .selectedItems=${this._employeeContext.value.selectedEmployees}
          >
            <div slot="header-actions">
              ${this.renderDeleteButton()} ${this.renderListViewToggleGroup()}
            </div>
          </lit-table> `
        : html`<lit-card-grid
            .data=${this.data}
            .renderFunction=${this.renderCardGrid}
            search
            .searchValue=${this._employeeContext.value.searchValue}
            .searchPlaceholder=${t('components.employeeList.searchPlaceholder')}
            @search-value-changed=${debounce(
              (event) =>
                this._employeeContext.value.onSearchValueChange(
                  event.detail.value
                ),
              500
            )}
            .pagination=${true}
            .page=${this._employeeContext.value.pagination.page}
            .totalPages=${this._employeeContext.value.pagination.totalPages}
            @page-change=${this.onPageChange}
          >
            <div slot="header-actions">${this.renderListViewToggleGroup()}</div>
          </lit-card-grid> `}
    `;
  }
}

customElements.define('employee-list', EmployeeList);
