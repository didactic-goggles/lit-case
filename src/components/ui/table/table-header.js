import {LitElement, css, html} from 'lit';
import '../input/index.js';

export class TableHeader extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
  `;

  static properties = {
    search: {type: Boolean},
    searchValue: {type: String},
    searchPlaceholder: {type: String},
  };

  _handleInput(event) {
    this.searchValue = event.target.value;
    this.dispatchEvent(
      new CustomEvent('search-value-changed', {
        detail: {value: this.searchValue},
      })
    );
  }

  render() {
    return html`
      ${this.search
        ? html`<lit-input
            type="text"
            placeholder=${this.searchPlaceholder}
            .value=${this.searchValue}
            @value-changed=${this._handleInput}
          ></lit-input>`
        : html``}

      <slot name="header-actions"></slot>
    `;
  }
}

customElements.define('lit-table-header', TableHeader);
