import {LitElement, css, html} from 'lit';
import '../button/index.js';
import '../icon/index.js';

export class LitToggleGroup extends LitElement {
  static properties = {
    value: {type: String, attribute: 'value'},
    options: {type: Array, attribute: false},
  };

  static styles = css`
    :host {
      display: flex;
      border-radius: 0.5rem;
      border: 1px solid var(--border);
      overflow: hidden;
    }

    lit-button {
      border-radius: 0;
      border: none;
      border-right: 1px solid var(--border);
    }

    lit-button:last-child {
      border-right: none;
    }

    lit-button[selected] {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }

    lit-button[selected]:hover {
      background-color: var(--primary-hover);
    }
  `;

  constructor() {
    super();
    this.value = '';
    this.options = [];
  }

  handleOptionClick(optionValue) {
    this.value = optionValue;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value: this.value},
        bubbles: true,
      })
    );
  }

  render() {
    return html`
      ${this.options.map(
        (option) => html`
          <lit-button
            ?selected=${this.value === option.value}
            @click=${() => this.handleOptionClick(option.value)}
            variant="input"
          >
            ${option.label
              ? option.label
              : option.icon
              ? html`<lit-icon name=${option.icon} />`
              : ''}
          </lit-button>
        `
      )}
    `;
  }
}

customElements.define('lit-toggle-group', LitToggleGroup);
