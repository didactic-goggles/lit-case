import {LitElement, html} from 'lit';
import './ui/dialog/index.js';
import './ui/button/index.js';
import './employee-form.js';
import {t} from '../utils/i18n.js';

export class EmployeeEditDialog extends LitElement {
  static properties = {
    open: {type: Boolean},
    employee: {type: Object},
  };

  onClose() {
    this.dispatchEvent(new CustomEvent('close', {bubbles: true}));
  }

  onSave(data) {
    console.log('employee edit dialog form submitted', data);
  }

  onSaveButtonClick() {
    this.onSave();

    this.onClose();
  }

  render() {
    if (!this.open) return html``;

    return html`
      <lit-dialog ?open=${this.open} @close=${this.onClose}>
        <span slot="title">${t('components.employeesEditDialog.title')}</span>

        <div slot="content">
          <employee-form
            .employee=${this.employee}
            @onSubmit=${this.onSave}
          ></employee-form>
        </div>

        <div slot="footer">
          <lit-button @click=${this.onClose}
            >${t('components.employeesEditDialog.buttonCancel')}</lit-button
          >
          <lit-button @click=${this.onSaveButtonClick}
            >${t('components.employeesEditDialog.buttonSave')}</lit-button
          >
        </div>
      </lit-dialog>
    `;
  }
}

customElements.define('employee-edit-dialog', EmployeeEditDialog);
