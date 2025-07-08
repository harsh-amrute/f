let prevPath = "";

export const setPrevPath = (path: string) => {
  prevPath = path;
};

export const getPrevPath = () => prevPath;
