import {LitElement, css, html} from 'lit';
import '../pagination/index.js';

export class TablePagination extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
    }
  `;

  static properties = {
    page: {type: Number},
    totalPages: {type: Number},
  };

  constructor() {
    super();
    this.page = 1;
    this.totalPages = 1;
  }

  onPageChange(event) {
    this.dispatchEvent(new CustomEvent('page-change', {
      detail: { page: event.detail.page },
    }));
  }

  render() {
    return html`<div class="table-pagination">
      <lit-pagination .page=${this.page} .totalPages=${this.totalPages} @page-change=${this.onPageChange} />
    </div>`;
  }
}

customElements.define('lit-table-pagination', TablePagination);
