import React from 'react';
import { useRecoilState } from 'recoil';
import { likedCardsState } from '../login/StAtom';
import PublicArtCard from './PublicArtCard';
import { Link } from "react-router-dom";
import { IsLogin } from "../login/StAtom";

export default function MyPage() {

  const [IsLoginCheck] = useRecoilState(IsLogin);
  const [likedCards, setLikedCards] = useRecoilState(likedCardsState);

  const handleHeartClick = (artId) => {
    setLikedCards(prevLikedCards =>
      prevLikedCards.some(card => card.title === artId)
        ? prevLikedCards.filter(card => card.title !== artId)
        : [...prevLikedCards, { title: artId, isHearted: true }]
    );
  };

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <Link to="/login" className="p font-bold mx-1 inline-block px-2 py-2
                            whitespace-nowrap mt-20">
          {IsLoginCheck ? "로그아웃" : "로그인"}
      </Link>
      {!IsLoginCheck && ( // 로그아웃 상태일 때만 회원가입 링크 보이기
                        <Link to="/signup" className="p font-bold mx-1 inline-block px-2 py-2
                                whitespace-nowrap lg:mt-0">
                            회원가입
                        </Link>
                    )}

      <p className='mt-20'>좋아요 목록</p>
      <div className="card-view w-full grid gap-4 mx-auto justify-center mb-20">
       
        {likedCards.filter(card => card.isHearted).map(card => (
          <PublicArtCard
            key={card.title}
            artId={card.title}
            imgSrc={card.image}
            title={card.title}
            addr1={card.address}
            isHearted={card.isHearted}
            onHeartClick={handleHeartClick}
          />
        ))}
      </div>
    </div>
  );
}
