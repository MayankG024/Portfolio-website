import { useState } from 'react';
import { X, MessageCircle, Clock } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { RetroBackground } from './RetroBackground';
import { TypewriterText } from './TypewriterText';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface BlogPost {
  title: string;
  description: string;
  category?: string;
  readTime: string;
  date: string;
  level?: string;
  content: string;
}

export function BlogsPage() {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [comment, setComment] = useState('');

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

  const blogPosts = [
    {
      title: "SCIENCE AND RELIGION: FINDING A MIDDLE GROUND",
      description: "Exploring the intersection of science and spirituality in understanding the universe.",
      readTime: "8 MIN",
      date: "2025.7.15",
      content: `

The whole premise of science as a subject lies on these following  principles observation, hypothesis and theorization which all are empirical in nature.  Science is basically the search for the unbiased truth . it tries to answer the mysteries of the universe in a very logical manner. 

 being a Hindu, I always have been intrigued by the stories and practices i have heard since childhood. although as every other child would be, I was a bit ignorant towards it at first, just praying for the sake of my parents, as we all copied them. But as i grew older i slowly became more and more inclined and curious about all the religious stuff and origin behind it all. facing challenging situations as life got more complex, my faith in a higher power grew every time. I also have been a student of science for my entire life with a strong inclinations towards physics. A face-off was inevitable.

the fundamental question of destiny vs free will had been bothering me ever since i was a teenager and i tried to find its answer in both religion and science. it still pops up here and there as i believe that there isn’t an absolute answer to it. My scientific mind always wandered and by connecting all the dots from our birth till the stage at which we are right now; I somehow always ended up to the conclusion that it is all predetermined in someway or the other. the thought process went on like this - our genetic code & our environment at our birth which are uncontrollable determine most of our life choices - small to big. the way we make any decision in our life is by relating it to some past experience where we had to make a similar choice. The DNA commands our physical and mental traits , even our behaviour. our subconscious mind which controls 80-90% of our daily life is trained automatically without the intervention of our conscious mind. the more you study human psychology and brain, the more you will understand how little control do we actually have. By following the same logic one can even argue that whatever a person ends up becoming, be it a criminal or a scientist, it was already meant to be. that systems of judgement of our society are completely baseless. That right and wrong are just a false societal construct ; but another argument is that when this amounts of living & non living stuff with varied fates end up in the same plane of existence, its creates a system so complex that some randomness is necessary.

I somehow firmly believed that this was the absolute truth till some point in my life. 

turning to religion, i looked towards the Bhagavat Gita’s, which is one of the most important texts in hinduism and its most profound quote which goes like this - you don’t have control over the results just the actions. now the real dilemma lies in its interpretation. facts in science are simple but such things relies upon the reader who makes its sense and there would be as many interpretation as there are readers. what i actually interpreted is that you shouldn’t even be bothered of the things you can’t control. our outcomes aren’t only the function of our efforts and actions but many other things out of our scope. hence it is futile to worry about the uncontrollable and focusing on our action is the only real choice we really have. 

this all has taught me that it is actually futile to ask the question of free will vs destiny as it just doesn’t matter. it is a black hole , you’ll never be able find any end to it. Even so; Blackholes are interesting as hell.

Another such topic which is extremely fascinating is the concept of time. Both the vedic system and quantum physics explain time in an eerily similar fashion. according to quantum physics, time is explained as an emergent property rather than a fundamental one. like every other physical quantity in this field it becomes a function of its observer. the argument that time is linear and flowing in the forward direction has been dismantled by the scientific consensus. such is the story with the vedas which have described time as thing which isn’t unidirectional rather occurs in a cyclic nature in the forms of yugas which are further a subset of  manvantars and kalpas . As we experienced in our day to day lives , time feels to fly off when we are dialed in on our work or having fun and seems to halt when we have nothing to do. this all has been accounted for in the religious texts as time being malleable to the person experiencing it and not a strict flow.

 obviously our little human minds cannot fully comprehend all of this, but time finds heavy common grounds in Vedic system and science.

Another such commonality that I observed was in our knowledge of the cosmology & of existence of multiple universe, the story according to vedas goes something like this; once brahma visited dwarka to met lord krishna and the gatekeeper asked which brahma he is , on hearing this brahma confusingly asked lord krishna about the question and Krishna revealed that there exists multiple versions of ‘them’ in infinite universes. Recent advancements in quantum physics with theories like string theory suggests the same . Amazing right!

the conclusion, Religion guides when science reaches its limit. it won’t give you explicit answers but it will leave you at peace.
      `
    },
    {
      title: "SELF BELIEF AND THE LAW OF ATTRACTION",
      description: "Exploring the impact of self-belief and the law of attraction on personal success.",
      readTime: "6 MIN",
      date: "2025.8.27",
      content: `
      Well, we all would have heard this at some point in our lives, acknowledged it and moved on, but ever wondered why it is advocated so much and why it even works at the first place. 

I consider myself capable of writing this because I have experienced the kind of life you have, if don’t fully believe in yourself. doubting your skills only damages them further. 

high self belief could be considered another form or an outcome of high self esteem. its difficult to believe in yourself if you don’t hold respect for your own opinions and actions, and to have esteem you must generate an ideal version of yourself that would keep the promises he/she makes to the self. but in some ways its paradoxical too, you must also be willing to critique your choices, make amends, to come up with a version you can fully trust. without a solid proof of work it becomes difficult to trust yourself. generate proof of work. in ancient times, the word of a man was considered as the measure of his value; do the things you say you will do. keep your word.

but why is high self belief so crucial you ask? because you can’t get the things you want out of life without it. The main ingredient required for the law of attraction to work is self belief, knowing that you are deserving of the thing you need and having no uncertainty in it.

 The law of attraction is highly subjective and varies greatly based on its interpretation. it might seem like a mystical law at first, completely repelling the scientific minds but it works if things fall in place but not how you might expect it to. its not magical, like how its proposed in the mass media but an intricated working principle of human psychology and desire.

 To understand it better lets consider a simple instance, suppose you really want to get a nice motorcycle like really to crazy levels, repeating its name overnight wont get it but when if you are serious about it, your energies completely align with that single task, you’ll unintentionally go through all steps required to achieve it and in doing so your efforts wont feel like efforts but like something as involuntary as breathing. when the goal is ambitious your actions to achieve it becomes a source of dopamine and it fuels itself. the process becomes self- sustaining ; that’s when the statement that universe works to fulfil your desires, comes true; most of it is actually you and your innate desire to achieve it which forces to universe to bend to your will and open up pathways automatically. When these levels of self belief accompanied with efforts are put in ; success becomes inevitable. it gives you a certain confidence that you can find your way around any problem you face.

self belief comes easy when things are going good but it actually required to be practiced the most when everything feels against you. when you are down in the trenches, when you feel like you don’t have anything left, it is the only thing that will get you through, it will get you through those times and reinforce it more.

so these are the precursors for the law of attraction to work- wilding levels of desire and self belief .

these hypotheses can be applied to anything in your life! you’re welcome!

(stuff i write isn’t only to the reader but a reminder to myself) `
    },
    {
      title: "HOW TO FOCUS",
      description: "focus is the most rare resource in our lives.",
      readTime: "6 MIN",
      date: "2025.08.02",
      level: "★★★★☆",
      content: `
Our world has rapidly progressed from information scarce to information overload in matter of few decades. we’re bombarded with tons of data about relevant and majorly non relevant topics day and night leaving us “fatigued” by the same. Our human brains have evolved in a way to learn and process information about a particular concept faster rather than store information about a variety of topics at once. its like a computer that processes a handful of tasks very efficiently rather an LLM which is trained across countless domains with some proficiency of each one of them.

In todays day and age focus or attention is all you need (throwback to the transformer research paper). Trillion dollar companies drive major portions of their revenue by maximizing the amount of attention they can grab from their consumers. Everybody realizes the importance of intense focus (at least most whose work isn’t physical) yet fail to achieve it. To reach peak expertise one requires to put in somewhere around 10k hours and to do so you need to focus! Humans are capable of focusing at a single task at a time, if you have tried to multitask its just an illusion of control.

Let us cut to the chase and see what it takes 1) physiologically and 2) psychologically to attain peak focus.

The physiological factors are basically precursor, things you need to figure out if you’re being serious. Sleep, hydration and exercise are three main pillars of it. All these help the brain to function optimally we all know the benefits, sleep flushes the synovial fluid of the brain, does memory consolidation etc. I am a really light sleeper and I've had sleep problems many times & I really wish this wasn’t the case because I have felt the effects when you don’t get sufficient of it.

Protein rich foods and the ones which have low glycemic index that is they release energy in a sustained manner are essential. Ideally meditation, mindful one significantly improves focus.

Jumping over to the more interesting bit that are the psychological factors which determine our focus.

I feel that we are focused only in these two situations, when we are either curious or out of compulsion. Genuine curiosity hence becomes an important factor. When someone is genuinely curious in what they are studying or working upon, focus comes in effortlessly, you’re in a state of flow. Basically when you have the option, work upon the things that tickles you the most.

The environment you work in is also crucial, a cluttered workspace reflects the noise in your work too. Declutter. Even the way you dress up plays a role, recall when you’re dressed up formal with full bells and whistle you automatically feel productive. That is real.

According to Andrew Hubermann, listening to non lyrical or classic music before the session also improves focus. I have tried it and it works.

Bonus tip - you might be already pretty good at it, but remember to take frequent breaks to maintain peak performance. :)
      `
    },
    {
      title: "HOW TO LEARN",
      description: "We’ve been doing it since we were born but we haven’t really been taught on how to actually learn.",
      readTime: "10 MIN",
      date: "2025.08.05",
      level: "★★★★☆",
      content: `
We’ve been doing it since we were born but we haven’t really been taught on how to actually learn.

learning is something that all conscious species have been doing since their birth be it voluntarily or not. it could take place through these 5 senses - hear, see, touch, taste or smell. different people have varied levels of control over these when learning ; some tend to learn better visually while other can learn better through hearing. 

the fundamental principle , governed by neuroscience states a pretty simple picture of learning which is the repetition principle and that’s how basically most of the children memorize and learn stuff in the typical schooling system; through rote memorization. but this system is a passive one it is learning just for the sake of good grades. and this system fails once a person steps into the real world. as Paul Graham said and i quote “ Subjects get distorted when they're adapted to be taught to kids — often so distorted that they're nothing like the work done by actual practitioners.’’ 

 this happens because what we read in books and slides, is made in such a way that it becomes easier to understand, the nuances and the visualization often goes unattended in such case and here comes the actual point on how to learn in a way to be actually capable to doing what you learn is only by —-

Building/Doing it on your own .

We’ve been doing it since we were born but we haven’t really been taught on how to actually learn.

I had to initially learn it the hard way. Watching tutorials, reading through the notes and slides gives us an illusion of learning. when you go over to do it irl you’re just blank. there would be terms and jargon which you just really would not get if you don’t get your hands dirty and build it for yourself. 

by actually doing it, not only you learn more powerfully but it is faster too. It is very similar to Mathematics, to really get it you have to work on the problems and not rote up the formulas. 

DIY shifts to the perspective from a user to a maker. it engages you more and makes learning fun too. Imagine this, when you fail in implementing something, you’ll be forced by your ego to dive deeper and find a solution until the problem is resolved and now that concept is engraved in your memory because you tussled around it. its basic neuroscience really.  

create projects, models and presentations for the topics that you need to learn and don’t have any prior knowledge to . explain them to someone as a teacher. this would skyrocket your learning speed. 

now we know how to learn , here are some tips and tricks to optimize it further,

1. remember the movie “limitless” (if you haven’t watched it, highly recommend you do )

it is all within you , you just do not have access to that knowledge , but you are in control , you can bring that information to light if you practice patience and do not focus on the obstruction. believe yourself to be wise enough that you will get in the first try ; and you will. this all might sound vovo but it works.

2. if its something factual, involve as many senses as you can , more senses involved more stronger will be the synaptic connections in your brain. writing it down, hearing and even chewing a chewing gum at learning and chewing the same gum when you revise. 

3. form a mind-map for how different topics and concepts really related to each other. higher the pattern recognition higher the retention capacity.

4. form analogies to the concepts .  relate the topic to the things you observe in your everyday life.

5. act like your own teacher and teach yourself the topic you learned. youll find the blind spots and refine the knowledge you have.

6. Repetition is the king. especially spaced repetition with rest in between (POMODORO ).

p.s.  - Having a curious mindset .
      `
    },
    {
      title: "THE PHILOSOPHY OF CLEAN CODE",
      description: "Why writing code for humans, not just machines, makes all the difference in long-term success.",
      category: "PHIL",
      readTime: "6 MIN",
      date: "2024.10.22",
      level: "★★☆☆☆",
      content: `
# The Philosophy of Clean Code

Code is read far more often than it's written. This simple truth forms the foundation of clean code philosophy.

## Why Clean Code Matters

Writing code for humans means:
- **Readability**: Your future self will thank you
- **Maintainability**: Easier to modify and extend
- **Collaboration**: Team members can contribute effectively
- **Debugging**: Issues are easier to identify and fix

## Key Principles

### Meaningful Names
- Use descriptive variable and function names
- Avoid abbreviations and mental mapping
- Be consistent with naming conventions

### Functions Should Do One Thing
- Keep functions small and focused
- Use descriptive function names
- Minimize function parameters

### Comments Should Explain Why, Not What
- Good code is self-documenting
- Comments should provide context
- Keep comments up to date

## The Long Game

Clean code is an investment in your future productivity. It might take a bit more time upfront, but it pays dividends in:
- Reduced debugging time
- Faster feature development
- Lower maintenance costs
- Better team morale

Remember: Always code as if the person who ends up maintaining your code will be a violent psychopath who knows where you live.
      `
    },

    {
      title: "CREATIVE VS TECHNICAL WORK",
      description: "The intersection of imagination and logic in professional environments.",
      category: "CAREER",
      readTime: "10 MIN",
      date: "2024.09.14",
      level: "★★★★★",
      content: `
Creative and technical work are two foundational pillars of human productivity, innovation, and progress. Though they often intersect, they represent distinctly different approaches to problem-solving and expression — one driven by imagination and subjectivity, the other by logic and precision.

Nature of Work
Creative work thrives on originality, expression, and the exploration of the unknown. It includes domains like art, writing, design, filmmaking, and conceptual ideation. The output is often open-ended, interpretative, and emotionally resonant.

In contrast, technical work is objective, systematic, and often rule-bound. It includes engineering, programming, data analysis, scientific research, and systems design. The focus is on accuracy, optimization, and reproducibility.

Skill Sets and Tools
Creative professionals rely on intuition, empathy, aesthetic sensibility, and lateral thinking. Their tools may be abstract — words, visuals, or sound — and success is judged by originality, impact, and emotional connection.

Technical professionals depend on analytical reasoning, mathematical logic, and structured methodologies. Tools are more concrete — software, hardware, equations — and success is often binary: it works, or it doesn’t.

Constraints and Freedom
Creative work often has fewer boundaries. It allows freedom to explore multiple interpretations, make bold choices, and challenge norms. Technical work, while seemingly restrictive, offers freedom within constraints — the challenge is to innovate under fixed rules and systems.

Interdependence and Hybrid Roles
In the modern world, the lines are increasingly blurred. A UX designer, for example, must balance creative intuition with technical feasibility. A software developer writing clean, user-centered code is engaging in a form of creative expression.

This convergence is visible in fields like game development, architecture, and product design — where creative vision must meet technical implementation.
      `
    },
  ];

  // Individual animations for each blog post
  const blogAnimations = blogPosts.map(() => useScrollAnimation({ threshold: 0.1 }));

  const openBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
  };

  const closeBlog = () => {
    setSelectedBlog(null);
    setComment('');
  };

  const submitComment = () => {
    if (comment.trim()) {
      // In a real app, this would submit to a backend
      alert(`Comment submitted: "${comment}"`);
      setComment('');
    }
  };

  return (
    <>
      {/* Blog Modal */}
      {selectedBlog && (
  <div className="fixed inset-0 bg-background/90 z-[60] flex items-center justify-center p-0">
          <div className="bg-card border-2 border-green-400 w-full h-full 
                          overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="border-b-2 border-green-400 p-6 flex justify-between items-center bg-card flex-shrink-0">
              <h2 className="font-['Press_Start_2P'] text-foreground text-xl md:text-2xl 
                           leading-relaxed tracking-wider">
                {selectedBlog.title}
              </h2>
              <button
                onClick={closeBlog}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 
                         hover:bg-muted rounded"
              >
                <X size={32} />
              </button>
            </div>

            {/* Modal Content */}
    <div className="flex-1 overflow-y-auto p-8 bg-card min-h-0 retro-scrollbar">
              <div className="prose prose-black max-w-none">
                <div 
      className="text-foreground font-['Jersey_25'] leading-loose tracking-wide
                           text-xl md:text-2xl whitespace-pre-wrap max-w-4xl mx-auto"
                  style={{ lineHeight: '2' }}
                >
                  {selectedBlog.content}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t-2 border-green-400 p-6 bg-card flex-shrink-0">
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
                  className="flex-1 bg-card border-2 border-border text-foreground p-4 
                           font-['Jersey_25'] text-base placeholder-muted-foreground resize-none h-24 
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
      )}

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
                <article 
                  className="retro-border bg-card border-2 border-border transition-all duration-150 ease-in-out
                             cursor-pointer group w-full
                             shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted 
                             hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] 
                             hover:-translate-x-0.5 hover:-translate-y-0.5 
                             active:shadow-[1px_1px_0px_0px_hsl(var(--border))] 
                             active:translate-x-0.5 active:translate-y-0.5"
                  onClick={() => openBlog(post)}
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
                </article>
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