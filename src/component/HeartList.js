// src/component/HeartList.js
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { heartsState } from '../login/StAtom';
import PublicArtCard from './PublicArtCard';
import './Home.css';
import HeartIcon from './HeartIcon';

const HeartList = () => {
    const [cards, setCards] = useState([]); // 전체 카드 데이터를 저장하는 상태
    const hearts = useRecoilValue(heartsState); // Recoil 상태에서 좋아요를 누른 항목들의 ID를 가져옴
    const [results, setResults] = useState(null); // 추천 결과를 저장하는 상태
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 컴포넌트가 마운트될 때 전체 카드 데이터를 fetch하여 상태에 저장
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('/alldata.json'); // 데이터를 불러오는 경로
                const data = await response.json();
                setCards(data); // 가져온 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching cards', error);
            }
        };

        fetchCards();
    }, []);

    // "AI 추천받기" 버튼을 클릭하면 실행되는 함수
    const handleAIRecommendation = async () => {
        if (!hearts) {
            console.error('클릭된 하트가 없습니다.');
            return;
        }
        console.log("버튼클릭 실행성공");
        console.log('hearts = ', hearts);

        setLoading(true); // 로딩 상태 시작

        try {
            const response = await fetch('http://localhost:5000/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // JSON 형식으로 데이터 전송
                },
                body: JSON.stringify({ query_img_ids: hearts }) // hearts 배열을 query_img_ids로 전송
            });

            if (response.ok) {
                const result = await response.json();
                console.log('AI recommendation success:', result);

                const resultResponse = await fetch('http://localhost:5000/result');
                if (resultResponse.ok) {
                    const resultData = await resultResponse.json();
                    setResults(resultData); // 결과 데이터를 상태에 저장
                } else {
                    console.error('Error fetching result data:', resultResponse.statusText);
                }
            } else {
                console.error('AI recommendation failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching AI recommendation', error);
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    return (
        <div className='mt-32 w-full h-full flex flex-col justify-center items-center'>
            
            <h2 className='font-bold text-xl'>❤ 좋아요 리스트 ❤</h2>

            <div className='w-full h-30 flex items-center justify-end mr-7'>
                {loading && (
                    <div className="loading mx-5">
                        <div className="spinner"></div>
                    </div>
                )}
                <button onClick={handleAIRecommendation}
                    className="bg-sky-400 hover:bg-sky-500
                    text-white font-bold text-lg py-2 px-4 my-5 rounded-xl">
                    AI 추천받기
                </button>
            </div>

            <div className="card-view w-full grid gap-4 mx-auto justify-center mt-5 mb-10">
                {hearts.map(heartId => {
                    const card = cards.find(card => card.id === heartId);
                    return card ? (
                        <PublicArtCard
                            key={card.id}
                            artId={card.id}
                            imgSrc={card.image}
                            title={card.title}
                            addr1={card.address}
                            url={card.url}
                            HeartIcon={<HeartIcon artId={card.id} />}
                        />
                    ) : null;
                })}
                <div id="load-more-trigger" className="w-full h-10"></div>
            </div>

            {results && (
                <div className='results'>
                    <h2 className='flex justify-center font-bold text-xl mb-10'>
                    💖 추천 리스트 💖</h2>
                    {results.map((result, index) => (
                        <div key={index}>
                            <div className="card-view w-full grid gap-4 mx-auto justify-center mb-10">
                                {result.similar_items.map((item, idx) => (
                                   // !hearts.includes(item.id) && (
                                        <PublicArtCard
                                            key={item.id}
                                            artId={item.id}
                                            imgSrc={item.image}
                                            title={item.title}
                                            addr1={item.address}
                                            url={item.url}
                                            HeartIcon={<HeartIcon artId={item.id} />}
                                        />
                                    // )
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className='h-20'></div>
        </div>
    );
};

export default HeartList;
