
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

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
  const embedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=${isPlaying ? 1 : 0}&rel=0&modestbranding=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

  return (
    <div className="rounded-2xl shadow-xl p-6 animate-fade-in bg-zinc-950">
      <div className="aspect-video bg-black rounded-xl mb-4 relative overflow-hidden">
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
          <div className="relative w-full h-full bg-black">
            {/* YouTube Thumbnail */}
            <img 
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                // Fallback to a different resolution if maxres fails
                e.currentTarget.src = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;
              }}
            />
            
            {/* YouTube Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                onClick={() => setIsPlaying(true)} 
                className="bg-red-600 hover:bg-red-700 text-white rounded-full w-20 h-20 p-0 shadow-2xl transition-all duration-200 hover:scale-110"
              >
                <Play className="w-8 h-8 ml-1" fill="white" />
              </Button>
            </div>

            {/* Video Duration Badge */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
              26:01
            </div>
            
            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4">
              <h4 className="text-white text-lg font-semibold mb-1 line-clamp-2">
                Building an AI Agent with function calling step-by-step (in 26 minutes)
              </h4>
              <div className="flex items-center text-gray-300 text-sm space-x-2">
                <span>Nicholas Renotte</span>
                <span>•</span>
                <span>23K views</span>
                <span>•</span>
                <span>3 weeks ago</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Commentary */}
      <div className="space-y-3">
        <div className="rounded-lg p-4 mx-0 my-0 py-[7px] bg-zinc-900">
          <p className="leading-relaxed text-slate-300 font-thin">
            "I found this fascinating video about building AI agents that perfectly matches your interests. 
            This tutorial shows how to build an AI agent with function calling capabilities step-by-step, 
            which seems highly relevant to your AI development interests. 
            Would you like me to find more content like this?"
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoWidget;
