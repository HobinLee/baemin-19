export const postLogin = async (email, pw) => {
  console.log("post");
  const res = await fetch("/auth/login", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, pw })
  })

  return res.json();
}

export const postSignUp = async (userData) => {
  const res = await fetch("/signup", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userData })
  })

  return res.json();
}