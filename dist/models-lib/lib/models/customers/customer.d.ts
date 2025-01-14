import { User } from '../user';
export interface Customer extends User {
    address: Address | null;
    contactDetails: ContactDetails | null;
    familySituation: FamilySituation | null;
    financialSituation: FinancialSituation | null;
    identity: Identity | null;
    objectifs: Objectifs | null;
    taxationSituation: TaxationSituation | null;
    professionalSituation: ProfessionalSituation | null;
    bank: Bank;
    offers: Offer[] | null | undefined;
}
export interface Address {
    street: string | null;
    zipCode: string | null;
    city: string | null;
    country: string | null;
}
export interface ContactDetails {
    email: string | null;
    phoneNumber: string | null;
}
export interface FamilySituation {
    children: number | null;
    dependents: number | null;
    maritalSituation: string;
    legalProtection: string | null;
}
export interface FinancialSituation {
    salaryIncome: number | null;
    passiveIncome: number | null;
    charges: number | null;
    monthlySaving: number | null;
    saving: number | null;
    rent: number | null;
    taxPerYear: number | null;
    withHoldingTax: number | null;
    disposableIncome: number | null;
    borrowingCapacity: number | null;
}
export interface Identity {
    title: string | null;
    firstName: string;
    lastName: string;
    birthDate: string | null;
    birthCountry: string | null;
    birthCity: string | null;
    birthRegion: string | null;
}
export interface Objectifs {
    reduceTax: boolean | null;
    prepareRetirement: boolean | null;
    generatePassiveIncome: boolean | null;
    realEstate: boolean | null;
    optimizeDeclaration: boolean | null;
}
export interface TaxationSituation {
    nationality: string | null;
    principalTaxResidence: string | null;
    taxResidenceInAnotherCountry: boolean | null;
    isHouseholdSubjectToIncomeTax: boolean | null;
    haveAmericainNationality: boolean | null;
    haveNoEuropeenTaxResidence: boolean | null;
}
export interface ProfessionalSituation {
    professionnalStatus: string | null;
    job: string | null;
    socioProfessionalCategory: string | null;
    industrySector: string | null;
    isPolitical: boolean | null;
    anyRelativeIsPolitical: boolean | null;
}
export interface Bank {
    linxoId: string | null;
}
export interface LinxoAuthentification {
    access_token: string | undefined;
    refresh_token: string | undefined;
}
export interface LinxoAuthentificationType {
    email: string;
    password: string;
}
export interface WidgetConnectionLinks {
    add_connection: string | null;
    manage_connections: string;
}
export interface WidgetBankLinks {
    session_id: string | null;
    _links: WidgetConnectionLinks | null;
}
export interface WidgetParamsCall {
    withCallbackUri: boolean;
    withRedrectUrl: boolean;
}
export interface Offer {
    offerName: string;
    status: string;
    subscriptionDate: string;
}
