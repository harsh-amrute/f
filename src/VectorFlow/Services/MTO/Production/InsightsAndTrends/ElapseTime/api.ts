import axios from "axios";

export const getElapsedTimeData = async ({graphflag, page, appliedFilters}: {graphflag: number, page?: number, appliedFilters?: any} ) => {
  if(graphflag){
    return await axios.get(
      process.env.REACT_APP_VF_API_HOST_MTO + `/getElapsedTimeData/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          graphflag
        },
      }
    );
  }
  return await axios.put(
    process.env.REACT_APP_VF_API_HOST_MTO + `/getElapsedTimeData/`,
    appliedFilters,
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        graphflag,
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
