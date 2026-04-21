/**
 * Parse a video URL and return embed URL + thumbnail.
 * * @typedef {Object} VideoMeta
 * @property {string|null} embedUrl
 * @property {string|null} thumbnailUrl
 * @property {'youtube' | 'direct' | 'external'} type
 */

/**
 * @param {string} url
 * @returns {VideoMeta}
 */
export function parseVideoUrl(url) {
  if (!url) {
    return { embedUrl: null, thumbnailUrl: null, type: 'external' };
  }

  // YouTube patterns
  const ytShort = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  const ytLong = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  const ytEmbed = url.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{11})/);

  const videoId = (ytShort || ytLong || ytEmbed)?.[1];
  
  if (videoId) {
    return {
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      type: 'youtube',
    };
  }

  // Direct video file
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) {
    return { embedUrl: url, thumbnailUrl: null, type: 'direct' };
  }

  return { embedUrl: null, thumbnailUrl: null, type: 'external' };
}