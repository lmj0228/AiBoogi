// src/component/Home.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { likedCardsState, searchQueryState, userState, heartsState } from '../login/StAtom.js';
import PublicArtCard from './PublicArtCard.js';
import HeartIcon from './HeartIcon';
import axios from 'axios';
import './Home.css';

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

    if (observer && document.querySelector('#load-more-trigger')) {
      observer.observe(document.querySelector('#load-more-trigger'));
    }

    observerRef.current = observer;

    return () => {
      if (observer) observer.disconnect();
    };
  }, [displayedData, tdata, loadMoreData]);

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

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="card-view w-full grid gap-4 mx-auto justify-center my-28">
        {cardTags}
        <div id="load-more-trigger" className="w-full h-10"></div>
      </div>
    </div>
  );
};
