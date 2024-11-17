import React from 'react';
import { Book, Video, Link as LinkIcon, ArrowLeft } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'link';
  url: string;
  category: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'The Science of Habit Formation',
    description: 'Learn about the neurological basis of habit formation and how to leverage it.',
    type: 'article',
    url: 'https://example.com/habit-science',
    category: 'Understanding Habits'
  },
  {
    id: '2',
    title: 'Morning Routine Mastery',
    description: 'A comprehensive guide to building a productive morning routine.',
    type: 'video',
    url: 'https://example.com/morning-routine',
    category: 'Practical Guides'
  },
  {
    id: '3',
    title: 'Habit Stacking: A Simple Strategy',
    description: 'How to build new habits by stacking them on existing ones.',
    type: 'article',
    url: 'https://example.com/habit-stacking',
    category: 'Strategies'
  },
  {
    id: '4',
    title: 'Overcoming Common Habit Obstacles',
    description: 'Solutions to the most common challenges in habit formation.',
    type: 'video',
    url: 'https://example.com/habit-obstacles',
    category: 'Troubleshooting'
  }
];

const categories = Array.from(new Set(resources.map(r => r.category)));

interface ResourcesPageProps {
  onClose: () => void;
}

const ResourcesPage: React.FC<ResourcesPageProps> = ({ onClose }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <Book className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      default:
        return <LinkIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-safe-bottom">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center">
          <button 
            onClick={onClose}
            className="p-2 -ml-2 tap-highlight"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold ml-2">Resources</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {categories.map(category => (
          <section key={category}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{category}</h2>
            <div className="grid gap-4">
              {resources
                .filter(resource => resource.category === category)
                .map(resource => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        resource.type === 'video' 
                          ? 'bg-red-100 text-red-600'
                          : resource.type === 'article'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {getIcon(resource.type)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{resource.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;