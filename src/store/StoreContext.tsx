import React, {createContext, useContext} from 'react';

import Store, {StoreType} from './Store';

const StoreContext = createContext<StoreType>({} as StoreType);

const StoreProvider: React.FC = ({children}) => (
  <StoreContext.Provider value={Store}>{children}</StoreContext.Provider>
);

const useStore = () => useContext(StoreContext);

export {StoreProvider, useStore};
