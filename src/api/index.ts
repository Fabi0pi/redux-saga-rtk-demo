export const fetchCounterFromAPI = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(42); 
      }, 1000);
    });
  };
  