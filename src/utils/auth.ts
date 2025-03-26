export const isAdmin = (): boolean => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.role === 'admin';
    }
    return false;
  };
  
  export const setAdminUser = () => {
    localStorage.setItem(
      'user',
      JSON.stringify({ name: 'Admin User', avatar: 'https://via.placeholder.com/40', role: 'admin' })
    );
  };