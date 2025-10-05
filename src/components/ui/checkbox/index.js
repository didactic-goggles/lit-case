import {LitElement, html, css} from 'lit';

export class LitCheckbox extends LitElement {
  static styles = css`
    input[type='checkbox'] {
      -webkit-appearance: none;
      appearance: none;
      background-color: var(--input-bg);
      margin: 0;
      color: currentColor;
      width: 1.15em;
      height: 1.15em;
      border: 2px solid var(--input-border);
      border-radius: 0.25em;
      transform: translateY(-0.075em);
      display: grid;
      place-content: center;
    }

    input[type='checkbox']::before {
      content: '';
      width: 0.65em;
      height: 0.65em;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--primary);
      transform-origin: bottom left;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }

    input[type='checkbox']:checked::before {
      transform: scale(1);
      background-color: CanvasText;
    }

    input[type='checkbox']:focus {
      box-shadow: var(--input-focus-box-shadow);
    }

    input[type='checkbox']:hover {
      background-color: var(--input-hover);
    }
  `;

  static properties = {
    checked: {type: Boolean, attribute: 'checked'},
  };

  constructor() {
    super();
    this.checked = false;
  }

  onChange(event) {
    this.dispatchEvent(
      new CustomEvent('change', {detail: {value: event.target.checked}})
    );
  }

  render() {
    return html`<input
      type="checkbox"
      @change=${this.onChange}
      .checked=${this.checked}
    />`;
  }
}

customElements.define('lit-checkbox', LitCheckbox);
