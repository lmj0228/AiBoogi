// src/component/HeartList.js
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { heartsState } from '../login/StAtom';
import PublicArtCard from './PublicArtCard';
import './Home.css';

const HeartList = () => {
    const [cards, setCards] = useState([]);
    //const user = useRecoilValue(userState);
    const hearts = useRecoilValue(heartsState);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('/alldata.json');
                const data = await response.json();
                setCards(data);
            } catch (error) {
                console.error('Error fetching cards', error);
            }
        };

        fetchCards();
    }, []);

    return (
        <div className='mt-32 w-full h-full flex flex-col justify-center items-center'>
            <h2>My Hearts</h2>

            <div className="card-view w-full grid gap-4 mx-auto justify-center my-20">
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
                        />
                    ) : null;
                })}
                <div id="load-more-trigger" className="w-full h-10"></div>
            </div>
        </div>
    );
};

export default HeartList;
