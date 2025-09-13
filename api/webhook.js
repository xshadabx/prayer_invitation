// Vercel serverless function for WhatsApp webhook
const twilio = require('twilio');

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'YOUR_TWILIO_AUTH_TOKEN';
const whatsappNumber = process.env.WHATSAPP_NUMBER || 'YOUR_WHATSAPP_NUMBER';

const client = twilio(accountSid, authToken);

// Event details for FAQ responses
const eventDetails = {
    title: "Iqra's Farewell Bash",
    date: "September 14th, 2025",
    time: "6:00 PM - 8:30 PM",
    venue: "Canopy, MG Road, Bangalore",
    purpose: "Celebrating Iqra's journey to study abroad in medicine",
    contact: "+91 63664 05786",
    whatsapp: "+1 980 470 3786",
    email: "rsvp@prayer-gathering.com",
    dressCode: "Semi-formal attire recommended",
    gifts: "Your presence is the greatest gift, but if you wish to bring something, educational books or travel accessories would be appreciated",
    rsvp: "Please confirm your attendance by calling or WhatsApp",
    directions: "Canopy is located on MG Road, Bangalore. You can use Google Maps for precise directions."
};

// FAQ responses with keywords
const faqResponses = {
    'event': `🎉 *${eventDetails.title}*\n\n📅 *Date:* ${eventDetails.date}\n⏰ *Time:* ${eventDetails.time}\n📍 *Venue:* ${eventDetails.venue}\n\n${eventDetails.purpose}`,
    'date': `📅 *Event Date:* ${eventDetails.date}`,
    'time': `⏰ *Event Time:* ${eventDetails.time}`,
    'venue': `📍 *Venue:* ${eventDetails.venue}\n\n${eventDetails.directions}`,
    'location': `📍 *Venue:* ${eventDetails.venue}\n\n${eventDetails.directions}`,
    'address': `📍 *Venue Address:* ${eventDetails.venue}\n\n${eventDetails.directions}`,
    'contact': `📞 *Contact Information:*\n\n📱 Call: ${eventDetails.contact}\n💬 WhatsApp: ${eventDetails.whatsapp}\n📧 Email: ${eventDetails.email}`,
    'phone': `📞 *Phone:* ${eventDetails.contact}`,
    'call': `📞 *Call:* ${eventDetails.contact}`,
    'whatsapp': `💬 *WhatsApp:* ${eventDetails.whatsapp}`,
    'email': `📧 *Email:* ${eventDetails.email}`,
    'rsvp': `✅ *RSVP Information:*\n\n${eventDetails.rsvp}\n\n📞 Call: ${eventDetails.contact}\n💬 WhatsApp: ${eventDetails.whatsapp}\n📧 Email: ${eventDetails.email}`,
    'confirm': `✅ *RSVP Information:*\n\n${eventDetails.rsvp}\n\n📞 Call: ${eventDetails.contact}\n💬 WhatsApp: ${eventDetails.whatsapp}\n📧 Email: ${eventDetails.email}`,
    'attendance': `✅ *RSVP Information:*\n\n${eventDetails.rsvp}\n\n📞 Call: ${eventDetails.contact}\n💬 WhatsApp: ${eventDetails.whatsapp}\n📧 Email: ${eventDetails.email}`,
    'dress': `👔 *Dress Code:* ${eventDetails.dressCode}`,
    'dresscode': `👔 *Dress Code:* ${eventDetails.dressCode}`,
    'wear': `👔 *Dress Code:* ${eventDetails.dressCode}`,
    'gift': `🎁 *Gift Information:*\n\n${eventDetails.gifts}`,
    'gifts': `🎁 *Gift Information:*\n\n${eventDetails.gifts}`,
    'directions': `🗺️ *Directions:*\n\n${eventDetails.directions}`,
    'how to reach': `🗺️ *How to Reach:*\n\n${eventDetails.directions}`,
    'map': `🗺️ *Directions:*\n\n${eventDetails.directions}\n\nYou can also use Google Maps to navigate to the venue.`,
    'purpose': `🎓 *Event Purpose:*\n\n${eventDetails.purpose}`,
    'celebration': `🎉 *About the Celebration:*\n\n${eventDetails.purpose}\n\nWe're celebrating Iqra's achievements and wishing her success as she spreads her wings to study abroad in the medical field.`,
    'iqra': `👩‍⚕️ *About Iqra:*\n\n${eventDetails.purpose}\n\nThis farewell celebration is open to all family members and friends who wish to join us in celebrating Iqra's achievements and wishing her success in her journey abroad.`,
    'help': `🤖 *Iqra's Farewell Bot - FAQ Menu*\n\nI can help you with:\n\n📅 *Event Details* - Ask about date, time, venue\n📞 *Contact Info* - Phone, WhatsApp, email\n✅ *RSVP* - How to confirm attendance\n👔 *Dress Code* - What to wear\n🎁 *Gifts* - Gift suggestions\n🗺️ *Directions* - How to reach venue\n🎓 *Purpose* - About the celebration\n\nJust type any keyword and I'll help you!`,
    'menu': `🤖 *Iqra's Farewell Bot - FAQ Menu*\n\nI can help you with:\n\n📅 *Event Details* - Ask about date, time, venue\n📞 *Contact Info* - Phone, WhatsApp, email\n✅ *RSVP* - How to confirm attendance\n👔 *Dress Code* - What to wear\n🎁 *Gifts* - Gift suggestions\n🗺️ *Directions* - How to reach venue\n🎓 *Purpose* - About the celebration\n\nJust type any keyword and I'll help you!`,
    'hi': `👋 *Hello! Welcome to Iqra's Farewell Bash!*\n\nI'm here to help you with any questions about the event. Type *help* to see what I can assist you with, or ask me anything about:\n\n📅 Date, time, venue\n📞 Contact information\n✅ RSVP details\n👔 Dress code\n🎁 Gift suggestions\n🗺️ Directions\n\nHow can I help you today?`,
    'hello': `👋 *Hello! Welcome to Iqra's Farewell Bash!*\n\nI'm here to help you with any questions about the event. Type *help* to see what I can assist you with, or ask me anything about:\n\n📅 Date, time, venue\n📞 Contact information\n✅ RSVP details\n👔 Dress code\n🎁 Gift suggestions\n🗺️ Directions\n\nHow can I help you today?`
};

