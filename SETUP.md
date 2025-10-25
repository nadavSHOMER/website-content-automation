# Strapi Website Content Automation - Setup Guide

This project provides an AI-powered landing page for creating content in your Strapi CMS automatically.

## Features

- **Beautiful Landing Page**: Clean, modern interface for creating pages
- **AI Content Generation**: Generate engaging content based on title and description
- **Strapi Integration**: Automatically creates articles in your Strapi CMS
- **Responsive Design**: Works on all devices
- **Real-time Validation**: Form validation and character limits
- **Dynamic Content Blocks**: Support for rich text, media, and quotes

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build Strapi Admin Panel

```bash
npm run build
```

### 3. Start Strapi Development Server

```bash
npm run develop
```

The server will start at `http://localhost:1337`

### 4. Create Your First Admin User

On first launch, Strapi will prompt you to create an admin user:
1. Open `http://localhost:1337/admin`
2. Fill in your admin credentials
3. Click "Let's start"

### 5. Configure API Permissions (IMPORTANT!)

For the landing page to work, you need to enable public API access:

1. In the Strapi admin panel, go to **Settings** (left sidebar)
2. Under **Users & Permissions Plugin**, click **Roles**
3. Click on the **Public** role
4. Scroll down to find **Article** permissions
5. Enable the following permissions:
   - ✅ `create` (allows creating articles)
   - ✅ `find` (optional - allows listing articles)
   - ✅ `findOne` (optional - allows viewing single articles)
6. Click **Save** at the top right

### 6. Access the Landing Page

Open your browser and navigate to:
```
http://localhost:1337
```

or

```
http://localhost:1337/index.html
```

## How to Use the Landing Page

1. **Enter a Title**: Type a descriptive title for your page
2. **Add a Description** (optional): Provide details about what the page should cover
3. **Enable AI Generation** (optional):
   - Check the "Generate AI content for this page" checkbox
   - Click "Generate AI Content" to create content automatically
   - Review the generated content in the preview box
4. **Create the Page**: Click "Create Page" to save it to Strapi

The page will be created in Strapi and you can view/edit it in the admin panel under **Content Manager > Article**.

## Project Structure

```
website-content-automation/
├── config/               # Strapi configuration
│   ├── admin.ts         # Admin panel config
│   ├── database.ts      # Database configuration
│   ├── middlewares.ts   # CORS and middleware settings
│   └── server.ts        # Server configuration
├── database/            # SQLite database files
├── public/              # Public assets
│   └── index.html       # Landing page for creating content
├── src/
│   ├── api/
│   │   └── article/     # Article content type
│   │       ├── content-types/
│   │       ├── controllers/
│   │       ├── routes/
│   │       └── services/
│   ├── components/
│   │   └── shared/      # Shared components (rich-text, media, quote)
│   └── index.ts         # Strapi entry point
├── .env                 # Environment variables
└── package.json         # Dependencies and scripts
```

## API Endpoints

- `POST /api/articles` - Create a new article
- `GET /api/articles` - List all articles
- `GET /api/articles/:id` - Get a specific article
- `PUT /api/articles/:id` - Update an article
- `DELETE /api/articles/:id` - Delete an article

## Integrating Real AI

The current implementation uses simulated AI content generation. To integrate with a real AI service:

### Option 1: OpenAI (ChatGPT)

1. Get an API key from https://platform.openai.com
2. Add it to your `.env` file:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
3. Update the `generateAIContent()` function in `public/index.html`:

```javascript
async function generateAIContent(title, description) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_KEY'
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful content writer. Create engaging web page content in HTML format.'
                },
                {
                    role: 'user',
                    content: `Create content for a page titled "${title}". ${description ? 'Description: ' + description : ''}`
                }
            ]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}
```

### Option 2: Anthropic Claude

1. Get an API key from https://console.anthropic.com
2. Add it to your `.env`:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```
3. Update the function:

```javascript
async function generateAIContent(title, description) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'YOUR_ANTHROPIC_KEY',
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 1024,
            messages: [
                {
                    role: 'user',
                    content: `Create engaging web page content in HTML format for a page titled "${title}". ${description ? 'Description: ' + description : ''}`
                }
            ]
        })
    });

    const data = await response.json();
    return data.content[0].text;
}
```

**Important**: For production use, you should create a backend endpoint to handle AI API calls securely, rather than exposing API keys in the frontend.

## Customization

### Styling

Edit the CSS in `/public/index.html` to match your brand:
- Change colors in the gradient backgrounds
- Modify fonts and spacing
- Update button styles

### Content Type Fields

To add more fields to articles:

1. Edit `src/api/article/content-types/article/schema.json`
2. Add new attributes (e.g., `author`, `tags`, `featured_image`)
3. Restart Strapi
4. Update the landing page form to include the new fields

### Components

Create new content block types in `src/components/shared/`:
- Video blocks
- Call-to-action sections
- Image galleries
- Code snippets

## Troubleshooting

### CORS Errors
- Ensure Strapi is running on port 1337
- Check `config/middlewares.ts` includes your domain
- Clear browser cache

### 401 Unauthorized
- Verify `create` permission is enabled for Public role
- Check API endpoint is `/api/articles` (plural)

### 404 Not Found
- Ensure Strapi is running (`npm run develop`)
- Verify the Article content type exists
- Check browser console for errors

### Page Not Creating
- Open browser console to see detailed errors
- Verify the request payload format
- Check Strapi logs in the terminal

## Production Deployment

For production:

1. **Change all secrets in `.env`**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

2. **Use a production database** (PostgreSQL, MySQL, etc.)

3. **Configure proper CORS** for your domain

4. **Enable HTTPS**

5. **Set up authentication** for the landing page

6. **Use environment variables** for AI API keys

7. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

## Support

For issues or questions:
- Strapi Documentation: https://docs.strapi.io
- Strapi Community: https://forum.strapi.io

## License

See `license.txt` for details.
