import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IsLogin, searchQueryState } from '../login/StAtom';  // 추가된 부분
import './Nav.css';
import Mypage from "../images/마이페이지.png";
import AiBoogi from "../images/AiBoogi로고.png";
import Search from "../images/search.png";

export default function Nav() {
    const [IsLoginCheck, setIsLoginCheck] = useRecoilState(IsLogin);  // recoil의 상태값을 가져옴
    const [setSearchQuery] = useRecoilState(searchQueryState); // 추가된 부분
    const [user, setUser] = useState(null);
    const [inputValue, setInputValue] = useState(''); // 검색어 입력값을 위한 상태

    const navigate = useNavigate(); // 변경된 부분

    useEffect(() => {
        const luser = sessionStorage.getItem('user');
        if (luser) {
            const parsedUser = JSON.parse(luser);
            setUser(parsedUser);
            setIsLoginCheck(true);
        } else {
            setUser(null);
            setIsLoginCheck(false);
        }
    }, [IsLoginCheck]);

    const handleSearchdiv = () => {
        setSearchQuery(inputValue); // 검색어 설정
        navigate(`/search?query=${inputValue}`);
    }

    return (
        <nav className="navbar w-full flex items-center justify-between flex-wrap pt-2 pb-2">
            
            <div className="w-2/3 mx-auto flex justify-between items-center my-2 mb-1">

                <div className="aiboogi flex justify-center items-center w-1/3">
                    <Link to="/" className=" whitespace-nowrap text-center font-semibold text-3xl tracking-tight rounded hover:border-transparent">
                        AI BOOGI
                    </Link>
                </div>

                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-1/3 mx-auto flex justify-center items-center mb-3">
                        <Link to="/" className="whitespace-nowrap font-semibold text-3xl tracking-tight rounded hover:border-transparent">
                            <img src={AiBoogi} alt="AiBoogi" width='90px' />
                        </Link>
                    </div>
                    <div onClick={handleSearchdiv}
                            className="mb-2 flex rounded-md border-2 border-gray-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                        <input type="text" placeholder="검색어를 입력하세요"
                            className="w-full outline-none bg-white text-gray-600 text-xs px-8 py-2"
                            value={inputValue}  // 입력값 상태
                            onChange={(e) => setInputValue(e.target.value)}  // 입력값 업데이트
                        />
                        <button type='button' className="flex items-center justify-center bg-gray-500 px-2">
                            <img src={Search} alt="search icon" className="w-8"/>
                        </button>
                    </div>
                </div>

                <div className="w-1/3 flex justify-center items-center">
                    {IsLoginCheck && user && (
                        <span className="hwan p text-base font-bold whitespace-nowrap mx-4">{`${user.username}님 환영합니다`}</span> // user.username 표시
                    )}
                    <Link to="/mypage" className="w-14 mypage-link font-bold mx-1 inline-block text-base px-2 py-2">
                        <img src={Mypage} alt="Mypage" />
                    </Link>
                </div>
            </div>
            
        </nav>
    )
}
