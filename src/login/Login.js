import { IsLogin } from "./StAtom";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import LogoutForm from "./LogoutForm";

export default function Login() {

  const [user, setUser] = useState();
  const [IsLoginCheck, setIsloginCheck] = useRecoilState(IsLogin);

  // 로그인 버튼이 눌러졌을때 로컬에 전달
  const handleLogin = (u) => {
    sessionStorage.setItem('user', u);
    setUser(u);
    setIsloginCheck(true);
  }

  // 로그아웃 
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    setIsloginCheck(false);
  }

  // 맨 처음 한번
  useEffect(() => {
    const luser = sessionStorage.getItem('user');
    if (luser) {
      setUser(luser);
      setIsloginCheck(true);
    }
    else {
      setUser(null);
      setIsloginCheck(false);
    }
  }, [])


  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {IsLoginCheck ? <LogoutForm user={user} handleLogout={handleLogout} />
        : <LoginForm handleLogin={handleLogin} />}
    </div>
  )
}
