const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

async function generateBusinessName(inputText) {
  try {
    // Call GPT-3 to generate business name
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
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
    if (!response.ok) {
      throw new Error(`Error generating business name: ${data.error.message}`);
    }
    const businessName = data.choices[0].text.trim();
    console.log(businessName)
    return businessName;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function generateTagline(inputText, businessName) {
  try {
    // Call GPT-3 to generate tagline
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
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
    if (!response.ok) {
      throw new Error(`Error generating tagline: ${data.error.message}`);
    }
    const tagline = data.choices[0].text.trim();
    console.log(tagline);
    return tagline;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function generateImage(inputText) {
  try {
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
    if (!response.ok) {
      throw new Error(`Error generating image: ${data.error.message}`);
    }
    const imageURL = data.data[0].url;
    return imageURL;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function generateContent(inputText) {
  try {
    // Generate business name and tagline using GPT-3
    const businessName = await generateBusinessName(inputText);
    if (!businessName) {
      throw new Error('Error generating business name');
    }
    const tagline = await generateTagline(inputText, businessName);
    if (!tagline) {
      throw new Error('Error generating tagline');
    }

    // Generate image using DALL-E
    const imageURL = await generateImage(inputText);
    if (!imageURL) {
      throw new Error('Error generating image');
    }

    // Return generated content
    return {
      title: `${businessName}`,
      content: `${businessName} - ${tagline}`,
      imageURL: imageURL
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default generateContent;

