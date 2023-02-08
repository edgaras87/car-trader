export enum AccountType {
  Private = 'Private',
  Dealer = 'Dealer'
}


// optional: Record type annotation guaranties that all the values from the enum are presented in the mapping
export const AccountTypeLabelMapping: Record<AccountType, string> = {
  [AccountType.Private]: "Private Account",
  [AccountType.Dealer]: "Dealer Account"
};
