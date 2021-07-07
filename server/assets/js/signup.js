import { $ } from "./utils/selector.js";

const DEFAULT_TERM_STATE = {
  "check-all": false,
  "baemin-usage-term": false,
  "financial-term": false,
  "personal-info-collect-term": false,
  "personal-info-provide-term": false,
  "marketing-term": false,
};

(function () {
  const signup = () => {
    let state = {
      ...DEFAULT_TERM_STATE,
      over14: true,
    };

    const setState = (newState) => {
      state = {
        ...state,
        ...newState,
      };

      render();
    };

    const bindEvents = () => {
      document.addEventListener("click", ({ target }) => {
        if (
          target.closest("#check-all") ||
          target.closest("#baemin-usage-term") ||
          target.closest("#financial-term") ||
          target.closest("#personal-info-collect-term") ||
          target.closest("#personal-info-provide-term") ||
          target.closest("#marketing-term")
        ) {
          onClickCheckbox(target);
        }

        if (target.closest("#over-14") || target.closest("#under-14")) {
          onClickRadio(target);
        }
      });
    };

    /**
     * Checkbox 클릭 이벤트에 대응하는 함수입니다.
     * 전체 동의 버튼을 클릭 시 모든 버튼을 check 합니다.
     */
    const onClickCheckbox = (target) => {
      if (target.closest("#check-all")) {
        checkAll(target);
        return;
      }

      const { id, checked } = target;
      if (!checked) {
        setState({ [id]: checked, "check-all": false });
      } else {
        setState({ [id]: checked });

        if (
          state["baemin-usage-term"] &&
          state["financial-term"] &&
          state["marketing-term"] &&
          state["personal-info-collect-term"] &&
          state["personal-info-provide-term"]
        ) {
          setState({ "check-all": true });
        }
      }
    };

    const checkAll = (target) => {
      const checkedAllState = Object.entries(DEFAULT_TERM_STATE).map(
        ([key]) => [key, target.checked]
      );
      setState(Object.fromEntries(checkedAllState));
    };

    /**
     * Radio button 클릭 이벤트에 대응하는 함수입니다.
     * 14세 이상일 경우, over14를 true로 합니다.
     */
    const onClickRadio = (target) => {
      if (target.closest("#over-14")) {
        setState({ over14: true });
      } else {
        setState({ over14: false });
      }
    };

    const render = () => {
      const { over14, ...termState } = state;

      // Render Term States
      Object.entries(termState).map(([key, val]) => {
        $(`#${key}`).checked = val;
      });

      // Render age state
      $("#over-14").checked = over14;
      $("#under-14").checked = !over14;

      // Render validation
      $(".next-btn").disabled = !termState["check-all"];
    };

    bindEvents();
    render();
  };

  signup();
})();
