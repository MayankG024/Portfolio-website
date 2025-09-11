# Analytics Setup Instructions

## 🔧 Google Analytics 4 Setup

### 1. Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create a new account for your portfolio

### 2. Set up GA4 Property
1. **Account Name**: "Portfolio Analytics" (or your preference)
2. **Property Name**: "Mayank Portfolio" (or your name)
3. **Reporting Time Zone**: Select your timezone
4. **Currency**: Select your local currency

### 3. Configure Data Stream
1. Select **"Web"** as platform
2. **Website URL**: Enter your deployed Netlify URL (e.g., `https://mayank-portfolio.netlify.app`)
3. **Stream Name**: "Portfolio Website"
4. Click "Create stream"

### 4. Get Your Measurement ID
1. After creating the stream, you'll see your **Measurement ID**
2. Format: `G-XXXXXXXXXX` (10 characters after G-)
3. Copy this ID

### 5. Add to Your Project

#### Option A: Environment Variable (Recommended)
1. Create `.env` file in your project root:
```bash
# .env
VITE_GA_MEASUREMENT_ID=G-YOUR-ACTUAL-ID-HERE
```

#### Option B: Direct Replacement
1. Open `src/utils/analytics.ts`
2. Replace `G-XXXXXXXXXX` with your actual ID

### 6. Deploy and Test
1. Deploy your updated code to Netlify
2. Visit your live website
3. Check Google Analytics "Realtime" reports to see live visitors

## 📊 What Analytics Will Track

### Automatic Tracking
- ✅ **Page Views**: Track visits to each section (Home, About, Blogs, Knowledge)
- ✅ **User Sessions**: How long visitors spend on your site
- ✅ **Device/Browser Info**: What devices and browsers visitors use
- ✅ **Geographic Data**: Where your visitors are located
- ✅ **Traffic Sources**: How visitors found your site (Google, direct, social, etc.)

### Custom Event Tracking
- 🔄 **Navigation**: Track which buttons users click
- 📝 **Contact Form**: Track form interactions (start, submit, success)
- 🔗 **Resource Clicks**: Track when users click on knowledge stash resources
- 📜 **Scroll Depth**: Track how far users scroll (25%, 50%, 75%, 90%, 100%)
- ⏱️ **Engagement**: Time spent on different sections

### Privacy Features
- ✅ **IP Anonymization**: User IPs are anonymized
- ✅ **Cookie Compliance**: Uses minimal, necessary cookies
- ✅ **GDPR Friendly**: Respects user privacy
- ✅ **Development Mode**: Only tracks in production, not during development

## 🎯 How to Use Analytics Data

### 1. Monitor Performance
- **Popular Pages**: See which sections visitors prefer
- **Bounce Rate**: Identify pages that need improvement
- **Session Duration**: Understand user engagement

### 2. Optimize Content
- **High-Traffic Pages**: Focus improvements on popular content
- **Drop-off Points**: See where users leave your site
- **Popular Resources**: Understand what knowledge users find valuable

### 3. Track Goals
- **Contact Form Conversions**: How many visitors contact you
- **Resource Engagement**: Which tools/articles are most clicked
- **Navigation Patterns**: How users move through your portfolio

## 🔍 Accessing Your Analytics

1. Go to [Google Analytics](https://analytics.google.com)
2. Select your portfolio property
3. View reports in:
   - **Realtime**: Live visitor activity
   - **Audience**: Visitor demographics and behavior
   - **Acquisition**: How visitors find your site
   - **Behavior**: What visitors do on your site
   - **Events**: Custom interactions you've set up

## 🚀 Next Steps

1. **Set up Goals** in GA4 for specific actions (form submissions, resource clicks)
2. **Create Custom Dashboards** for your most important metrics
3. **Set up Alerts** for unusual traffic patterns
4. **Regular Monitoring**: Check analytics weekly to understand your audience

Your portfolio now has comprehensive analytics tracking! 📈
