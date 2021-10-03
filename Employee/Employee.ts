export interface IAddress {
  Address1: string;
  StreetName: string;
  Suburb: string;
  PostCode: number;
  State: string;
}

export interface ISalary {
  Amount: number;
  Currency: string;
  CurrencyName: string;
}

export interface IEmployee {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  Role: string;
  RoleName: string;
  Age: number;
  Salary: ISalary;
}
