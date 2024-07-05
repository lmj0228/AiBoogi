import { useState, useEffect } from "react";
import PublicArtCard from './PublicArtCard.js';
import './Home.css';

export default function Home() {
  // 부산공공조형물 전체 데이터
  const [tdata, setTdata] = useState([]);
  const [cardTags, setCardTags] = useState([]);

  const urls = [
    `http://apis.data.go.kr/6260000/AttractionService/getAttractionKr?serviceKey=${process.env.REACT_APP_APIKEY}&pageNo=1&numOfRows=146&resultType=json`,

    `http://apis.data.go.kr/6260000/MarintimeService/getMaritimeKr?serviceKey=${process.env.REACT_APP_APIKEY}&pageNo=1&numOfRows=81&resultType=json`,

    `http://apis.data.go.kr/6260000/RecommendedService/getRecommendedKr?serviceKey=${process.env.REACT_APP_APIKEY}&pageNo=1&numOfRows=207&resultType=json`,

    `https://apis.data.go.kr/6260000/PublicArt/getPublicArtInfo?serviceKey=${process.env.REACT_APP_APIKEY}&pageNo=1&numOfRows=612&resultType=json`,

    `https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${process.env.REACT_APP_APIKEY}&pageNo=1&numOfRows=35&resultType=json`
  ];


  // 실제 fetch
  const getData = (url) => {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        setTdata(data.getPublicArtInfo.body.items.item)
      })
      .catch(err => console.log(err));
  };


  // 부산공공조형물 데이터 fetch
  useEffect(() => {
    let url = `https://apis.data.go.kr/6260000/PublicArt/getPublicArtInfo?`;
    url = url + `serviceKey=${process.env.REACT_APP_APIKEY}`;
    url = url + `&numOfRows=900&resultType=json`;

    getData(url);
  }, []);


  useEffect(() => {
    if (!tdata.length === "") {
      setCardTags([]);

    } else {
      // 전체 카드 초기 표시
      let tm = tdata.map(item =>
        <PublicArtCard
          key={item.artId}  // key prop 추가
          artId={item.artId}
          imgSrc={item.imgSrc}
          title={item.title}
          addr1={item.addr1}/>
      );
      setCardTags(tm);
    } 
  }, [tdata]);


  // 데이터 중 "artId"가 "12"인 항목 필터링하여 제거
  useEffect(() => {
    if (!tdata.length) return;
    const filteredData = tdata.filter(item => item.artId !== "12");
    if (filteredData.length !== tdata.length) {
      setTdata(filteredData);
    }
  }, [tdata]);


  return (
    <div className="w-full h-full flex flex-col justify-center items-center">

      <div className="card-view w-full grid gap-4 mx-auto justify-center my-20">
        {cardTags}
      </div>

    </div>
  );
};

