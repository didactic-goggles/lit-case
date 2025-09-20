import {LitElement, css, html} from 'lit';
import '../../components/employee-list.js';
import {t} from '../../utils/i18n.js';
import './create/index.js';
export class LitEmployeesPage extends LitElement {
  static styles = css`
    h1 {
      color: var(--primary);
    }
  `;

  render() {
    return html`
      <h1>${t('employees.title')}</h1>

      <employee-list></employee-list>
    `;
  }
}
customElements.define('lit-employees-page', LitEmployeesPage);
