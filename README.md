# 🎮 Mayank Gupta - Portfolio Website

A retro gaming-inspired portfolio website built with React, TypeScript, and Tailwind CSS. Features a nostalgic pixel-perfect design with modern web technologies and smooth animations.

![Portfolio Screenshot](./public/portfolio-screenshot.png)

## ✨ Features

- 🎨 **Retro Gaming Aesthetic**: Pixel-perfect borders, gaming fonts, and nostalgic color schemes
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ⚡ **Performance Optimized**: Fast loading times with optimized assets
- 🎭 **Smooth Animations**: Scroll-triggered animations and interactive button physics
- 🎯 **SEO Ready**: Comprehensive meta tags and Open Graph support
- 🔧 **Error Handling**: Graceful error boundaries and loading states
- 🎮 **Interactive UI**: Button animations, hover effects, and touch-friendly design
- � **Contact Form**: Fully functional contact form with validation and feedback

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS animations
- **Build Tool**: Vite
- **Fonts**: Press Start 2P, Jersey 25
- **Icons**: Lucide React
- **Deployment**: Ready for Netlify, Vercel, or GitHub Pages

## 🎯 Sections

1. **Home**: Interactive typewriter animation with ASCII art
2. **Blogs**: Personal thoughts and technical articles
3. **Knowledge Stash**: Curated resources and tools
4. **About**: Personal story, skills, and contact form

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/MayankG024/Portfolio-web.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛢️ Database Setup

This portfolio includes Supabase integration for contact forms and analytics. **See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for complete setup instructions.**

### Quick Setup:
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and API key
3. Create database tables using the provided SQL script
4. Add credentials to `.env` file:
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

### Database Features:
- **Contact Form Storage**: All form submissions stored securely
- **Analytics Tracking**: Page views and user interactions
- **Real-time Feedback**: Success/error messages for users
- **Security**: Row Level Security (RLS) enabled

## 📱 Mobile Optimization

The website is fully optimized for mobile devices with:

- Touch-friendly button sizes (44px minimum)
- Responsive navigation with smart text truncation
- Optimized typography scaling
- Mobile-specific CSS optimizations
- Horizontal scroll prevention
- Simplified scrollbars for mobile

## 🎨 Design Features

### Gaming Aesthetic
- Pixel-perfect retro borders with 3D shadow effects
- Gaming-inspired color scheme (beige background, black borders, green accents)
- Floating batarang animations in the background
- Custom scrollbar with gaming elements

### Typography
- **Headers**: Press Start 2P (pixelated gaming font)
- **Body Text**: Jersey 25 (readable modern font)
- Responsive font scaling across all devices

### Animations
- Scroll-triggered slide-in animations
- Typewriter effects for welcome text
- Button physics with shadow depth
- Hover animations throughout

## 🔧 Customization

### Update Personal Information
1. Edit `src/components/HomePage.tsx` for main content
2. Update `src/components/AboutPage.tsx` for personal details
3. Modify `src/components/BlogsPage.tsx` for blog posts
4. Edit `src/components/KnowledgeStash.tsx` for resources

### SEO & Meta Tags
Update `index.html` with your information:
- Title and description
- Open Graph tags
- Twitter cards
- Canonical URL

### Analytics
Implement analytics in `src/utils/analytics.ts`:
- Google Analytics
- Custom event tracking
- Performance monitoring

## 📊 Performance

- **Loading Screen**: Engaging loading animation
- **Error Boundaries**: Graceful error handling
- **Lazy Loading**: Optimized image loading
- **Code Splitting**: Efficient bundle splitting
- **Mobile Optimized**: Fast mobile performance

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import project from GitHub
2. Framework preset: Vite
3. Auto-deploy on push

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🎮 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Found a bug or want to suggest an improvement? Open an issue or submit a pull request!

## 📞 Contact

- **Email**: mayankgupta024@gmail.com
- **Twitter**: [@mayankG024](https://twitter.com/mayankG024)
- **LinkedIn**: [Mayank Gupta](https://linkedin.com/in/mayank-gupta-024)

---

Made with ❤️ by Mayank Gupta
