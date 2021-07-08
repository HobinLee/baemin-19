import { $ } from "./utils/selector.js";
import { convertToPhoneNumber } from './utils/phone.js'

(() => {
  const $input = $('#phone-no');
  const $erase = $('.form-element__erase');
  const $check = $('.form-element__check--invalid');
  const $certBTN = $('.woowa-btn.certificate-section__fetch-btn');
  const $certForm = $('.certificate-form');
  const $certInput = $('#certificate-no');
  const $certAgain = $('.certificate-section__fetch-again');
  const $nextBTN = $('.next-btn');

  const PHONE_NO_LENGTH = 13;

  const setNextBTN = (enabled) => {
    $nextBTN.disabled = !enabled;
  }

  const handleUpdatePhoneNumber = () => {
    $input.value = convertToPhoneNumber($input.value);

    const phoneNumber = $input.value;

    const handleCheckUI = () => {
      if (checkFormat()) {
        activeCheckUI();
        $certBTN.disabled = false;
      } else {
        inActiveCheckUI();
        showCertBTN();
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
      return phoneNumber.length === PHONE_NO_LENGTH;
    }
      
    handleCheckUI(phoneNumber);
    handleEraseBTN(phoneNumber);
  }

  const erasePhoneNumber = () => {
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

  const getRandomFourDigits = () => {
    const num = Math.floor(Math.random() * 10000);

    return num.toString().padStart(4, '0');
  }

  const handleCertification = () => {
    const TIMER = 2000; //2초 뒤 랜덤 인증번호 생성

    const setCertificationInput = () => {
      $certInput.value = getRandomFourDigits();
    }

    hideCertBTN();

    setTimeout(() => {
      if($certForm.style.display !== 'none') {
        setNextBTN(true);
        setCertificationInput();
      }
    }, TIMER);
  }

  const resetCertInput = () => {
    $certInput.value = '';
    $nextBTN.disabled = true;    
  }

  const addEvents = () => {
    $input.addEventListener('input', () => {
      handleUpdatePhoneNumber();

      if ($input.value.length >= PHONE_NO_LENGTH) return;

      resetCertInput();
    });

    $erase.addEventListener('click', () => {
      erasePhoneNumber();
      handleUpdatePhoneNumber();

      resetCertInput();
    });

    $certBTN.addEventListener('click', () => {
      handleCertification();
    });

    $certAgain.addEventListener('click', () => {
      resetCertInput();
      handleCertification();
    });
  }

  addEvents();
})();