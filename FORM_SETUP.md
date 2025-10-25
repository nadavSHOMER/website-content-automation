# AI-Powered Page Creation Form

This project includes a form page that connects to Strapi and uses AI to generate content for new pages/articles.

## Features

- ✨ **AI Content Generation**: Generate engaging content based on title and description
- 🎯 **Form Validation**: Client-side validation with character limits
- 🚀 **Strapi Integration**: Creates articles directly in your Strapi CMS
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time Feedback**: Loading states and success/error messages

## Setup Instructions

### 1. Start Strapi Development Server

```bash
cd /Users/shome/my-strapi-project
npm run develop
```

### 2. Configure Strapi Permissions (Important!)

1. Open the Strapi admin panel at `http://localhost:1337/admin`
2. Go to **Settings** > **Users & Permissions Plugin** > **Roles**
3. Click on **Public** role
4. Under **Article**, enable the following permissions:
   - ✅ `create`
   - ✅ `find` (optional, for viewing articles)
   - ✅ `findOne` (optional, for viewing single articles)
5. Click **Save**

### 3. Access the Form

Open your browser and navigate to:
```
http://localhost:1337/create-page.html
```

## How to Use

1. **Enter a Title**: Provide a descriptive title for your page
2. **Add Description**: Write a brief description (80 characters max)
3. **Generate AI Content** (Optional): Click "✨ Generate AI Content" to create engaging content automatically
4. **Create Page**: Click "🚀 Create Page" to save to Strapi

## API Endpoints Used

- `POST /api/articles` - Creates new articles with AI-generated or custom content

## Troubleshooting

### CORS Errors
- The middlewares.ts has been configured to allow requests from localhost:1337
- Make sure Strapi is running on the default port 1337

### 401 Unauthorized Errors
- Ensure you've enabled `create` permission for the Public role in Articles
- Check that the Strapi server is running

### 404 Not Found Errors
- Verify that the Articles content type exists in Strapi
- Check that the API endpoint `/api/articles` is available

## Technical Details

### Content Structure
The form creates articles with the following structure:
```json
{
  "data": {
    "title": "Page Title",
    "description": "Short description",
    "blocks": [
      {
        "__component": "shared.rich-text",
        "body": "AI generated content or empty"
      }
    ]
  }
}
```

### AI Content Generation
Currently uses simulated AI content generation. In production, you would integrate with:
- OpenAI GPT API
- Google Gemini
- Anthropic Claude
- Other AI content generation services

## Customization

### Styling
Edit the CSS in `/public/create-page.html` to match your brand colors and design preferences.

### AI Integration
Replace the `generateAIContent()` function with actual AI service calls:

```javascript
async function generateAIContent(title, description) {
  const response = await fetch('YOUR_AI_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      prompt: `Create content about: ${title}. Description: ${description}`
    })
  });
  return await response.text();
}
```

### Content Fields
Modify the Strapi Article schema to add additional fields like:
- SEO metadata
- Featured images
- Tags/categories
- Custom content blocks

## Security Considerations

- In production, implement proper authentication
- Use environment variables for API keys
- Configure CORS for your production domain
- Add rate limiting for API endpoints
- Validate and sanitize all user inputs server-side