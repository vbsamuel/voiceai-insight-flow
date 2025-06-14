
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThoughtProcessSidebarProps {
  thoughts: string[];
  isVisible: boolean;
}

const ThoughtProcessSidebar = ({
  thoughts,
  isVisible
}: ThoughtProcessSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed right-0 top-0 h-full transition-all duration-300 ease-in-out z-20",
      isCollapsed ? "w-12" : "w-80"
    )}>
      <div className="h-full flex">
        {/* Collapse/Expand Button */}
        <div className="flex items-start pt-4">
          <Button
            onClick={toggleCollapse}
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-zinc-800 hover:bg-zinc-700 text-white border border-gray-600"
          >
            {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className={cn(
          "flex-1 transition-all duration-300",
          isCollapsed ? "w-0 overflow-hidden" : "w-full"
        )}>
          <div className="p-6 h-full" style={{ backgroundColor: '#18181b' }}>
            <div className="flex items-center space-x-2 mb-6">
              <Brain className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">AI Thoughts</h3>
            </div>

            <ScrollArea className="h-[calc(100vh-120px)]">
              <div className="space-y-4">
                {thoughts.map((thought, index) => (
                  <div
                    key={index}
                    style={{ animationDelay: `${index * 0.2}s` }}
                    className="p-3 rounded-lg animate-fade-in bg-zinc-900 border border-gray-700"
                  >
                    <p className="text-sm text-slate-200">{thought}</p>
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
      </div>
    </div>
  );
};

export default ThoughtProcessSidebar;