// Function to find the best response based on message content
function findBestResponse(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Direct keyword matches
    for (const [keyword, response] of Object.entries(faqResponses)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }
    
    // Special cases for common questions
    if (lowerMessage.includes('what') && (lowerMessage.includes('date') || lowerMessage.includes('when'))) {
        return faqResponses['date'];
    }
    
    if (lowerMessage.includes('what') && (lowerMessage.includes('time') || lowerMessage.includes('hour'))) {
        return faqResponses['time'];
    }
    
    if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('venue')) {
        return faqResponses['venue'];
    }
    
    if (lowerMessage.includes('how') && lowerMessage.includes('contact')) {
        return faqResponses['contact'];
    }
    
    if (lowerMessage.includes('how') && (lowerMessage.includes('reach') || lowerMessage.includes('go'))) {
        return faqResponses['directions'];
    }
    
    // Default response for unrecognized messages
    return `🤖 *Iqra's Farewell Bot*\n\nI didn't quite understand that. Here are some things I can help you with:\n\n📅 Event details (date, time, venue)\n📞 Contact information\n✅ RSVP information\n👔 Dress code\n🎁 Gift suggestions\n🗺️ Directions\n\nType *help* for the full menu, or ask me about any of these topics!`;
}

// Main webhook handler
module.exports = async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    
    try {
        const message = req.body.Body;
        const from = req.body.From;
        
        console.log(`Received message from ${from}: ${message}`);
        
        // Find the best response
        const response = findBestResponse(message);
        
        // Send response via Twilio
        const twilioMessage = await client.messages.create({
            body: response,
            from: `whatsapp:${whatsappNumber}`,
            to: from
        });
        
        console.log(`Response sent: ${twilioMessage.sid}`);
        res.status(200).json({ 
            success: true, 
            messageId: twilioMessage.sid,
            response: response.substring(0, 100) + '...'
        });
        
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
}
