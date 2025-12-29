import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { RetroBackground } from './RetroBackground';
import { TypewriterText } from './TypewriterText';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { blogPosts } from '../data/blogPosts';

export function BlogsPage() {
  // Scroll animations for different sections with faster timing
  const headerAnimation = useScrollAnimation({ threshold: 0.2 });
  const blogListAnimation = useScrollAnimation({ threshold: 0.1 });
  const statsAnimation = useScrollAnimation({ threshold: 0.2 });
  const contactAnimation = useScrollAnimation({ threshold: 0.1 });

  // Batarang floating animation data
  const batarangs = [
    { id: 1, x: '5%', y: '15%', rotation: 45, duration: 20, delay: 0 },
    { id: 2, x: '92%', y: '25%', rotation: -30, duration: 25, delay: 3 },
    { id: 3, x: '8%', y: '60%', rotation: 120, duration: 30, delay: 7 },
    { id: 4, x: '88%', y: '70%', rotation: -90, duration: 22, delay: 12 },
    { id: 5, x: '15%', y: '85%', rotation: 60, duration: 28, delay: 5 },
    { id: 6, x: '85%', y: '90%', rotation: -45, duration: 35, delay: 15 },
  ];

  // Individual animations for each blog post
  const blogAnimations = blogPosts.map(() => useScrollAnimation({ threshold: 0.1 }));

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
          className={`retro-border p-8 bg-card mb-12 transition-all duration-700 ease-out
                     ${headerAnimation.isVisible 
                       ? 'translate-y-0 opacity-100' 
                       : 'translate-y-8 opacity-0'
                     }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground font-['Press_Start_2P'] 
           tracking-wider leading-relaxed">
            <TypewriterText 
              text="► BLOG ARCHIVES" 
              speed={80}
              startDelay={200}
            />
          </h1>
          <p className="text-lg md:text-xl text-green-600 font-['Jersey_25'] max-w-3xl 
                        leading-relaxed tracking-wide">
            Thoughts on technology, philosophy, and life in general.<br />
            <span className="text-green-600">Documented knowledge from the trenches.
            (Written by me, not AI)
            </span>
          </p>
        </div>

        {/* Blog Posts - Vertical List with Branch Lines */}
        <div 
          ref={blogListAnimation.elementRef}
          className={`relative transition-all duration-700 ease-out
                     ${blogListAnimation.isVisible
                       ? 'translate-x-0 opacity-100'
                       : 'translate-x-12 opacity-0'
                     }`}
        >
          {/* Main vertical trunk from header */}
          <div className="absolute left-8 top-0 w-0.5 bg-green-400 h-full transform"></div>
          
          {/* Blog posts list */}
          <div className="space-y-6 pt-8">
            {blogPosts.map((post, index) => (
              <div 
                key={index} 
                ref={blogAnimations[index].elementRef}
                className={`relative pl-16 transition-all duration-700 ease-out
                           ${blogAnimations[index].isVisible
                             ? 'translate-x-0 opacity-100'
                             : index % 2 === 0 ? 'translate-x-12 opacity-0' : '-translate-x-12 opacity-0'
                           }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Horizontal branch line */}
                <div className="absolute left-8 top-6 w-8 h-0.5 bg-green-400"></div>
                
                {/* Blog card - full width list item */}
                <Link 
                  to={`/blogs/${post.slug}`}
                  className="block retro-border bg-card border-2 border-border transition-all duration-150 ease-in-out
                             cursor-pointer group w-full
                             shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted 
                             hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] 
                             hover:-translate-x-0.5 hover:-translate-y-0.5 
                             active:shadow-[1px_1px_0px_0px_hsl(var(--border))] 
                             active:translate-x-0.5 active:translate-y-0.5"
                >
                  <div className="p-6">
                    {/* Header with metadata */}
                    <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock size={14} />
                          <span className="text-sm font-['Jersey_25'] tracking-wide">
                            {post.readTime} READ
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground font-['Jersey_25'] tracking-wide">
                        {post.date}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-lg md:text-xl font-bold mb-4 text-foreground 
                                  font-['Press_Start_2P'] leading-relaxed tracking-wider
                                  group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-base text-green-600 font-['Jersey_25'] 
                                  leading-relaxed tracking-wide mb-4">
                      {post.description}
                    </p>
                    
                    {/* Footer with read indicator */}
                    <div className="flex items-center justify-end">
                      <span className="text-sm text-muted-foreground font-['Jersey_25'] 
                                     group-hover:text-foreground transition-colors duration-300">
                        Click to read full article →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            
            {/* More Coming Soon message */}
            <div 
              className={`relative pl-16 transition-all duration-700 ease-out delay-500
                         ${blogListAnimation.isVisible
                           ? 'translate-y-0 opacity-100'
                           : 'translate-y-8 opacity-0'
                         }`}
            >
              {/* Horizontal branch line */}
              <div className="absolute left-8 top-6 w-8 h-0.5 bg-green-400"></div>
              
              <div className="p-6">
                <p className="text-lg text-green-600 font-['Jersey_25'] 
                              leading-relaxed tracking-wide text-center italic">
                  more coming soon!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div 
          ref={statsAnimation.elementRef}
          className={`retro-border p-8 bg-card mt-16 mb-12 transition-all duration-700 ease-out
                     ${statsAnimation.isVisible
                       ? 'translate-y-0 opacity-100'
                       : 'translate-y-8 opacity-0'
                     }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground font-['Press_Start_2P'] mb-2">
                {blogPosts.length}
              </div>
              <div className="text-sm text-muted-foreground font-['Jersey_25'] tracking-wide">
                TOTAL POSTS
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground font-['Press_Start_2P'] mb-2">
                ∞
              </div>
              <div className="text-sm text-muted-foreground font-['Jersey_25'] tracking-wide">
                IDEAS
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-2xl md:text-3xl font-bold text-foreground font-['Press_Start_2P'] mb-2">
                2024
              </div>
              <div className="text-sm text-muted-foreground font-['Jersey_25'] tracking-wide">
                ACTIVE SINCE
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div 
          ref={contactAnimation.elementRef}
          className={`transition-all duration-700 ease-out delay-200
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
