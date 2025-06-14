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
  return <div className="">
      <div className="p-6" style={{
      backgroundColor: '#18181b'
    }}>
        <div className="flex items-center space-x-2 mb-6">
          
          
        </div>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-4">
            {thoughts.map((thought, index) => <div key={index} style={{
            animationDelay: `${index * 0.2}s`
          }} className="p-3 rounded-lg animate-fade-in bg-zinc-900 border border-gray-700">
                <p className="text-sm text-slate-200">{thought}</p>
              </div>)}

            {thoughts.length === 0 && <div className="text-center text-slate-500 mt-8">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  🧠
                </div>
                <p className="text-sm">AI thoughts will appear here...</p>
              </div>}
          </div>
        </ScrollArea>
      </div>
    </div>;
};
export default ThoughtProcessSidebar;