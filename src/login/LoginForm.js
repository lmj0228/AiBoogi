import { useRef } from "react";
import { Link } from "react-router-dom";
import { IsLogin, userState } from "./StAtom"; // Recoil 상태 임포트
import { useRecoilState } from "recoil"; // Recoil 훅 임포트

export default function LoginForm() {
  const [, setUser] = useRecoilState(userState); // Recoil 상태 사용
  const [, setIsLoginCheck] = useRecoilState(IsLogin); // Recoil 상태 사용

  const useridRef = useRef();
  const pwdRef = useRef();

  const handleLogin = (u) => {
    setUser(u);
    setIsLoginCheck(true);
    localStorage.setItem('user', JSON.stringify(u)); // 로컬 스토리지에 사용자 정보 저장
    localStorage.setItem('isLoginCheck', 'true'); // 로컬 스토리지에 로그인 상태 저장
    console.log("--------->", u);
  };

  const handleClick = async () => {
    if (useridRef.current.value === '') {
      alert("아이디를 입력하세요");
      useridRef.current.focus();
      return;
    }
    if (pwdRef.current.value === '') {
      alert("비밀번호를 입력하세요");
      pwdRef.current.focus();
      return;
    }

    try {
      const response = await fetch('http://10.125.121.206:8080/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: useridRef.current.value,
          password: pwdRef.current.value,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log("user", user);
        handleLogin(user);
        alert("로그인이 성공적으로 완료되었습니다.");
        window.location.href = '/';  // 홈페이지로 이동
      } else {
        const error = await response.json();
        alert("로그인에 실패했습니다.");
        console.log('에러 메시지 : ' + error.message);
      }
    } catch (error) {
      alert("로그인에 실패했습니다.");
      console.log('에러 메시지 : ' + error.message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="mb-8 text-3xl text-center">로그인</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            아이디
          </label>
          <input ref={useridRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 
            leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="아이디" />
          <p className="text-blue-500 text-xs italic">아이디를 입력하세요.</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            비밀번호
          </label>
          <input ref={pwdRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 
            leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*********" />
          <p className="text-blue-500 text-xs italic">비밀번호를 입력하세요.</p>
        </div>
        <div className="flex items-center justify-between">
          <button onClick={handleClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none 
              focus:shadow-outline" type="button">
            로그인
          </button>

          <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
            focus:outline-none focus:shadow-outline">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
