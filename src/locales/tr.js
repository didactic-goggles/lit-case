const tr = {
  header: {
    employees: 'Çalışanlar',
    addNew: 'Yeni Ekle',
  },
  home: {},
  components: {
    employeeList: {
      searchPlaceholder: 'Çalışan Ara',
    },
    employeesTable: {
      columns: {
        firstName: 'Ad',
        lastName: 'Soyad',
        email: 'Email',
        phone: 'Telefon',
        department: 'Departman',
        position: 'Pozisyon',
        dateOfBirth: 'Doğum Tarihi',
        dateOfEmployment: 'İşe Alım Tarihi',
        actions: 'İşlemler',
        delete: 'Sil',
        details: 'Detaylar',
      },
      deleteAlert: {
        title: 'Silme İşlemi',
        message: 'Bu çalışanı silmek istediğinize emin misiniz?',
        buttonSave: 'Sil',
      },
    },
    employeesEditDialog: {
      title: 'Çalışan Düzenleme',
      buttonSave: 'Kaydet',
      buttonCancel: 'İptal',
    },
    employeesForm: {
      fields: {
        firstName: {
          label: 'Ad',
          placeholder: 'Adınızı giriniz',
          errorRequired: 'Adınızı giriniz',
        },
      },
      buttonSave: 'Kaydet',
    },
    ui: {
      alertDialog: {
        buttonCancel: 'İptal',
      },
      pagination: {
        previous: 'Önceki',
        next: 'Sonraki',
      }
    },
  },
};

export default tr;
