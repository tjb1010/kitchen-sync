import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface UndoToastProps {
  message: string;
  onUndo: () => void;
  onClose: () => void;
  duration?: number;
}

export function UndoToast({ message, onUndo, onClose, duration = 5000 }: UndoToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-spotify-base text-spotify-lightest rounded-lg shadow-lg p-4 flex items-center space-x-4 animate-slide-up z-50">
      <p>{message}</p>
      <button
        onClick={onUndo}
        className="text-spotify-green hover:text-opacity-80 font-medium"
      >
        Undo
      </button>
      <button
        onClick={onClose}
        className="text-spotify-light hover:text-spotify-lightest"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}