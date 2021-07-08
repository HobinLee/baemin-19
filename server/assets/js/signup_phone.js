import { $ } from "./utils/selector.js";

(() => {
  const $input = $('#phone-no');
  const $erase = $('.form-element__erase');
  const $check = $('.form-element__check--invalid');
  const $certBTN = $('.woowa-btn.certificate-section__fetch-btn');
  const $certForm = $('.certificate-form');
  const $certInput = $('#certificate-no');
  const $certAgain = $('.certificate-section__fetch-again');
  const $nextBTN = $('.next-btn');
  
  // string에 입력된 숫자만 추출
  const convertToNumber = (str) => {
    const regex = new RegExp('[^0-9]', 'g');
    const maxLength = 11;

    return str.replace(regex, '').substring(0, maxLength);
  }

  const setNextBTN = (enabled) => {
    $nextBTN.disabled = !enabled;
  }

  //str 중간에 문자열 삽입
  const addChar = (str, index, char) => {
    return str.substring(0, index) + char + str.substring(index, str.length);
  }

  //숫자만 받아서 전화번호 form으로 만들기
  const convertFormat = (origin) => {
    //010-23O8-1O24
    const numbers = convertToNumber(origin);

    //01023081024
    let form = numbers;

    //010-2
    if (numbers.length > 3) {
      form = addChar(form, 3, '-');
    }
    //010-2308-1
    if (numbers.length > 7) {
      form = addChar(form, 8, '-');
    }

    return form;
  }

  const handleUpdatePhoneNumber = () => {
    $input.value = convertFormat($input.value);
    const phoneNumber = $input.value;

    const handleCheckUI = () => {
      if (checkFormat(phoneNumber)) {
        activeCheckUI($check);
        $certBTN.disabled = false;
      } else {
        inActiveCheckUI($check);
        showCertBTN($certBTN, $certForm);
      }
    }
    
    const activeCheckUI = () => {
      $check.className = 'form-element__check';
    }
    
    const inActiveCheckUI = () => {
      $check.className = 'form-element__check--invalid';
    }
    
    const handleEraseBTN = () => {
      if (phoneNumber.length > 0) {
        showEraseBTN();
      } else {
        hideEraseBTN();
        showCertBTN();
      }
    }
    
    const showEraseBTN = () => {
      $erase.style.display = "block";
    }
    
    const hideEraseBTN = () => {
      $erase.style.display = "none";
    }
    
    const checkFormat = () => {
      // OOO - OOOO - OOOO
      const PHONE_NUMBER_LENGTH = 13;

      return phoneNumber.length === PHONE_NUMBER_LENGTH;
    }
      
    handleCheckUI(phoneNumber);
    handleEraseBTN(phoneNumber);
  }

  const erasePhoneNumber = ($input) => {
    $input.value = '';
  }

  const showCertBTN = () => {
    $certForm.style = "display: none";
    $certBTN.style = "display: block";
    $certBTN.disabled = true;
  }

  const hideCertBTN = () => {
    $certForm.style = "display: block";
    $certBTN.style = "display: none";
    $certBTN.disabled = true;
  }

  const appendZero = (num) => {
    while (num.length < 4) {
      num = '0' + num;
    }

    return num;
  }

  const getRandomFourDigits = () => {
    const num = Math.floor(Math.random() * 10000);

    return appendZero(num.toString());
  }

  const handleCertification = () => {
    const TIMER = 2000; //2초 뒤 랜덤 인증번호 생성

    const setCertificationInput = () => {
      $certInput.value = getRandomFourDigits();
    }

    hideCertBTN($certBTN, $certForm);

    setTimeout(() => {
      if($certForm.style.display !== 'none') {
        setNextBTN(true);
        setCertificationInput();
      }
    }, TIMER);
  }

  const addEvents = () => {
    $input.addEventListener('input', () => {
      handleUpdatePhoneNumber();

      if($input.value.length >= 13) return;

      $certInput.value = '';
      $nextBTN.disabled = true;
    });

    $erase.addEventListener('click', () => {
      erasePhoneNumber();
      handleUpdatePhoneNumber();

      $certInput.value = '';
      $nextBTN.disabled = true;
    });

    $certBTN.addEventListener('click', () => {
      handleCertification();
    });

    $certAgain.addEventListener('click', () => {
      $certInput.value = '';
      $nextBTN.disabled = true;
      handleCertification();
    });
  }

  addEvents();
})();