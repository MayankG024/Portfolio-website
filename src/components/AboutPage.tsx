import { Mail, Github, Twitter, Linkedin } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { RetroBackground } from './RetroBackground';
import { TypewriterText } from './TypewriterText';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function AboutPage() {
  // Scroll animations for different sections
  const headerAnimation = useScrollAnimation({ threshold: 0.2 });
  const leftSidebarAnimation = useScrollAnimation({ threshold: 0.1 });
  const bioAnimation = useScrollAnimation({ threshold: 0.1 });
  const experienceAnimation = useScrollAnimation({ threshold: 0.1 });
  const quoteAnimation = useScrollAnimation({ threshold: 0.2 });

  // Batarang floating animation data
  const batarangs = [
    { id: 1, x: '5%', y: '15%', rotation: 45, duration: 20, delay: 0 },
    { id: 2, x: '92%', y: '25%', rotation: -30, duration: 25, delay: 3 },
    { id: 3, x: '8%', y: '60%', rotation: 120, duration: 30, delay: 7 },
    { id: 4, x: '88%', y: '70%', rotation: -90, duration: 22, delay: 12 },
    { id: 5, x: '15%', y: '85%', rotation: 60, duration: 28, delay: 5 },
    { id: 6, x: '85%', y: '90%', rotation: -45, duration: 35, delay: 15 },
  ];

  const experience = [
    {
      role: "SOFTWARE DEVELOPER",
      company: "INCUBR · INTERNSHIP",
      period: "JAN 2026 - PRESENT",
      level: "★★★★★",
      description: "On-site software development internship in Delhi, India. Building and shipping production-ready software solutions."
    },
    {
      role: "FREELANCE DEVELOPER",
      company: "INDEPENDENT",
      period: "FEB 2025 - PRESENT",
      level: "★★★★★",
      description: "Developed high-end production ready web apps interfaces and frontends for a number of clients."
    },
    {
      role: "BLACKBOX AI STUDENT AMBASSADOR",
      company: "BLACKBOX.AI",
      period: "SEP 2024 - PRESENT",
      level: "★★★★☆",
      description: "Collaborate with a global network of AI Mavericks and creating awareness and learning of AI chatbots, LLMs and NLP. Part-time remote position working with cutting-edge AI technologies."
    },
    {
      role: "CORE TEAM MEMBER",
      company: "FOSS UNITED DEHRADUN",
      period: "FEB 2024 - PRESENT",
      level: "★★★☆☆",
      description: "Content Management and Technical Writing for the open source community. Contributing to FOSS initiatives and helping organize tech events in Dehradun, Uttarakhand."
    }
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

    <div className="min-h-screen px-6 py-8 pb-24 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div 
          ref={headerAnimation.elementRef}
          className={`retro-border p-8 bg-card mb-12 transition-all duration-1000 ease-out
                     ${headerAnimation.isVisible 
                       ? 'translate-y-0 opacity-100' 
                       : 'translate-y-8 opacity-0'
                     }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground font-['Press_Start_2P'] 
           tracking-wider leading-relaxed">
            <TypewriterText 
              text="► PLAYER PROFILE" 
              speed={80}
              startDelay={200}
            />
          </h1>
          <p className="text-lg md:text-xl text-green-600 font-['Jersey_25'] max-w-3xl 
                        leading-relaxed tracking-wide">
            Character stats, background lore, and Experience.<br />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Contact & Stats */}
          <div 
            ref={leftSidebarAnimation.elementRef}
            className={`lg:col-span-1 space-y-8 transition-all duration-1000 ease-out
                       ${leftSidebarAnimation.isVisible
                         ? 'translate-x-0 opacity-100'
                         : '-translate-x-12 opacity-0'
                       }`}
          >
            
            {/* Profile Photo with Hover Flip */}
            <div className="retro-border p-8 bg-card">
              <div className="space-y-4">
                <div className="aspect-square relative overflow-hidden">
                  <div 
                    className="flip-container relative w-full h-full"
                    style={{ 
                      perspective: '1000px'
                    }}
                  >
                    <div 
                      className="flip-inner relative w-full h-full transition-transform duration-300 ease-in-out cursor-pointer"
                      style={{ 
                        transformStyle: 'preserve-3d'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'rotateY(180deg)';
                        // Find the batman text element
                        const container = e.currentTarget.closest('.retro-border');
                        const textElement = container?.querySelector('.batman-text') as HTMLElement;
                        if (textElement) {
                          textElement.style.opacity = '1';
                          textElement.style.transform = 'translateY(0)';
                          textElement.style.visibility = 'visible';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'rotateY(0deg)';
                        // Find the batman text element
                        const container = e.currentTarget.closest('.retro-border');
                        const textElement = container?.querySelector('.batman-text') as HTMLElement;
                        if (textElement) {
                          textElement.style.opacity = '0';
                          textElement.style.transform = 'translateY(10px)';
                          textElement.style.visibility = 'hidden';
                        }
                      }}
                    >
                      {/* Front Image - og.jpg */}
                      <div 
                        className="flip-front absolute inset-0 w-full h-full"
                        style={{ 
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        <img 
                          src="/og.jpg" 
                          alt="Profile Photo" 
                          className="w-full h-full object-cover"
                          style={{ 
                            border: '2px solid #22c55e',
                            borderRadius: '0px',
                            display: 'block'
                          }}
                        />
                      </div>
                      
                      {/* Back Image - og_2.jpg */}
                      <div 
                        className="flip-back absolute inset-0 w-full h-full"
                        style={{ 
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <img 
                          src="/og_2.jpg" 
                          alt="Profile Photo Alternative" 
                          className="w-full h-full object-cover"
                          style={{ 
                            border: '2px solid #22c55e',
                            borderRadius: '0px',
                            display: 'block'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Default Text - always visible under og.jpg */}
                <div className="text-center">
                  <p className="font-['Press_Start_2P'] text-muted-foreground text-xs tracking-wider leading-relaxed">
                    (Don't come close)
                  </p>
                </div>
                
                {/* Batman Text - appears on flip */}
                <div 
                  className="batman-text text-center transition-all duration-200 ease-in-out"
                  style={{
                    opacity: 0,
                    transform: 'translateY(10px)',
                    visibility: 'hidden'
                  }}
                >
                  <p className="font-['Press_Start_2P'] text-foreground text-sm tracking-wider leading-relaxed">
                    I AM BATMAN !!
                  </p>
                </div>
              </div>
            </div>

            {/* Player Stats */}
            <div className="retro-border p-6 bg-card">
        <h2 className="text-lg font-bold mb-4 text-foreground font-['Press_Start_2P'] 
                             tracking-wider leading-relaxed">CURRENT STATS</h2>
              <div className="space-y-4">
                   <div className="flex justify-between items-center">
          <span className="font-['Jersey_25'] text-muted-foreground tracking-wide text-lg">EDUCATION</span>
                  <span className="font-['Jersey_25'] text-green-600 tracking-wide text-lg">DIT University</span>
                </div>
                <div className="flex justify-between items-center">
          <span className="font-['Jersey_25'] text-muted-foreground tracking-wide text-lg">LOCATION</span>
                  <span className="font-['Jersey_25'] text-green-600 tracking-wide text-lg">Dehradun, India</span>
                </div>
                <div className="flex justify-between items-center">
          <span className="font-['Jersey_25'] text-muted-foreground tracking-wide text-lg">AGE</span>
                  <span className="font-['Jersey_25'] text-green-600 tracking-wide text-lg">22</span>
                </div>
             
                <div className="flex justify-between items-center">
          <span className="font-['Jersey_25'] text-muted-foreground tracking-wide text-lg">STATUS</span>
                  <span className="font-['Jersey_25'] text-green-600 tracking-wide text-lg flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span>ONLINE</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Terminal */}
            <div className="retro-border p-6 bg-card">
      <h2 className="text-lg font-bold mb-4 text-foreground font-['Press_Start_2P'] 
                             tracking-wider leading-relaxed">CONTACT PROTOCOLS</h2>
              <div className="space-y-3">
                <button className="retro-border w-full p-3 text-left hover:bg-green-900/20 
                                   transition-all duration-300 group">
                  <div className="flex items-center space-x-3">
        <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="font-['Jersey_25'] text-green-600 tracking-wide text-base">
                      MAYANKYNR24@GMAIL.COM
                    </span>
                  </div>
                </button>
                <button className="retro-border w-full p-3 text-left hover:bg-green-900/20 
                                   transition-all duration-300 group">
                  <div className="flex items-center space-x-3">
        <Github className="h-5 w-5 text-muted-foreground" />
                    <span className="font-['Jersey_25'] text-green-600 tracking-wide text-base">
                      GITHUB.COM/MAYANG024
                    </span>
                  </div>
                </button>
                <button className="retro-border w-full p-3 text-left hover:bg-green-900/20 
                                   transition-all duration-300 group">
                  <div className="flex items-center space-x-3">
        <Twitter className="h-5 w-5 text-muted-foreground" />
                    <span className="font-['Jersey_25'] text-green-600 tracking-wide text-base">
                      @MAYANKG024
                    </span>
                  </div>
                </button>
                <button className="retro-border w-full p-3 text-left hover:bg-green-900/20 
                                   transition-all duration-300 group">
                  <div className="flex items-center space-x-3">
        <Linkedin className="h-5 w-5 text-muted-foreground" />
                    <span className="font-['Jersey_25'] text-green-600 tracking-wide text-base">
                      LINKEDIN.COM/IN/MAYANK-GUPTA-36B452218
                    </span>
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Content - Character Background */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Character Bio */}
            <div 
              ref={bioAnimation.elementRef}
              className={`retro-border p-8 bg-card transition-all duration-1000 ease-out
                         ${bioAnimation.isVisible
                           ? 'translate-x-0 opacity-100'
                           : 'translate-x-12 opacity-0'
                         }`}
            >
              <h2 className="text-lg md:text-xl font-bold mb-6 text-foreground font-['Press_Start_2P'] 
                             tracking-wider leading-relaxed">CHARACTER BACKGROUND</h2>
              <div className="space-y-6 text-lg md:text-xl text-foreground font-['Jersey_25'] 
                             leading-relaxed tracking-wide">
                <p>
                  Mayank.exe is a Design engineer & Generalist with experience of building 
                  web applications that people actually want to use. Specializes in frontend 
                  development with React and TypeScript, but equally comfortable working 
                  across the full stack. He is also fully equipped with skills to use AI tools to design something out of the box. 
                </p>
                <p>
                He's here to leave long lasting impact on the world, maybe becoming the next Elon musk. 
                </p>
                <p>
                  When not coding you'll find this player reading classic novels and books,
                   working out and training in martial arts & drawing inspiration from Cinema.
                </p>
               <p> if you are like minded or want to bring about change, do connect with me to work together :)</p>
               <p>( At your own risk, hover over the photo to reveal my true identity!)</p>
              </div>
            </div>

            {/* Experience Log */}
            <div 
              ref={experienceAnimation.elementRef}
              className={`retro-border p-6 bg-card transition-all duration-1000 ease-out delay-200
                         ${experienceAnimation.isVisible
                           ? 'translate-x-0 opacity-100'
                           : 'translate-x-12 opacity-0'
                         }`}
            >
              <h2 className="text-lg font-bold mb-4 text-foreground font-['Press_Start_2P'] 
                             tracking-wider leading-relaxed">EXPERIENCE LOG</h2>
              <div className="space-y-4">
                {experience.map((job, index) => (
                  <div key={index} className="retro-border p-4 bg-background hover:bg-green-900/20 
                                              transition-colors duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-['Press_Start_2P'] text-foreground text-base mb-2 tracking-wider">
                          {job.role}
                        </h3>
                        <p className="font-['Jersey_25'] text-muted-foreground tracking-wide text-lg">
                          {job.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-['Jersey_25'] text-muted-foreground text-base tracking-wide">
                          {job.period}
                        </div>
                        <div className="font-['Jersey_25'] text-green-600 text-base tracking-wide">
                          {job.level}
                        </div>
                      </div>
                    </div>
                    <p className="font-['Jersey_25'] text-green-600 leading-relaxed tracking-wide text-lg">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Quote */}
        <div 
          ref={quoteAnimation.elementRef}
          className={`retro-border p-8 bg-card mt-16 mb-12 transition-all duration-1000 ease-out
                     ${quoteAnimation.isVisible
                       ? 'translate-y-0 opacity-100'
                       : 'translate-y-8 opacity-0'
                     }`}
        >
          <div className="text-center space-y-4">
            <p className="text-base md:text-2xl font-['Jersey_25'] text-foreground tracking-wide leading-relaxed">
              “I KNOW NO BETTER PURPOSE TO LIFE THAN TO PERISH IN ATTEMPTING THE GREAT AND THE IMPOSSIBLE.”
            </p>
            <p className="font-['Jersey_25'] text-green-600 text-sm tracking-wider">
              ― Friedrich Wilhelm Nietzsche
            </p>
          </div>
        </div>

      </div>

      {/* Contact Form */}
      <div className="max-w-5xl mx-auto px-6">
        <ContactForm />
      </div>

    </div>
    </>
  );
}