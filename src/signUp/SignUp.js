import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  // const keywords = [
  //   "명소", "관광", "문화", "쇼핑", "식당", "자연", "역사", "예술", "음악", "축제",
  //   "체험", "레저", "숙박", "음식", "카페", "박물관", "갤러리", "전통", "현대", "야경"
  // ];

  // const [selectedKeywords, setSelectedKeywords] = useState([]);

  // const handleCheckboxChange = (keyword) => {
  //   if (selectedKeywords.includes(keyword)) {
  //     setSelectedKeywords(selectedKeywords.filter(item => item !== keyword));
  //   } else {
  //     setSelectedKeywords([...selectedKeywords, keyword]);
  //   }
  // };

  const [form, setForm] = useState({
    username: '',
    password: '',
    userid: '',
    confirm_password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // 키워드 선택 확인
    // if (selectedKeywords.length < 3) {
    //   setMessage('최소 3개의 키워드를 선택해야 합니다.');
    //   alert('최소 3개의 키워드를 선택해야 합니다.');
    //   return;
    // }

    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (form.password !== form.confirm_password) {
      setMessage('비밀번호가 일치하지 않습니다.');
      alert('비밀번호가 일치하지 않습니다.')
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/signup', {
        username: form.username,
        password: form.password,
        userid: form.userid,
        // keyword: selectedKeywords.join(',')
      });

      setMessage('회원가입이 성공적으로 완료되었습니다.');
      alert('회원가입이 성공적으로 완료되었습니다.');
      console.log('가입 성공:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage('이미 존재하는 사용자 id 입니다.');
        alert('이미 존재하는 사용자 id 입니다.');
      } else {
        setMessage('회원가입 중 오류가 발생했습니다.');
        alert('회원가입 중 오류가 발생했습니다.');
      }
      console.error('회원가입 중 오류 발생', error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="bg-grey-lighter flex flex-col">
          <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">

            <div className="mt-20 text-grey-dark">
              이미 계정이 있습니까?
              <a className="no-underline border-b border-blue text-blue mx-3" href="../login/">
                클릭하여 로그인 페이지로 이동하기
              </a>
            </div>

            <div className="bg-white my-10 px-6 py-8 rounded shadow-md text-black w-full">
              {message && <p className="text-xl text-center text-blue-500 my-10">{message}</p>}
              <h1 className="mb-8 text-3xl text-center">회원가입</h1>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                이름
              </label>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="username"
                placeholder="이름"
                value={form.username}
                onChange={handleChange}
                required
              />

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userid">
                아이디
              </label>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="userid"
                placeholder="아이디"
                value={form.userid}
                onChange={handleChange}
                required
              />

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                비밀번호
              </label>
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="비밀번호"
                value={form.password}
                onChange={handleChange}
                required
              />

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">
                비밀번호를 한번 더 입력하세요.
              </label>
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                placeholder="비밀번호 확인"
                value={form.confirm_password}
                onChange={handleChange}
                required
              />

              {/* <div className='my-10'>
              <p className="mb-4">관심 키워드를 3개 이상 선택하세요.</p>
                <div className="grid grid-cols-2 gap-4">
                  {keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={keyword}
                        name="keywords"
                        value={keyword}
                        checked={selectedKeywords.includes(keyword)}
                        onChange={() => handleCheckboxChange(keyword)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <label htmlFor={keyword} className="ml-2 text-gray-700">{keyword}</label>
                    </div>
                  ))}
                </div>
              </div> */}

              <button
                type="submit"
                className="mt-5 w-full text-center py-3 rounded font-bold bg-blue-600 text-white hover:bg-blue-700 focus:outline-none my-1"
              >
                회원가입
              </button>

              <div className="text-center text-sm text-grey-dark mt-4">
                회원가입 시
                <br />
                <a className="mx-1 no-underline border-b border-black text-grey-dark" href="#">
                  '서비스 약관'
                </a>
                과
                <a className="mx-1 no-underline border-b border-black text-grey-dark" href="#">
                  '개인정보 처리 방침'
                </a>
                에 동의합니다.
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

