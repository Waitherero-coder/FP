import { useState } from 'react';
import { Book, Heart, Activity, Brain, AlertCircle, Sparkles, X } from 'lucide-react';
import { Resource } from '../types';

interface ResourcesProps {
  resources: Resource[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Education': <Book className="h-5 w-5" />,
  'Nutrition': <Heart className="h-5 w-5" />,
  'Fitness': <Activity className="h-5 w-5" />,
  'Mental Health': <Brain className="h-5 w-5" />,
  'Symptoms': <AlertCircle className="h-5 w-5" />,
  'Wellness': <Sparkles className="h-5 w-5" />
};

const categoryColors: Record<string, string> = {
  'Education': 'bg-blue-500',
  'Nutrition': 'bg-green-500',
  'Fitness': 'bg-orange-500',
  'Mental Health': 'bg-purple-500',
  'Symptoms': 'bg-red-500',
  'Wellness': 'bg-cyan-500'
};

export default function Resources({ resources }: ResourcesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))];

  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter(r => r.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Health Resources</h2>
        <p className="text-gray-600">Evidence-based information to help you manage PCOS</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onClick={() => setSelectedResource(resource)}
          />
        ))}
      </div>

      {selectedResource && (
        <ResourceModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}
    </div>
  );
}

function ResourceCard({ resource, onClick }: { resource: Resource; onClick: () => void }) {
  const icon = categoryIcons[resource.category];
  const color = categoryColors[resource.category];

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="mb-2">
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
          {resource.category}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
        {resource.title}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-3">
        {resource.description}
      </p>
    </div>
  );
}

function ResourceModal({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  const icon = categoryIcons[resource.category];
  const color = categoryColors[resource.category];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{resource.title}</h3>
              <p className="text-sm text-gray-600">{resource.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 py-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {resource.content}
          </p>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
