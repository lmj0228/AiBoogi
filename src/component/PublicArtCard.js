import './PublicArtCard.css';
import noImage from '../images/no image.png' ;
import { useNavigate } from 'react-router-dom';

export default function PublicArtCard({ imgSrc, title, addr1 }) {
    // 상대 URL을 절대 URL로 변환
    const absoluteimgSrc = imgSrc.startsWith('http') ? imgSrc : `http://${imgSrc}`;

    const navigate = useNavigate() ; 

    const handleCardClick = () => {
        // 새 창으로 이동하는 코드
    };

    const handleError = (e) => {
        e.target.src = noImage;
    };

    return (
        <div className="public-art-card flex justify-between m-3" onClick={handleCardClick}>
            <img className="public-art-image" src={absoluteimgSrc} alt={title} onError={handleError}/>
            <div className="my-auto">
                <div className="font-bold mb-2 mx-3 text-center">{title} ❤</div>
                <div className="text-sm mx-5"> {addr1}</div>
            </div>
        </div>
    );
};

