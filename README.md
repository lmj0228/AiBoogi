# React Project 생성
1. Node.js 설치 : https://nodejs.org/
2. npx create-react-app my-app 

# tailwind css 설치
1. npm install -D tailwindcss
2. Tailwind CSS 설정 파일 생성 
   - npx tailwindcss init
3. tailwind.config.js 파일 수정
   ```
   /** @type {import('tailwindcss').Config} */
   module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {},
   },
   plugins: [],
   }
   ```
4. index.css 추가
   ```
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
# React Icon
   - npm install react-icons --save
   - https://react-icons.github.io/react-icons/

# React Route
   - npm install react-router-dom

# Recoil 설치
   - npm install recoil

# 환경변수 설정
1. .env 만들기
   - .env 파일은 **최상위 루트**에 작성
   - 환경변수명은 반드시 REACT_APP_으로 시작
2. .env 파일 gitIgnore에 .env를 추가

# RESTful 테스팅
1. 설치 
   - npm install -g json-server
2. 실행 
   - npx json-server --watch db.json --port 3005 
3. RESTful(Representational State Transfer)
   - 주로 HTTP 프로토콜을 사용하며, 웹 상에서 클라이언트와 서버 간의 통신을 단순하고 효율적으로 구현
    - RESTful API
       - RESTful 아키텍처 스타일을 따르는 웹 API

    - HTTP 메서드와 CRUD 연산 매핑
       - GET: 자원의 표현을 요청  (읽기)
       - POST: 새로운 자원을 생성  (생성)
       - PUT: 기존 자원을 업데이트  (갱신)
       - DELETE: 자원을 삭제  (삭제)


# VS code Extention
- VS Code ES7 React/Redux/React-Native/JS snippets
- Tailwind CSS IntelliSense"# project" 
"# AiBoogi" 
