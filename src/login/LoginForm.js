import { useRef } from "react"
import { Link } from "react-router-dom";

export default function LoginForm({ handleLogin }) {

    const emailRef = useRef();
    const pwdRef = useRef();

    const handleClick = () => {
        if (emailRef.current.value === '') {
            alert("아이디를 입력하세요");
            emailRef.current.focus();
            return;
        }
        if (pwdRef.current.value === '') {
            alert("비밀번호를 입력하세요");
            emailRef.current.focus();
            return;
        }
        handleLogin(emailRef.current.value);
        alert("로그인이 성공적으로 완료되었습니다.")
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="mb-8 text-3xl text-center">로그인</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        아이디
                    </label>
                    <input ref={emailRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="아이디" />
                    <p className="text-blue-500 text-xs italic">아이디를 입력하세요.</p>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        비밀번호
                    </label>
                    <input ref={pwdRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*********" />
                    <p className="text-blue-500 text-xs italic">비밀번호를 입력하세요.</p>
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={handleClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        로그인
                    </button>

                    <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        회원가입
                    </Link>
                </div>
            </form>
        </div>
    )
}
