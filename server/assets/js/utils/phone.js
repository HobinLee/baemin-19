import { insertChar } from './string.js';

//숫자만 받아서 전화번호 form으로 만들기
// string에 입력된 숫자만 추출
const convertToNumber = (str) => {
  const regex = new RegExp('[^0-9]', 'g');
  const maxLength = 11;

  return str.replace(regex, '').substring(0, maxLength);
}

export const convertToPhoneNumber = (origin) => {
  //010-23O8-1O24
  const numbers = convertToNumber(origin);

  //01023081024
  let form = numbers;

  //010-2
  if (numbers.length > 3) {
    form = insertChar(form, 3, '-');
  }
  //010-2308-1
  if (numbers.length > 7) {
    form = insertChar(form, 8, '-');
  }

  return form;
}