import {LitElement, css, html} from 'lit';

export class LitForm extends LitElement {
  static properties = {
    controller: {type: Object},
  };

  constructor() {
    super();
    this.controller = null;
  }

  handleFormSubmit(event) {
    event.preventDefault();
  }

  render() {
    return html`<form part="form" @submit=${this.handleFormSubmit}>
      <slot></slot>
    </form>`;
  }
}

customElements.define('lit-form', LitForm);

export class LitFormItem extends LitElement {
  static styles = css`
    div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `;

  render() {
    return html`<div>
      <slot name="label"></slot>
      <slot name="input"></slot>
      <slot name="error"></slot>
    </div>`;
  }
}

customElements.define('lit-form-item', LitFormItem);

export class LitFormError extends LitElement {
  static styles = css`
    div {
      font-size: 0.875rem;
      color: var(--destructive);
    }
  `;

  static properties = {
    message: {type: String, attribute: 'message'},
  };

  constructor() {
    super();
    this.message = '';
  }

  render() {
    if (!this.message) {
      return html``;
    }
    
    return html`<div>${this.message}</div>`;
  }
}

customElements.define('lit-form-error', LitFormError);
