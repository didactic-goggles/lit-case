const en = {
  employees: {
    title: 'Employee List',
  },
  employeesCreate: {
    title: 'Add Employee',
  },
  employeesUpdate: {
    title: 'Edit Employee',
    helperMessage: 'You are editing {firstName} {lastName}',
  },
  layout: {
    header: {
      employees: 'Employees',
      addNew: 'Add New',
    },
    footer: {
      message: 'by Dijwar Bozyel',
    },
  },
  notFound: {
    title: 'Page Not Found',
    button: 'Return to Home',
  },
  components: {
    employeeList: {
      searchPlaceholder: 'Search Employee',
      columns: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        department: 'Department',
        position: 'Position',
        dateOfBirth: 'Date of Birth',
        dateOfEmployment: 'Date of Employment',
        actions: 'Actions',
        delete: 'Delete',
        details: 'Details',
      },
    },
    employeeDeleteAlertDialog: {
      title: 'Are you sure?',
      message: 'Selected Employee record of {firstName} {lastName} will be deleted',
      buttonSave: 'Delete',
    },
    employeesForm: {
      fields: {
        firstName: {
          label: 'First Name',
          placeholder: 'Enter your first name',
          errorRequired: 'First name is required',
        },
        lastName: {
          label: 'Last Name',
          placeholder: 'Enter your last name',
          errorRequired: 'Last name is required',
        },
        dateOfEmployment: {
          label: 'Date of Employment',
          placeholder: 'Enter your employment date',
          errorRequired: 'Employment date is required',
        },
        dateOfBirth: {
          label: 'Date of Birth',
          placeholder: 'Enter your birth date',
          errorRequired: 'Birth date is required',
        },
        email: {
          label: 'Email',
          placeholder: 'Enter your email',
          errorRequired: 'Email is required',
          errorEmail: 'Invalid email',
        },
        phone: {
          label: 'Phone',
          placeholder: 'Enter your phone number',
          errorRequired: 'Phone number is required',
          errorPhone: 'Invalid phone number',
        },
        department: {
          label: 'Department',
          placeholder: 'Enter your department',
          errorRequired: 'Department is required',
        },
        position: {
          label: 'Position',
          placeholder: 'Enter your position',
          errorRequired: 'Position is required',
        },
      },
      updateAlertDialog: {
        title: 'Edit Employee',
        message: 'You are editing {firstName} {lastName}. Are you sure you want to save the new information?',
        buttonSave: 'Save',
      },
      exitAlertDialog: {
        title: 'Exit?',
        message: 'There are unsaved changes. Are you sure you want to exit?',
        buttonConfirm: 'Exit',
      },
      buttonSave: 'Save',
      buttonCancel: 'Cancel',
    },
    empty: {
      message: 'No data found',
    },
    ui: {
      alertDialog: {
        buttonCancel: 'Cancel',
      },
      pagination: {
        previous: 'Previous',
        next: 'Next',
      },
    },
  },
  common: {
    position: {
      junior: 'Junior',
      medior: 'Mid-level',
      senior: 'Senior',
    },
    department: {
      analytics: 'Analytics',
      tech: 'Technology',
    },
  },
};

export default en;
