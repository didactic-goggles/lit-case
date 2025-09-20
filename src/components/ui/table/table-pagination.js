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

  render() {
    return html`<div class="table-pagination">
      <lit-pagination .page=${this.page} .totalPages=${this.totalPages} />
    </div>`;
  }
}

customElements.define('lit-table-pagination', TablePagination);
