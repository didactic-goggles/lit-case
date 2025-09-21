import {LitElement, html, css} from 'lit';
import {t, updateWhenLocaleChanges} from '../utils/i18n.js';
import './ui/card/index.js';
import './ui/button/index.js';
import './ui/icon/index.js';
import {formatDate} from '../utils/format-date.js';
import {ContextConsumer} from '@lit/context';
import {employeeContext} from '../context/employee.js';

export class EmployeeCard extends LitElement {
  static styles = css`
    .footer {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      gap: 0.5rem;
      margin-top: 1.25rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      row-gap: 1.25rem;
      column-gap: 0.5rem;
    }

    li {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    li span:first-child {
      color: var(--muted);
    }

    li span {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;

  _employeeContext = new ContextConsumer(this, {
    context: employeeContext,
  });

  static properties = {
    employee: {type: Object},
  };

  constructor() {
    super();

    updateWhenLocaleChanges(this);
  }

  get fields() {
    return [
      {
        label: t('components.employeeList.columns.firstName'),
        value: this.employee.firstName,
      },
      {
        label: t('components.employeeList.columns.lastName'),
        value: this.employee.lastName,
      },
      {
        label: t('components.employeeList.columns.email'),
        value: this.employee.email,
      },
      {
        label: t('components.employeeList.columns.phone'),
        value: this.employee.phone,
      },
      {
        label: t('components.employeeList.columns.department'),
        value: this.employee.department,
      },
      {
        label: t('components.employeeList.columns.position'),
        value: this.employee.position,
      },
      {
        label: t('components.employeeList.columns.dateOfBirth'),
        value: formatDate(this.employee.dateOfBirth),
      },
      {
        label: t('components.employeeList.columns.dateOfEmployment'),
        value: formatDate(this.employee.dateOfEmployment),
      },
    ];
  }

  onEmployeeDeleteClick() {
    this._employeeContext.value.onOpenDeleteDialog(this.employee);
  }

  render() {
    return html`<lit-card>
      <div slot="content">
        <ul>
          ${this.fields.map(
            (field) => html`<li>
              <span>${field.label}</span>
              <span title=${field.value}>${field.value}</span>
            </li>`
          )}
        </ul>
      </div>

      <div slot="footer">
        <div class="footer">
          <lit-button
            variant="solid"
            color="secondary"
            href="/employees/update/${this.employee.id}"
          >
            <lit-icon name="edit"></lit-icon>

            <span>${t('components.employeeList.columns.details')}</span>
          </lit-button>
          <lit-button
            @click=${() => this.onEmployeeDeleteClick(this.employee)}
            variant="solid"
            color="primary"
          >
            <span>${t('components.employeeList.columns.delete')}</span>

            <lit-icon name="trash"></lit-icon>
          </lit-button>
        </div>
      </div>
    </lit-card>`;
  }
}

customElements.define('employee-card', EmployeeCard);
