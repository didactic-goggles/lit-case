import {LitElement, html} from 'lit';
import {FormController} from '../lib/form-controller.js';
import './ui/input/index.js';
import './ui/button/index.js';
import './ui/label/index.js';
import './ui/form/index.js';
import {t} from '../utils/i18n.js';

export class EmployeeForm extends LitElement {
  static properties = {
    employee: {type: Object},
  };

  constructor() {
    super();
    this.employee = null;
    this.formController = null;
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
        },
        defaultValues: {
          firstName: this.employee?.firstName || '',
        },
      });
    }
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
          ?hasError=${this.formController.hasError('firstName')}
        >
          ${this.formController.getError('firstName')}
        </lit-form-error>
      </lit-form-item>
    </lit-form>`;
  }
}

customElements.define('employee-form', EmployeeForm);
