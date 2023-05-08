import React from 'react'
import {Card } from 'react-bootstrap';

const Poster = ({generatedContent}) => {
  return (
    <div>
    <Card className=" shadow text-dark" style={{ width: '18 rem' }}>
      <Card.Img variant="top" src={generatedContent.imageURL} />
      <Card.Body>
        <Card.Title className="fs-2">{generatedContent.title}</Card.Title>
        <Card.Text>
          {generatedContent.content}
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
  )
}

export default Poster