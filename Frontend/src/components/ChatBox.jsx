
import { MessageCircle, Bot } from 'lucide-react';

export default function ChatBox({ chat }) {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
      {chat.length === 0 ? (
        <div className="h-96 flex-center flex-col">
          <div className="flex-center h-20 w-20 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 mb-4 mx-auto">
            <Bot className="w-8 h-8 text-gray-600 dark:text-slate-300" />
          </div>
          <div className="text-center px-4">
            <p className="text-gray-600 dark:text-slate-400 text-lg font-medium mb-2">Start a conversation about Electric Vehicles!</p>
            <p className="text-sm text-gray-500 dark:text-slate-500">Ask anything and get smart answers from the EV assistant.</p>
          </div>
        </div>
      ) : (
        chat.map((c, i) => (
          <div key={i} className="space-y-3 animate-fadeIn">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-[28px] bg-slate-100 text-gray-900 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-gray-200 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600">
                <div className="flex items-center gap-3 mb-3 justify-end">
                  <span className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-slate-400">You</span>
                  <MessageCircle className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{c.q}</p>
              </div>
            </div>

            {/* Bot Message */}
            <div className="flex justify-start">
              <div className="max-w-[88%] rounded-[28px] bg-slate-100 text-gray-900 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-gray-200 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-center h-9 w-9 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-slate-400">EV Bot</span>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{c.a}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}