
import { Zap } from 'lucide-react';

export default function Loader() {
  return (
    <div className="flex-center gap-3">
      <div className="animate-pulse-glow">
        <Zap className="w-5 h-5 animate-bounce" />
      </div>
      <p className="text-gray-700 dark:text-slate-300 animate-pulse">Loading...</p>
    </div>
  );
}