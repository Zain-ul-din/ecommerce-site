export function Validator(obj, matchList) {
  for (let i = 0; i < matchList.length; i += 1) {
    if (!(matchList[i] in obj)) return false;
    if (typeof obj[matchList[i]] === "string" && obj[matchList[i]].length === 0)
      return false;
  }
  return true;
}
