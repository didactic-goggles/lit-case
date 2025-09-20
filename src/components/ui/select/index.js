import {LitElement, html, css} from 'lit';

export class LitSelect extends LitElement {
  static styles = css`
    :host([haserror]) select {
      border-color: var(--destructive);
    }

    select {
      font-family: inherit;
      padding: 0.5rem 1rem;
      outline: none;
      border: none;
      border-radius: 0.5rem;
      box-sizing: border-box;
      font-size: 0.875rem;
      border: 1px solid var(--border);
      box-shadow: 0 1px 2px 0 #0000000d;
      background-color: var(--input);
      transition: all 0.3s ease;
      width: 100%;
    }

    select:focus {
      box-shadow: var(--input-focus-box-shadow);
    }

    select:hover {
      background-color: var(--input-hover);
    }
  `;

  static properties = {
    options: {type: Array},
    value: {type: String, attribute: 'value'},
    hasError: {type: Boolean, attribute: 'hasError'},
  };

  constructor() {
    super();
    this.value = '';
    this.options = [];
    this.required = false;
  }

  handleChange(event) {
    this.value = event.target.value;
    this.dispatchEvent(
      new CustomEvent('change', {detail: {value: this.value}})
    );
  }

  render() {
    return html`<select @change=${this.handleChange}>
      ${this.options.map(
        (option) =>
          html`<option
            value=${option.value}
            ?selected=${this.value === option.value}
          >
            ${option.label}
          </option>`
      )}
    </select>`;
  }
}

customElements.define('lit-select', LitSelect);
