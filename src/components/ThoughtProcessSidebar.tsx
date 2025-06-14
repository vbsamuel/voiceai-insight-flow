
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ThoughtProcessSidebarProps {
  thoughts: string[];
  isVisible: boolean;
}

const ThoughtProcessSidebar = ({
  thoughts,
  isVisible
}: ThoughtProcessSidebarProps) => {
  return (
    <div className={cn(
      "w-80 bg-white bg-opacity-95 backdrop-blur-sm border-l border-slate-200 transition-all duration-500 ease-in-out",
      isVisible ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="p-6 bg-zinc-900">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <h3 className="text-lg font-semibold text-white">AI Thought Process</h3>
        </div>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-4">
            {thoughts.map((thought, index) => (
              <div
                key={index}
                className="p-3 bg-slate-100 rounded-lg border-l-4 border-blue-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <p className="text-sm text-slate-700">{thought}</p>
              </div>
            ))}

            {thoughts.length === 0 && (
              <div className="text-center text-slate-500 mt-8">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  🧠
                </div>
                <p className="text-sm">AI thoughts will appear here...</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ThoughtProcessSidebar;
