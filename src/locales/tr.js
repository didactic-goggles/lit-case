const tr = {
  employees: {
    title: 'Çalışan Listesi',
  },
  employeesCreate: {
    title: 'Çalışan Ekle',
  },
  employeesUpdate: {
    title: 'Çalışan Düzenle',
  },
  layout: {
    header: {
      employees: 'Çalışanlar',
      addNew: 'Yeni Ekle',
    },
    footer: {
      message: 'Built with ❤️ by Dijwar Bozyel',
    },
  },
  components: {
    employeeList: {
      searchPlaceholder: 'Çalışan Ara',
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
    },
    employeeDeleteAlertDialog: {
      title: 'Emin misiniz?',
      message: '{firstName} {lastName} adlı çalışanı silmek istediğinize emin misiniz?',
      buttonSave: 'Sil',
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
    empty: {
      message: 'Veri bulunamadı',
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
