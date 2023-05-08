import React, { useState } from 'react'
import generateContent from '../api/generateContent';
import { Button, Form, Spinner } from 'react-bootstrap';
import Poster from './Poster';

const ContentGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const content = await generateContent(inputText);
    setGeneratedContent(content);
    setIsLoading(false);
  };

  return (
    <div className='mx-auto col-6'>
      <Form className='textform' onSubmit={handleSubmit}>
        <Form.Group className="mb-3 " controlId="inputText">
          <Form.Label className='fs-3'>Input Text:</Form.Label>
          <Form.Control 
            required
            size="lg"
            type="text" 
            placeholder="Enter words to generate poster" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className='text-center'>
            <Button className="mt-4 w-50 submit" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  {' '}
                  Generating...
                </>
              ) : (
                'Generate'
              )}
            </Button>
          </div>
        </Form.Group>
      </Form>
      {generatedContent && (
        <div>
          <p>Click generate if not satisfied with result</p>
          <Poster generatedContent={generatedContent}/>
        </div>
      )}
    </div>
  )
}

export default ContentGenerator
