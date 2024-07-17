import './PublicArtCard.css';
import noImage from '../images/no image.png';
import HeartIcon from './HeartIcon';

export default function PublicArtCard({ artId, imgSrc, title, addr1, url }) {
  const absoluteimgSrc = imgSrc ? (imgSrc.startsWith('http') ? imgSrc : `http://${imgSrc}`) : noImage;

  const handleCardClick = () => {
    window.open(url, '_blank');
  };

  const handleError = (e) => {
    e.target.src = noImage;
  };

  const getShortAddr = (addr) => {
    const index = addr.indexOf('\n');
    return index === -1 ? addr : addr.substring(0, index);
  };

  return (
    <div className="public-art-card flex justify-between m-3">
      <img className="public-art-image" onClick={handleCardClick} src={absoluteimgSrc} alt={title} onError={handleError} />
      <div className="my-auto flex flex-col justify-center items-center">
        <div className='flex justify-center items-center mb-2'>
          <div className="font-bold ml-2 text-center ellipsis-text items-center" style={{ maxWidth: '200px' }}>{title}</div>
            <HeartIcon artId={artId} />
          </div>
        <div className="text-sm mx-2 ellipsis-text text-center" style={{ maxWidth: '200px' }}>{getShortAddr(addr1)}</div>
      </div>
    </div>
  );
}
