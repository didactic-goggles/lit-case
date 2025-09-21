import {LitElement, html, css} from 'lit';
import {t} from '../../../utils/i18n.js';
import '../../../components/employee-form.js';

export class EmployeeCreatePage extends LitElement {
  static styles = css`
    h1 {
      color: var(--primary);
    }

    .form-container {
      background-color: var(--card);
      padding: 4rem 4rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border);
      height: 100%;
      box-shadow: var(--card-shadow);
    }

    @media (max-width: 768px) {
      .form-container {
        padding: 2rem 2rem;
      }
    }
  `;

  render() {
    return html` <h1>${t('employeesCreate.title')}</h1>

      <div class="form-container">
        <employee-form></employee-form>
      </div>`;
  }
}

customElements.define('lit-employee-create-page', EmployeeCreatePage);
