import {css, html, LitElement} from 'lit';
import './table-header.js';
import './table-pagination.js';

export class Table extends LitElement {
  static styles = css`
    .table-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .table-scroll-container {
      overflow: hidden;
    }

    .table {
      overflow-x: auto;
      width: 100%;
    }

    table {
      font-size: 0.875rem;
      width: 100%;
      border-collapse: collapse;
      background-color: var(--background-table);
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
      background-color: var(--accent);
    }

    tbody tr:last-child {
      border-bottom: none;
    }

    tbody tr td {
      padding: 1rem 1rem;
      height: 2.5rem;
    }
  `;
  static properties = {
    data: {type: Array},
    columns: {type: Array},
    searchable: {type: Boolean},
    pagination: {type: Boolean},
    searchValue: {type: String},
    searchPlaceholder: {type: String},
  };

  constructor() {
    super();
    this.data = [];
    this.columns = [];
    this.searchable = true;
    this.pagination = true;
  }

  getRowData(row, column) {
    if (column.cellDataFn) {
      return column.cellDataFn(row);
    }
    return row;
  }

  getCellData(rowData, column) {
    if (column.id) {
      return rowData[column.id];
    }
    return rowData;
  }

  _handleSearchValueChanged(event) {
    console.log("handleSearchValueChanged", event);
    this.searchValue = event.detail.value;
    this.dispatchEvent(new CustomEvent('search-value-changed', {
      detail: {value: this.searchValue}
    }));
  }

  render() {
    return html` <div class="table-container">
      <lit-table-header
        .searchable=${this.searchable}
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
                ${this.columns.map((column) =>
                  column.id === 'checkbox'
                    ? html`<th><lit-checkbox></lit-checkbox></th>`
                    : html`<th>${column.header}</th>`
                )}
              </tr>
            </thead>
            <tbody>
              ${this.data.map(
                (row) =>
                  html`<tr>
                    ${this.columns.map(
                      (column) =>
                        html`<td>
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

      ${this.pagination ? html`<lit-table-pagination />` : ''}
    </div>`;
  }
}

customElements.define('lit-table', Table);
