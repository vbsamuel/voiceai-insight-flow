import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface VideoWidgetProps {
  searchCycle: number;
}

const VideoWidget = ({ searchCycle }: VideoWidgetProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play audio when first video appears
  useEffect(() => {
    if (searchCycle === 1) {
      const audio = new Audio('../../audios/first.mp3');
      audioRef.current = audio;
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    } else {
      const audio = new Audio('../../audios/second.mp3');
      audioRef.current = audio;
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }, [searchCycle]);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

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

  // Video data based on search cycle
  const getVideoData = () => {
    if (searchCycle === 1) {
      return {
        videoId: "dQw4w9WgXcQ",
        title: "Building an AI Agent with function calling step-by-step (in 26 minutes)",
        channel: "Nicholas Renotte",
        views: "23K views",
        duration: "26:01",
        timeAgo: "3 weeks ago",
        commentary: "I found this fascinating video about building AI agents that perfectly matches your interests. This tutorial shows how to build an AI agent with function calling capabilities step-by-step, which seems highly relevant to your AI development interests. Would you like me to find more content like this?"
      };
    } else {
      return {
        videoId: "vmy3HgaKJsY",
        title: "How AI Will Replace Programmers (But Create New Opportunities)",
        channel: "ForrestKnight",
        views: "847K views",
        duration: "12:43",
        timeAgo: "2 months ago",
        commentary: "Here's a different perspective on AI and programming! This video discusses how AI is transforming the programming landscape and what opportunities this creates. It might give you insights into the future of development with AI tools."
      };
    }
  };

  const videoData = getVideoData();
  const embedUrl = `https://www.youtube.com/embed/${videoData.videoId}?autoplay=${isPlaying ? 1 : 0}&rel=0&modestbranding=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoData.videoId}/maxresdefault.jpg`;

  const websiteIcons = [
    {
      name: 'Reddit',
      icon: 'https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_reddit-512.png'
    },
    {
      name: 'YouTube',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png'
    },
    {
      name: 'Twitter',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/2/28/X_icon_black.svg'
    },
    {
      name: 'Langchain',
      icon: 'https://brandlogos.net/wp-content/uploads/2025/03/langchain-logo_brandlogos.net_9zgaw.png'
    }
  ];

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
                e.currentTarget.src = `https://img.youtube.com/vi/${videoData.videoId}/hqdefault.jpg`;
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
              {videoData.duration}
            </div>
            
            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4">
              <h4 className="text-white text-lg font-semibold mb-1 line-clamp-2">
                {videoData.title}
              </h4>
              <div className="flex items-center text-gray-300 text-sm space-x-2">
                <span>{videoData.channel}</span>
                <span>•</span>
                <span>{videoData.views}</span>
                <span>•</span>
                <span>{videoData.timeAgo}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Commentary */}
      <div className="space-y-3 mb-4">
        <div className="rounded-lg p-4 mx-0 my-0 py-[7px] bg-zinc-900">
          <p className="leading-relaxed text-slate-300 font-thin">
            "{videoData.commentary}"
          </p>
        </div>
      </div>

      {/* Sources and Website Icons */}
      <div className="flex items-center">
        <span className="text-slate-300 text-sm font-medium mr-3">Sources</span>
        <div className="flex -space-x-2">
          {websiteIcons.map((website, index) => (
            <div
              key={website.name}
              className="w-8 h-8 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 cursor-pointer border-2 border-white"
              style={{ zIndex: websiteIcons.length - index }}
            >
              <img 
                src={website.icon} 
                alt={website.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoWidget;
