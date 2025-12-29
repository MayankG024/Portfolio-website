import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContactForm } from './ContactForm';
import { RetroBackground } from './RetroBackground';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function HomePage() {
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [headerText, setHeaderText] = useState('');
  const [showHeaderCursor, setShowHeaderCursor] = useState(true);
  const [asciiVisible, setAsciiVisible] = useState(false);
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  
  // Scroll animations for different sections
  const headerAnimation = useScrollAnimation({ threshold: 0.2 });
  const welcomeAnimation = useScrollAnimation({ threshold: 0.1 });
  const menuAnimation = useScrollAnimation({ threshold: 0.1 });
  const statsAnimation = useScrollAnimation({ threshold: 0.1 });
  const experienceAnimation = useScrollAnimation({ threshold: 0.1 });
  const skillsAnimation = useScrollAnimation({ threshold: 0.1 });
  const contactAnimation = useScrollAnimation({ threshold: 0.1 });
  
  const introText = "WELCOME TO MY DIGITAL WORLD";
  const headerIntroText = "Hello World, I am";

  // Optimize batarang floating animation data (reduce count)
  const batarangs = [
    { id: 1, x: '5%', y: '15%', rotation: 45, duration: 25, delay: 0 },
    { id: 2, x: '92%', y: '25%', rotation: -30, duration: 30, delay: 5 },
    { id: 3, x: '8%', y: '60%', rotation: 120, duration: 35, delay: 10 },
    { id: 4, x: '88%', y: '85%', rotation: -45, duration: 28, delay: 15 },
  ];
  
  // Typewriter effect for header text
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < headerIntroText.length) {
        setHeaderText(headerIntroText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setShowHeaderCursor(false);
        // Show ASCII art after header text is complete
        setTimeout(() => {
          setAsciiVisible(true);
        }, 300);
      }
    }, 80);
    
    return () => clearInterval(timer);
  }, []);

  // Typewriter effect for welcome text
  useEffect(() => {
    const startDelay = headerIntroText.length * 80 + 800; // Wait for header text + ASCII animation + 800ms
    
    const startTimer = setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < introText.length) {
          setCurrentText(introText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setWelcomeComplete(true); // Mark welcome text as complete
        }
      }, 60); // Reduced from 100ms to 60ms for faster typing
    }, startDelay);
    
    return () => clearTimeout(startTimer);
  }, []);
  
  // Cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
      setShowHeaderCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorTimer);
  }, []);

  const menuItems = [
    { id: 'blogs', path: '/blogs', label: '► READ MY THOUGHTS', description: 'Blogs & Essays' },
    { id: 'knowledge', path: '/knowledge', label: '► KNOWLEDGE VAULT', description: 'Curated Resources' },
    { id: 'about', path: '/about', label: '► ABOUT THE PLAYER', description: 'My Story & Stats' }
  ];

  const stats = [
   
    { label: 'SPAWNED', value: '2003, India' },
    { label: 'EXPERIENCE', value: 'Gaining' },
    { label: 'EDUCATION', value: 'Bachelor CS 26' },
    { label: 'LANGUAGES', value: 'English, Hindi' }
  ];

  return (
    <>
      <RetroBackground />
      
      {/* Floating Batarangs Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {batarangs.map((batarang) => (
          <div
            key={batarang.id}
            className="absolute opacity-10 text-foreground"
            style={{
              left: batarang.x,
              top: batarang.y,
              transform: `rotate(${batarang.rotation}deg)`,
              animation: `float-batarang-${batarang.id} ${batarang.duration}s ease-in-out infinite`,
              animationDelay: `${batarang.delay}s`,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-sm">
              <path d="M12 2L8 6L4 4L6 8L2 12L6 16L4 20L8 18L12 22L16 18L20 20L18 16L22 12L18 8L20 4L16 6L12 2Z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-6 py-6 sm:py-12 pb-12 sm:pb-24 relative z-10">
        <div className="max-w-4xl w-full text-center space-y-8 sm:space-y-16">
        
        {/* ASCII Art Header with Typewriter */}
        <div 
          ref={headerAnimation.elementRef}
          className={`retro-border p-4 sm:p-8 bg-card relative transition-all duration-700 ease-out ${
            headerAnimation.isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="text-left mb-4">
            <span className="text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide leading-relaxed text-foreground">
              {headerText}
              {showHeaderCursor && headerText.length < headerIntroText.length && <span className="typewriter-cursor">█</span>}
            </span>
          </div>
          <div className={`text-[6px] sm:text-[8px] md:text-[10px] font-mono leading-tight whitespace-pre tracking-wide transition-opacity duration-500 overflow-x-auto text-foreground ${
            asciiVisible ? 'opacity-100' : 'opacity-0'
          }`}>
{`
    ███╗   ███╗ █████╗ ██╗   ██╗ █████╗ ███╗   ██╗██╗  ██╗     ██████╗ ██╗   ██╗██████╗ ████████╗ █████╗ 
    ████╗ ████║██╔══██╗╚██╗ ██╔╝██╔══██╗████╗  ██║██║ ██╔╝    ██╔════╝ ██║   ██║██╔══██╗╚══██╔══╝██╔══██╗
    ██╔████╔██║███████║ ╚████╔╝ ███████║██╔██╗ ██║█████╔╝     ██║  ███╗██║   ██║██████╔╝   ██║   ███████║
    ██║╚██╔╝██║██╔══██║  ╚██╔╝  ██╔══██║██║╚██╗██║██╔═██╗     ██║   ██║██║   ██║██╔═══╝    ██║   ██╔══██║
    ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║ ╚████║██║  ██╗    ╚██████╔╝╚██████╔╝██║        ██║   ██║  ██║
    ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝     ╚═════╝  ╚═════╝ ╚═╝        ╚═╝   ╚═╝  ╚═╝
`}
          </div>
        </div>

        {/* Typewriter Effect for Welcome */}
        <div 
          ref={welcomeAnimation.elementRef}
          className={`retro-border p-4 sm:p-8 bg-card transition-all duration-700 ease-out ${
            welcomeAnimation.isVisible 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-12 opacity-0'
          }`}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 font-['Press_Start_2P'] 
                         tracking-wider leading-relaxed text-foreground">
            {currentText}
            {showCursor && !welcomeComplete && <span className="typewriter-cursor">█</span>}
          </h2>
          <div className="text-lg sm:text-xl md:text-2xl tracking-wider 
                          leading-relaxed space-y-4 sm:space-y-8 max-w-4xl mx-auto text-foreground">
            <p className="jersey-25-regular text-lg sm:text-xl md:text-2xl leading-relaxed mb-4 sm:mb-6">
              I like to call myself a <span className="bg-accent/20 px-2 py-1 rounded-sm">design engineer</span>. My curiosity for how things work fuels my passion to create big.
            </p>
            <p className="jersey-25-regular text-lg sm:text-xl md:text-2xl leading-relaxed mb-4 sm:mb-6">
              <span className="bg-accent/20 px-2 py-1 rounded-sm">Technology</span>,<span className="bg-accent/20 px-2 py-1 rounded-sm">physics</span>and<span className="bg-accent/20 px-2 py-1 rounded-sm">philosophy</span>are the subjects which force me to create something that outlasts me.
            </p>
            <p className="jersey-25-regular text-lg sm:text-xl md:text-2xl leading-relaxed mb-4 sm:mb-6">
              Classic stuff like cinema, books and some introspection has shaped me into who I am.
            </p>
            <p className="jersey-25-regular text-lg sm:text-xl md:text-2xl leading-relaxed mb-1 sm:mb-2">
              Follow me on{' '}
              <a 
                href="https://twitter.com/mayankG024"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 underline decoration-2 underline-offset-4 hover:text-green-800 hover:bg-green-100 px-2 sm:px-3 py-1 sm:py-2 rounded transition-all duration-200 font-medium"
              >
              twitter
              </a>{' '}
              for random thoughts and updates.
            </p>
            <p className="jersey-25-regular text-lg sm:text-xl md:text-2xl leading-relaxed mb-4 sm:mb-6">
              (do check out my{' '}
              <Link 
                to="/blogs"
                className="text-green-600 underline decoration-2 underline-offset-4 hover:text-green-800 hover:bg-green-100 px-2 sm:px-3 py-1 sm:py-2 rounded transition-all duration-200 font-medium"
              >
              blogs
              </Link>{' '}
              to know more!)
            </p>
          </div>
        </div>

        {/* Game Menu */}
        <div 
          ref={menuAnimation.elementRef}
          className={`retro-border p-4 sm:p-8 bg-card transition-all duration-700 ease-out ${
            menuAnimation.isVisible 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-12 opacity-0'
          }`}
        >
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-6 sm:mb-8 font-['Press_Start_2P'] 
                         tracking-wider leading-relaxed text-foreground">MAIN MENU</h2>
          <div className="space-y-4 sm:space-y-6">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`retro-border w-full p-4 sm:p-6 text-left group transition-all duration-150 ease-in-out border-2 border-border bg-card block
                           shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted 
                           hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] 
                           hover:-translate-x-0.5 hover:-translate-y-0.5 
                           active:shadow-[1px_1px_0px_0px_hsl(var(--border))] 
                           active:translate-x-0.5 active:translate-y-0.5`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                  <span className="text-sm sm:text-lg md:text-xl font-['Press_Start_2P'] tracking-wide text-foreground">{item.label}</span>
                  <span className="text-xs sm:text-sm md:text-base text-green-600 font-['Jersey_25'] tracking-wide">{item.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Player Stats */}
        <div 
          ref={statsAnimation.elementRef}
          className={`retro-border p-4 sm:p-8 bg-card transition-all duration-700 ease-out ${
            statsAnimation.isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-6 sm:mb-8 font-['Press_Start_2P'] 
                         tracking-wider leading-relaxed text-foreground">PLAYER STATS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="retro-border p-3 sm:p-4 transition-all duration-150 ease-in-out cursor-pointer border-2 border-border bg-card
                                         shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted 
                                         hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] 
                                         hover:-translate-x-0.5 hover:-translate-y-0.5 
                                         active:shadow-[1px_1px_0px_0px_hsl(var(--border))] 
                                         active:translate-x-0.5 active:translate-y-0.5">
                <div className="text-sm sm:text-base text-green-600 mb-2 font-['Jersey_25'] tracking-wide">{stat.label}</div>
                <div className="text-xs sm:text-sm md:text-base font-['Press_Start_2P'] tracking-wide break-words text-foreground">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Log */}
        <div 
          ref={experienceAnimation.elementRef}
          className={`retro-border p-4 sm:p-8 bg-card transition-all duration-1000 ease-out
                     ${experienceAnimation.isVisible 
                       ? 'translate-x-0 opacity-100' 
                       : '-translate-x-12 opacity-0'
                     }`}
        >
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-6 sm:mb-8 font-['Press_Start_2P'] 
                         tracking-wider leading-relaxed text-left text-foreground">EXPERIENCE LOG</h2>
          <div className="space-y-4">
            <div className="retro-border p-4 bg-background border-2 border-border transition-all duration-150 ease-in-out cursor-pointer
                           shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted 
                           hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] 
                           hover:-translate-x-0.5 hover:-translate-y-0.5 
                           active:shadow-[1px_1px_0px_0px_hsl(var(--border))] 
                           active:translate-x-0.5 active:translate-y-0.5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                <div className="flex-1 text-left">
                  <h3 className="font-['Press_Start_2P'] text-sm sm:text-base mb-2 tracking-wider text-left text-foreground">
                    FREELANCE DEVELOPER
                  </h3>
                  <p className="font-['Jersey_25'] tracking-wide text-base sm:text-lg text-left text-foreground">
                    INDEPENDENT
                  </p>
                </div>
                <div className="text-left sm:text-right sm:flex-shrink-0">
                  <div className="font-['Jersey_25'] text-sm sm:text-base tracking-wide text-foreground">
                    FEB 2025 - PRESENT
                  </div>
                  <div className="font-['Jersey_25'] text-green-600 text-sm sm:text-base tracking-wide">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="font-['Jersey_25'] text-green-600 leading-relaxed tracking-wide text-base sm:text-lg text-left">
                Developed high-end production ready web apps interfaces and frontends for a number of clients.
              </p>
            </div>
            
            <div className="retro-border p-4 bg-background shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                <div className="flex-1 text-left">
                  <h3 className="font-['Press_Start_2P'] text-sm sm:text-base mb-2 tracking-wider text-left text-foreground">
                    BLACKBOX AI STUDENT AMBASSADOR
                  </h3>
                  <p className="font-['Jersey_25'] tracking-wide text-base sm:text-lg text-left text-foreground">
                    BLACKBOX.AI
                  </p>
                </div>
                <div className="text-left sm:text-right sm:flex-shrink-0">
                  <div className="font-['Jersey_25'] text-sm sm:text-base tracking-wide text-foreground">
                    SEP 2024 - PRESENT
                  </div>
                  <div className="font-['Jersey_25'] text-green-600 text-sm sm:text-base tracking-wide">
                    ★★★★☆
                  </div>
                </div>
              </div>
              <p className="font-['Jersey_25'] text-green-600 leading-relaxed tracking-wide text-base sm:text-lg text-left">
                Collaborate with a global network of AI Mavericks and creating awareness and learning of AI chatbots, LLMs and NLP. Part-time remote position working with cutting-edge AI technologies.
              </p>
            </div>
            
            <div className="retro-border p-4 bg-background shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                <div className="flex-1 text-left">
                  <h3 className="font-['Press_Start_2P'] text-sm sm:text-base mb-2 tracking-wider text-left text-foreground">
                    CORE TEAM MEMBER
                  </h3>
                  <p className="font-['Jersey_25'] tracking-wide text-base sm:text-lg text-left text-foreground">
                    FOSS UNITED DEHRADUN
                  </p>
                </div>
                <div className="text-left sm:text-right sm:flex-shrink-0">
                  <div className="font-['Jersey_25'] text-sm sm:text-base tracking-wide text-foreground">
                    FEB 2024 - PRESENT
                  </div>
                  <div className="font-['Jersey_25'] text-green-600 text-sm sm:text-base tracking-wide">
                    ★★★☆☆
                  </div>
                </div>
              </div>
              <p className="font-['Jersey_25'] text-green-600 leading-relaxed tracking-wide text-base sm:text-lg text-left">
                Content Management and Technical Writing for the open source community. Contributing to FOSS initiatives and helping organize tech events in Dehradun, Uttarakhand.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Acquired */}
        <div 
          ref={skillsAnimation.elementRef}
          className={`retro-border p-4 sm:p-8 bg-card transition-all duration-700 ease-out ${
            skillsAnimation.isVisible 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-12 opacity-0'
          }`}
        >
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-6 sm:mb-8 font-['Press_Start_2P'] 
                         tracking-wider leading-relaxed text-foreground">SKILLS ACQUIRED</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Languages */}
            <div className="space-y-4">
              <div className="text-sm sm:text-lg font-['Press_Start_2P'] tracking-wide text-green-600">
                <span>Languages</span>
              </div>
              <div className="ml-3 sm:ml-6 space-y-2">
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">Java</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">Python</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">JavaScript</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">SQL</div>
              </div>
            </div>

            {/* Frontend */}
            <div className="space-y-4">
              <div className="text-sm sm:text-lg font-['Press_Start_2P'] tracking-wide text-green-600">
                <span>Frontend</span>
              </div>
              <div className="ml-3 sm:ml-6 space-y-2">
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">TailwindCSS</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">React</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">Next JS</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">Framer Motion</div>
              </div>
            </div>

            {/* Backend */}
            <div className="space-y-4">
              <div className="text-sm sm:text-lg font-['Press_Start_2P'] tracking-wide text-green-600">
                <span>Backend</span>
              </div>
              <div className="ml-3 sm:ml-6 space-y-2">
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">PostGres</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">Spring Boot</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">Node.js</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">Express</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">Supabase</div>
              </div>
            </div>

            {/* Tools */}
            <div className="space-y-4">
              <div className="text-sm sm:text-lg font-['Press_Start_2P'] tracking-wide text-green-600">
                <span>Tools</span>
              </div>
              <div className="ml-3 sm:ml-6 space-y-2">
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">AI Agents</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">Git</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">Docker</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">MySQL</div>
                <div className="retro-border px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg md:text-xl font-['Jersey_25'] tracking-wide bg-card text-foreground">Postman</div>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form */}
        <div 
          ref={contactAnimation.elementRef}
          className={`transition-all duration-700 ease-out ${
            contactAnimation.isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
        >
          <ContactForm />
        </div>

        </div>
      </div>
    </>
  );
}