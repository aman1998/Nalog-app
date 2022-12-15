export type TReportCardProps = {
  date: string,
  id: string,
  name: string,
  type: string,
  status: string,
}

export enum ETaxTypes{
  TAX_REPORT = 'tax_report',
  TAX_REPORT_OLD = 'tax_report_old'
}
