import {LitElement, css, html} from 'lit';

export class LitLabel extends LitElement {
  static styles = css`
    label {
      font-size: 1rem;
    }
  `;

  static properties = {
    for: {type: String, attribute: 'for'},
  };

  constructor() {
    super();
    this.for = '';
  }

  render() {
    return html`<label for=${this.for}><slot></slot></label>`;
  }
}

customElements.define('lit-label', LitLabel);
