import React from 'react';
import { Image } from 'react-bootstrap';

const Paragraph = ({ text, imageSrc }) => {
  return (
    <div className="paragraph">
      <div className="notebook">
        <div className="comment-bubble">
          <p>{text}</p>
        </div>
      </div>
      <div>
        <Image
          style={{ width: '500px', height: 'auto' }}
          src={imageSrc}
          alt="Image for the paragraph"
        />
      </div>
    </div>
  );
};

export default Paragraph;
