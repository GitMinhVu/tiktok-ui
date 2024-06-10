import React, { useState } from 'react';

const VideoPlayer = () => {
    const [videoUrls] = useState([
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    ]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const handleNextVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
    };

    const handlePreviousVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videoUrls.length) % videoUrls.length);
    };

    return (
        <div>
            <video width="600" controls>
                <source src={videoUrls[currentVideoIndex]} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video tag.
            </video>
            <div>
                <button onClick={handlePreviousVideo}>Previous Video</button>
                <button onClick={handleNextVideo}>Next Video</button>
            </div>
        </div>
    );
};

export default VideoPlayer;
