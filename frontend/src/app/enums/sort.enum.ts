export enum SortDirection {
  ascending = 'ASC',
  descending = 'DESC'
}


export enum SortField {
  price='detailsInfo.price',
  upload='modifiedAt',
  year='generalInfo.general.produced',
  mileage='generalInfo.condition.mileage',
}


// export const sortTypes: {[key:string] : {direction: SortDirection, field:SortField}}= {
//   'price ascendind' : {direction: SortDirection.ascending, field:SortField.price },
//   'price descending': {direction: SortDirection.descending, field:SortField.price },
//   'upload ascendind': {direction: SortDirection.ascending, field:SortField.upload },
//   'upload descending': {direction: SortDirection.descending, field:SortField.upload },
// }
