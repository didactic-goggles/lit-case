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
    return html`<form @submit=${this.handleFormSubmit}>
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
  static properties = {
    hasError: {type: Boolean, attribute: 'has-error'},
  };

  constructor() {
    super();
    this.hasError = false;
  }

  render() {
    if (!this.hasError) {
      return html``;
    }
    
    return html`<div><slot></slot></div>`;
  }
}

customElements.define('lit-form-error', LitFormError);
