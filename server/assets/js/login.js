import { postLogin } from "./api/api.js";
import {
  checkEmailValidation,
  checkPwValidation,
} from "./utils/checkValidation.js";
import { $ } from "./utils/selector.js";
import {
  hideLoadingSpinner,
  showLoadingSpinner,
} from "./utils/triggerSpinner.js";

(function () {
  const ERROR_STATE = {
    EMPTY_EMAIL: "이메일 또는 아이디를 입력해주세요.",
    EMPTY_PASSWORD: "비밀번호를 입력해주세요.",
    INVALID_EMAIL_FORM: "이메일 형식이 올바르지 않습니다.",
    INVALID_PASSWORD_FORM:
      "10자 이상 영어 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야 합니다.",
  };

  const login = () => {
    let state = {
      email: "",
      password: "",
      isShowingEmailErrMsg: false,
      isShowingPasswordErrMsg: false,
      emailState: ERROR_STATE.EMPTY_EMAIL,
      passwordState: ERROR_STATE.EMPTY_PASSWORD,
    };

    const setState = (nextState) => {
      state = {
        ...state,
        ...nextState,
      };

      render();
    };

    const bindEvents = () => {
      document.addEventListener("input", ({ target }) => {
        if (target.closest(".login-form__id")) {
          setState({ email: target.value, isShowingEmailErrMsg: false });
        }
        if (target.closest(".login-form__pw")) {
          setState({ password: target.value, isShowingPasswordErrMsg: false });
        }
      });

      document.addEventListener("submit", async (e) => {
        e.preventDefault();

        const isValid = checkFormValidation(state.email, state.password);

        if (!isValid) showErrorMessage(state.email, state.password);
        if (isValid) {
          $(".login-form__btn-value").style.display = "none";
          showLoadingSpinner();

          try {
            const { user } = await postLogin(state.email, state.password);

            if (user) window.location.href = "/";
            else alert("아이디 혹은 비밀번호가 다릅니다.");
          } catch (error) {
            throw new Error(error);
          } finally {
            $(".login-form__btn-value").style.display = "block";
            hideLoadingSpinner();
          }
        }
      });
    };

    const checkFormValidation = (email, password) => {
      if (
        email !== "" &&
        password !== "" &&
        checkEmailValidation(email) &&
        checkPwValidation(password)
      ) {
        return true;
      }
      return false;
    };

    const showErrorMessage = (email, pw) => {
      if (email === "") {
        setState({
          isShowingEmailErrMsg: true,
          emailState: ERROR_STATE.EMPTY_EMAIL,
        });
      }

      if (email !== "" && !checkEmailValidation(email)) {
        setState({
          isShowingEmailErrMsg: true,
          emailState: ERROR_STATE.INVALID_EMAIL_FORM,
        });
      }

      if (pw === "") {
        setState({
          isShowingPasswordErrMsg: true,
          passwordState: ERROR_STATE.EMPTY_PASSWORD,
        });
      }

      if (pw !== "" && !checkPwValidation(pw)) {
        setState({
          isShowingPasswordErrMsg: true,
          passwordState: ERROR_STATE.INVALID_PASSWORD_FORM,
        });
      }
    };

    const render = () => {
      const {
        isShowingEmailErrMsg,
        isShowingPasswordErrMsg,
        emailState,
        passwordState,
      } = state;

      if (isShowingEmailErrMsg) {
        $(".woowa-input.login-form__id").classList.add("invalid-form");
        $(".login-form__container--id-error-msg").innerText = emailState;
      } else {
        $(".woowa-input.login-form__id").classList.remove("invalid-form");
        $(".login-form__container--id-error-msg").innerText = "";
      }

      if (isShowingPasswordErrMsg) {
        $(".woowa-input.login-form__pw").classList.add("invalid-form");
        $(".login-form__container--pw-error-msg").innerText = passwordState;
      } else {
        $(".woowa-input.login-form__pw").classList.remove("invalid-form");
        $(".login-form__container--pw-error-msg").innerText = "";
      }
    };

    bindEvents();
    render();
  };

  login();
})();
