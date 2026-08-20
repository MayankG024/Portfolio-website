import { useState } from 'react';
import { Send } from 'lucide-react';
import { trackContactForm } from '../utils/analytics';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errorMessage) {
      setErrorMessage(null);
    }

    // Track when user starts typing (first character)
    if (value.length === 1 && !isSubmitting) {
      trackContactForm('start');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    
    // Track form submission attempt
    trackContactForm('submit');
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/mayankynr24@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _subject: `New Transmission from ${formData.name.trim()} [Portfolio]`,
          _replyto: formData.email.trim(),
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true || !data.error)) {
        setIsSubmitting(false);
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Track successful submission
        trackContactForm('success');
      } else {
        throw new Error(data.message || 'TRANSMISSION FAILED. PLEASE TRY AGAIN.');
      }
    } catch (error: any) {
      setIsSubmitting(false);
      setErrorMessage(
        error?.message || 'TRANSMISSION FAILED. PLEASE CHECK CONNECTION OR EMAIL DIRECTLY.'
      );
      // Track form error
      trackContactForm('error');
    }
  };

  return (
    <div className="retro-border p-8 bg-card mb-8">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground font-['Press_Start_2P'] 
                         tracking-wider leading-relaxed">
            SEND MESSAGE
          </h2>
          <span className="text-base md:text-lg text-muted-foreground font-['Jersey_25'] tracking-wide">
            (feel free to message me or connect over social media!)
          </span>
        </div>
        <div className="border-b-2 border-gray-400 mt-4 mb-6"></div>
      </div>

      {showSuccess ? (
        <div className="pixel-border p-6 bg-background text-center space-y-4">
          <div className="space-y-2">
            <div className="text-[10px] text-green-500 font-['Press_Start_2P'] leading-relaxed">
              MESSAGE SENT SUCCESSFULLY!
            </div>
            <div className="text-base text-muted-foreground font-['Jersey_25'] tracking-wide">
              YOUR TRANSMISSION HAS BEEN DELIVERED TO MAYANK'S INBOX.
            </div>
            <div className="flex items-center justify-center space-x-2 pt-2">
              <div className="w-2 h-2 bg-green-500 retro-blink"></div>
              <span className="text-[8px] font-['Press_Start_2P'] text-foreground">TRANSMISSION COMPLETE</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowSuccess(false)}
            className="retro-border px-4 py-2 text-[8px] font-['Press_Start_2P'] bg-card hover:bg-muted transition-colors mt-3 inline-block"
          >
            SEND ANOTHER MESSAGE
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="pixel-border p-4 bg-red-950/20 border-red-500 text-center mb-4">
              <div className="text-[8px] text-red-500 font-['Press_Start_2P'] leading-relaxed">
                ERROR: {errorMessage}
              </div>
            </div>
          )}
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm mb-3 text-green-600 font-['Jersey_25'] 
                                           tracking-wide">
              PLAYER NAME *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="retro-border w-full p-4 text-base font-['Jersey_25'] bg-card text-foreground 
                       focus:bg-muted outline-none transition-colors tracking-wide
                       focus:border-green-400"
              placeholder="Enter your name..."
              disabled={isSubmitting}
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm mb-3 text-green-600 font-['Jersey_25'] 
                                             tracking-wide">
              EMAIL ADDRESS *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="retro-border w-full p-4 text-base font-['Jersey_25'] bg-card text-foreground 
                       focus:bg-muted outline-none transition-colors tracking-wide
                       focus:border-green-400"
              placeholder="player@example.com"
              disabled={isSubmitting}
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm mb-3 text-green-600 font-['Jersey_25'] 
                                               tracking-wide">
              MESSAGE DATA *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="retro-border w-full p-4 text-base font-['Jersey_25'] bg-card text-foreground 
                       focus:bg-muted outline-none transition-colors resize-none tracking-wide
                       focus:border-green-400"
              placeholder="Enter your message..."
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
              className={`retro-border px-6 py-3 text-[9px] flex items-center space-x-2 tracking-[0.03em] bg-background transition-all duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted hover:transform hover:-translate-y-2 hover:shadow-lg'
                }`}
            >
              <Send className="h-3 w-3" />
              <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
            </button>

            <div className="text-[6px] text-muted-foreground">
              {isSubmitting ? (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 retro-blink"></div>
                  <span>PROCESSING DATA...</span>
                </div>
              ) : (
                'ALL FIELDS REQUIRED'
              )}
            </div>
          </div>
        </form>
      )}

      {/* Status Bar */}
      <div className="pixel-border p-2 bg-background mt-6">
        <div className="flex items-center justify-center space-x-4 text-[6px]">
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500"></div>
            <span>SECURE CONNECTION</span>
          </span>
          <span>•</span>
          <span>ENCRYPTED TRANSMISSION</span>
          <span>•</span>
          <span>RESPONSE TIME: 12-24 HOURS</span>
        </div>
      </div>
    </div>
  );
}