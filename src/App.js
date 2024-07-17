import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Signup from './signUp/SignUp';
import Nav from "./component/Nav";
import Home from "./component/Home"
import MyPage from './component/MyPage';
import HeartList from './component/HeartList';

function App() {
  return (
    <BrowserRouter>
    <RecoilRoot>
      <div className='h-full w-full flex flex-col justify-center items-center'>
        <Nav />
  
        <main className='mt-28'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/heartList' element={<HeartList />} />
          </Routes>
        </main>
    
      </div>
    </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
