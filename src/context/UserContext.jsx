import React, { useState, useContext, createContext } from "react";

const defaultValue = {
  user: {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    userRoleId: -1,
    id: -1,
    contactInfoId: -1,
  },
};

const UserContext = createContext(defaultValue);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(defaultValue.user);

  const update = (field, value) =>
    setUser((prevUser) => {
      return {
        ...prevUser,
        [field]: value,
      };
    });

  const contextValue = {
    user,
    update
  };

  return (
    <>
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    </>
  );
}

export const useUserContext = () => useContext(UserContext);
