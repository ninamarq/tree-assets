const debounce = (callback: () => void, delay: number) => {
  let timeoutId: string | number | NodeJS.Timeout | undefined;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), delay);
  };
};

export { debounce };
