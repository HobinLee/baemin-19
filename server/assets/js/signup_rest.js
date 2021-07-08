import { postSignUp } from './api/api.js';
import { checkDateValidation, checkNicknameValidation, checkEmailValidation, checkPwValidation, checkPwRuleTwo, checkPwRuleOne }  from './utils/checkValidation.js';
import { $, $$ } from "./utils/selector.js";

(() => {
  const userData = {
    email: null,
    nickname: null,
    pw: null,
    birthDate: null,
  }

  const $formList = $$('.form-element');
  const $submitBTN = $('.submit-signup-form-btn');
  const PW_REGEX_RULE_ONE = '10자 이상 영어 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야 합니다';
  const PW_REGEX_RULE_TWO = '연속된 숫자 혹은 같은 숫자가 세자리 이상 설정할 수 없습니다';

  const checkEmail = (email) => {
    userData.email = email;
    return checkEmailValidation(email);
  }

  const checkPWForm = (pw) => {
    userData.pw = pw;

    const $pwWarn = $('#password-warn');

    if (!checkPwRuleOne(pw)) {
      $pwWarn.innerText = PW_REGEX_RULE_ONE;
      return false;
    }

    if (!checkPwRuleTwo(pw)) {
      $pwWarn.innerText = PW_REGEX_RULE_TWO;
      return false;
    }
    
    const $pwInput = $('#password-confirm');
    const $pwCheck = $('#password-check');

    if (checkPWConfirm($pwInput.value)) {
      $pwCheck.className = 'form-element__check';
    } else {
      $pwCheck.className = 'form-element__check--invalid';
    }

    return true;
  }

  const checkPWConfirm = (confirm) => {
    return checkPwValidation(confirm) && (confirm === userData.pw);
  }

  const checkNickname = (nickname) => {
    userData.nickname = nickname;

    return checkNicknameValidation(nickname);
  }

  const checkDate = (date) => {
    userData.birthDate = date;

    return checkDateValidation(date);
  }

  const checkFormList = [
    checkEmail,
    checkNickname,
    checkPWForm,
    checkPWConfirm,
    checkDate
  ];

  const checkAllCondition = () => {
    return $$('.form-element__check--invalid').length === 0;
  }

  const handleSubmitBTN = () => {
    if (checkAllCondition()) {
      $submitBTN.disabled = false;
    } else {
      $submitBTN.disabled = true;
    }
  }

  const setFormEvent = ($form, checkFormat) => {
    const $input = $('input', $form);
    const $eraseBTN = $('.form-element__erase', $form);
    const $check = $('.form-element__check--invalid', $form);
    const $warn = $('small', $form);

    const getCheckEmailBTN = () => {
      let $checkEmailBTN = $('.check-email-btn', $form);
  
      if (!$checkEmailBTN) {
        $checkEmailBTN = $('.check-email-btn--confirm', $form);
      }
  
      return $checkEmailBTN;
    }

    let $checkEmailBTN = getCheckEmailBTN();

    const setFormat = (isStillTyping) => {
      if (!isStillTyping) {
        $warn.style.display = 'none';
        $input.classList.remove("invalid-form");
      }

      if (checkFormat($input.value, $warn)) {
        if ($checkEmailBTN) {
          $checkEmailBTN.disabled = false;
        } else {
          $check.className = 'form-element__check';
        }
      } else {
        if (isStillTyping) {
          $warn.style.display = 'block';
          $input.classList.add("invalid-form");
        }

        resetCheckEmailBTN();

        $check.className = 'form-element__check--invalid';
      }
    }

    const resetCheckEmailBTN = () => {
      if ($checkEmailBTN) {
        $checkEmailBTN.disabled = true;
        $checkEmailBTN.className = 'check-email-btn';
      }
    }

    /* parameter 설명
    * isStillTyping: input 변경이 끝났는지?
    * change 이벤트 => true
    * input, keydown ... => false
    */

    const handleFormat = (isStillTyping) => {
      resetCheckEmailBTN();

      handleEraseBTN();
      
      setFormat(isStillTyping);

      handleSubmitBTN();
    }

    const handleEraseBTN = () => {
      if (!$eraseBTN) return;
      
      if ($input.value.length === 0) {
        $eraseBTN.style.display = 'none';
      } else {
        $eraseBTN.style.display = 'block';
      }
    }

    const resetInput = () => {
      $input.value = '';
    }

    const resetForm = () => {
      resetInput();
      handleEraseBTN();
      setFormat(false);
      handleSubmitBTN();
    }

    const addEvents = () => {
      $input.addEventListener('input', () => handleFormat(false));
      $input.addEventListener('change', () => handleFormat(true));
      
      $checkEmailBTN?.addEventListener('click', () => {
        $checkEmailBTN.disabled = true;
  
        // 중복 검사 결과를 받을 때 까지 input 수정 막기
        $input.disabled = true;
        
        // TODO: api 받아오기
        setTimeout(() => {
          $input.disabled = false;
          $check.className = 'form-element__check';
          $checkEmailBTN.className = 'check-email-btn--confirm';
          handleSubmitBTN();
        }, 1000);
      });
  
      if ($eraseBTN) {
        $eraseBTN.addEventListener('click', () => resetForm());
      }
    }
    addEvents();
  };
  
  const setAllFormEvents = () => {
    $formList.forEach(($form, index) => {
      setFormEvent($form, checkFormList[index]);
    });
  }

  const register = async (e) => {
    e.preventDefault();    

    const { httpStatus } = await postSignUp(userData);
    if(httpStatus === "OK"){
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }
  
  const setRegisterEvent = () => {
    document.addEventListener("submit", register);
  }

  setAllFormEvents();
  setRegisterEvent();
})();