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
    }

    thead tr {
      border-bottom: 1px solid var(--border);
    }

    thead tr th {
      padding: 0 0.5rem;
      height: 2.5rem;
      font-family: INGMeBold;
    }

    tbody tr {
      border-bottom: 1px solid var(--border);
      transition: all 0.3s ease;
    }

    tbody tr:hover {
      background-color: var(--muted);
    }

    tbody tr:last-child {
      border-bottom: none;
    }

    tbody tr td {
      padding: 0.5rem;
      height: 2.5rem;
    }
  `;
  static properties = {
    data: {type: Array},
    columns: {type: Array},
    searchable: {type: Boolean},
    pagination: {type: Boolean},
    searchOptions: {type: Object},
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

  render() {
    return html` <div class="table-container">
      <lit-table-header .searchable=${this.searchable} .searchOptions=${this.searchOptions}>
        <slot name="header-actions" slot="header-actions"></slot>
      </lit-table-header>

      <div class="table-scroll-container">
        <div class="table">
          <table>
            <thead>
              <tr>
                ${this.columns.map((column) => html`<th>${column.header}</th>`)}
              </tr>
            </thead>
            <tbody>
              ${this.data.map(
                (row) =>
                  html`<tr>
                    ${this.columns.map(
                      (column) =>
                        html`<td>
                          ${column.cell
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
