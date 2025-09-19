import {LitElement, html} from 'lit';
import '../../components/employee-list.js';

export class EmployeesPage extends LitElement {
  render() {
    return html`<employee-list></employee-list>`;
  }
}

customElements.define('lit-employees-page', EmployeesPage);
