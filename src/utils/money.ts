const moneyFormatter = (value: string | number | undefined) => `₽ ${value}`;

const moneyParser = (value: any) => value.replace(/₽\s?|(,*)/g, "");

export { moneyFormatter, moneyParser };
