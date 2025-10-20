# 📸 Telegram Image Uploader

A React web application that allows you to upload images (via drag & drop, file selection, or paste) and send them directly to your Telegram channel using the Telegram Bot API.

## ✨ Features

- 🖼️ **Multiple Upload Methods**: Drag & drop, file selection, or paste from clipboard
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎨 **Beautiful UI**: Built with Bootstrap 5 and custom styling
- ⚡ **Real-time Preview**: See your image before sending
- 🔐 **Secure**: Bot token is handled locally
- 📤 **Direct Integration**: Sends images directly to your Telegram channel
- 🎯 **Easy Setup**: Simple configuration with bot token and channel ID

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ installed
- A Telegram bot (create one using [@BotFather](https://t.me/BotFather))
- A Telegram channel where you want to send images

### Installation

1. **Clone or download this repository**
   ```bash
   # If cloning from Git
   git clone <repository-url>
   cd telegram-image-uploader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📋 Setup Instructions

### 1. Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Save the bot token (it looks like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Set Up Your Channel

1. Create a new Telegram channel or use an existing one
2. Make your channel public (temporary) to get its username
3. Add your bot as an administrator to the channel:
   - Go to Channel Settings → Administrators → Add Admin
   - Select your bot and grant necessary permissions
4. Note your channel username (e.g., `@yourchannel`)

### 3. Configure the App

1. Open the app in your browser
2. Enter your **Bot Token** in the first field
3. Enter your **Channel ID** in the second field (format: `@yourchannel`)
4. Your configuration is saved locally and ready to use!

## 🎯 How to Use

1. **Configure**: Enter your bot token and channel ID
2. **Upload Image**: Choose one of the following methods:
   - **Drag & Drop**: Drag an image file onto the upload area
   - **Browse**: Click "Browse Files" to select an image
   - **Paste**: Copy an image and press Ctrl+V on the page
3. **Preview**: Review your image in the preview area
4. **Send**: Click "Send to Telegram" to upload the image to your channel

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free & Easy)

1. **Install GitHub Pages dependency**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json** - Add these scripts:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build",
       "homepage": "https://[your-username].github.io/[repository-name]"
     }
   }
   ```

3. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

### Option 2: Netlify (Recommended)

1. **Push your code to GitHub**
2. **Go to [Netlify](https://netlify.com)**
3. **Click "New site from Git"**
4. **Connect your GitHub repository**
5. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
6. **Deploy site**

### Option 3: Vercel

1. **Push your code to GitHub**
2. **Go to [Vercel](https://vercel.com)**
3. **Import your GitHub repository**
4. **Framework preset**: Create React App
5. **Deploy**

### Option 4: Traditional Hosting

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Upload the `build` folder** to your web server
3. **Configure your server** to serve the index.html for all routes

## 🔧 Configuration

### Environment Variables (Optional)

For production deployment, you can set default values:

```bash
# Create .env file
REACT_APP_TELEGRAM_BOT_TOKEN=your_default_bot_token
REACT_APP_TELEGRAM_CHANNEL_ID=@your_default_channel
```

### Customization

You can customize the app by modifying:

- **Colors**: Edit `src/App.css`
- **Layout**: Modify `src/App.tsx`
- **Styling**: Update Bootstrap classes or add custom CSS

## 🛡️ Security Notes

- **Bot Token**: Never expose your bot token in public repositories
- **Local Storage**: The app stores configuration locally in the browser
- **No Server**: All API calls are made directly from the client to Telegram
- **HTTPS**: Always deploy using HTTPS for secure API calls

## 📱 Mobile Support

The app is fully responsive and works on:
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Mobile browsers
- ✅ Tablets

## 🐛 Troubleshooting

### Common Issues

1. **"Bot token is invalid"**
   - Double-check your bot token from @BotFather
   - Ensure you're using the complete token

2. **"Chat not found"**
   - Verify your channel ID format (@channelname)
   - Ensure your bot is added as an administrator
   - Make sure the channel is accessible to the bot

3. **"Image upload failed"**
   - Check your internet connection
   - Verify image size (Telegram has size limits)
   - Try with a different image format

4. **Drag & drop not working**
   - Ensure you're using a modern browser
   - Try refreshing the page
   - Check browser console for errors

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify your Telegram bot and channel setup
3. Open an issue on GitHub with details about the problem

---

**Made with ❤️ using React, Bootstrap 5, and Telegram Bot API**