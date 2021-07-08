export const postLogin = async (email, pw) => {
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, pw }),
  });

  return res.json();
};

export const postSignUp = async (userData) => {
  const res = await fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userData }),
  });

  return res.json();
};

export const logout = async () => {
  const res = await fetch("/auth/logout", {
    method: "GET",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
  })

  return res.json();
}

export const checkEmailAlreadyExists = async (email) => {
  const res = await fetch(`/auth/check?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};
