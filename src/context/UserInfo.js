import { createContext, useState } from 'react';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    firstName: 'Engramar',
    lastName: 'Bollas',
    photo: 'https://randomuser.me/api/portraits/men/78.jpg',
    email: 'engramar@code.sydney',
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
