import {LitElement, html, css} from 'lit';
import './layout/header.js';
import './layout/main.js';
import './layout/footer.js';
import {localeManager} from './utils/i18n.js';
import './context/employee.js';

export class LitIndex extends LitElement {
  static styles = css`
    :host {
      height: 100svh;
      display: flex;
      flex-direction: column;
    }
  `;
  constructor() {
    super();

    localeManager.init();
  }

  render() {
    return html`
      <lit-header></lit-header>

      <employee-context-provider>
        <lit-main></lit-main>

        <lit-footer></lit-footer>
      </employee-context-provider>
    `;
  }
}
customElements.define('lit-index', LitIndex);
