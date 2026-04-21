import { useState, useEffect } from 'react';

const API_BASE = '/api/salac/songs';

export function useSongs() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  // Start as true so we don't have to call setLoading(true) manually
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_BASE, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setSongs(data);
        setError(null);
      })
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false)); // Only need to set it to false when done

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

    fetch(`${API_BASE}/${id}`, { signal: controller.signal })
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