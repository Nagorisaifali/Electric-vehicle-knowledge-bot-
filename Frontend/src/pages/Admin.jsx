
import { useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';

export default function Admin() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f =>
      f.type === 'application/pdf'
    );
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(f =>
      f.type === 'application/pdf'
    );
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (idx) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const upload = async () => {
    if (files.length === 0) {
      setError('Please select PDF files');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const form = new FormData();
      files.forEach(f => form.append('files', f));

      const res = await API.post('/upload/', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess(`Successfully uploaded ${res.data.count} PDF(s)! Knowledge base updated.`);
      setFiles([]);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-slideLeft">
          <h1 className="gradient-text text-4xl md:text-5xl font-bold mb-2">
            Upload Knowledge
          </h1>
          <p className="text-gray-600 text-lg dark:text-slate-400">
            Add PDF documents to enhance the EV Knowledge Base
          </p>
        </div>

        {/* Upload Area */}
        <div className="glass rounded-2xl border border-gray-200/20 dark:border-white/10 overflow-hidden shadow-2xl">
          <div className="p-8">
            {/* Drag & Drop Zone */}
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-smooth ${
                isDragging
                  ? 'border-linkedin-blue bg-blue-50 dark:border-sky-400 dark:bg-sky-500/10'
                  : 'border-gray-300 hover:border-gray-400 dark:border-white/30 dark:hover:border-white/50'
              }`}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 opacity-75" />
              <h3 className="text-xl font-semibold mb-2">Drag & Drop PDFs Here</h3>
              <p className="text-gray-600 dark:text-slate-400 mb-4">or</p>
              <label className="cursor-pointer">
                <span className="bg-linkedin-blue hover:bg-blue-700 dark:bg-gradient-to-r dark:from-sky-500 dark:to-cyan-500 dark:hover:from-sky-600 dark:hover:to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold inline-block transition-smooth hover:shadow-glow">
                  Browse Files
                </span>
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
              <p className="text-gray-500 dark:text-slate-500 text-sm mt-4">
                PDF files only • Recommended: Technical documentation
              </p>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Selected Files ({files.length})
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-gray-50 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-white/10 transition-smooth animate-fadeIn"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <FileText className="w-5 h-5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-gray-900 dark:text-slate-200 truncate">{file.name}</p>
                          <p className="text-gray-600 dark:text-slate-500 text-sm">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(idx)}
                        disabled={loading}
                        className="ml-2 p-1 hover:bg-red-500/20 rounded transition-smooth disabled:opacity-50"
                      >
                        <X className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Messages */}
            {success && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 text-green-400 animate-fadeIn">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p>{success}</p>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400 animate-fadeIn">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Upload Button */}
            {files.length > 0 && (
              <button
                onClick={upload}
                disabled={loading}
                className="mt-6 w-full bg-linkedin-blue hover:bg-blue-700 disabled:bg-gray-400 dark:bg-gradient-to-r dark:from-sky-500 dark:to-cyan-500 dark:hover:from-sky-600 dark:hover:to-cyan-600 dark:disabled:from-slate-500 dark:disabled:to-slate-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-smooth hover:shadow-glow disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader /> Processing...</>
                ) : (
                  <><Upload className="w-5 h-5" /> Upload PDFs</>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="glass p-6 rounded-lg border border-gray-200/20 dark:border-white/10 hover:border-linkedin-blue/50 dark:hover:border-sky-400/50 transition-smooth animate-slideLeft">
            <div className="text-3xl mb-2">📄</div>
            <h4 className="font-semibold mb-2">Supported Format</h4>
            <p className="text-gray-600 dark:text-slate-400 text-sm">PDF documents with EV-related content</p>
          </div>
          <div className="glass p-6 rounded-lg border border-gray-200/20 dark:border-white/10 hover:border-linkedin-blue/50 dark:hover:border-cyan-400/50 transition-smooth animate-slideLeft" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-semibold mb-2">Fast Processing</h4>
            <p className="text-gray-600 dark:text-slate-400 text-sm">Automatic embedding & indexing</p>
          </div>
          <div className="glass p-6 rounded-lg border border-gray-200/20 dark:border-white/10 hover:border-linkedin-blue/50 dark:hover:border-pink-400/50 transition-smooth animate-slideLeft" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl mb-2">🔍</div>
            <h4 className="font-semibold mb-2">Smart Search</h4>
            <p className="text-gray-600 dark:text-slate-400 text-sm">AI-powered semantic search</p>
          </div>
        </div>
      </div>
    </div>
  );
}