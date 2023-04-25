import React, { useState } from 'react';
import PlayButton from '../../../assets/PlayButton.svg';
import VideoModal from '../../videoModal/VideoModal';

const TrailerCard = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoModal = (shouldOpen) => {
    setIsModalOpen(shouldOpen);
    if (shouldOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <div
        className="officialVideo-card"
        key={data?.id}
        onClick={() => handleVideoModal(true)}
        data-testid={'video-card'}
      >
        <span className="card-image">
          <img
            src={`https://img.youtube.com/vi/${data?.key}/mqdefault.jpg
          `}
            alt={`video-${data?.id}`}
          />
        </span>
        <div className="play-button">
          <img src={PlayButton} alt="play" />
        </div>
      </div>
      {isModalOpen && (
        <VideoModal
          mediaDetails={data}
          showModal={handleVideoModal}
          show={isModalOpen}
        />
      )}
    </>
  );
};

export default React.memo(TrailerCard);
