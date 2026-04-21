import SongCard from './SongCard';

export default function SongGrid({ songs, loading, error, searchQuery }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-10 h-10 border-4 border-gray-600 border-t-red-500 rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading songs…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <svg className="w-16 h-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        </svg>
        <p className="text-gray-300 text-lg font-medium">Failed to load songs</p>
        <p className="text-gray-500 text-sm">{error}</p>
        <p className="text-gray-500 text-xs">Make sure the backend is running on port 8080</p>
      </div>
    );
  }

  const filtered = searchQuery
    ? songs.filter(
        (s) =>
          s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.artist?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.album?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.genre?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : songs;

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <svg className="w-16 h-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 0 1 5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
        </svg>
        <p className="text-gray-300 text-lg font-medium">No songs found</p>
        {searchQuery && (
          <p className="text-gray-500 text-sm">No results for "{searchQuery}"</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
      {filtered.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
}