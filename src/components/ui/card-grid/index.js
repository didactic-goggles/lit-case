import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import './card-grid-header.js';
import '../../empty.js';

export class LitCardGrid extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    @media (max-width: 768px) {
      .card-grid {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }
    }
  `;

  static properties = {
    data: {type: Array},
    renderFunction: {type: Function},
    search: {type: Boolean},
    searchValue: {type: String},
    searchPlaceholder: {type: String},
  };

  constructor() {
    super();

    this.data = [];
    this.renderFunction = () => html``;
    this.search = false;
    this.searchValue = '';
    this.searchPlaceholder = '';
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
      <lit-card-grid-header
        .search=${this.search}
        .searchValue=${this.searchValue}
        .searchPlaceholder=${this.searchPlaceholder}
        @search-value-changed=${this._handleSearchValueChanged}
      >
        <slot name="header-actions" slot="header-actions"></slot>
      </lit-card-grid-header>

      ${this.data.length === 0 ? html`<lit-empty></lit-empty>` : html``}

      ${this.data.length > 0
        ? html`
            <div class="card-grid">
              ${repeat(this.data, (item) => item.id, (item) => this.renderFunction(item))}
            </div>
          `
        : html``}
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

customElements.define('lit-card-grid', LitCardGrid);
