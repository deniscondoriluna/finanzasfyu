export interface ReportByService {
  originService: string;
  total:         number;
  count:         number;
  paid:          number;
  rejected:      number;
  pending:       number;
}

export interface ReportByDate {
  date:  string;
  total: number;
  count: number;
}