import axios, { AxiosResponse } from "axios";

import { IReport } from "@/types";

const getReports = (
  pgNumber: number,
  pgSize: number
): Promise<AxiosResponse<IReport>> =>
  axios.get<IReport>(`/api/reports?pgNumber=${pgNumber}&pgSize=${pgSize}`);

const GlobalApi = {
  getReports,
};

export default GlobalApi;
