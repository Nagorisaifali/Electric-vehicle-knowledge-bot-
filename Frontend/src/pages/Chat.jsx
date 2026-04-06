import { useState, useRef, useEffect } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import ChatBox from '../components/ChatBox';
import Loader from '../components/Loader';
import { Send, Trash2, Download, AlertCircle } from 'lucide-react';

export default function Chat() {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const send = async () => {
    if (!msg.trim()) return;

    setLoading(true);
    setError('');
    const userMessage = msg;
    setMsg('');

    try {
      const res = await API.post('/chat/', { message: userMessage });
      setChat([...chat, { q: userMessage, a: res.data.reply }]);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
      setChat([...chat, { q: userMessage, a: '❌ Error: ' + (err.response?.data?.error || 'Connection failed') }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      e.preventDefault();
      send();
    }
  };

  const clear = () => {
    if (window.confirm('Clear all chat messages?')) {
      setChat([]);
      setError('');
    }
  };

  const download = () => {
    if (chat.length === 0) return;
    const text = chat.map(c => `Q: ${c.q}\n\nA: ${c.a}`).join('\n\n' + '='.repeat(50) + '\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EV-Chat-${new Date().toISOString().slice(0, 10)}.txt`;
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
            EV Knowledge Bot
          </h1>
          <p className="text-gray-600 text-lg dark:text-slate-400">
            Ask anything about Electric Vehicles, Batteries, Charging, & More!
          </p>
        </div>

        {/* Chat Container */}
        <div className="glass rounded-[32px] border border-gray-200/60 dark:border-slate-700/60 overflow-hidden shadow-2xl">
          <div className="h-96 md:h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-slate-800">
            <ChatBox chat={chat} />
            <div ref={chatEndRef} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-6 py-3 bg-red-500/10 border-t border-red-500/30 flex items-center gap-2 text-red-400 animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200/50 p-4 md:p-6 bg-white dark:bg-slate-900 dark:border-slate-700/60">
            <div className="flex flex-col gap-3">
              {/* Message Input */}
              <div className="flex gap-2 md:gap-3">
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about EVs, batteries, charging infrastructure..."
                  disabled={loading}
                  className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-linkedin-blue focus:bg-gray-50 dark:bg-white/10 dark:border-white/20 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-sky-400 dark:focus:bg-white/20 transition-smooth resize-none disabled:opacity-50"
                  rows="2"
                />
                <button
                  onClick={send}
                  disabled={loading || !msg.trim()}
                  className="bg-linkedin-blue hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 md:px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-smooth hover:shadow-glow disabled:cursor-not-allowed dark:bg-gradient-to-r dark:from-sky-500 dark:to-cyan-500 dark:hover:from-sky-600 dark:hover:to-cyan-600 dark:disabled:from-slate-500 dark:disabled:to-slate-600"
                >
                  {loading ? <Loader /> : <><Send className="w-5 h-5" /> Send</>}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 md:gap-3 flex-wrap">
                <button
                  onClick={clear}
                  disabled={chat.length === 0 || loading}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
                <button
                  onClick={download}
                  disabled={chat.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="glass p-4 rounded-lg text-center">
            <p className="text-linkedin-blue font-semibold text-2xl dark:text-sky-400">{chat.length}</p>
            <p className="text-gray-600 text-sm dark:text-slate-400">Messages</p>
          </div>
          <div className="glass p-4 rounded-lg text-center">
            <p className="text-linkedin-blue font-semibold text-2xl dark:text-cyan-400">∞</p>
            <p className="text-gray-600 text-sm dark:text-slate-400">Knowledge Base</p>
          </div>
          <div className="glass p-4 rounded-lg text-center">
            <p className="text-linkedin-blue font-semibold text-2xl dark:text-pink-400">24/7</p>
            <p className="text-gray-600 text-sm dark:text-slate-400">Available</p>
          </div>
        </div>
      </div>
    </div>
  );
}