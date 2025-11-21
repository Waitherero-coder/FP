import { useEffect, useState } from 'react';
import type { Resource } from '../types';
import { Book, Heart, Activity, Brain, Stethoscope, Sun, ExternalLink } from 'lucide-react';

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Resources', icon: Book },
    { id: 'nutrition', name: 'Nutrition', icon: Heart },
    { id: 'exercise', name: 'Exercise', icon: Activity },
    { id: 'mental-health', name: 'Mental Health', icon: Brain },
    { id: 'medical', name: 'Medical Info', icon: Stethoscope },
    { id: 'lifestyle', name: 'Lifestyle', icon: Sun },
  ];

  useEffect(() => {
    fetchResources();
  }, [selectedCategory]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const query = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
      const response = await fetch(`http://localhost:5000/api/resources${query}`);
      const data: Resource[] = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find((c) => c.id === category);
    const Icon = categoryData?.icon || Book;
    return <Icon className="w-5 h-5" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      nutrition: 'bg-red-100 text-red-800',
      exercise: 'bg-green-100 text-green-800',
      'mental-health': 'bg-purple-100 text-purple-800',
      medical: 'bg-blue-100 text-blue-800',
      lifestyle: 'bg-yellow-100 text-yellow-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading resources...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Resource Library</h2>
        <p className="text-gray-600">
          Curated information to help you manage PCOS and improve your well-being
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      {resources.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Resources Yet</h3>
          <p className="text-gray-600">
            Resources for this category will be added soon. Check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(resource.category)}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      resource.category
                    )}`}
                  >
                    {resource.category.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{resource.description}</p>

              {resource.content && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-700 border border-gray-200">
                  {resource.content}
                </div>
              )}

              {resource.url && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Learn More <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
