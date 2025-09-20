import {LitElement, html, css} from 'lit';
import {t} from '../utils/i18n.js';

export class Empty extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }
  `;

  static properties = {
    message: {type: String},
  };

  constructor() {
    super();
    this.message = t('components.empty.message');
  }

  render() {
    return html`<span>${this.message}</span>`;
  }
}

customElements.define('lit-empty', Empty);
