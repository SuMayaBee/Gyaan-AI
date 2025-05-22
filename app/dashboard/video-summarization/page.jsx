// app/video-summarization/page.js
'use client';
import { useState } from 'react';

export default function VideoSummarizationPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
    setError('');
    const match = url.match(/(?:v=|\.be\/)([\w-]{11})/);
    setVideoId(match ? match[1] : null);
  };

  const handleSummarize = async () => {
    if (!videoId) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    setLoading(true);
    setError('');
    setSummary('');
    try {
      const res = await fetch('/api/summarize-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to summarize video');
      }
      setSummary(data.summary);
    } catch (err) {
      setError(err.message || 'An error occurred while summarizing the video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center py-8">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-slate-800">Video Summarization</h1>
        <label className="block mb-2 font-medium text-slate-700">YouTube Video URL</label>
        <input
          type="text"
          value={videoUrl}
          onChange={handleUrlChange}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        {videoId && (
          <div className="mb-6">
            <h2 className="font-semibold mb-2 text-slate-700">Preview</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-slate-200 shadow">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                allowFullScreen
                className="w-full h-60 rounded-lg"
              />
            </div>
          </div>
        )}
        <button
          onClick={handleSummarize}
          disabled={!videoId || loading}
          className="w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          )}
          {loading ? 'Summarizing...' : 'Generate Summary'}
        </button>
        {summary && (
          <div className="mt-8 bg-slate-50 p-5 rounded-xl shadow-inner border border-slate-200 max-h-64 overflow-y-auto">
            <h2 className="font-bold mb-2 text-slate-800">Summary</h2>
            <p className="whitespace-pre-line text-slate-700 text-base leading-relaxed">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}