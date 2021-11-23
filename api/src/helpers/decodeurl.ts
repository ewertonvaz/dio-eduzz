export const decodeUrl = (str: string): string => {
    str = str + '';
    return decodeURIComponent(str)
      .replace('%21', '!')
      .replace('%27', "'")
      .replace('%28', '(')
      .replace('%29', ')')
      .replace('%2A', '*')
      .replace('%7E','~')
      .replace('%20', '+');
}