
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bikeSizes } from "@/utils/data";

interface BikeFilterProps {
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const BikeFilter: React.FC<BikeFilterProps> = ({ 
  selectedSize, 
  onSizeChange 
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Filtrar por tamanho</h3>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className={`h-auto py-1.5 px-3 text-xs ${
            selectedSize === "" ? 'bg-black text-white' : 'bg-white text-gray-700'
          }`}
          onClick={() => onSizeChange("")}
        >
          Todos
          {selectedSize === "" && (
            <Check className="ml-1" size={14} />
          )}
        </Button>
        
        {bikeSizes.map((size) => (
          <Button
            key={size.value}
            variant="outline"
            size="sm"
            className={`h-auto py-1.5 px-3 text-xs ${
              selectedSize === size.value ? 'bg-black text-white' : 'bg-white text-gray-700'
            }`}
            onClick={() => onSizeChange(size.value)}
          >
            {size.label}
            {selectedSize === size.value && (
              <Check className="ml-1" size={14} />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BikeFilter;
