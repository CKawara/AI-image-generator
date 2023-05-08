import React, { useRef, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const Poster = ({ generatedContent }) => {
  const cardRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const saveCardAsImage = () => {
    setTimeout(() => {
      html2canvas(cardRef.current).then(function (canvas) {
        canvas.toBlob(function (blob) {
          saveAs(blob, 'poster.png');
        });
      });
    }, 1000); // delay of 1 second to ensure the image has loaded before downloading it
  };

  const handleImageLoaded = () => {
    setIsImageLoaded(true);
  };

  return (
    <div>
      <Card
        className="shadow text-dark"
        style={{ width: '18 rem' }}
        ref={cardRef}
      >
        <Card.Img
          variant="top"
          src={generatedContent.imageURL}
          onLoad={handleImageLoaded}
          style={{ display: isImageLoaded ? 'block' : 'none' }}
        />
        <Card.Body>
          <Card.Title className="fs-2">
            Title: {generatedContent.title}
          </Card.Title>
          <Card.Text>{generatedContent.content}</Card.Text>
        </Card.Body>
      </Card>
      <Button className='submit mt-4 w-50' onClick={saveCardAsImage}>Download as image</Button>
    </div>
  );
};

export default Poster;
