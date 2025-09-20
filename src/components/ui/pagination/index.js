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

  static properties = {
    page: {type: Number},
    totalPages: {type: Number},
  };

  renderActiveButton(page) {
    return html`<lit-button variant="text" size="icon"> <span>${page}</span></lit-button>`;
  }

  renderEllipsis() {
    return html`<lit-button variant="text" size="icon">
      <lit-icon name="ellipsis"></lit-icon>
    </lit-button>`;
  }

  render() {
    return html`<div class="pagination">
      <lit-button variant="text" size="icon">
        <lit-icon name="chevronLeft"></lit-icon>

        <span class="sr-only">${t('components.ui.pagination.previous')}</span>
      </lit-button>

      ${this.renderActiveButton(this.page)}
      ${this.renderEllipsis()}

      <lit-button variant="text" size="icon">
        <lit-icon name="chevronRight"></lit-icon>

        <span class="sr-only">${t('components.ui.pagination.next')}</span>
      </lit-button>
    </div>`;
  }
}

customElements.define('lit-pagination', Pagination);
