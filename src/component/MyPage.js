import React, { useEffect } from 'react'; // useEffect 추가
import { useRecoilState } from 'recoil'; // Recoil 훅 추가
import { IsLogin, userState } from '../login/StAtom'; // Recoil 상태 추가
import { Link } from "react-router-dom";
import LoginForm from "../login/LoginForm";
import LogoutForm from "../login/LogoutForm";

export default function MyPage() {
  const [isLoginCheck, setIsLoginCheck] = useRecoilState(IsLogin); // 상태 추가
  const [user, setUser] = useRecoilState(userState); // 상태 추가

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const savedIsLoginCheck = localStorage.getItem('isLoginCheck') === 'true';
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoginCheck(savedIsLoginCheck);
  }, [setUser, setIsLoginCheck]);

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className="w-full h-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {isLoginCheck ?
          <LogoutForm user={user} setUser={setUser} setIsLoginCheck={setIsLoginCheck} /> :
          <LoginForm />
        }
      </div>

      <Link to="/signup" className="p font-bold mx-1 inline-block px-2 py-2 whitespace-nowrap lg:mt-0">
        회원가입
      </Link>
    </div>
  );
}
