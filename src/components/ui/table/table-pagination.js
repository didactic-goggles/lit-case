import {LitElement, css, html} from 'lit';
import '../pagination/index.js';

export class TablePagination extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: flex-end;
    }
  `;

  render() {
    return html`<div class="table-pagination">
      <lit-pagination />
    </div>`;
  }
}

customElements.define('lit-table-pagination', TablePagination);
