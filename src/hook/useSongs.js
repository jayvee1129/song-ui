import { useState, useEffect } from 'react';

const REMOTE_URL = import.meta.env.VITE_API_BASE_URL;

// Using the 'raw' AllOrigins proxy - it's like a direct tunnel
const API_BASE = import.meta.env.PROD 
  ? `https://api.allorigins.win/raw?url=${encodeURIComponent(REMOTE_URL + '/salac/songs')}`
  : '/api/salac/songs';

export function useSongs() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_BASE, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: The server is likely waking up. Try refreshing in 30 seconds.`);
        return res.json();
      })
      .then(data => {
        setSongs(data);
        setError(null);
      })
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { songs, loading, error };
}

export function useSong(id) {
  const [song, setSong] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchUrl = import.meta.env.PROD
      ? `https://api.allorigins.win/raw?url=${encodeURIComponent(`${REMOTE_URL}/salac/songs/${id}`)}`
      : `/api/salac/songs/${id}`;

    fetch(fetchUrl, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setSong(data);
        setError(null);
      })
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  return { song, loading, error };
}