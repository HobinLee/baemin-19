export const checkEmailValidation = (email) => {
  return EMAIL_REGEX.test(email);
};

export const checkPwRuleOne = (pw) => {
  return PW_REGEX_RULE_ONE.test(pw);
}

export const checkPwRuleTwo = (pw) => {
  return !PW_REGEX_RULE_TWO.test(pw);
}

export const checkPwValidation = (pw) => {
  const isPassedRuleOne = checkPwRuleOne(pw);
  const isPassedRuleTwo = checkPwRuleTwo(pw);

  return isPassedRuleOne && isPassedRuleTwo;
};

const EMAIL_REGEX = /^\S+@\S+\.(\S{2,})+/;

const PW_REGEX_RULE_ONE =
  /^(?=.*[A-Z])(?=.*[a-z])([^\s]){10,}|(?=.*[A-Z])(?=.*[0-9])([^\s]){10,}|(?=.*[A-Z])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}|(?=.*[a-z])(?=.*[0-9])([^\s]){10,}|(?=.*[a-z])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}|(?=.*[0-9])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}$/;

const PW_REGEX_RULE_TWO =
  /(012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210|([0-9]{3,}))+/g;
