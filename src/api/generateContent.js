const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

async function generateBusinessName(inputText) {
  // Call GPT-3 to generate business name
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      prompt: `Generate a business name for "${inputText}"`,
      max_tokens: 32,
      temperature: 0.7,
      n: 1
    })
  });
  const data = await response.json();
  const businessName = data.choices[0].text.trim();

  return businessName;
}

async function generateTagline(inputText, businessName) {
  // Call GPT-3 to generate tagline
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      prompt: `Generate a tagline for "${businessName}" that relates to "${inputText}"`,
      max_tokens: 32,
      temperature: 0.7,
      n: 1
    })
  });
  const data = await response.json();
  const tagline = data.choices[0].text.trim();

  return tagline;
}

async function generateImage(inputText) {
  // Call DALL-E to generate image
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'image-alpha-001',
      prompt: `Generate an image of "${inputText}"`,
      size: '512x512',
      response_format: 'url'
    })
  });
  const data = await response.json();
  const imageURL = data.data[0].url;

  return imageURL;
}

async function generateContent(inputText) {
  // Generate business name and tagline using GPT-3
  const businessName = await generateBusinessName(inputText);
  const tagline = await generateTagline(inputText, businessName);

  // Generate image using DALL-E
  const imageURL = await generateImage(inputText);

  // Return generated content
  return {
    title: `${businessName} - ${tagline}`,
    imageURL: imageURL
  };
}

export default generateContent;
