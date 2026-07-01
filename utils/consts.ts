
export enum ResultEnum {
    Success = 'success',
    Fail = 'fail'
}

export enum UploadImageResult {
    Canceled = 'canceled',
    Unselected = 'unselected',
    Unknown = 'unknown',
    Success = 'success',
}

export const HeaderHeight = 44;

export enum StockField {
  symbol = 'symbol',
  price = 'price',
  chg = 'chg'
}

export const dateFormat = {
    zh: 'YYYY-MM-DD',
    en: 'YYYY-MM-DD'
}

export const timeFormat = {
    zh: 'HH:mm:ss',
    en: 'HH:mm:ss'
}

export const identifyKeyboardType = {
    ios: 'ascii-capable',
    android: 'visible-password'
}