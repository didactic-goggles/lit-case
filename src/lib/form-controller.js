export class FormController {
  constructor(form, options) {
    this.form = form;
    this.options = options;
    this.values = {...options.defaultValues};
    this.errors = {};
    this.form.addController(this);
  }

  getFieldValue(name) {
    return this.values[name] || '';
  }

  setFieldValue(name, value) {
    this.values[name] = value;
    this.form.requestUpdate();
  }

  handleFieldChange(name) {
    return (event) => {
      const value = event.target.value;
      this.setFieldValue(name, value);
      this.validateField(name);
    };
  }

  getFieldOptions(name) {
    return this.options.fields[name];
  }

  validateField(name) {
    const validationOptions = this.getFieldOptions(name);
    validationOptions.forEach(option => {
      switch (option.type) {
        case 'required':
          if (this.checkRequired(this.getFieldValue(name))) {
            this.setError(name, option.message);
          } else {
            this.setError(name, '');
          }
          break;
      }
    });
  }

  checkRequired(fieldValue) {
    return fieldValue === '';
  }

  hasError(name) {
    return this.errors[name];
  }

  hasErrors() {
    return Object.values(this.errors).some(error => error !== '');
  }

  setError(name, error) {
    this.errors[name] = error;
    this.form.requestUpdate();
  }

  getError(name) {
    return this.errors[name];
  }

  handleSubmit(onSubmit) {
    if (this.hasErrors()) {
      return;
    }
    onSubmit(this.values);
  }

  getValues() {
    return {...this.values};
  }

  reset() {
    this.values = {...this.options.defaultValues};
    this.form.requestUpdate();
  }
}
