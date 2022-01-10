export function firstLetterUpperCase (value: string) {
  return `${value[0].toLocaleUpperCase()}${value.substring(1)}`
}