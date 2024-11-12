import React, { createContext, useState } from 'react';


export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const value = {
    search,setSearch,showSearch,setShowSearch
  }

  return (
    <ShopContext.Provider value={{ search, setSearch, showSearch, setShowSearch }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;