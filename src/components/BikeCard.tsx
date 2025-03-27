
import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { BikeType } from "@/utils/data";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface BikeCardProps {
  bike: BikeType;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike }) => {
  const navigate = useNavigate();
  
  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ptBR
    });
  };

  const handleClick = () => {
    navigate(`/bike/${bike.id}`);
  };

  return (
    <div 
      className="hover-scale rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {bike.images && bike.images.length > 0 ? (
          <img 
            src={bike.images[0]} 
            alt={bike.name} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            Sem imagem
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-lg truncate">{bike.name}</h3>
          <div className="rounded-full px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium">
            Aro {bike.size}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{bike.description}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-500 text-xs">
            <MapPin size={14} className="mr-1" />
            <span>{bike.location}</span>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-600 text-sm font-medium">{bike.seller}</span>
            <div className="flex items-center text-gray-500 text-xs">
              <Calendar size={14} className="mr-1" />
              <time dateTime={bike.createdAt.toISOString()}>{formatDate(bike.createdAt)}</time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
