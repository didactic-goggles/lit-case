import {css, html, LitElement} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import './table-header.js';
import '../pagination/index.js';
import '../../empty.js';
import '../checkbox/index.js';
export class Table extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .table-scroll-container {
      overflow: hidden;
      border-radius: 0.5rem;
      border: 1px solid var(--border);
    }

    .table {
      overflow-x: auto;
      width: 100%;
    }

    table {
      font-size: 0.875rem;
      width: 100%;
      border-collapse: collapse;
      background-color: var(--table);
    }

    thead tr {
      border-bottom: 1px solid var(--border);
    }

    thead tr th {
      padding: 1rem 0.5rem;
      height: 2.5rem;
      color: var(--primary);
    }

    thead tr th:has(lit-checkbox) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    tbody tr {
      border-bottom: 1px solid var(--border);
      transition: all 0.3s ease;
    }

    tbody tr:hover {
      background-color: var(--table-accent);
    }

    tbody tr:last-child {
      border-bottom: none;
    }

    tbody tr td {
      padding: 1rem 1rem;
      height: 2.5rem;
      white-space: nowrap;
    }
  `;

  SPECIAL_COLUMNS = ['checkbox', 'actions'];

  static properties = {
    data: {type: Array},
    columns: {type: Array},
    search: {type: Boolean},
    pagination: {type: Boolean},
    searchValue: {type: String},
    searchPlaceholder: {type: String},
    page: {type: Number},
    totalPages: {type: Number},
  };

  constructor() {
    super();
    this.data = [];
    this.columns = [];
    this.search = true;
    this.pagination = true;
    this.page = 1;
    this.totalPages = 1;
  }

  getRowData(row, column) {
    if (column.cellDataFn) {
      return column.cellDataFn(row);
    }
    return row;
  }

  getCellData(rowData, column) {
    if (column.id && !this.SPECIAL_COLUMNS.includes(column.id)) {
      return rowData[column.id];
    }
    return rowData;
  }

  _handleSearchValueChanged(event) {
    this.searchValue = event.detail.value;
    this.dispatchEvent(
      new CustomEvent('search-value-changed', {
        detail: {value: this.searchValue},
      })
    );
  }

  _handlePageChange(event) {
    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: {page: event.detail.page},
      })
    );
  }

  render() {
    return html`
      <lit-table-header
        .search=${this.search}
        .searchValue=${this.searchValue}
        .searchPlaceholder=${this.searchPlaceholder}
        @search-value-changed=${this._handleSearchValueChanged}
      >
        <slot name="header-actions" slot="header-actions"></slot>
      </lit-table-header>

      <div class="table-scroll-container">
        <div class="table">
          <table>
            <thead>
              <tr>
                ${repeat(
                  this.columns,
                  (column) => column.id,
                  (column) =>
                    column.id === 'checkbox'
                      ? html`<th><lit-checkbox></lit-checkbox></th>`
                      : html`<th>${column.header}</th>`
                )}
              </tr>
            </thead>
            <tbody>
              ${this.data.length === 0
                ? html`<tr>
                    <td colspan="${this.columns.length}">
                      <lit-empty></lit-empty>
                    </td>
                  </tr>`
                : repeat(
                    this.data,
                    (row) => row.id,
                    (row) =>
                      html`<tr>
                        ${repeat(
                          this.columns,
                          (column) => column.id,
                          (column) => html`<td>
                            ${column.id === 'checkbox'
                              ? html`<lit-checkbox></lit-checkbox>`
                              : column.cell
                              ? column.cell(
                                  this.getCellData(
                                    this.getRowData(row, column),
                                    column
                                  )
                                )
                              : this.getCellData(
                                  this.getRowData(row, column),
                                  column
                                )}
                          </td>`
                        )}
                      </tr>`
                  )}
            </tbody>
          </table>
        </div>
      </div>

      ${this.pagination
        ? html`
            <lit-pagination
              .page=${this.page}
              .totalPages=${this.totalPages}
              @page-change=${this._handlePageChange}
            />
          `
        : html``}
    `;
  }
}

customElements.define('lit-table', Table);
