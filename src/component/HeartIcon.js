
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { heartsState } from '../login/StAtom';

const HeartIcon = ({ artId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [hearts, setHearts] = useRecoilState(heartsState);

  const user = JSON.parse(localStorage.getItem('user'));
  const isLoginCheck = localStorage.getItem('isLoginCheck') === 'true';

  useEffect(() => {
    setIsLiked(hearts.includes(artId));
  }, [artId, hearts]);

  const toggleHeart = async () => {
    if (!isLoginCheck) {
      alert('로그인이 필요합니다.');
      return;
    }

    const payload = { userid: user.userid, imgid: artId };

    if (isLiked) {
      try {
        await axios.post('http://10.125.121.206:8080/api/heart/unlike', null, { params: payload });
        const updatedHearts = hearts.filter(card => card !== artId);
        setHearts(updatedHearts);
        localStorage.setItem('likedHearts', JSON.stringify(updatedHearts));
        setIsLiked(false);
      } catch (error) {
        console.error('좋아요 취소 에러', error);
      }
    } else {
      try {
        await axios.post('http://10.125.121.206:8080/api/heart/like', null, { params: payload });
        const updatedHearts = [...hearts, artId];
        setHearts(updatedHearts);
        localStorage.setItem('likedHearts', JSON.stringify(updatedHearts));
        setIsLiked(true);
      } catch (error) {
        console.error('좋아요 추가 에러', error);
      }
    }
  };

  return (
    <>
      {user && (
        <div onClick={toggleHeart} style={{ cursor: 'pointer' }}>
          {isLiked ? '❤' : '🤍'}
        </div>
      )}
    </>
  );
};

export default HeartIcon;
