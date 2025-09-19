import {LitElement, css, html} from 'lit';
import {t} from '../../../utils/i18n';
import '../icon/index.js';
import '../button/index.js';

export class Pagination extends LitElement {
  static styles = css`
    .pagination {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
  `;

  render() {
    return html`<div class="pagination">
      <lit-button variant="input">
        <lit-icon name="chevronLeft"></lit-icon>
        ${t('components.ui.pagination.previous')}</lit-button
      >
      <lit-button variant="input">
        ${t('components.ui.pagination.next')}
        <lit-icon name="chevronRight"></lit-icon>
      </lit-button>
    </div>`;
  }
}

customElements.define('lit-pagination', Pagination);
