export const ApiService = {
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  async getProjects() {
    try {
      await this.delay(800); // Simulasi Warm/Cold Load
      const response = await fetch('./data/projects.json');
      if (!response.ok) throw new Error('Gagal mengambil data proyek');
      return await response.json();
    } catch (error) {
      console.error('Error in getProjects:', error);
      throw error;
    }
  },

  async getServices() {
    try {
      const response = await fetch('./data/services.json');
      if (!response.ok) throw new Error('Gagal mengambil data layanan');
      return await response.json();
    } catch (error) {
      console.error('Error in getServices:', error);
      throw error;
    }
  },

  async getProfile() {
    try {
      const response = await fetch('./data/profile.json');
      if (!response.ok) throw new Error('Gagal mengambil data profil');
      return await response.json();
    } catch (error) {
      console.error('Error in getProfile:', error);
      throw error;
    }
  },

  // Mock RESTful POST submission using JSONPlaceholder
  async submitConsultationForm(formData) {
    try {
      await this.delay(1200); // Simulasi Network Request
      
      const payload = {
        title: formData.get('client_name'),
        body: formData.get('project_notes'),
        userId: 1, // Simulasi
        email: formData.get('client_email'),
        service: formData.get('service_type')
      };

      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Gagal mengirim formulir');
      return await response.json();
    } catch (error) {
      console.error('Error in submitConsultationForm:', error);
      throw error;
    }
  }
};
