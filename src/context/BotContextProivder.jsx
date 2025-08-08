import { createContext, useEffect, useState } from 'react';

const BotContext = createContext();

const BotContextProivder = (props) => {
  const [botSearch, setBotSearch] = useState(null);

  const getBotSearch = (bot) => {
    setBotSearch(bot);
  };

  useEffect(() => {
    getBotSearch;
  }, []);

  return (
    <BotContext.Provider value={{ botSearch, getBotSearch }}>
      {props.children}
    </BotContext.Provider>
  );
};

export default BotContext;

export { BotContextProivder };
