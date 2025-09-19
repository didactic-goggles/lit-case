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
    searchOptions: {type: Object},
  };

  _handleInput(event) {
    this.searchOptions.onChange(event);
  }

  render() {
    return html`<div class="table-header">
      ${this.searchable
        ? html`<lit-input
            type="text"
            placeholder=${this.searchOptions.placeholder}
            .value=${this.searchOptions.value}
            @value-changed=${this._handleInput}
          ></lit-input>`
        : ''}

      <slot name="header-actions"></slot>
    </div>`;
  }
}

customElements.define('lit-table-header', TableHeader);
