export interface Owner {
  name: string | null;
  address: string | null;
  phone_number: string;
  identification_number: string;
  registration_date: number | null;
  registrationDateUtc: string | null;
  birth_date: number | null;
  birthDateUtc: string | null;
  birth_place: string;
  status: string;
}

export interface Account {
  connection_id: string;
  name: string;
  balance: number;
  currency: string;
  type: string;
  status: string;
  creation_date: number;
  creationDateUtc: string;
  id: string;
  account_number: string | null;
  iban: string | null;
  balance_date: number | null;
  balanceDateUtc: string | null;
  loan: Loan | null | undefined;
  savings: Savings | null |undefined ;
  credit_card: CreditCard | null |undefined;
  owner: Owner | null;
  usage: string | null;
  last_channel_definition_id: string | null;
}

export interface Loan {
  type: string | null;
  loan_type: string | null;
  frequency: string | null;
  initial_balance: number | null;
  start_date: number | null;
  startDateUtc: string | null;
  end_date: number | null;
  endDateUtc: string | null;
  interest: number | null;
  debited_account_id: string;
  next_payment: NextPayment | null;
}

export interface NextPayment {
  amount: number | null;
  due_date: number | null;
  dueDateUtc: string | null;
}

export interface Savings {
  type: string | null;
  savings_type: string | null;
  end_date: number | null;
  endDateUtc: string | null;
  effect_date: number | null;
  effectDateUtc: string | null;
  yield_rate: number | null;
  earned_ytd: number | null;
  invested_net: number | null;
  invested_raw: number | null;
  disinvested_raw: number | null;
  pivot_account_id: string | null;
  capital_gain: CapitalGain | null;
}

export interface CapitalGain {
  percent: number | null;
  amount: number | null;
}

export interface CreditCard {
  payable_account_id: string | null;
  next_payment: NextPayment | null;
}

export type Accounts = Account[];
