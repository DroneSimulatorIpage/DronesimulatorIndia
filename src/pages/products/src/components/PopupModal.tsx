import React from 'react';
import { X } from 'lucide-react';

interface PopupModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" onClick={onClose}>
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-2 text-orange-500">{title}</h2>
        <p className="text-gray-700">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
