import React, { useState } from 'react'
import generateContent from '../api/generateContent';
import { Button, Form } from 'react-bootstrap';

const ContentGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [generatedContent, setGeneratedContent] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = await generateContent(inputText);
    setGeneratedContent(content);
  };

  return (
    <div className='mx-auto col-6'>
      <Form className='textform' onSubmit={handleSubmit}>
      <Form.Group className="mb-3 " controlId="inputText">
        <Form.Label className='fs-3'>Input Text:</Form.Label>
        <Form.Control 
        size="lg"
        type="text" 
        placeholder="Enter words to generate poster" 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}/>
        <div className='text-center'>
          <Button className="mt-4 w-50 submit" type="submit">Generate</Button>
        </div>
      </Form.Group>
      </Form>
      {generatedContent && (
        <div>
          <h2>{generatedContent.title}</h2>
          <img src={generatedContent.imageURL} alt={generatedContent.title} />
        </div>
      )}
    </div>
  )
}

export default ContentGenerator