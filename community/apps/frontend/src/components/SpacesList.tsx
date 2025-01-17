import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { useAuthStore } from '../store/auth';
import { Plus } from 'lucide-react';

interface Space {
  id: string;
  name: string;
  dimensions: string;
}

export function SpacesList({ onSpaceSelect }: { onSpaceSelect: (spaceId: string) => void }) {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const { isAdmin } = useAuthStore();

  useEffect(() => {
    const fetchSpaces = async () => {
      const response = await api.get('/api/v1/space/all');
      setSpaces(response.data.spaces);
    };
    fetchSpaces();
  }, []);

  const createSpace = async () => {
    const response = await api.post('/api/v1/space', {
      name: `Space ${spaces.length + 1}`,
      dimensions: '100x200',
    });
    setSpaces([...spaces, response.data]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Spaces</h2>
        {isAdmin && (
          <button
            onClick={createSpace}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={20} />
            Create Space
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {spaces.map((space) => (
          <div
            key={space.id}
            onClick={() => onSpaceSelect(space.id)}
            className="p-4 border rounded-lg cursor-pointer hover:border-blue-500"
          >
            <h3 className="font-semibold">{space.name}</h3>
            <p className="text-sm text-gray-500">Dimensions: {space.dimensions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}