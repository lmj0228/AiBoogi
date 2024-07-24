// 1. 필요한 모듈과 상태 관리를 위해 Recoil 상태를 불러옵니다.
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { likedCardsState, searchQueryState, userState, heartsState } from '../login/StAtom.js';
import PublicArtCard from './PublicArtCard.js';
import HeartIcon from './HeartIcon';
import axios from 'axios';
import './Home.css';

// 2. 다양한 상태를 관리하기 위한 useState와 useRecoilState를 사용합니다.
export default function Home() {
  const [tdata, setTdata] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [cardTags, setCardTags] = useState([]);
  const [likedCards] = useRecoilState(likedCardsState);
  const searchQuery = useRecoilValue(searchQueryState);
  const [page, setPage] = useState(0);
  const observerRef = useRef(null);
  const user = useRecoilValue(userState);
  const setHearts = useRecoilState(heartsState)[1];

  const ITEMS_PER_PAGE = 20;

// 3. 데이터를 불러오는 함수를 정의하고, useEffect를 사용하여 컴포넌트가 마운트될 때 데이터를 불러옵니다.
  const getData = useCallback(async () => {
    try {
      const response = await fetch('./AllData.json');
      const data = await response.json();
      setTdata(data);
      const filteredData = data.filter(item => item.title.includes(searchQuery));
      setDisplayedData(filteredData.slice(0, ITEMS_PER_PAGE));

      if (user) {
        const heartResponse = await axios.get(`http://10.125.121.206:8080/api/heart/list?userid=${user.userid}`);
        const likedHearts = heartResponse.data.map(heart => heart.imgid);
        setHearts(likedHearts);
        localStorage.setItem('likedHearts', JSON.stringify(likedHearts));
      }
    } catch (err) {
      console.log("Fetch error:", err);
    }
  }, [searchQuery, user, setHearts]);

  useEffect(() => {
    getData();
    setPage(0);
  }, [getData]);

  // 4. 무한 스크롤을 구현하기 위해 IntersectionObserver를 사용합니다.
  const loadMoreData = useCallback(() => {
    const nextPage = page + 1;
    const start = nextPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const newData = tdata.slice(start, end);
    setDisplayedData(prev => [...prev, ...newData]);
    setPage(nextPage);
  }, [page, tdata]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && displayedData.length < tdata.length) {
        loadMoreData();
      }
    });

    const triggerElement = document.querySelector('#load-more-trigger'); // 변경된 줄
    if (triggerElement) observer.observe(triggerElement); // 변경된 줄

    observerRef.current = observer;

    return () => {
      if (observer) observer.disconnect();
    };
  }, [displayedData, tdata, loadMoreData]);

// 5. displayedData 상태가 변경될 때마다 PublicArtCard 컴포넌트를 생성하여 cardTags 상태를 업데이트합니다.
  useEffect(() => {
    const tm = displayedData.map(item => (
      <PublicArtCard
        key={item.id}
        artId={item.id}
        imgSrc={item.image}
        title={item.title}
        addr1={item.address}
        url={item.url}
        HeartIcon={<HeartIcon artId={item.id} />}
      />
    ));
    setCardTags(tm);
  }, [displayedData, likedCards]);

// 6. 컴포넌트의 렌더링 부분입니다.
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="card-view w-full grid gap-4 mx-auto justify-center my-28">
        {cardTags}
        <div id="load-more-trigger" className="w-full h-10"></div>
      </div>
    </div>
  );
};
