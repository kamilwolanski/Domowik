const Logout = () => {
  localStorage.removeItem('token');
  window.location.reload();

  return null;
};

export default Logout;
