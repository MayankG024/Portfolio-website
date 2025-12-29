import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Clock } from 'lucide-react';
import { getBlogPostBySlug } from '../data/blogPosts';
import { RetroBackground } from './RetroBackground';

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [comment, setComment] = useState('');
  
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  // Batarang floating animation data
  const batarangs = [
    { id: 1, x: '5%', y: '15%', rotation: 45, duration: 20, delay: 0 },
    { id: 2, x: '92%', y: '25%', rotation: -30, duration: 25, delay: 3 },
    { id: 3, x: '8%', y: '60%', rotation: 120, duration: 30, delay: 7 },
    { id: 4, x: '88%', y: '70%', rotation: -90, duration: 22, delay: 12 },
  ];

  const submitComment = () => {
    if (comment.trim()) {
      alert(`Comment submitted: "${comment}"`);
      setComment('');
    }
  };

  if (!post) {
    return (
      <>
        <RetroBackground />
        <div className="min-h-screen px-6 py-8 pb-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="retro-border p-8 bg-card text-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-6 text-foreground font-['Press_Start_2P'] tracking-wider">
                POST NOT FOUND
              </h1>
              <p className="text-lg text-muted-foreground font-['Jersey_25'] mb-8">
                The blog post you're looking for doesn't exist.
              </p>
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 bg-card border-2 border-green-400 text-foreground px-6 py-3 
                         font-['Press_Start_2P'] text-sm hover:bg-green-400 hover:text-white 
                         transition-all duration-300 tracking-wider"
              >
                <ArrowLeft size={16} />
                BACK TO BLOGS
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

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
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground 
                     transition-colors font-['Jersey_25'] text-lg tracking-wide"
          >
            <ArrowLeft size={20} />
            ← Back to all posts
          </Link>

          {/* Article Header */}
          <header className="retro-border p-8 bg-card mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="font-['Jersey_25'] tracking-wide">{post.readTime} READ</span>
              </div>
              <span className="font-['Jersey_25'] tracking-wide">{post.date}</span>
              {post.level && (
                <span className="font-['Jersey_25'] tracking-wide">{post.level}</span>
              )}
              {post.category && (
                <span className="px-2 py-1 bg-muted text-xs font-['Press_Start_2P'] tracking-wider">
                  {post.category}
                </span>
              )}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-foreground font-['Press_Start_2P'] 
                         tracking-wider leading-relaxed">
              {post.title}
            </h1>
            
            <p className="text-lg text-green-600 font-['Jersey_25'] leading-relaxed tracking-wide">
              {post.description}
            </p>
          </header>

          {/* Article Content */}
          <article className="retro-border p-8 bg-card mb-8">
            <div className="prose prose-black max-w-none">
              <div 
                className="text-foreground font-['Jersey_25'] leading-loose tracking-wide
                         text-xl md:text-2xl whitespace-pre-wrap"
                style={{ lineHeight: '2' }}
              >
                {post.content}
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <div className="retro-border p-8 bg-card">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle size={24} className="text-muted-foreground" />
              <span className="font-['Press_Start_2P'] text-foreground text-sm tracking-wider">
                ADD COMMENT
              </span>
            </div>
            <div className="flex gap-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="flex-1 bg-card border-2 border-border text-foreground p-3 
                         font-['Jersey_25'] text-base placeholder-muted-foreground resize-none h-12 
                         focus:outline-none focus:border-green-400 transition-colors leading-relaxed
                         tracking-wide"
              />
              <button
                onClick={submitComment}
                className="bg-card border-2 border-green-400 text-foreground px-8 py-4 
                         font-['Press_Start_2P'] text-sm hover:bg-green-400 hover:text-white 
                         transition-all duration-300 self-start tracking-wider"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
