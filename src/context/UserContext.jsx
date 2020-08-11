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

  const updateId = (newId) =>
    setUser((prevUser) => {
      return {
        ...prevUser,
        id: newId,
      };
    });

  const updateContactInfoId = (newId) =>
    setUser((prevUser) => {
      return {
        ...prevUser,
        contactInfoId: newId,
      };
    });

  const updateUsername = (newUsername) =>
    setUser((prevUser) => {
      return {
        ...prevUser,
        username: newUsername,
      };
    });

  const updatePassword = (newPassword) =>
    setUser((prevUser) => {
      return {
        ...prevUser,
        password: newPassword,
      };
    });

  const updateUserRoleId = (newUserRoleId) =>
    setUser((prevUser) => {
      return {
        ...prevUser,
        userRoleId: newUserRoleId,
      };
    });

  const updateFirstname = (newFirstname) =>
    setUser((prevUser) => {
      return {
        ...prevUser,
        firstName: newFirstname,
      };
    });

  const updateLastname = (newLastname) =>
    setUser((prevUser) => {
      return {
        ...prevUser,
        lastName: newLastname,
      };
    });

  const contextValue = {
    user,
    updatePassword,
    updateUsername,
    updateUserRoleId,
    updateFirstname,
    updateLastname,
    updateId,
    updateContactInfoId,
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
