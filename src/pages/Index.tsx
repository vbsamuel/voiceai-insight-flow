import { useState, useEffect } from 'react';
import ListeningCircle from '../components/ListeningCircle';
import WebsiteIcons from '../components/WebsiteIcons';
import VideoWidget from '../components/VideoWidget';
import ThoughtProcessSidebar from '../components/ThoughtProcessSidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AppState = 'idle' | 'listening' | 'searching' | 'results' | 'listening-again';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('idle');
  const [thoughtLogs, setThoughtLogs] = useState<string[]>([]);
  const [searchCycle, setSearchCycle] = useState(1);

  // Auto-transition from results to listening again after 10 seconds
  useEffect(() => {
    if (currentState === 'results') {
      const timer = setTimeout(() => {
        setCurrentState('listening-again');
        setThoughtLogs(prev => [...prev, "User doesn't seem satisfied with my suggestion. Let me listen for more feedback..."]);
        
        // After 10 seconds of listening, start searching again
        const listeningTimer = setTimeout(() => {
          setCurrentState('searching');
          setThoughtLogs(prev => [...prev, "I think the user didn't like what I suggested, so I'm going to search something else", "Looking for different content that might be more interesting..."]);
          
          // After 3 seconds of searching, show new results
          const searchingTimer = setTimeout(() => {
            setCurrentState('results');
            setSearchCycle(2);
            setThoughtLogs(prev => [...prev, "Found a different video about AI and programming. This might be more relevant to their interests."]);
          }, 3000);
          
          return () => clearTimeout(searchingTimer);
        }, 10000);
        
        return () => clearTimeout(listeningTimer);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [currentState]);

  const startListening = async () => {
    console.log('Starting microphone permission request...');
    try {
      // Request microphone permission
      console.log('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted!');
      
      // If permission granted, start the listening process
      setCurrentState('listening');
      setThoughtLogs(['Starting voice recognition...']);
      
      setTimeout(() => {
        setCurrentState('searching');
        setThoughtLogs(prev => [...prev, 'Processing voice input... analyzing user interests']);
        setTimeout(() => {
          setCurrentState('results');
          setThoughtLogs(prev => [...prev, 'User seems interested in AI technology. Searching for relevant content...', 'Found interesting YouTube video about AI agents. This should be relevant.']);
        }, 3000);
      }, 3000);

      // Stop the stream after we're done
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setThoughtLogs(['Error: Could not access microphone. Please ensure you have granted microphone permissions.']);
      setCurrentState('idle');
    }
  };

  const resetToIdle = () => {
    setCurrentState('idle');
    setThoughtLogs([]);
    setSearchCycle(1);
  };

  const getStateText = () => {
    switch (currentState) {
      case 'listening':
      case 'listening-again':
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
              <ListeningCircle 
                isActive={currentState === 'listening' || currentState === 'searching' || currentState === 'listening-again'} 
                state={currentState === 'listening-again' ? 'listening' : currentState} 
              />
            </div>

            {/* State Text */}
            <div className="text-center">
              {currentState === 'idle'}
            </div>

            {/* Controls */}
            {currentState === 'idle' && (
              <Button 
                onClick={() => {
                  console.log('Button clicked');
                  startListening().catch(error => {
                    console.error('Error in startListening:', error);
                  });
                }}
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
