import {LitElement, html} from 'lit';
import {createContext, ContextProvider} from '@lit/context';
import mockEmployees from '../data/employees.js';

export class EmployeeContextProvider extends LitElement {
  _provider = new ContextProvider(this, {
    context: employeeContext,
    initialValue: {
      employees: mockEmployees,
      deleteEmployee: this.deleteEmployee.bind(this),
    },
  });

  deleteEmployee(id) {
    const currentValue = this._provider.value;
    const updatedEmployees = currentValue.employees.filter(
      (employee) => employee.id !== id
    );
    this._provider.value.employees = updatedEmployees;

    this.requestUpdate();
  }

  render() {
    return html` <slot></slot> `;
  }
}

customElements.define('employee-context-provider', EmployeeContextProvider);

export const employeeContext = createContext('employeeContext');
