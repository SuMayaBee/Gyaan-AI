'use client';
import { useState, useEffect } from 'react';

export default function PdfToPodcastPage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [script, setScript] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setError('');
      setSuccess('');
      setScript('');
      stopSpeaking();
    } else {
      setError('Please select a valid PDF file');
      setPdfFile(null);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setError('');
    setSuccess('');
    stopSpeaking();
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const speakScript = () => {
    if (!speechSynthesis || !script) return;

    stopSpeaking();

    const lines = script.split('\n').filter(line => line.trim());
    let currentLine = 0;

    const speakNextLine = () => {
      if (currentLine < lines.length) {
        const utterance = new SpeechSynthesisUtterance(lines[currentLine]);
        
        // Set different voices for Host and Expert
        const voices = speechSynthesis.getVoices();
        if (voices.length > 1) {
          if (lines[currentLine].startsWith('Host:')) {
            utterance.voice = voices[0]; // First voice for Host
            utterance.pitch = 1.0;
          } else {
            utterance.voice = voices[1]; // Second voice for Expert
            utterance.pitch = 0.9;
          }
        }

        utterance.rate = 0.9; // Slightly slower for better clarity
        utterance.onend = () => {
          currentLine++;
          speakNextLine();
        };
        speechSynthesis.speak(utterance);
      } else {
        setIsPlaying(false);
      }
    };

    setIsPlaying(true);
    speakNextLine();
  };

  const handleGenerate = async () => {
    if (!pdfFile) {
      setError('Please upload a PDF file.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter a podcast prompt.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    stopSpeaking();
    setScript('');

    try {
      const formData = new FormData();
      formData.append('pdf', pdfFile);
      formData.append('prompt', prompt);

      const res = await fetch('/api/pdf-to-podcast', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to process request');
      }

      setSuccess(data.message || 'Successfully generated podcast');
      
      if (data.script) {
        setScript(data.script);
      }

    } catch (err) {
      console.error('Error in frontend:', err);
      setError(err.message || 'An error occurred while processing the request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center py-8">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-slate-800">PDF to Podcast</h1>
        
        <label className="block mb-2 font-medium text-slate-700">Upload PDF</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full mb-4 border border-gray-300 p-2 rounded-lg bg-white"
        />
        
        <label className="block mb-2 font-medium text-slate-700">Podcast Prompt</label>
        <input
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="e.g. Explain this PDF as a podcast episode..."
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading || !pdfFile}
          className="w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2 mb-4"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          )}
          {loading ? 'Generating Script...' : 'Generate Podcast'}
        </button>

        {script && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-slate-800">Your Podcast</h2>
              <button
                onClick={isPlaying ? stopSpeaking : speakScript}
                className={`px-4 py-2 rounded-lg font-medium ${
                  isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isPlaying ? 'Stop' : 'Play'}
              </button>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-xl shadow-inner border border-slate-200">
              <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700">
                {script}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 