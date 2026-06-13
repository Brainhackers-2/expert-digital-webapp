import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export const ImageUploader = ({ value, onChange, label, helpText }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide.');
      return;
    }

    // Check size (e.g. max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("L'image est trop volumineuse (max 2MB).");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // The result is a base64 encoded string
      onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-gray-700 uppercase">{label}</label>}
      {helpText && <p className="text-[10px] text-gray-400 -mt-1">{helpText}</p>}
      
      <div 
        className={`relative border-2 border-dashed rounded-xl overflow-hidden transition-all ${
          dragActive ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
        }`}
        onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
        onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
        onDrop={handleDrop}
      >
        {value ? (
          <div className="relative group p-2">
            <div className="flex justify-center bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <img src={value} alt="Preview" className="max-h-32 object-contain" />
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-4 right-4 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
              title="Supprimer l'image"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center py-8 cursor-pointer">
            <div className="bg-white p-3 rounded-full shadow-sm mb-3 text-primary">
              <Upload size={20} />
            </div>
            <span className="text-sm font-semibold text-gray-700">Cliquez ou glissez une image</span>
            <span className="text-xs text-gray-400 mt-1">PNG, JPG, SVG (max 2MB)</span>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
        )}
      </div>
    </div>
  );
};