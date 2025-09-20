import {LitElement, html, css} from 'lit';
import {ContextConsumer} from '@lit/context';
import {employeeContext} from '../../../context/employee.js';
import {updateWhenLocaleChanges, t} from '../../../utils/i18n.js';

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
    }

    .form-helper-message {
      color: var(--muted);
      font-size: 1rem;
      margin-bottom: 1.5rem;
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
    this.employeeId = location.params.id;
    this.employee = this._employeeContext.value.getEmployee(
      Number(this.employeeId)
    );
  }

  render() {
    return html` <h1>${t('employeesUpdate.title')}</h1>

      <div class="form-container">
        ${this.employee &&
        html`
          <div class="form-helper-message">
            ${t('employeesUpdate.helperMessage', {
              firstName: this.employee.firstName,
              lastName: this.employee.lastName,
            })}
          </div>
        `}

        <employee-form .employee=${this.employee}></employee-form>
      </div>`;
  }
}

customElements.define('lit-employee-update-page', EmployeeUpdatePage);
