import axios from "axios";

export const getLeadTimeData = async (graphflag: number, page?: number, appliedFilters?: any) => {
  if(graphflag){
    return await axios.get(
      process.env.REACT_APP_VF_API_HOST_MTO + `/getLeadTimeData/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          graphflag,
        },
      }
    );
  }
  return await axios.put(
    process.env.REACT_APP_VF_API_HOST_MTO + `/getLeadTimeData/`,
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
