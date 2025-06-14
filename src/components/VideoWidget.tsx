
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
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

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
          <div className="absolute inset-0">
            {/* Real YouTube thumbnail */}
            <img 
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Video info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
              <h4 className="text-white text-lg font-semibold">OpenAI o3 BREAKTHROUGH: The New PhD-Level AI That Changes Everything</h4>
              <p className="text-gray-300 text-sm mt-1">TheAIGRID • 47K views • 4 days ago</p>
            </div>
          </div>
        )}

        {/* Play overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <Button 
              onClick={() => setIsPlaying(true)} 
              className="bg-red-600 hover:bg-red-700 text-white border-0 rounded-full w-16 h-16 p-0 shadow-lg"
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
            "I found this fascinating video about OpenAI's latest breakthrough that perfectly matches your interests. 
            This discusses how the new o3 model achieves PhD-level reasoning capabilities, 
            which seems highly relevant to the AI topics you've been exploring. 
            Would you like me to find more content like this?"
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoWidget;
