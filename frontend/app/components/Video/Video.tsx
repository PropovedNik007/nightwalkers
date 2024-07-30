import React from 'react';
import css from './Video.module.css';


interface VideoProps {
    onClose: () => void;
  }

  const Video: React.FC<VideoProps> = ({ onClose }) => {
    return (
      <div className={css.videoWrapper}>
        <div className={css.videoContent}>
          <div className={css.headerVid}> 
          <img className={css.logoVid} src={'./favicon.ico'} alt="red cross logo" />
            <button className={css.closeButton} onClick={onClose}>
            x
          </button></div>
          {/* Add your modal content here */}
          <h1>Modal Content</h1>
          <p>This is the content of the modal.</p>
        </div>
      </div>
    );
  };

export default Video;
