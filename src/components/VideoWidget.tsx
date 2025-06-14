import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
const VideoWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
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

  // Simulate video progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  return <div className="rounded-2xl shadow-xl p-6 animate-fade-in bg-zinc-950">
      <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl mb-4 relative overflow-hidden">
        {/* YouTube-style video placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
            </div>
            <h4 className="text-xl font-semibold">The Future of AI Agents</h4>
            <p className="text-blue-200 text-sm mt-2">TechTalk AI • 2.3M views</p>
          </div>
        </div>

        {/* Play overlay */}
        {!isPlaying && <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <Button onClick={() => setIsPlaying(true)} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-2 border-white rounded-full w-16 h-16 p-0">
              <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
            </Button>
          </div>}

        {/* Progress bar */}
        {isPlaying && <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white bg-opacity-20 rounded-full h-1 mb-2">
              <div className="bg-red-500 h-1 rounded-full transition-all duration-1000" style={{
            width: `${currentTime / 600 * 100}%`
          }} />
            </div>
            <div className="flex justify-between text-white text-xs">
              <span>{formatTime(currentTime)}</span>
              <span>10:00</span>
            </div>
          </div>}
      </div>

      {/* AI Commentary */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          
          
        </div>
        
        <div className="rounded-lg p-4 mx-0 my-0 py-[7px] bg-zinc-900">
          <p className="leading-relaxed text-slate-300 font-thin">
            "I found this fascinating video about AI agents that perfectly matches your interests. 
            This discusses how autonomous agents are revolutionizing software development, 
            which seems highly relevant to the tech topics you've been exploring. 
            Would you like me to find more content like this?"
          </p>
        </div>

        
      </div>
    </div>;
};
export default VideoWidget;