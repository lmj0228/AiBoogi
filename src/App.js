import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Login from "./login/Login";
import Signup from './signUp/SignUp';
import Nav from "./component/Nav";
import Home from "./component/Home"
import MyPage from './component/MyPage';
import SearchResults from './component/SearchResults';

function App() {
  return (
    <BrowserRouter>
    <RecoilRoot>
      <div className='h-full w-full flex flex-col justify-center items-center'>
        <Nav />
  
        <main className='mt-28'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path="/search" element={<SearchResults />} /> {/* 검색 결과 경로 추가 */}
          </Routes>
        </main>
    
      </div>
    </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;

