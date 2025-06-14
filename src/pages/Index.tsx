
import { useState, useEffect } from 'react';
import ListeningCircle from '../components/ListeningCircle';
import WebsiteIcons from '../components/WebsiteIcons';
import VideoWidget from '../components/VideoWidget';
import ThoughtProcessSidebar from '../components/ThoughtProcessSidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AppState = 'idle' | 'listening' | 'searching' | 'results';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('idle');
  const [thoughtLogs, setThoughtLogs] = useState<string[]>([]);
  const [searchCycle, setSearchCycle] = useState(1);

  const startListening = () => {
    setCurrentState('listening');
    if (searchCycle === 1) {
      setThoughtLogs(['Starting voice recognition...']);
    } else {
      setThoughtLogs(prev => [...prev, 'User didn\'t like what I suggested, so I\'m going to search something else', 'Listening for new preferences...']);
    }
    
    setTimeout(() => {
      setCurrentState('searching');
      if (searchCycle === 1) {
        setThoughtLogs(prev => [...prev, 'Processing voice input... analyzing user interests']);
      } else {
        setThoughtLogs(prev => [...prev, 'Analyzing different user preferences...', 'Looking for alternative content suggestions...']);
      }
      
      setTimeout(() => {
        setCurrentState('results');
        if (searchCycle === 1) {
          setThoughtLogs(prev => [...prev, 'User seems interested in AI technology. Searching for relevant content...', 'Found interesting YouTube video about AI agents. This should be relevant.']);
        } else {
          setThoughtLogs(prev => [...prev, 'User might prefer different type of content...', 'Found a different perspective on AI and programming. This might be more suitable.']);
        }
      }, 3000);
    }, 3000);
  };

  // Auto-trigger new search cycle after showing results
  useEffect(() => {
    if (currentState === 'results') {
      const autoSearchTimer = setTimeout(() => {
        setSearchCycle(prev => prev + 1);
        startListening();
      }, 10000); // Wait 10 seconds before starting new cycle

      return () => clearTimeout(autoSearchTimer);
    }
  }, [currentState, searchCycle]);

  const resetToIdle = () => {
    setCurrentState('idle');
    setThoughtLogs([]);
    setSearchCycle(1);
  };

  const getStateText = () => {
    switch (currentState) {
      case 'listening':
        return 'Listening...';
      case 'searching':
        return 'Searching...';
      case 'results':
        return 'Found something interesting!';
      default:
        return 'Ready to listen';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-50" />
      
      <div className={cn(
        "relative z-10 flex h-screen bg-zinc-900 transition-all duration-300",
        currentState !== 'idle' ? "pr-12" : ""
      )}>
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-950">
          {/* Central Content */}
          <div className="flex flex-col items-center space-y-8 max-w-4xl w-full">
            {/* Listening Circle */}
            <div className="relative">
              <ListeningCircle isActive={currentState === 'listening' || currentState === 'searching'} state={currentState} />
            </div>

            {/* State Text */}
            <div className="text-center">
              {currentState === 'idle'}
            </div>

            {/* Controls */}
            {currentState === 'idle' && (
              <Button 
                onClick={startListening} 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Listening
              </Button>
            )}

            {/* Website Icons */}
            {currentState === 'results' && (
              <div className="w-full animate-fade-in">
                <WebsiteIcons />
              </div>
            )}

            {/* Video Widget */}
            {currentState === 'results' && (
              <div className="w-full max-w-2xl animate-fade-in">
                <VideoWidget searchCycle={searchCycle} />
              </div>
            )}
          </div>
        </div>

        {/* Thought Process Sidebar */}
        <ThoughtProcessSidebar thoughts={thoughtLogs} isVisible={currentState !== 'idle'} />
      </div>
    </div>
  );
};

export default Index;
