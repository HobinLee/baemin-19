(() => {
  const userData = {
    email: null,
    nickName: null,
    pw: null,
    birthDate: null,
  }

  const $formList = document.querySelectorAll('.form-element');
  const $submitBTN = document.querySelector('.submit-signup-form-btn');


  const checkEmailForm = (email) => {
    userData.email = email;

    const regex = new RegExp('^[0-9-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*(.[a-zA-Z]{2,3}$)', 'i');
    return regex.test(email);
  }

  const checkNickName = (nickName) => {
    userData.nickName = nickName;

    const MIN_LEN = 2;
    const MAX_LEN = 10;

    return nickName.length >= MIN_LEN && nickName.length <= MAX_LEN;
  }

  const checkPWForm = (pw) => {
    userData.pw = pw;

    const regex = new RegExp('^(?=.*[A-Z])(?=.*[a-z])([^\s]){10,}|(?=.*[A-Z])(?=.*[0-9])([^\s]){10,}|(?=.*[A-Z])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}|(?=.*[a-z])(?=.*[0-9])([^\s]){10,}|(?=.*[a-z])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}|(?=.*[0-9])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}$', 'i');
    const $pwWarn = document.getElementById('password-warn');

    if (regex.test(pw) === false) {
      $pwWarn.innerText = '10자 이상 영어 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야 합니다';
      return false;
    }

    if (false) {
      $pwWarn.innerText = '연속된 숫자 혹은 같은 숫자가 세자리 이상 설정할 수 없습니다';
      return false;
    }

    return true;

    //regex2 = new RegExp('^(000|111|222|333|444|555|666|777|888|999|012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210)$', 'i');

    //if (regex2.test(pw) === false) {
    //  return false;
    //}

    //return true;
  }

  const checkPWConfirm = (confirm) => {
    const regex = new RegExp('^(?=.*[A-Z])(?=.*[a-z])([^\s]){10,}|(?=.*[A-Z])(?=.*[0-9])([^\s]){10,}|(?=.*[A-Z])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}|(?=.*[a-z])(?=.*[0-9])([^\s]){10,}|(?=.*[a-z])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}|(?=.*[0-9])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}$', 'i');
    
    return regex.test(confirm) && (confirm === userData.pw);
  }

  const checkDateForm = (date) => {
    userData.birthDate = date;
    
    const birthDate = new Date(date);
    
    return !Number.isNaN(birthDate.getTime());
  }

  const checkFormList = [
    checkEmailForm,
    checkNickName,
    checkPWForm,
    checkPWConfirm,
    checkDateForm
  ];

  const checkAllCondition = () => {
    return document.querySelectorAll('.form-element__check--invalid').length === 0;
  }

  const handleSubmitBTN = () => {
    if (checkAllCondition()) {
      $submitBTN.disabled = false;
    } else {
      $submitBTN.disabled = true;
    }
  }

  const setFormEvent = ($form, checkFormat) => {
    const $input = $form.querySelector('input');
    const $eraseBTN = $form.querySelector('.form-element__erase');
    const $check = $form.querySelector('.form-element__check--invalid');
    const $warn = $form.querySelector('small');
    
    let $checkEmailBTN = $form.querySelector('.check-email-btn');

    if (!$checkEmailBTN) {
      $checkEmailBTN = $form.querySelector('.check-email-btn--confirm');
    }

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

    const setFormat = (finish) => {
      if (!finish) {
        $warn.style.display = 'none';
      }

      if (checkFormat($input.value, $warn)) {
        if ($checkEmailBTN) {
          $checkEmailBTN.disabled = false;
        } else {
          $check.className = 'form-element__check';
        }
      } else {
        if (finish) {
          $warn.style.display = 'block';
        }

        if ($checkEmailBTN) {
          $checkEmailBTN.disabled = true;
          $checkEmailBTN.className = 'check-email-btn';
        }

        $check.className = 'form-element__check--invalid';
      }
    }

    /* parameter 설명
    * finish: input 변경이 끝났는지?
    * change 이벤트 => true
    * input, keydown ... => false
    */

    const handleFormat = (finish) => {
      if ($checkEmailBTN) {
        $checkEmailBTN.disabled = true;
        $checkEmailBTN.className = 'check-email-btn';
        $check.className = 'form-element__check--invalid';
      }

      handleEraseBTN();
      
      setFormat(finish);

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

    $input.addEventListener('input', () => handleFormat(false));
    $input.addEventListener('change', () => handleFormat(true));

    if ($eraseBTN) {
      $eraseBTN.addEventListener('click', () => resetForm());
    }
  };
  
  const setAllFormEvents = () => {
    $formList.forEach(($form, index) => {
      setFormEvent($form, checkFormList[index]);
    });
  }

  const register = () => {
    // #TODO: 회원가입 API 연동
    
    console.log('회원가입 요청!');
    console.log(userData);
  }
  
  const setRegisterEvent = () => {
    $submitBTN.addEventListener('click', () => register());
  }

  setAllFormEvents();
  setRegisterEvent();
})();