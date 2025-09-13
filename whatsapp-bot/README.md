# 🤖 Iqra's Farewell WhatsApp Bot

An intelligent WhatsApp chatbot that automatically responds to FAQs about Iqra's Farewell Bash event using Twilio's WhatsApp Business API.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/iqra-farewell-whatsapp-bot)

## 📱 Features

- **Automatic FAQ Responses**: Responds to common questions about the event
- **Smart Keyword Matching**: Understands various ways people ask questions
- **Rich Formatting**: Uses emojis and formatting for better readability
- **Event-Specific Information**: Tailored responses for Iqra's Farewell Bash
- **Easy Deployment**: Ready for Vercel, Railway, Heroku, or any Node.js hosting

## 🎯 Supported Questions

### Event Details
- "What's the event date?" → September 14th, 2025
- "What time is it?" → 6:00 PM - 8:30 PM
- "Where is the venue?" → Canopy, MG Road, Bangalore

### Contact Information
- "How do I contact?" → Phone, WhatsApp, Email details
- "What's the phone number?" → +91 63664 05786

### RSVP
- "How do I RSVP?" → Contact methods for confirmation
- "Confirm attendance" → RSVP instructions

### Practical Info
- "What should I wear?" → Semi-formal attire
- "Gift suggestions" → Educational books, travel accessories
- "Directions" → How to reach the venue

### General
- "Hi" / "Hello" → Welcome message with menu
- "Help" → Full FAQ menu

## 🛠️ Local Development

### Prerequisites
- Node.js 16+
- Twilio Account
- WhatsApp Business API access

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/iqra-farewell-whatsapp-bot.git
cd iqra-farewell-whatsapp-bot

# Install dependencies
npm install

# Set environment variables
cp env.example .env
# Edit .env with your Twilio credentials

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file:

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
WHATSAPP_NUMBER=your_whatsapp_number
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Fork this repository**
2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Import your forked repository
   - Deploy automatically

3. **Configure Twilio**:
   - Go to [Twilio Console](https://console.twilio.com/)
   - Navigate to Messaging → Settings → WhatsApp sandbox settings
   - Set webhook URL: `https://your-vercel-app.vercel.app/api/webhook`
   - Set HTTP method: `POST`

### Other Platforms

- **Railway**: [Deploy Guide](https://railway.app/)
- **Render**: [Deploy Guide](https://render.com/)
- **Heroku**: [Deploy Guide](https://heroku.com/)

## 📊 Bot Configuration

### Event Details
All event information is configured in `api/webhook.js`:

```javascript
const eventDetails = {
    title: "Iqra's Farewell Bash",
    date: "September 14th, 2025",
    time: "6:00 PM - 8:30 PM",
    venue: "Canopy, MG Road, Bangalore",
    purpose: "Celebrating Iqra's journey to study abroad in medicine",
    contact: "+91 63664 05786",
    whatsapp: "+1 980 470 3786",
    email: "rsvp@prayer-gathering.com"
};
```

### Adding New FAQs
Edit the `faqResponses` object in `api/webhook.js`:

```javascript
'newkeyword': `Your response here with *bold* text and emojis 🎉`
```

## 🧪 Testing

### Test the Webhook
```bash
curl -X POST https://your-app.vercel.app/api/webhook \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "Body=hi&From=whatsapp:+1234567890"
```

### Test WhatsApp
1. Send a message to your WhatsApp number
2. Try keywords: `hi`, `event`, `date`, `help`
3. Verify responses are received

## 📈 Monitoring

### Health Check
```bash
curl https://your-app.vercel.app/api/health
```

### Logs
Monitor Vercel function logs for:
- Incoming messages
- Response generation
- Error handling

## 🔒 Security

- Environment variables for sensitive data
- Input validation and sanitization
- Error handling for failed deliveries
- CORS headers for web requests

## 📞 Support

For technical issues:
- Check function logs in Vercel dashboard
- Verify Twilio configuration
- Test webhook endpoint
- Contact: +91 63664 05786

## 🎉 Event Information

**Iqra's Farewell Bash**
- 📅 **Date**: September 14th, 2025
- ⏰ **Time**: 6:00 PM - 8:30 PM
- 📍 **Venue**: Canopy, MG Road, Bangalore
- 🎓 **Purpose**: Celebrating Iqra's journey to study abroad in medicine
- 📱 **WhatsApp**: +1 980 470 3786

## 📄 License

MIT License - feel free to use this for your own events!

---

*May Allah bless Iqra with knowledge, wisdom, and success in serving humanity. Ameen.* 🤲
