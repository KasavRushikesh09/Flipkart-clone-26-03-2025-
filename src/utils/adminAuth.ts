// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password123';

export const loginAdmin = (email: string, password: string): boolean => {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem('adminAuth', JSON.stringify({ isAuthenticated: true }));
    // Dispatch a custom event to notify listeners
    window.dispatchEvent(new Event('adminAuthChange'));
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem('adminAuth');
  // Dispatch a custom event to notify listeners
  window.dispatchEvent(new Event('adminAuthChange'));
};

export const isAdminAuthenticated = (): boolean => {
  const authData = localStorage.getItem('adminAuth');
  if (authData) {
    try {
      const parsedData = JSON.parse(authData);
      return parsedData.isAuthenticated === true;
    } catch (error) {
      console.error('Error parsing adminAuth from localStorage:', error);
      return false;
    }
  }
  return false;
};