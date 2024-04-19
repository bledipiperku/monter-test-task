export interface IReport {
  reportDetails: IReportDetails[];
}

export interface IReportDetails {
  userId: number;
  id: number;
  title: string;
  body: string;
}
