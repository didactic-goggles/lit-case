import {LitElement, css, html} from 'lit';
import '../input/index.js';

export class TableHeader extends LitElement {
  static styles = css`
    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
  `;

  static properties = {
    searchable: {type: Boolean},
    searchValue: {type: String},
    searchPlaceholder: {type: String},
  };

  _handleInput(event) {
    this.searchValue = event.target.value;
  }

  render() {
    return html`<div class="table-header">
      ${this.searchable
        ? html`<lit-input
            type="text"
            placeholder=${this.searchPlaceholder}
            .value=${this.searchValue}
            @value-changed=${this._handleInput}
          ></lit-input>`
        : ''}

      <slot name="header-actions"></slot>
    </div>`;
  }
}

customElements.define('lit-table-header', TableHeader);
