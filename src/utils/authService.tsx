const handleAuthentication = (jwt : any) => {
    localStorage.setItem('jwtToken', jwt);
  };
  
  const logoutUser = () => {
    localStorage.removeItem('jwtToken');
  };
  
  export { handleAuthentication, logoutUser };
  