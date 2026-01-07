
import { useContext, createContext, useState } from 'react';
const PannelContext = createContext();
export const usePannelContext = () => useContext(PannelContext);

const PannelContextProvider = ({ children }) => {
  const [showPannel, setShowPannel] = useState(false);

  return (
    <PannelContext.Provider value={{ showPannel, setShowPannel, }}>
      {children}
    </PannelContext.Provider>
  );
};

export default PannelContextProvider;