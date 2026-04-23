import { Link } from 'react-router-dom';
import { parseVideoUrl } from '../utils/videoUrl';

export default function SongCard({ song }) {
  const { thumbnailUrl } = parseVideoUrl(song.url);

  return (
    <Link
      to={`/watch/${song.id}`}
      className="group flex flex-col bg-[#0f0f0f] rounded-xl overflow-hidden hover:bg-[#1a1a1a] transition-colors"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-[#1e1e1e] overflow-hidden rounded-xl">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={song.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const placeholder = e.currentTarget.nextElementSibling;
              if (placeholder) placeholder.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback placeholder */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e]"
          style={{ display: thumbnailUrl ? 'none' : 'flex' }}
        >
          <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3a9 9 0 1 0 9 9A9 9 0 0 0 12 3zm-2 13.5v-9l6 4.5z" />
          </svg>
        </div>

        {/* Play overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex gap-3">
        {/* Artist avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
          {song.artist?.charAt(0)?.toUpperCase() ?? '?'}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-medium leading-tight line-clamp-2 mb-1">
            {song.title}
          </h3>
          <p className="text-gray-400 text-xs truncate">{song.artist}</p>
          <p className="text-gray-500 text-xs truncate">{song.album} · {song.genre}</p>
        </div>
      </div>
    </Link>
  );
}