
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
          <div className="absolute w-40 h-40 rounded-full bg-blue-400 opacity-20 animate-ping" />
          <div className="absolute w-32 h-32 rounded-full bg-blue-500 opacity-30 animate-ping animation-delay-200" />
        </>
      )}
      
      {/* Main circle */}
      <div className={cn(
        "relative w-28 h-28 rounded-full transition-all duration-500 flex items-center justify-center",
        "bg-white border-2 border-slate-200 shadow-md hover:shadow-lg"
      )}>
        {/* Inner animation based on state */}
        {state === 'listening' && (
          <div className="flex space-x-1">
            <div className="w-1 h-6 bg-slate-400 rounded-full animate-pulse" />
            <div className="w-1 h-8 bg-slate-400 rounded-full animate-pulse animation-delay-100" />
            <div className="w-1 h-4 bg-slate-400 rounded-full animate-pulse animation-delay-200" />
            <div className="w-1 h-7 bg-slate-400 rounded-full animate-pulse animation-delay-300" />
          </div>
        )}
        
        {state === 'searching' && (
          <div className="w-6 h-6 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
        )}
        
        {state === 'results' && (
          <div className="w-4 h-4 bg-slate-400 rounded-full" />
        )}
        
        {/* Removed the gray dot for idle state */}
      </div>
    </div>
  );
};

export default ListeningCircle;
