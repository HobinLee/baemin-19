// 문자열 중간에 char 삽입
export const insertChar = (str, index, char) => {
  return str.substring(0, index) + char + str.substring(index, str.length);
}
