import { useState, useEffect, useRef, useCallback } from "react";
import { useRecoilState, useRecoilValue  } from "recoil";
import { likedCardsState, searchQueryState  } from '../login/StAtom';
import PublicArtCard from './PublicArtCard.js';
import './Home.css';

export default function Home() {
  // 전체 데이터
  const [tdata, setTdata] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [cardTags, setCardTags] = useState([]);
  const [likedCards, setLikedCards] = useRecoilState(likedCardsState);
  const searchQuery = useRecoilValue(searchQueryState); // 추가된 부분
  const [page, setPage] = useState(0);
  const observerRef = useRef(null);

  const ITEMS_PER_PAGE = 20; // 한번에 로드할 데이터 수

  // 데이터 fetch
  const getData = () => {
    fetch('./AllData.json')
      .then(resp => resp.json())
      .then(data => {
        setTdata(data);
        const filteredData = data.filter(item => item.title.includes(searchQuery)); // 추가된 부분
        setDisplayedData(filteredData.slice(0, ITEMS_PER_PAGE)); // 처음에 일부 데이터만 로드
      })
      .catch(err => console.log("Fetch error:", err)); // 에러 콘솔 출력
  };


  // fetch
  useEffect(() => {
    getData();
  }, [searchQuery]); // searchQuery에 따라 데이터 fetch

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

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && displayedData.length < tdata.length) {
        loadMoreData();
      }
    });

    if (observerRef.current && document.querySelector('#load-more-trigger')) {
      observerRef.current.observe(document.querySelector('#load-more-trigger'));
    }
  }, [displayedData, tdata, loadMoreData]);


  useEffect(() => {
    let tm = displayedData.map(item => (
      <PublicArtCard
        key={item.id}
        artId={item.title}
        imgSrc={item.image}
        title={item.title}
        addr1={item.address}
        url={item.url}
        isHearted={likedCards.some(card => card.title === item.title)}
        onHeartClick={() => handleHeartClick(item)}
      />
    ));
    setCardTags(tm);
  }, [displayedData, likedCards]);

  const handleHeartClick = (item) => {
    setLikedCards(prev =>
      prev.some(card => card.title === item.title)
        ? prev.filter(card => card.title !== item.title)
        : [...prev, { ...item, isHearted: true }]
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
        
        <div className="card-view w-full grid gap-4 mx-auto justify-center my-28">
          {cardTags}
        <div id="load-more-trigger" className="w-full h-10"></div> {/* 로딩 트리거 */}
      </div>
    </div>
  );
};

