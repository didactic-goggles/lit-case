export class FormController {
  constructor(form, options) {
    this.form = form;
    this.options = options;
    this.values = {...options.defaultValues};
    this.defaultValues = {...options.defaultValues};
    this.dirtyFields = {};
    this.errors = {};
    this.form.addController(this);
  }

  setDirtyField(name, value) {
    this.dirtyFields[name] = value !== this.defaultValues[name];
  }

  getFieldValue(name) {
    return this.values[name] || '';
  }

  setFieldValue(name, value) {
    this.values[name] = value;
    this.form.requestUpdate();

    this.setDirtyField(name, value);
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
    for (const option of validationOptions) {
      switch (option.type) {
        case 'required':
          if (this.checkRequired(this.getFieldValue(name))) {
            this.setError(name, option.message);
            return;
          } else {
            this.setError(name, '');
          }
          break;
        case 'email':
          if (this.checkEmail(this.getFieldValue(name))) {
            this.setError(name, option.message);
            return;
          } else {
            this.setError(name, '');
          }
          break;
        case 'phone':
          if (this.checkPhone(this.getFieldValue(name))) {
            this.setError(name, option.message);
            return;
          } else {
            this.setError(name, '');
          }
          break;
      }
    }
  }

  validateForm() {
    Object.keys(this.options.fields).forEach((name) => {
      this.validateField(name);
    });
  }

  checkRequired(fieldValue) {
    return fieldValue === '';
  }

  checkEmail(fieldValue) {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue);
  }

  checkPhone(fieldValue) {
    return fieldValue.length < 5;
  }

  hasError(name) {
    return this.errors[name];
  }

  hasErrors() {
    return Object.values(this.errors).some((error) => error !== '');
  }

  setError(name, error) {
    this.errors[name] = error;
    this.form.requestUpdate();
  }

  getError(name) {
    return this.errors[name];
  }

  handleSubmit(onSubmit) {
    this.validateForm();

    if (this.hasErrors()) {
      return;
    }
    onSubmit(this.values);
  }

  isFormDirty() {
    return Object.values(this.dirtyFields).some((dirty) => dirty);
  }
}
