
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const VideoWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Simulate AI speaking
  useEffect(() => {
    const speakingTimer = setTimeout(() => {
      setIsSpeaking(true);
      const speakingDuration = setTimeout(() => {
        setIsSpeaking(false);
      }, 8000);
      return () => clearTimeout(speakingDuration);
    }, 1000);
    return () => clearTimeout(speakingTimer);
  }, []);

  const youtubeVideoId = "ftJ9cyYrLbY";
  const embedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=${isPlaying ? 1 : 0}&rel=0`;

  return (
    <div className="rounded-2xl shadow-xl p-6 animate-fade-in bg-zinc-950">
      <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl mb-4 relative overflow-hidden">
        {/* Real YouTube video */}
        {isPlaying ? (
          <iframe
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full rounded-xl"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
              </div>
              <h4 className="text-xl font-semibold">The Future of AI Agents</h4>
              <p className="text-blue-200 text-sm mt-2">TechTalk AI • 2.3M views</p>
            </div>
          </div>
        )}

        {/* Play overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <Button 
              onClick={() => setIsPlaying(true)} 
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-2 border-white rounded-full w-16 h-16 p-0"
            >
              <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* AI Commentary */}
      <div className="space-y-3">
        <div className="rounded-lg p-4 mx-0 my-0 py-[7px] bg-zinc-900">
          <p className="leading-relaxed text-slate-300 font-thin">
            "I found this fascinating video about AI agents that perfectly matches your interests. 
            This discusses how autonomous agents are revolutionizing software development, 
            which seems highly relevant to the tech topics you've been exploring. 
            Would you like me to find more content like this?"
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoWidget;
