import { useState } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { SpacesList } from './components/SpacesList';
import { useGameStore } from './store/game';
import { useAuthStore } from './store/auth';
import { LogOut } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const { token, signIn, signUp, signOut } = useAuthStore();
  const { spaceId, setSpace } = useGameStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSpaceSelect = async (id: string) => {
    try {
      await setSpace(id);
    } catch (error) {
      console.error('Error selecting space:', error);
      toast.error('Failed to join space');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Toaster position="top-right" />
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold mb-6">
            {showLogin ? 'Sign In' : 'Sign Up'}
          </h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (isLoading) return;
              
              setIsLoading(true);
              const formData = new FormData(e.currentTarget);
              const username = formData.get('username') as string;
              const password = formData.get('password') as string;

              try {
                if (showLogin) {
                  await signIn(username, password);
                  toast.success('Successfully signed in!');
                } else {
                  await signUp(username, password, 'user');
                  await signIn(username, password);
                  toast.success('Successfully signed up and logged in!');
                }
              } catch (error) {
                console.error('Authentication error:', error);
                toast.error('Authentication failed. Please try again.');
              } finally {
                setIsLoading(false);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                disabled={isLoading}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                disabled={isLoading}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Loading...' : (showLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </form>
          <button
            onClick={() => setShowLogin(!showLogin)}
            disabled={isLoading}
            className="mt-4 text-sm text-blue-500 hover:text-blue-600"
          >
            {showLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Multiplayer Space Game</h1>
          <button
            onClick={() => {
              signOut();
              toast.success('Successfully signed out');
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!spaceId ? (
          <SpacesList onSpaceSelect={handleSpaceSelect} />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setSpace('')}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Back to Spaces
            </button>
            <GameCanvas />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;