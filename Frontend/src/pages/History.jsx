
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { MessageCircle, Trash2, Download, AlertCircle, Eye } from 'lucide-react';

export default function History() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get('/history/');
      setData(res.data);
    } catch (err) {
      setError('Failed to fetch history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all history?')) return;

    try {
      await API.post('/history/clear');
      setData([]);
    } catch (err) {
      setError('Failed to clear history');
    }
  };

  const downloadHistory = () => {
    if (data.length === 0) return;

    const text = data
      .map(
        h =>
          `Q: ${h.question}\n\nA: ${h.answer}\n\nTime: ${h.created_at || 'N/A'}`
      )
      .join('\n\n' + '='.repeat(50) + '\n\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EV-History-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-slideLeft">
          <h1 className="gradient-text text-4xl md:text-5xl font-bold mb-2">
            Chat History
          </h1>
          <p className="text-gray-600 text-lg dark:text-slate-400">
            Review your previous conversations
          </p>
        </div>

        {/* Action Buttons */}
        {data.length > 0 && (
          <div className="flex gap-3 mb-6">
            <button
              onClick={downloadHistory}
              className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 rounded-lg transition-smooth"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg transition-smooth"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400 animate-fadeIn">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex-center py-12">
            <Loader />
          </div>
        )}

        {/* Empty State */}
        {!loading && data.length === 0 && (
          <div className="glass rounded-2xl border border-gray-200/20 dark:border-white/10 p-12 text-center py-20">
            <MessageCircle className="w-16 h-16 mx-auto text-gray-400 dark:text-slate-500 mb-4 opacity-50" />
            <p className="text-gray-600 dark:text-slate-400 text-lg">No chat history yet</p>
            <p className="text-gray-500 dark:text-slate-500 text-sm mt-2">
              Start a conversation to see it here
            </p>
          </div>
        )}

        {/* History Items */}
        {!loading && data.length > 0 && (
          <div className="space-y-4">
            <div className="text-gray-600 dark:text-slate-400 text-sm mb-4">
              Showing {data.length} conversation{data.length !== 1 ? 's' : ''}
            </div>
            {data.map((h, i) => (
              <div
                key={i}
                className="glass rounded-xl border border-gray-200/20 dark:border-white/10 p-6 hover:border-linkedin-blue/50 dark:hover:border-sky-400/50 transition-smooth animate-fadeIn hover:shadow-glow"
              >
                {/* Question */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs text-gray-500 dark:text-slate-500">Question</span>
                  </div>
                  <p className="text-gray-900 dark:text-slate-200 leading-relaxed">{h.question}</p>
                </div>

                {/* Answer */}
                <div className="mb-4 pl-6 border-l-2 border-linkedin-blue/50 dark:border-cyan-500/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-linkedin-lightgray dark:bg-cyan-500/20 text-linkedin-blue dark:text-cyan-400 px-2 py-1 rounded">
                      Answer
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed line-clamp-3 whitespace-pre-wrap">
                    {h.answer}
                  </p>
                </div>

                {/* Timestamp and Actions */}
                <div className="flex items-center justify-between">
                  {h.created_at && (
                    <p className="text-xs text-gray-500 dark:text-slate-500">
                      {new Date(h.created_at).toLocaleString()}
                    </p>
                  )}
                  <button
                    onClick={() => navigate(`/history/${h.id}`)}
                    className="flex items-center gap-2 px-3 py-1 bg-linkedin-lightgray dark:bg-sky-500/20 hover:bg-blue-100 dark:hover:bg-sky-500/30 border border-linkedin-blue/50 dark:border-sky-500/50 text-linkedin-blue dark:text-sky-400 rounded-lg transition-smooth text-sm"
                  >
                    <Eye className="w-3 h-3" />
                    Read
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}