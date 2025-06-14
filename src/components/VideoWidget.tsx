
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface VideoWidgetProps {
  searchCycle: number;
}

const VideoWidget = ({ searchCycle }: VideoWidgetProps) => {
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

  // Reset playing state when search cycle changes
  useEffect(() => {
    setIsPlaying(false);
  }, [searchCycle]);

  // Different videos for different search cycles
  const getVideoData = () => {
    if (searchCycle === 1) {
      return {
        videoId: "ftJ9cyYrLbY",
        title: "How AI Will Change Programming Forever",
        channel: "Fireship",
        views: "1.2M views",
        duration: "3 months ago",
        commentary: "I found this fascinating video about AI and programming that perfectly matches your interests. This discusses how AI is revolutionizing software development, which seems highly relevant to the tech topics you've been exploring. Would you like me to find more content like this?"
      };
    } else {
      return {
        videoId: "vmy3HgaKJsY",
        title: "The Future of Programming - AI Code Generation",
        channel: "TechLead",
        views: "850K views",
        duration: "2 months ago",
        commentary: "Here's a different perspective on AI and programming. This video explores code generation tools and their impact on developers. Perhaps this approach to AI programming content is more aligned with what you're looking for?"
      };
    }
  };

  const videoData = getVideoData();
  const embedUrl = `https://www.youtube.com/embed/${videoData.videoId}?autoplay=${isPlaying ? 1 : 0}&rel=0`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoData.videoId}/maxresdefault.jpg`;

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
          <div className="relative w-full h-full">
            {/* YouTube Thumbnail */}
            <img 
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="w-full h-full object-cover rounded-xl"
            />
            
            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h4 className="text-white text-lg font-semibold mb-1">
                {videoData.title}
              </h4>
              <p className="text-gray-200 text-sm">
                {videoData.channel} • {videoData.views} • {videoData.duration}
              </p>
            </div>

            {/* YouTube Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                onClick={() => setIsPlaying(true)} 
                className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 p-0 shadow-lg"
              >
                <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* AI Commentary */}
      <div className="space-y-3">
        <div className="rounded-lg p-4 mx-0 my-0 py-[7px] bg-zinc-900">
          <p className="leading-relaxed text-slate-300 font-thin">
            "{videoData.commentary}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoWidget;
