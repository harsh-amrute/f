import axios from "axios";

export const getElapsedTimeData = async ({graphflag, page, appliedFilters , isExcelExport = false , body , report_name }: {graphflag: number, page?: number, appliedFilters?: any , isExcelExport?: any , body ? : any , report_name ? : any} ) => {
  if(isExcelExport){
    return await axios.put(
      process.env.REACT_APP_VF_API_HOST_MTO + `/getElapsedTimeData/`,body,{
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          export : isExcelExport,
          report_name
        },
      }
    )
  }
  else if(graphflag){
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
