import {LitElement, html, css} from 'lit';
import {FormController} from '../lib/form-controller.js';
import './ui/input/index.js';
import './ui/button/index.js';
import './ui/label/index.js';
import './ui/form/index.js';
import './ui/select/index.js';
import {t, updateWhenLocaleChanges} from '../utils/i18n.js';
import {ContextConsumer} from '@lit/context';
import {employeeContext} from '../context/employee.js';
import {Router} from '@vaadin/router';
import './ui/alert-dialog/index.js';

export class EmployeeForm extends LitElement {
  _employeeContext = new ContextConsumer(this, {
    context: employeeContext,
  });

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    lit-form::part(form) {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 1rem;
      gap: 1rem;
    }

    @media (min-width: 768px) {
      lit-form::part(form) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (min-width: 1024px) {
      lit-form::part(form) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    .buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .buttons lit-button {
      width: 100%;
      max-width: 200px;
    }
  `;
  static properties = {
    employee: {type: Object},
    openAlertDialog: {type: Boolean},
    tempFormData: {type: Object},
  };

  constructor() {
    super();

    this.employee = null;
    this.formController = null;
    this.openAlertDialog = false;
    this.tempFormData = null;
    updateWhenLocaleChanges(this);
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('employee')) {
      this.formController = new FormController(this, {
        fields: {
          firstName: [
            {
              type: 'required',
              message: t(
                'components.employeesForm.fields.firstName.errorRequired'
              ),
            },
          ],
          lastName: [
            {
              type: 'required',
              message: t(
                'components.employeesForm.fields.lastName.errorRequired'
              ),
            },
          ],
          dateOfEmployment: [
            {
              type: 'required',
              message: t(
                'components.employeesForm.fields.dateOfEmployment.errorRequired'
              ),
            },
          ],
          dateOfBirth: [
            {
              type: 'required',
              message: t(
                'components.employeesForm.fields.dateOfBirth.errorRequired'
              ),
            },
          ],
          phone: [
            {
              type: 'required',
              message: t('components.employeesForm.fields.phone.errorRequired'),
            },
            {
              type: 'phone',
              message: t('components.employeesForm.fields.phone.errorPhone'),
            },
          ],
          email: [
            {
              type: 'required',
              message: t('components.employeesForm.fields.email.errorRequired'),
            },
            {
              type: 'email',
              message: t('components.employeesForm.fields.email.errorEmail'),
            },
          ],
          department: [
            {
              type: 'required',
              message: t(
                'components.employeesForm.fields.department.errorRequired'
              ),
            },
          ],
          position: [
            {
              type: 'required',
              message: t(
                'components.employeesForm.fields.position.errorRequired'
              ),
            },
          ],
        },
        defaultValues: {
          firstName: this.employee?.firstName || '',
          lastName: this.employee?.lastName || '',
          dateOfEmployment: this.employee?.dateOfEmployment || '',
          dateOfBirth: this.employee?.dateOfBirth || '',
          phone: this.employee?.phone || '',
          email: this.employee?.email || '',
          department: this.employee?.department || '',
          position: this.employee?.position || '',
        },
      });
    }
  }

  get departmentOptions() {
    return [
      {
        label: t('components.employeesForm.fields.department.placeholder'),
        value: '',
      },
      {
        label: t('common.department.analytics'),
        value: 'analytics',
      },
      {
        label: t('common.department.tech'),
        value: 'tech',
      },
    ];
  }

  get positionOptions() {
    return [
      {
        label: t('components.employeesForm.fields.position.placeholder'),
        value: '',
      },
      {
        label: t('common.position.senior'),
        value: 'senior',
      },
      {
        label: t('common.position.medior'),
        value: 'medior',
      },
      {
        label: t('common.position.junior'),
        value: 'junior',
      },
    ];
  }

  onCancelClick() {
    if (this.employee) {
      window.history.back();
    } else {
      Router.go('/');
    }
  }

  onSaveClick() {
    this.formController.handleSubmit((data) => this.onSave(data));
  }

  onSave(data) {
    console.log("onSave", data, this);
    if (this.employee) {
      this.openAlertDialog = true;
      this.tempFormData = data;
    } else {
      this._employeeContext.value.addEmployee(data);

      Router.go('/');
    }
  }

  onAlertDialogClose() {
    this.openAlertDialog = false;
  }

  onAlertDialogConfirm() {
    this._employeeContext.value.updateEmployee({
      ...this.tempFormData,
      id: this.employee.id,
    });

    // Router.go(-1);
    window.history.back();
  }

  render() {
    if (!this.formController) return html``;

    return html`<lit-form .controller=${this.formController}>
        <lit-form-item>
          <lit-label
            slot="label"
            for="firstName"
            ?hasError=${this.formController.hasError('firstName')}
          >
            ${t('components.employeesForm.fields.firstName.label')}
          </lit-label>

          <lit-input
            slot="input"
            id="firstName"
            type="text"
            name="firstName"
            placeholder=${t(
              'components.employeesForm.fields.firstName.placeholder'
            )}
            .value=${this.formController.getFieldValue('firstName')}
            @input=${this.formController.handleFieldChange('firstName')}
            ?hasError=${this.formController.hasError('firstName')}
          ></lit-input>

          <lit-form-error
            slot="error"
            message=${this.formController.getError('firstName')}
          >
            ${this.formController.getError('firstName')}
          </lit-form-error>
        </lit-form-item>

        <lit-form-item>
          <lit-label
            slot="label"
            for="lastName"
            ?hasError=${this.formController.hasError('lastName')}
          >
            ${t('components.employeesForm.fields.lastName.label')}
          </lit-label>

          <lit-input
            slot="input"
            id="lastName"
            type="text"
            name="lastName"
            placeholder=${t(
              'components.employeesForm.fields.lastName.placeholder'
            )}
            .value=${this.formController.getFieldValue('lastName')}
            @input=${this.formController.handleFieldChange('lastName')}
            ?hasError=${this.formController.hasError('lastName')}
          ></lit-input>

          <lit-form-error
            slot="error"
            message=${this.formController.getError('lastName')}
          >
            ${this.formController.getError('lastName')}
          </lit-form-error>
        </lit-form-item>

        <lit-form-item>
          <lit-label
            slot="label"
            for="dateOfEmployment"
            ?hasError=${this.formController.hasError('dateOfEmployment')}
          >
            ${t('components.employeesForm.fields.dateOfEmployment.label')}
          </lit-label>

          <lit-input
            slot="input"
            id="dateOfEmployment"
            type="date"
            name="dateOfEmployment"
            placeholder=${t(
              'components.employeesForm.fields.dateOfEmployment.placeholder'
            )}
            .value=${this.formController.getFieldValue('dateOfEmployment')}
            @input=${this.formController.handleFieldChange('dateOfEmployment')}
            ?hasError=${this.formController.hasError('dateOfEmployment')}
          ></lit-input>

          <lit-form-error
            slot="error"
            message=${this.formController.getError('dateOfEmployment')}
          >
            ${this.formController.getError('dateOfEmployment')}
          </lit-form-error>
        </lit-form-item>

        <lit-form-item>
          <lit-label
            slot="label"
            for="dateOfBirth"
            ?hasError=${this.formController.hasError('dateOfBirth')}
          >
            ${t('components.employeesForm.fields.dateOfBirth.label')}
          </lit-label>

          <lit-input
            slot="input"
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            placeholder=${t(
              'components.employeesForm.fields.dateOfBirth.placeholder'
            )}
            .value=${this.formController.getFieldValue('dateOfBirth')}
            @input=${this.formController.handleFieldChange('dateOfBirth')}
            ?hasError=${this.formController.hasError('dateOfBirth')}
          ></lit-input>

          <lit-form-error
            slot="error"
            message=${this.formController.getError('dateOfBirth')}
          >
            ${this.formController.getError('dateOfBirth')}
          </lit-form-error>
        </lit-form-item>

        <lit-form-item>
          <lit-label
            slot="label"
            for="phone"
            ?hasError=${this.formController.hasError('phone')}
          >
            ${t('components.employeesForm.fields.phone.label')}
          </lit-label>

          <lit-input
            slot="input"
            id="phone"
            type="tel"
            name="phone"
            placeholder=${t(
              'components.employeesForm.fields.phone.placeholder'
            )}
            .value=${this.formController.getFieldValue('phone')}
            @input=${this.formController.handleFieldChange('phone')}
            ?hasError=${this.formController.hasError('phone')}
          ></lit-input>

          <lit-form-error
            slot="error"
            message=${this.formController.getError('phone')}
          >
            ${this.formController.getError('phone')}
          </lit-form-error>
        </lit-form-item>

        <lit-form-item>
          <lit-label
            slot="label"
            for="email"
            ?hasError=${this.formController.hasError('email')}
          >
            ${t('components.employeesForm.fields.email.label')}
          </lit-label>

          <lit-input
            slot="input"
            id="email"
            type="email"
            name="email"
            placeholder=${t(
              'components.employeesForm.fields.email.placeholder'
            )}
            .value=${this.formController.getFieldValue('email')}
            @input=${this.formController.handleFieldChange('email')}
            ?hasError=${this.formController.hasError('email')}
          ></lit-input>

          <lit-form-error
            slot="error"
            message=${this.formController.getError('email')}
          >
            ${this.formController.getError('email')}
          </lit-form-error>
        </lit-form-item>

        <lit-form-item>
          <lit-label
            slot="label"
            for="department"
            ?hasError=${this.formController.hasError('department')}
          >
            ${t('components.employeesForm.fields.department.label')}
          </lit-label>

          <lit-select
            slot="input"
            id="department"
            .options=${this.departmentOptions}
            name="department"
            placeholder=${t(
              'components.employeesForm.fields.department.placeholder'
            )}
            .value=${this.formController.getFieldValue('department')}
            @change=${this.formController.handleFieldChange('department')}
            ?hasError=${this.formController.hasError('department')}
          ></lit-select>

          <lit-form-error
            slot="error"
            message=${this.formController.getError('department')}
          >
            ${this.formController.getError('department')}
          </lit-form-error>
        </lit-form-item>

        <lit-form-item>
          <lit-label
            slot="label"
            for="position"
            ?hasError=${this.formController.hasError('position')}
          >
            ${t('components.employeesForm.fields.position.label')}
          </lit-label>

          <lit-select
            slot="input"
            id="position"
            .options=${this.positionOptions}
            name="position"
            placeholder=${t(
              'components.employeesForm.fields.position.placeholder'
            )}
            .value=${this.formController.getFieldValue('position')}
            @change=${this.formController.handleFieldChange('position')}
            ?hasError=${this.formController.hasError('position')}
          ></lit-select>

          <lit-form-error
            slot="error"
            message=${this.formController.getError('position')}
          >
            ${this.formController.getError('position')}
          </lit-form-error>
        </lit-form-item>
      </lit-form>

      <div class="buttons">
        <lit-button variant="solid" color="primary" @click=${this.onSaveClick}>
          ${t('components.employeesForm.buttonSave')}
        </lit-button>

        <lit-button variant="outline" color="secondary" @click=${this.onCancelClick}>
          ${t('components.employeesForm.buttonCancel')}
        </lit-button>
      </div>
      
      <lit-alert-dialog
        ?open=${this.openAlertDialog}
        .title=${t('components.employeesForm.updateAlertDialog.title')}
        .message=${t('components.employeeDeleteAlertDialog.message', {
          firstName: this.employee?.firstName,
          lastName: this.employee?.lastName,
        })}
        .confirmText=${t('components.employeesForm.updateAlertDialog.buttonSave')}
        @close=${this.onAlertDialogClose}
        @confirm=${this.onAlertDialogConfirm}
      >
        ${t('components.employeesForm.alertDialog.title')}
      </lit-alert-dialog>
      `;
  }
}

customElements.define('employee-form', EmployeeForm);
