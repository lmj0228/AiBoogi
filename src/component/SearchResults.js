import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PublicArtCard from './PublicArtCard';

export default function SearchResults() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      fetch('./AllData.json')
        .then(response => response.json())
        .then(data => {
          const filteredData = data.filter(item => item.title.includes(query));
          setResults(filteredData);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [query]);

  return (
    <div className="search-results w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-4">검색 결과</h2>
      <div className="card-view w-full grid gap-4 mx-auto justify-center my-20">
        {results.length > 0 ? (
          results.map(item => (
            <PublicArtCard
              key={item.id}
              artId={item.id}
              imgSrc={item.image}
              title={item.title}
              addr1={item.address}
              url={item.url}
              isHearted={false} // 기본값 설정
              onHeartClick={() => {}}
            />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
