const tr = {
  employees: {
    title: 'Çalışan Listesi',
  },
  employeesCreate: {
    title: 'Çalışan Ekle',
  },
  employeesUpdate: {
    title: 'Çalışan Düzenle',
    helperMessage: '{firstName} {lastName} adlı çalışanı düzenlemektesiniz',
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
      message:
        '{firstName} {lastName} adlı çalışanı silmek istediğinize emin misiniz?',
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
        lastName: {
          label: 'Soyad',
          placeholder: 'Soyadınızı giriniz',
          errorRequired: 'Soyadınızı giriniz',
        },
        dateOfEmployment: {
          label: 'İşe Alım Tarihi',
          placeholder: 'İşe Alım Tarihinizi giriniz',
          errorRequired: 'İşe Alım Tarihinizi giriniz',
        },
        dateOfBirth: {
          label: 'Doğum Tarihi',
          placeholder: 'Doğum Tarihinizi giriniz',
          errorRequired: 'Doğum Tarihinizi giriniz',
        },
        email: {
          label: 'Email',
          placeholder: 'Emailinizi giriniz',
          errorRequired: 'Emailinizi giriniz',
          errorEmail: 'Geçersiz email',
        },
        phone: {
          label: 'Telefon',
          placeholder: 'Telefonunuzu giriniz',
          errorRequired: 'Telefonunuzu giriniz',
          errorPhone: 'Geçersiz telefon',
        },
        department: {
          label: 'Departman',
          placeholder: 'Departmanınızı giriniz',
          errorRequired: 'Departmanınızı giriniz',
        },
        position: {
          label: 'Pozisyon',
          placeholder: 'Pozisyonunuzu giriniz',
          errorRequired: 'Pozisyonunuzu giriniz',
        },
      },
      updateAlertDialog: {
        title: 'Çalışan Düzenleme',
        message:
          '{firstName} {lastName} adlı çalışanı düzenlemektesiniz. Yeni bilgileri kaydetmek istediğinize emin misiniz?',
        buttonSave: 'Kaydet',
      },
      buttonSave: 'Kaydet',
      buttonCancel: 'İptal',
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
      },
    },
  },
  common: {
    position: {
      junior: 'Yeni',
      medior: 'Orta',
      senior: 'Kıdemli',
    },
    department: {
      analytics: 'Analiz',
      tech: 'Teknoloji',
    },
  },
};

export default tr;
