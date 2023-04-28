const setTokenInStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const removeTokenInStorage = (key: string) => {
  localStorage.removeItem(key);
};

const getTokenFromStorage = (key: string): string | null => {
  const value: string | null = localStorage.getItem(key);
  return value;
};

export { setTokenInStorage, getTokenFromStorage, removeTokenInStorage };
