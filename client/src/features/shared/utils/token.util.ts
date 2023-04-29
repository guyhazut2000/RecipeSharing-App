const setTokenInStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const removeTokenFromStorage = (key: string) => {
  localStorage.removeItem(key);
};

const getTokenFromStorage = (key: string): string => {
  const value: string = localStorage.getItem(key) || "";
  return value;
};

export { setTokenInStorage, getTokenFromStorage, removeTokenFromStorage };
