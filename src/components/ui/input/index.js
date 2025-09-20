import {LitElement, css, html} from 'lit';

export class LitInput extends LitElement {
  static properties = {
    type: {type: String, attribute: 'type'},
    name: {type: String, attribute: 'name'},
    placeholder: {type: String, attribute: 'placeholder'},
    id: {type: String, attribute: 'id'},
    value: {type: String},
    hasError: {type: Boolean},
    size: {type: String, attribute: 'size'},
  };

  static styles = css`
    input {
      font-family: inherit;
      background-color: var(--input-bg);
      border: 1px solid var(--border);
      box-shadow: 0 1px 2px 0 #0000000d;
      transition: all 0.3s ease;
      border-radius: 0.5rem;
      height: 2.25rem;
      padding: 0.25rem 0.75rem;
      box-sizing: border-box;
      outline: none;
    }

    input:focus {
      box-shadow: var(--input-focus-box-shadow);
    }

    input:hover {
      background-color: var(--input-hover);
    }

    input[aria-invalid='true'] {
      border-color: var(--destructive);
    }
    input[size='sm'] {
      height: 2rem;
    }

    input[size='lg'] {
      height: 2.5rem;
    }
  `;

  constructor() {
    super();
    this.type = 'text';
    this.value = '';
    this.placeholder = '';
    this.size = '';
  }

  inputHandler(e) {
    this.value = e.target.value;

    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: {
        value: e.target.value
      }
    }));
  }

  render() {
    return html`
      <input
        id=${this.id}
        type=${this.type}
        name=${this.name}
        placeholder=${this.placeholder}
        .value=${this.value}
        aria-invalid=${this.hasError ? 'true' : 'false'}
        @input=${this.inputHandler}
      />
    `;
  }
}

customElements.define('lit-input', LitInput);
