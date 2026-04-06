import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { ArrowLeft, MessageCircle, AlertCircle, Calendar } from 'lucide-react';

export default function HistoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistoryDetail();
  }, [id]);

  const fetchHistoryDetail = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get(`/history/${id}`);
      setData(res.data);
    } catch (err) {
      setError('Failed to fetch history detail');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Navbar />
        <div className="flex-center py-12">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
          <button
            onClick={() => navigate('/history')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300 rounded-lg transition-smooth"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-slideLeft">
          <button
            onClick={() => navigate('/history')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300 rounded-lg transition-smooth mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to History
          </button>
          <h1 className="gradient-text text-3xl md:text-4xl font-bold mb-2">
            Conversation Detail
          </h1>
          <p className="text-gray-600 text-lg dark:text-slate-400">
            Full conversation view
          </p>
        </div>

        {/* Conversation Card */}
        <div className="glass rounded-2xl border border-gray-200/20 dark:border-white/10 p-8 animate-fadeIn">
          {/* Question Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Question</span>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700/50">
              <p className="text-gray-900 dark:text-slate-200 leading-relaxed text-lg whitespace-pre-wrap">
                {data.question}
              </p>
            </div>
          </div>

          {/* Answer Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm bg-linkedin-lightgray dark:bg-cyan-500/20 text-linkedin-blue dark:text-cyan-400 px-3 py-1 rounded-full font-medium">
                Answer
              </span>
            </div>
            <div className="bg-white dark:bg-slate-800/30 rounded-xl p-6 border border-gray-200 dark:border-slate-700/30">
              <p className="text-gray-900 dark:text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
                {data.answer}
              </p>
            </div>
          </div>

          {/* Timestamp */}
          {data.created_at && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-500 pt-4 border-t border-gray-200 dark:border-slate-700/50">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(data.created_at).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}