
const websites = [
  { name: 'YouTube', icon: '🔴', color: 'bg-red-500' },
  { name: 'Reddit', icon: '🟠', color: 'bg-orange-500' },
  { name: 'Twitter', icon: '🔵', color: 'bg-blue-400' },
  { name: 'BBC News', icon: '⬛', color: 'bg-red-700' },
  { name: 'CNN', icon: '🔴', color: 'bg-red-600' },
  { name: 'The Verge', icon: '🟣', color: 'bg-purple-600' },
  { name: 'TechCrunch', icon: '🟢', color: 'bg-green-500' },
  { name: 'Wired', icon: '⬛', color: 'bg-black' },
  { name: 'Medium', icon: '⚫', color: 'bg-gray-800' },
  { name: 'Hacker News', icon: '🟠', color: 'bg-orange-600' },
  { name: 'Wikipedia', icon: '⚪', color: 'bg-gray-600' },
  { name: 'GitHub', icon: '⚫', color: 'bg-gray-900' },
  { name: 'Stack Overflow', icon: '🟠', color: 'bg-orange-500' },
  { name: 'ArXiv', icon: '🔴', color: 'bg-red-500' },
  { name: 'Nature', icon: '🔵', color: 'bg-blue-600' },
  { name: 'Substack', icon: '🟠', color: 'bg-orange-400' }
];

const WebsiteIcons = () => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-slate-300 mb-4 text-center">
        Sources
      </h3>
      <div className="grid grid-cols-8 gap-2 max-w-3xl mx-auto">
        {websites.map((website, index) => (
          <div
            key={website.name}
            className={`
              ${website.color} 
              w-10 h-10 rounded-md flex items-center justify-center text-white text-sm
              shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105
              animate-fade-in border border-gray-700
            `}
            style={{ animationDelay: `${index * 30}ms` }}
            title={website.name}
          >
            {website.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsiteIcons;
