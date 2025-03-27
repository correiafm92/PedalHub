
import React, { useState, useRef } from "react";
import { Image, X, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesChange }) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newPreviewUrls: string[] = [];
      
      newFiles.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && e.target.result) {
              newPreviewUrls.push(e.target.result.toString());
              
              // If all files have been processed
              if (newPreviewUrls.length === newFiles.length) {
                setPreviewImages(prev => [...prev, ...newPreviewUrls]);
                setFiles(prev => [...prev, ...newFiles]);
                onImagesChange([...files, ...newFiles]);
              }
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onImagesChange(newFiles);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {previewImages.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <img 
              src={url} 
              alt={`Preview ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <button 
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-1 shadow-sm transition-all duration-200"
            >
              <X size={14} className="text-gray-700" />
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={triggerFileInput}
          className="aspect-square rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center hover:border-gray-300 transition-all duration-200"
        >
          <Plus size={24} className="text-gray-400 mb-2" />
          <span className="text-xs text-gray-500">Adicionar foto</span>
        </button>
      </div>
      
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          onClick={triggerFileInput}
          className="text-sm flex items-center gap-2"
        >
          <Upload size={16} />
          Enviar fotos
        </Button>
        <span className="text-xs text-gray-500 ml-4">
          {files.length} {files.length === 1 ? 'imagem selecionada' : 'imagens selecionadas'}
        </span>
      </div>
      
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
