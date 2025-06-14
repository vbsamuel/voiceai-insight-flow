
import { useState, useEffect } from 'react';
import ListeningCircle from '../components/ListeningCircle';
import WebsiteIcons from '../components/WebsiteIcons';
import VideoWidget from '../components/VideoWidget';
import ThoughtProcessSidebar from '../components/ThoughtProcessSidebar';
import { Button } from '@/components/ui/button';

type AppState = 'idle' | 'listening' | 'searching' | 'results';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('idle');
  const [thoughtLogs, setThoughtLogs] = useState<string[]>([]);

  const startListening = () => {
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
  };

  const resetToIdle = () => {
    setCurrentState('idle');
    setThoughtLogs([]);
  };

  const getStateText = () => {
    switch (currentState) {
      case 'listening': return 'Listening...';
      case 'searching': return 'Searching...';
      case 'results': return 'Found something interesting!';
      default: return 'Ready to listen';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-50" />
      
      <div className="relative z-10 flex h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Header */}
          <div className="absolute top-8 left-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VoiceAI
            </h1>
            <p className="text-slate-600 text-sm mt-1">Your Personalized Voice Search Companion</p>
          </div>

          {/* Central Content */}
          <div className="flex flex-col items-center space-y-8 max-w-4xl w-full">
            {/* Listening Circle */}
            <div className="relative">
              <ListeningCircle isActive={currentState === 'listening' || currentState === 'searching'} state={currentState} />
            </div>

            {/* State Text */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">{getStateText()}</h2>
              {currentState === 'idle' && (
                <p className="text-slate-600 mb-6">Click the button below to start your voice search</p>
              )}
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

            {currentState === 'results' && (
              <Button 
                onClick={resetToIdle}
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2 rounded-full"
              >
                Start New Search
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
                <VideoWidget />
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
