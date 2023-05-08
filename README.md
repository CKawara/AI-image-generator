# AI-image-generator

React web app that uses AI to create an image based on a user’s input. The app uses OpenAI's GPT-3 text and DALL-E image APIs.

The app functions like this:
1) The user enters some information (e.g. a single word or sentence) that describes what they want
2) App takes the information and uses AI to generate an image. 

    An example workflow:

        a) App uses entered text of “african hair salon” to create AI prompts
        b) App uses text AI to generate and return a business name and tagline
        c) App takes Image AI to create a relevant image
        d) App combines the above to create a poster/social media post etc
        3) App displays the final result as an downloadable image
