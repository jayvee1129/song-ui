import { useParams, Link } from 'react-router-dom';
import { useSong } from '../hook/useSongs';
import { parseVideoUrl } from '../utils/videoUrl';

export default function WatchPage() {
  // Removed the <{ id: string }> generic
  const { id } = useParams();
  const songId = id ? Number(id) : null;
  const { song, loading, error } = useSong(songId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-gray-600 border-t-red-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !song) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-red-400 text-lg">Song not found.</p>
        <Link to="/" className="text-blue-400 hover:underline text-sm">← Back to home</Link>
      </div>
    );
  }

  const { embedUrl, thumbnailUrl, type } = parseVideoUrl(song.url);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back link */}
      <Link to="/" className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main player column */}
        <div className="flex-1 min-w-0">
          {/* Video player */}
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden mb-4">
            {type === 'youtube' && embedUrl ? (
              <iframe
                src={`${embedUrl}?autoplay=1`}
                title={song.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : type === 'direct' && embedUrl ? (
              <video
                src={embedUrl}
                controls
                autoPlay
                poster={thumbnailUrl ?? undefined}
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              /* Fallback: open in new tab */
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                <svg className="w-20 h-20 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3a9 9 0 1 0 9 9A9 9 0 0 0 12 3zm-2 13.5v-9l6 4.5z" />
                </svg>
                <p className="text-gray-400 text-sm text-center px-4">
                  This video cannot be embedded directly.
                </p>
                {song.url && (
                  <a
                    href={song.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm transition-colors"
                  >
                    Open in new tab
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Title & metadata */}
          <h1 className="text-white text-xl font-semibold mb-2">{song.title}</h1>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                {song.artist?.charAt(0)?.toUpperCase() ?? '?'}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{song.artist}</p>
                <p className="text-gray-400 text-xs">{song.album}</p>
              </div>
            </div>

            {/* Genre badge */}
            <span className="ml-auto px-3 py-1 bg-[#272727] text-gray-300 text-xs rounded-full">
              {song.genre}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#272727] hover:bg-[#3a3a3a] text-white text-sm rounded-full transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 0 1 1.789 2.894l-3.5 7A2 2 0 0 1 15.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 0 0-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 0 1-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h2.5" />
              </svg>
              Like
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#272727] hover:bg-[#3a3a3a] text-white text-sm rounded-full transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 1 1 0-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 1 0 5.367-2.684 3 3 0 0 0-5.367 2.684zm0 9.316a3 3 0 1 0 5.368 2.684 3 3 0 0 0-5.368-2.684z" />
              </svg>
              Share
            </button>
            {song.url && (
              <a
                href={song.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#272727] hover:bg-[#3a3a3a] text-white text-sm rounded-full transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Source
              </a>
            )}
          </div>

          {/* Song details card */}
          <div className="bg-[#1a1a1a] rounded-xl p-4">
            <h3 className="text-white font-medium mb-3">Song Details</h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-gray-400">Title</dt>
              <dd className="text-gray-200 truncate">{song.title}</dd>
              <dt className="text-gray-400">Artist</dt>
              <dd className="text-gray-200 truncate">{song.artist}</dd>
              <dt className="text-gray-400">Album</dt>
              <dd className="text-gray-200 truncate">{song.album}</dd>
              <dt className="text-gray-400">Genre</dt>
              <dd className="text-gray-200 truncate">{song.genre}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}