import {LitElement, html} from 'lit';
import './ui/alert-dialog/index.js';
import {t} from '../utils/i18n.js';
import {ContextConsumer} from '@lit/context';
import {employeeContext} from '../context/employee.js';

export class EmployeeDeleteAlertDialog extends LitElement {
  _employeeContext = new ContextConsumer(this, {
    context: employeeContext,
    subscribe: true,
  });

  onDeleteDialogClose() {
    this._employeeContext.value.onDeleteDialogClose();
  }

  onDeleteDialogConfirm() {
    this._employeeContext.value.onDeleteDialogConfirm();
  }

  get alertDialogMessage() {
    const selectedEmployee = this._employeeContext.value.selectedEmployee;
    if (selectedEmployee) {
      return t('components.employeeDeleteAlertDialog.message', {
        firstName: selectedEmployee.firstName,
        lastName: selectedEmployee.lastName,
      });
    } else {
      const count = this._employeeContext.value.selectedEmployees.length;
      return t('components.employeeDeleteAlertDialog.messageMultiple', {
        count: count,
      });
    }
  }

  render() {
    return html`
      <lit-alert-dialog
        .open=${this._employeeContext.value.openDeleteDialog}
        .title=${t('components.employeeDeleteAlertDialog.title')}
        .message=${this.alertDialogMessage}
        .confirmText=${t('components.employeeDeleteAlertDialog.buttonSave')}
        @close=${this.onDeleteDialogClose}
        @confirm=${this.onDeleteDialogConfirm}
      ></lit-alert-dialog>
    `;
  }
}

customElements.define('employee-delete-alert-dialog', EmployeeDeleteAlertDialog);