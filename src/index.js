import {LitElement, html} from 'lit';
import './layout/header.js';
import './layout/main.js';
import './layout/footer.js';
import {localeManager} from './utils/i18n.js';
import './context/employee.js';

export class LitIndex extends LitElement {
  constructor() {
    super();
    localeManager.init();
  }

  render() {
    return html`
      <employee-context-provider>
        <lit-header></lit-header>

        <lit-main></lit-main>
        
        <lit-footer></lit-footer>
      </employee-context-provider>
    `;
  }
}
customElements.define('lit-index', LitIndex);
