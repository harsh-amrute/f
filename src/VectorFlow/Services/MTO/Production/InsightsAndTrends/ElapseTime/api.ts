import axios from "axios";

export const getElapsedTimeData = async (graphFlag: number, page?: number) => {
  return await axios.get(
    process.env.REACT_APP_VF_API_HOST_MTO + `/getElapsedTimeData/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        graphflag: graphFlag,
        page,
      },
    }
  );
};

export const getElapsedDaysforDeptPlantData = async (plant: number, dept: number) => {
  return await axios.get(
    process.env.REACT_APP_VF_API_HOST_MTO + `/getElapsedDaysforDeptPlantData/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        plant,
        dept,
      },
    }
  );
};
