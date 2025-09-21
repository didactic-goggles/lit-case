import {LitElement, html, css} from 'lit';
import {ContextConsumer} from '@lit/context';
import {employeeContext} from '../../../context/employee.js';
import {updateWhenLocaleChanges, t} from '../../../utils/i18n.js';
import {Router} from '@vaadin/router';
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
    redirectUrl: {type: String},
  };

  constructor() {
    super();

    this.employeeId = null;
    this.employee = null;
    this.redirectUrl = null;

    updateWhenLocaleChanges(this);
  }

  onAfterEnter(location) {
    this.employeeId = location.params[0];
    this.employee = this._employeeContext.value.getEmployee(
      Number(this.employeeId)
    );
  }

  onBeforeLeave(location, commands) {
    const form = this.shadowRoot.querySelector('employee-form');
    if (
      form &&
      form.formController &&
      form.formController.isFormDirty?.() &&
      !this.redirectUrl
    ) {
      form.openExitAlertDialog = true;
      this.redirectUrl = location.pathname + location.search;

      return commands.prevent();
    }
  }

  onExitAlertConfirmed() {
    Router.go(this.redirectUrl);
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

              <employee-form
                .employee=${this.employee}
                @exit-alert-confirmed=${this.onExitAlertConfirmed}
              ></employee-form>
            `
          : html`<lit-empty></lit-empty>`}
      </div>`;
  }
}

customElements.define('lit-employee-update-page', EmployeeUpdatePage);
