import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    if (!tokenString) return null;
    const userToken = JSON.parse(tokenString);
    return userToken;
  };
  const [token, setToken] = useState(getToken());
  const [show, setShow] = useState(true);
  const saveToken = (userToken: any) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    var test = 1;
    if (test === 1) {
      setToken(userToken);
      test++;
    }
    setTimeout(() => {
      setToken(test);
    }, 1000);
  };

  return {
    setToken: saveToken,
    token,
  };
}
