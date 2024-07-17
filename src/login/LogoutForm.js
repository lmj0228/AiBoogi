export default function LogoutForm({ user, setUser, setIsLoginCheck }) {

    const handleLogout = () => {
        setUser(null);
        setIsLoginCheck(false);
        localStorage.removeItem('user'); // 로컬 스토리지에서 사용자 정보 제거
        localStorage.removeItem('isLoginCheck'); // 로컬 스토리지에서 로그인 상태 제거
    };

    return (
        <div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    {user && <p>{user.username}님,<br />로그아웃을 하시겠습니까?</p>}
                </div>
                <div className="flex items-center justify-center">
                    <button onClick={handleLogout}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 
                                    rounded focus:outline-none focus:shadow-outline"
                        type="button">
                        로그아웃
                    </button>
                </div>
            </form>
        </div>
    )
}
