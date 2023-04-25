import React, { useEffect } from 'react';
import './style.css';

const VideoModal = ({ mediaDetails, showModal, show }) => {
  useEffect(() => {
    function handleModal() {
      showModal(false);
    }

    const modalWindow = document.querySelector('.modal');

    modalWindow.addEventListener('click', handleModal);
    return () => removeEventListener('click', handleModal);
  }, []);

  return (
    <>
      <div className={`modal`}>
        <div className="modal-content">
          <iframe
            src={`https://www.youtube.com/embed/${mediaDetails?.key}`}
            title={mediaDetails?.name}
            allowFullScreen="1"
          ></iframe>
          <button
            type="button"
            className="close-button"
            onClick={() => showModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoModal;
