import { useState } from 'react';
import { ExternalLink, BookOpen, Code, Video, Music } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { RetroBackground } from './RetroBackground';
import { TypewriterText } from './TypewriterText';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { trackResourceClick } from '../utils/analytics';

export function KnowledgeStash() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Scroll animations for different sections
  const headerAnimation = useScrollAnimation({ threshold: 0.2 });
  const filterAnimation = useScrollAnimation({ threshold: 0.1 });
  const gridAnimation = useScrollAnimation({ threshold: 0.1 });
  const statsAnimation = useScrollAnimation({ threshold: 0.2 });
  const achievementAnimation = useScrollAnimation({ threshold: 0.2 });
  const contactAnimation = useScrollAnimation({ threshold: 0.1 });

  const categories = ['ALL', 'BOOKS', 'TOOLS', 'ARTICLES', 'VIDEOS', 'MUSIC'];

  // Batarang floating animation data
  const batarangs = [
    { id: 1, x: '5%', y: '15%', rotation: 45, duration: 20, delay: 0 },
    { id: 2, x: '92%', y: '25%', rotation: -30, duration: 25, delay: 3 },
    { id: 3, x: '8%', y: '60%', rotation: 120, duration: 30, delay: 7 },
    { id: 4, x: '88%', y: '70%', rotation: -90, duration: 22, delay: 12 },
    { id: 5, x: '15%', y: '85%', rotation: 60, duration: 28, delay: 5 },
    { id: 6, x: '85%', y: '90%', rotation: -45, duration: 35, delay: 15 },
  ];

  const resources = [
    {
      title: "HITCHHIKER'S GUIDE TO THE GALAXY",
      description: "📚 A comedic science fiction series that explores the absurdity of life, the universe, and everything.",
      category: "BOOKS",
      type: "book",
      rarity: "★★★★★",
      icon: BookOpen,
      url: "https://www.goodreads.com/book/show/11.The_Hitchhiker_s_Guide_to_the_Galaxy?ref=nav_sb_ss_1_5"
    },
    {
      title: "ALMANAC OF NAVAL RAVIKANT",
      description: "📚 Insights and wisdom from Naval Ravikant on wealth, happiness, and personal growth.",
      category: "BOOKS",
      type: "book",
      rarity: "★★★★★",
      icon: BookOpen,
      url: "https://www.goodreads.com/book/show/54898389-the-almanack-of-naval-ravikant?ref=nav_sb_ss_3_4"
    },
    {
      title: "SAPIENS",
      description: "📚 A brief history of humankind, exploring how Homo sapiens came to dominate the world.",
      category: "BOOKS",
      type: "book",
      rarity: "★★★★★",
      icon: BookOpen,
      url: "https://www.goodreads.com/book/show/23692271-sapiens"
    },
    {
      title: "TEACH YOURSELF CS",
      description: "💻 Computer science is larger than just coding.",
      category: "TOOLS",
      type: "tool",
      rarity: "★★★★☆",
      icon: Code,
      url: "https://teachyourselfcs.com/"
    },
    {
      title: "MUSCLEWIKI",
      description: "💪 A complete tool for workout and training specific muscles with video guides.",
      category: "TOOLS",
      type: "tool",
      rarity: "★★★★☆",
      icon: ExternalLink,
      url: "https://musclewiki.com/"
    },
    {
      title: "INTERNET ARCHIVE",
      description: "🎓 A non-profit library offering millions of free collection of books, movies, music, and more.",
      category: "TOOLS",
      type: "tool",
      rarity: "★★★★☆",
      icon: ExternalLink,
      url: "https://archive.org/"
    },
    {
      title: "INTERNET MEME DATABASE",
      description: "😊 Know your memes!",
      category: "TOOLS",
      type: "tool",
      rarity: "★★★★☆",
      icon: ExternalLink,
      url: "https://knowyourmeme.com/"
    },
    {
      title: "MAPS OF EVERYTHING",
      description: "🗺️ Maps of every subject known to mankind.",
      category: "TOOLS",
      type: "tool",
      rarity: "★★★★☆",
      icon: ExternalLink,
      url: "https://www.flickr.com/photos/95869671@N08/"
    },
    {
      title: "SUPABASE",
      description: "💻 The best platform for deploying and hosting modern web applications with zero config.",
      category: "TOOLS",
      type: "tool",
      rarity: "★★★★☆",
      icon: Code,
      url: "https://supabase.com/"
    },
    {
      title: "PAUL GRAHAM'S ESSAYS",
      description: "📝 The original essays by Paul Graham on startups, programming, and life.",
      category: "ARTICLES",
      type: "article",
      rarity: "★★★★★",
      icon: ExternalLink,
      url: "https://www.paulgraham.com/articles.html"
    },
    {
      title: "THEORY OF EVERYTHING",
      description: "🪐 Learn about some of the fundamental concepts in physics and cosmology.",
      category: "ARTICLES",
      type: "article",
      rarity: "★★★★★",
      icon: ExternalLink,
      url: "https://www.space.com/theory-of-everything-definition.html"
    },
    {
      title: "STOP CHASING ORIGINAL IDEAS",
      description: "💡 the truth is, great art isn’t about invention — it’s about interpretation.",
      category: "VIDEOS",
      type: "video",
      rarity: "★★★★☆",
      icon: Video,
      url: "https://www.youtube.com/watch?v=1hQLp2Cl49Q"
    },
    {
      title: "SAMURAI PHILOSOPHY TO CHANGE YOUR LIFE",
      description: "🥷 Just watch this, will make you feel like a samurai",
      category: "VIDEOS",
      type: "video",
      rarity: "★★★★☆",
      icon: Video,
      url: "https://www.youtube.com/watch?v=Ef9NrsAc_yE"
    },
    {
      title: "CHERNOBYL: A MASTERCLASS IN PERSPECTIVE",
      description: "💥 The best HBO miniseries that explores the Chernobyl disaster.",
      category: "VIDEOS",
      type: "video",
      rarity: "★★★★☆",
      icon: Video,
      url: "https://www.youtube.com/watch?v=MljytTReJ_o"
    },
    {
      title: "VERITASIUM'S BEST ",
      description: "🪐 Strange science behind black holes and parallel universes that will blow your mind.",
      category: "VIDEOS",
      type: "video",
      rarity: "★★★★☆",
      icon: Video,
      url: "https://www.youtube.com/watch?v=6akmv1bsz1M"
    },
    {
      title: "HOW ARE MICROCHIPS MADE?",
      description: "💻 A deep dive into the fascinating world of microchip manufacturing.",
      category: "VIDEOS",
      type: "video",
      rarity: "★★★☆☆",
      icon: Video,
      url: "https://www.youtube.com/watch?v=IkRXpFIRUl4"
    },
    {
      title: "BUT WHAT IS A NEURAL NETWORK?",
      description: "💻 visually learn the basics of neural networks and deep learning.",
      category: "VIDEOS",
      type: "video",
      rarity: "★★★★★",
      icon: Video,
      url: "https://www.youtube.com/watch?v=aircAruvnKk"
    },
  
    {
      title: "THE RATIONAL OPTIMIST",
      description: "📚 A thought-provoking book by Matt Ridley that explores the power of human innovation and progress.",
      category: "BOOKS",
      type: "book",
      rarity: "★★★★☆",
      icon: BookOpen,
      url : "https://www.goodreads.com/book/show/7776209-the-rational-optimist?ref=nav_sb_ss_1_8"
    },
    {
      title: "TIM URBAN'S WAIT BUT WHY",
      description: "📝 Filled with humor and deep insights by Tim Urban",
      category: "ARTICLES",
      type: "article",
      rarity: "★★★☆☆",
      icon: ExternalLink,
      url: "https://waitbutwhy.com/"
    },
    {
      title: "MY SPOTIFY PLAYLISTS",
      description: "🎧 A collection of my favorite music playlists on Spotify.",
      category: "MUSIC",
      type: "music",
      rarity: "★★★☆☆",
      icon: Music,
      url: "https://open.spotify.com/user/cxx7lvf8ksdu4psx6nv1xbe5l"
    }
  ];

  const filteredResources = resources.filter(resource => 
    selectedCategory === 'ALL' || resource.category === selectedCategory
  );

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
      <div className="max-w-6xl mx-auto">
        
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
              text="► KNOWLEDGE VAULT" 
              speed={80}
              startDelay={200}
            />
          </h1>
          <p className="text-lg md:text-xl text-green-600 font-['Jersey_25'] max-w-3xl 
                        leading-relaxed tracking-wide">
            Curated collection of rare artifacts, legendary tools, and wisdom scrolls.<br />
            <span className="text-green-600">Resources are abundant, Attention is limited.</span>
          </p>
        </div>

        {/* Inventory Filter */}
        <div 
          ref={filterAnimation.elementRef}
          className={`retro-border p-6 bg-card mb-8 transition-all duration-1000 ease-out
                     ${filterAnimation.isVisible
                       ? 'translate-x-0 opacity-100'
                       : '-translate-x-12 opacity-0'
                     }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground font-['Press_Start_2P'] 
                           tracking-wider leading-relaxed">INVENTORY FILTER</h2>
            <span className="text-sm text-green-600 font-['Jersey_25'] tracking-wide">
              {filteredResources.length} ITEMS
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`retro-border px-4 py-2 text-sm font-['Jersey_25'] tracking-wide
                           border-2 border-border transition-all duration-150 ease-in-out
                           ${selectedCategory === category 
                             ? 'bg-green-400 text-foreground shadow-[1px_1px_0px_0px_hsl(var(--border))] translate-x-0.5 translate-y-0.5' 
                             : 'bg-card text-foreground shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_hsl(var(--border))] active:translate-x-0.5 active:translate-y-0.5'
                           }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div 
          ref={gridAnimation.elementRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 transition-all duration-1000 ease-out
                     ${gridAnimation.isVisible
                       ? 'translate-x-0 opacity-100'
                       : 'translate-x-12 opacity-0'
                     }`}
        >
          {filteredResources.map((resource, index) => {
            const Icon = resource.icon;
            const isClickable = resource.url;
            
            const cardContent = (
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <ExternalLink className={`h-4 w-4 text-muted-foreground transition-opacity
                                          ${isClickable ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </div>
                
                {/* Title */}
                <h3 className="text-base md:text-lg font-bold mb-4 text-foreground font-['Press_Start_2P'] 
                              leading-relaxed tracking-wider">
                  {resource.title}
                </h3>
                
                {/* Description */}
                <p className="text-base text-green-600 font-['Jersey_25'] mb-4 leading-relaxed tracking-wide">
                  {resource.description}
                </p>
                
                {/* Rarity */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-['Jersey_25'] tracking-wide">RARITY</span>
                  <span className="text-sm text-green-600 font-['Jersey_25'] tracking-wide">{resource.rarity}</span>
                </div>
              </div>
            );

            return isClickable ? (
              <a 
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-border bg-card border-2 border-border transition-all duration-150 ease-in-out
                          cursor-pointer group block
                          shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted 
                          hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] 
                          hover:-translate-x-0.5 hover:-translate-y-0.5 
                          active:shadow-[1px_1px_0px_0px_hsl(var(--border))] 
                          active:translate-x-0.5 active:translate-y-0.5"
                onClick={() => {
                  trackResourceClick(resource.title, 'knowledge');
                  window.open(resource.url, '_blank');
                }}
              >
                {cardContent}
              </a>
            ) : (
              <div key={index} className="retro-border bg-card border-2 border-border transition-all duration-150 ease-in-out
                                         cursor-pointer group
                                         shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted 
                                         hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] 
                                         hover:-translate-x-0.5 hover:-translate-y-0.5 
                                         active:shadow-[1px_1px_0px_0px_hsl(var(--border))] 
                                         active:translate-x-0.5 active:translate-y-0.5">
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* Vault Statistics */}
        <div 
          ref={statsAnimation.elementRef}
          className={`retro-border p-8 bg-card mb-8 transition-all duration-1000 ease-out
                     ${statsAnimation.isVisible
                       ? 'translate-y-0 opacity-100'
                       : 'translate-y-8 opacity-0'
                     }`}
        >
          <h2 className="text-lg md:text-xl font-bold mb-6 text-foreground font-['Press_Start_2P'] 
                         tracking-wider leading-relaxed">VAULT STATISTICS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="retro-border p-4 bg-card text-center border-2 border-border transition-all duration-150 ease-in-out cursor-pointer
                           shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted 
                           hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] 
                           hover:-translate-x-0.5 hover:-translate-y-0.5 
                           active:shadow-[1px_1px_0px_0px_hsl(var(--border))] 
                           active:translate-x-0.5 active:translate-y-0.5">
              <div className="text-xl md:text-2xl font-bold text-foreground font-['Press_Start_2P'] mb-2">
                {resources.filter(r => r.category === 'BOOKS').length}
              </div>
              <div className="text-sm text-muted-foreground font-['Jersey_25'] tracking-wide">BOOKS</div>
            </div>
            <div className="retro-border p-4 bg-card text-center border-2 border-border transition-all duration-150 ease-in-out cursor-pointer
                           shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted 
                           hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] 
                           hover:-translate-x-0.5 hover:-translate-y-0.5 
                           active:shadow-[1px_1px_0px_0px_hsl(var(--border))] 
                           active:translate-x-0.5 active:translate-y-0.5">
              <div className="text-xl md:text-2xl font-bold text-foreground font-['Press_Start_2P'] mb-2">
                {resources.filter(r => r.category === 'TOOLS').length}
              </div>
              <div className="text-sm text-muted-foreground font-['Jersey_25'] tracking-wide">TOOLS</div>
            </div>
            <div className="retro-border p-4 bg-card text-center border-2 border-border transition-all duration-150 ease-in-out cursor-pointer
                           shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted 
                           hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] 
                           hover:-translate-x-0.5 hover:-translate-y-0.5 
                           active:shadow-[1px_1px_0px_0px_hsl(var(--border))] 
                           active:translate-x-0.5 active:translate-y-0.5">
              <div className="text-xl md:text-2xl font-bold text-foreground font-['Press_Start_2P'] mb-2">
                {resources.filter(r => r.category === 'ARTICLES').length}
              </div>
              <div className="text-sm text-muted-foreground font-['Jersey_25'] tracking-wide">ARTICLES</div>
            </div>
            <div className="retro-border p-4 bg-card text-center border-2 border-border transition-all duration-150 ease-in-out cursor-pointer
                           shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted 
                           hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] 
                           hover:-translate-x-0.5 hover:-translate-y-0.5 
                           active:shadow-[1px_1px_0px_0px_hsl(var(--border))] 
                           active:translate-x-0.5 active:translate-y-0.5">
              <div className="text-xl md:text-2xl font-bold text-foreground font-['Press_Start_2P'] mb-2">
                {resources.filter(r => r.category === 'VIDEOS').length}
              </div>
              <div className="text-sm text-muted-foreground font-['Jersey_25'] tracking-wide">VIDEOS</div>
            </div>
            <div className="retro-border p-4 bg-card text-center border-2 border-border transition-all duration-150 ease-in-out cursor-pointer
                           shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted 
                           hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] 
                           hover:-translate-x-0.5 hover:-translate-y-0.5 
                           active:shadow-[1px_1px_0px_0px_hsl(var(--border))] 
                           active:translate-x-0.5 active:translate-y-0.5">
              <div className="text-xl md:text-2xl font-bold text-foreground font-['Press_Start_2P'] mb-2">
                {resources.filter(r => r.category === 'MUSIC').length}
              </div>
              <div className="text-sm text-muted-foreground font-['Jersey_25'] tracking-wide">MUSIC</div>
            </div>
            <div className="retro-border p-4 bg-card text-center border-2 border-border transition-all duration-150 ease-in-out cursor-pointer
                           shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted 
                           hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] 
                           hover:-translate-x-0.5 hover:-translate-y-0.5 
                           active:shadow-[1px_1px_0px_0px_hsl(var(--border))] 
                           active:translate-x-0.5 active:translate-y-0.5">
              <div className="text-xl md:text-2xl font-bold text-foreground font-['Press_Start_2P'] mb-2">
                {resources.length}
              </div>
              <div className="text-sm text-muted-foreground font-['Jersey_25'] tracking-wide">TOTAL</div>
            </div>
          </div>
        </div>

        {/* Achievement */}
        <div 
          ref={achievementAnimation.elementRef}
          className={`retro-border p-6 bg-card mb-12 transition-all duration-1000 ease-out
                     ${achievementAnimation.isVisible
                       ? 'translate-y-0 opacity-100'
                       : 'translate-y-8 opacity-0'
                     }`}
        >
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-3 h-3 bg-yellow-500 retro-blink rounded-full"></div>
              <span className="text-lg font-bold text-foreground font-['Press_Start_2P'] tracking-wider">
                ACHIEVEMENT UNLOCKED
              </span>
              <div className="w-3 h-3 bg-yellow-500 retro-blink rounded-full"></div>
            </div>
            <div className="flex items-center justify-center space-x-6 text-base font-['Jersey_25'] 
                           text-green-600 tracking-wide">
              <span>KNOWLEDGE COLLECTOR</span>
              <span>•</span>
              <span>LEVEL {Math.floor(resources.length / 5)}</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div 
          ref={contactAnimation.elementRef}
          className={`transition-all duration-1000 ease-out delay-200
                     ${contactAnimation.isVisible
                       ? 'translate-x-0 opacity-100'
                       : '-translate-x-12 opacity-0'
                     }`}
        >
          <ContactForm />
        </div>

      </div>
    </div>
    </>
  );
}