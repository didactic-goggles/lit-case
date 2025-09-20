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
      width: 100%;
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

    input[type='date'] {
      -webkit-appearance: none;
      -moz-appearance: textfield;
      appearance: none;
      
      &::-webkit-calendar-picker-indicator {
        display: none;
      }
      
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyMS1pY29uIGx1Y2lkZS1jYWxlbmRhci0xIj48cGF0aCBkPSJNMTEgMTRoMXY0Ii8+PHBhdGggZD0iTTE2IDJ2NCIvPjxwYXRoIGQ9Ik0zIDEwaDE4Ii8+PHBhdGggZD0iTTggMnY0Ii8+PHJlY3QgeD0iMyIgeT0iNCIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIvPjwvc3ZnPg==');      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 1.25rem 1.25rem;
      padding-right: 2.25rem;
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
