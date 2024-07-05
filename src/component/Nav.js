import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IsLogin } from "../login/StAtom";
import './Nav.css';
import Mypage from "../images/마이페이지.png";
import AiBoogi from "../images/AiBoogi로고.png";

export default function Nav() {
    const [IsLoginCheck, setIsLoginCheck] = useRecoilState(IsLogin);  // recoil의 상태값을 가져옴
    const [user, setUser] = useState(null);

    useEffect(() => {
        const luser = sessionStorage.getItem('user');
        if (luser) {
            setUser(luser);
            setIsLoginCheck(true);
        } else {
            setUser(null);
            setIsLoginCheck(false);
        }
    }, [setIsLoginCheck]);

    return (
        <nav className="w-full flex items-center justify-between flex-wrap pt-6 pb-2">
            <div className="w-10/12 mx-auto flex justify-between items-center my-4">

                <div className="flex justify-center items-center w-1/3">
                    <Link to="/" className="whitespace-nowrap text-center font-semibold text-3xl tracking-tight rounded hover:border-transparent">
                        AI BOOGI
                    </Link>
                </div>

                <div className="w-1/3 mx-auto flex justify-center items-center flex-shrink-0 ">
                    <Link to="/" className=" mr-5 whitespace-nowrap font-semibold text-3xl tracking-tight rounded hover:border-transparent">
                        <img src={AiBoogi} alt="AiBoogi" width='100px' />
                    </Link>
                </div>

                <div className="w-1/3 flex justify-center items-center">
                    {IsLoginCheck && user && (
                        <span className="p text-base font-bold whitespace-nowrap mr-4">{`${user}님 환영합니다`}</span>

                    )}
                    <Link to="/mypage" className="mypage-link font-bold mx-1 inline-block text-base px-2 py-2 lg:mt-0">
                        <img src={Mypage} alt="Mypage" width="30px" />
                    </Link>
                    <Link to="/login" className="p font-bold mx-1 inline-block px-2 py-2
                            whitespace-nowrap lg:mt-0">
                        {IsLoginCheck ? "로그아웃" : "로그인"}
                    </Link>
                    {!IsLoginCheck && (<div className="text-sm mb-1">|</div>)}
                    {!IsLoginCheck && ( // 로그아웃 상태일 때만 회원가입 링크 보이기
                        <Link to="/signup" className="p font-bold mx-1 inline-block px-2 py-2
                                whitespace-nowrap lg:mt-0">
                            회원가입
                        </Link>)}
                </div>
            </div>
        </nav>
    )
}
