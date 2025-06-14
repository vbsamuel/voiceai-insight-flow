const websites = [{
  name: 'YouTube',
  icon: '📺',
  color: 'bg-red-500'
}, {
  name: 'Reddit',
  icon: '🤖',
  color: 'bg-orange-500'
}, {
  name: 'Twitter',
  icon: '🐦',
  color: 'bg-blue-400'
}, {
  name: 'BBC News',
  icon: '📺',
  color: 'bg-red-700'
}, {
  name: 'CNN',
  icon: '📰',
  color: 'bg-red-600'
}, {
  name: 'The Verge',
  icon: '🔮',
  color: 'bg-purple-600'
}, {
  name: 'TechCrunch',
  icon: '🚀',
  color: 'bg-green-500'
}, {
  name: 'Wired',
  icon: '⚡',
  color: 'bg-black'
}, {
  name: 'Medium',
  icon: '📰',
  color: 'bg-green-600'
}, {
  name: 'Hacker News',
  icon: '👨‍💻',
  color: 'bg-orange-500'
}, {
  name: 'Wikipedia',
  icon: '🌐',
  color: 'bg-gray-600'
}, {
  name: 'LinkedIn',
  icon: '💼',
  color: 'bg-blue-700'
}];
const WebsiteIcons = () => {
  return <div className="w-full">
      
      <div className="grid grid-cols-6 gap-3 max-w-2xl mx-auto">
        {websites.map((website, index) => <div key={website.name} className={`
              ${website.color} 
              w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg
              shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110
              animate-fade-in
            `} style={{
        animationDelay: `${index * 50}ms`
      }} title={website.name}>
            {website.icon}
          </div>)}
      </div>
    </div>;
};
export default WebsiteIcons;