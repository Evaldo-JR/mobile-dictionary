import { createContext, useContext, useState } from 'react';

type DatabaseContextType = {
  isDatabaseReady: boolean;
  setIsDatabaseReady: (ready: boolean) => void;
};

const DatabaseContext = createContext<DatabaseContextType>({
  isDatabaseReady: false,
  setIsDatabaseReady: () => {},
});

export const useDatabase = () => useContext(DatabaseContext);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);

  return (
    <DatabaseContext.Provider value={{ isDatabaseReady, setIsDatabaseReady }}>
      {children}
    </DatabaseContext.Provider>
  );
}
