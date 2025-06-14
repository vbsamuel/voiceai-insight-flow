
import { cn } from '@/lib/utils';

interface ListeningCircleProps {
  isActive: boolean;
  state: string;
}

const ListeningCircle = ({ isActive, state }: ListeningCircleProps) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulsing rings */}
      {isActive && (
        <>
          <div className="absolute w-32 h-32 rounded-full bg-blue-400 opacity-20 animate-ping" />
          <div className="absolute w-24 h-24 rounded-full bg-blue-500 opacity-30 animate-ping animation-delay-200" />
        </>
      )}
      
      {/* Main circle */}
      <div className={cn(
        "relative w-20 h-20 rounded-full transition-all duration-500 flex items-center justify-center",
        isActive 
          ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg" 
          : "bg-white border-2 border-slate-200 shadow-md hover:shadow-lg"
      )}>
        {/* Inner animation based on state */}
        {state === 'listening' && (
          <div className="flex space-x-1">
            <div className="w-1 h-6 bg-white rounded-full animate-pulse" />
            <div className="w-1 h-8 bg-white rounded-full animate-pulse animation-delay-100" />
            <div className="w-1 h-4 bg-white rounded-full animate-pulse animation-delay-200" />
            <div className="w-1 h-7 bg-white rounded-full animate-pulse animation-delay-300" />
          </div>
        )}
        
        {state === 'searching' && (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        
        {state === 'results' && (
          <div className="w-4 h-4 bg-white rounded-full" />
        )}
        
        {state === 'idle' && (
          <div className="w-4 h-4 bg-slate-400 rounded-full" />
        )}
      </div>
    </div>
  );
};

export default ListeningCircle;
