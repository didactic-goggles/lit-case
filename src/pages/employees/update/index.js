import {LitElement, html, css} from 'lit';
import {ContextConsumer} from '@lit/context';
import {employeeContext} from '../../../context/employee.js';
import {updateWhenLocaleChanges, t} from '../../../utils/i18n.js';
import '../../../components/empty.js';

export class EmployeeUpdatePage extends LitElement {
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
      position: relative;
    }

    .form-helper-message {
      font-size: 0.875rem;
      position: absolute;
      top: 1rem;
      left: 1rem;
    }

    @media (max-width: 768px) {
      .form-container {
        padding: 3rem 2rem 2rem 2rem;
      }
    }
  `;

  _employeeContext = new ContextConsumer(this, {
    context: employeeContext,
  });

  static properties = {
    employeeId: {type: String},
    employee: {type: Object},
  };

  constructor() {
    super();

    this.employeeId = null;
    this.employee = null;

    updateWhenLocaleChanges(this);
  }

  onAfterEnter(location) {
    this.employeeId = location.params[0];
    this.employee = this._employeeContext.value.getEmployee(
      Number(this.employeeId)
    );
  }

  render() {
    return html` <h1>${t('employeesUpdate.title')}</h1>

      <div class="form-container">
        ${this.employee
          ? html`
              <div class="form-helper-message">
                ${t('employeesUpdate.helperMessage', {
                  firstName: this.employee.firstName,
                  lastName: this.employee.lastName,
                })}
              </div>

              <employee-form .employee=${this.employee}></employee-form>
            `
          : html`<lit-empty></lit-empty>`}
      </div>`;
  }
}

customElements.define('lit-employee-update-page', EmployeeUpdatePage);
