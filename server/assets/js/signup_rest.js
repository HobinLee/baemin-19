import { checkEmailAlreadyExists, postSignUp } from "./api/api.js";
import {
  checkDateValidation,
  checkNicknameValidation,
  checkEmailValidation,
  checkPwValidation,
  checkPwRuleTwo,
  checkPwRuleOne,
} from "./utils/checkValidation.js";
import { $, $$ } from "./utils/selector.js";

(() => {
  const userData = {
    email: null,
    nickname: null,
    pw: null,
    birthDate: null,
  };

  const $formList = $$(".form-element");
  const $submitBTN = $(".submit-signup-form-btn");
  const PW_REGEX_RULE_ONE =
    "10자 이상 영어 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야 합니다";
  const PW_REGEX_RULE_TWO =
    "연속된 숫자 혹은 같은 숫자가 세자리 이상 설정할 수 없습니다";
  const ERR_EMAIL_REGEX_RULE =
    "올바르지 않은 이메일 형식입니다";
  const ERR_PW_DIFFERENT = "비밀번호가 서로 다릅니다";
  const ERR_EMAIL_ALREADY_EXIST = 
    "이미 존재하는 이메일주소 입니다";
  const LOADING_BTN = 'loading-btn';

  const checkEmail = (email) => {
    userData.email = email;
    const $emailWarn = $("#email-warn");

    if (checkEmailValidation(email)) {
      return true;
    } else {
      $emailWarn.innerText = ERR_EMAIL_REGEX_RULE;
      return false;
    }
  };

  const checkPWForm = (pw) => {
    userData.pw = pw;

    const $pwWarn = $("#password-warn");

    if (!checkPwRuleOne(pw)) {
      $pwWarn.innerText = PW_REGEX_RULE_ONE;
      return false;
    }

    if (!checkPwRuleTwo(pw)) {
      $pwWarn.innerText = PW_REGEX_RULE_TWO;
      return false;
    }

    const $pwInput = $("#password-confirm");
    const $pwCheck = $("#password-check");

    if (checkPWConfirm($pwInput.value)) {
      $pwCheck.className = "form-element__check";
    } else {
      $pwCheck.className = "form-element__check--invalid";
    }

    return true;
  };

  const checkPWConfirm = (confirm) => {
    const $confirmWarn = $("#confirm-warn");

    if (confirm !== userData.pw) {
      $confirmWarn.innerText = ERR_PW_DIFFERENT;
      return false;
    } else {
      $confirmWarn.innerText = PW_REGEX_RULE_ONE;
      return checkPwValidation(confirm);
    }
  };

  const checkNickname = (nickname) => {
    userData.nickname = nickname;

    return checkNicknameValidation(nickname);
  };

  const checkDate = (date) => {
    userData.birthDate = date;

    return checkDateValidation(date);
  };

  const checkFormList = [
    checkEmail,
    checkNickname,
    checkPWForm,
    checkPWConfirm,
    checkDate,
  ];

  const checkAllCondition = () => {
    return $$(".form-element__check--invalid").length === 0;
  };

  const handleSubmitBTN = () => {
    if (checkAllCondition()) {
      $submitBTN.disabled = false;
    } else {
      $submitBTN.disabled = true;
    }
  };

  const setFormEvent = ($form, checkFormat) => {
    const $input = $("input", $form);
    const $eraseBTN = $(".form-element__erase", $form);
    const $check = $(".form-element__check--invalid", $form);
    const $warn = $("small", $form);

    const getCheckEmailBTN = () => {
      let $checkEmailBTN = $(".check-email-btn", $form);

      if (!$checkEmailBTN) {
        $checkEmailBTN = $(".check-email-btn--confirm", $form);
      }

      return $checkEmailBTN;
    };

    let $checkEmailBTN = getCheckEmailBTN();

    const setFormat = (isStillTyping) => {
      if (!isStillTyping) {
        $warn.style.display = "none";
        $input.classList.remove("invalid-form");
      }

      if (checkFormat($input.value)) {
        if ($checkEmailBTN) {
          $check.className = "form-element__check--invalid";
          $checkEmailBTN.disabled = false;
        } else {
          $check.className = "form-element__check";
        }
      } else {
        if (isStillTyping) {
          $warn.style.display = "block";
          $input.classList.add("invalid-form");
        }

        resetCheckEmailBTN();
        $check.className = "form-element__check--invalid";
      }
    };

    const resetCheckEmailBTN = () => {
      if ($checkEmailBTN) {
        $checkEmailBTN.disabled = true;
        $checkEmailBTN.className = "check-email-btn";
      }
    };

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
    };

    const handleEraseBTN = () => {
      if (!$eraseBTN) return;

      if ($input.value.length === 0) {
        $eraseBTN.style.display = "none";
      } else {
        $eraseBTN.style.display = "block";
      }
    };

    const resetInput = () => {
      $input.value = "";
    };

    const resetForm = () => {
      resetInput();
      handleEraseBTN();
      setFormat(false);
      handleSubmitBTN();
    };

    const requestCheckEmailExists = async (email) => {
      const result = await checkEmailAlreadyExists(email);
      return result;
    };

    const addEvents = () => {
      $input.addEventListener("input", () => handleFormat(false));
      $input.addEventListener("change", () => handleFormat(true));

      $checkEmailBTN?.addEventListener("click", async () => {
        // 중복 검사 결과를 받을 때 까지 input 수정 막기
        $input.disabled = true;
        $checkEmailBTN.disabled = true;

        const { httpStatus, isUserExists } = await requestCheckEmailExists(
          userData.email
        );

        $input.disabled = false;

        if (httpStatus === "OK" && !isUserExists) {
          $check.className = "form-element__check";
          $checkEmailBTN.className = "check-email-btn--confirm";
          handleSubmitBTN();
        } else {
          $warn.style.display = "block";
          $warn.innerText = ERR_EMAIL_ALREADY_EXIST;
        }
      });

      if ($eraseBTN) {
        $eraseBTN.addEventListener("click", () => resetForm());
      }
    };
    addEvents();
  };

  const setAllFormEvents = () => {
    $formList.forEach(($form, index) => {
      setFormEvent($form, checkFormList[index]);
    });
  };

  const btnLoadingStart = ($btn) => {
    $btn.disabled = true;
    $btn.classList.add(LOADING_BTN);
  }

  const btnLoadingFinish = ($btn) => {
    $btn.disabled = false;
    $btn.classList.remove(LOADING_BTN);
  }

  const register = async (e) => {

    btnLoadingStart($submitBTN);

    e.preventDefault();

    const { httpStatus } = await postSignUp(userData);
    if (httpStatus === "OK") {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      alert('서버 요청이 실패했습니다. 잠시 후, 다시 시도해주세요');
      btnLoadingFinish($submitBTN);
    }
  };

  const setRegisterEvent = () => {
    document.addEventListener("submit", register);
  };

  setAllFormEvents();
  setRegisterEvent();
})();
