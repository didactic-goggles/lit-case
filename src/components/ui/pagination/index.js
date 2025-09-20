import {LitElement, css, html} from 'lit';
import {t} from '../../../utils/i18n';
import '../icon/index.js';
import '../button/index.js';

export class Pagination extends LitElement {
  BUTTON_COUNT = 5;

  static styles = css`
    .pagination {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;
    }
  `;

  static properties = {
    page: {type: Number},
    totalPages: {type: Number},
  };

  getPageNumbers() {
    const current = this.page;
    const total = this.totalPages;
    const buttonCount = this.BUTTON_COUNT;

    if (total <= buttonCount) {
      return Array.from({length: total}, (_, i) => i + 1);
    }

    const half = Math.floor(buttonCount / 2);
    let start = Math.max(current - half, 1);
    let end = Math.min(start + buttonCount - 1, total);

    if (end === total) {
      start = Math.max(end - buttonCount + 1, 1);
    }

    return Array.from({length: end - start + 1}, (_, i) => start + i);
  }

  shouldShowStartEllipsis() {
    const pageNumbers = this.getPageNumbers();
    return pageNumbers[0] > 2;
  }

  shouldShowEndEllipsis() {
    const pageNumbers = this.getPageNumbers();
    return pageNumbers[pageNumbers.length - 1] < this.totalPages - 1;
  }

  renderPageButton(pageNum) {
    return html`<lit-button
      variant="ghost"
      size="icon"
      ?active=${pageNum === this.page}
      @click=${() => this.onPageClick(pageNum)}
    >
      <span>${pageNum}</span>
    </lit-button>`;
  }

  renderEllipsis() {
    return html`<lit-button variant="ghost" size="icon" disabled>
      <lit-icon name="ellipsis"></lit-icon>
    </lit-button>`;
  }

  onPageClick(page) {
    if (page !== this.page) {
      this.dispatchEvent(
        new CustomEvent('page-change', {
          detail: {page},
        })
      );
    }
  }

  onPreviousClick() {
    if (this.page > 1) {
      this.onPageClick(this.page - 1);
    }
  }

  onNextClick() {
    if (this.page < this.totalPages) {
      this.onPageClick(this.page + 1);
    }
  }

  render() {
    if (this.totalPages < 1) {
      return html``;
    }

    const pageNumbers = this.getPageNumbers();
    const showStartEllipsis = this.shouldShowStartEllipsis();
    const showEndEllipsis = this.shouldShowEndEllipsis();

    return html`<div class="pagination">
      <lit-button
        variant="ghost"
        size="icon"
        ?disabled=${this.page === 1}
        @click=${this.onPreviousClick}
      >
        <lit-icon name="chevronLeft"></lit-icon>
        <span class="sr-only">${t('components.ui.pagination.previous')}</span>
      </lit-button>

      ${pageNumbers[0] > 1 ? this.renderPageButton(1) : ''}
      ${showStartEllipsis ? this.renderEllipsis() : ''}
      ${pageNumbers.map((pageNum) => this.renderPageButton(pageNum))}
      ${showEndEllipsis ? this.renderEllipsis() : ''}
      ${pageNumbers[pageNumbers.length - 1] < this.totalPages
        ? this.renderPageButton(this.totalPages)
        : ''}

      <lit-button
        variant="ghost"
        size="icon"
        ?disabled=${this.page === this.totalPages}
        @click=${this.onNextClick}
      >
        <lit-icon name="chevronRight"></lit-icon>
        <span class="sr-only">${t('components.ui.pagination.next')}</span>
      </lit-button>
    </div>`;
  }
}

customElements.define('lit-pagination', Pagination);
