
import React, { useState, useEffect } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { brazilianStates, mainCities, StateOption, CityOption } from "@/utils/data";

interface LocationSelectorProps {
  onLocationChange: (state: string, city: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationChange }) => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [availableCities, setAvailableCities] = useState<CityOption[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (selectedState) {
      const state = brazilianStates.find(s => s.value === selectedState);
      if (state) {
        setAvailableCities(state.cities);
        setSelectedCity("");
      }
    } else {
      setAvailableCities([]);
      setSelectedCity("");
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedCity) {
      onLocationChange(selectedState, selectedCity);
    }
  }, [selectedState, selectedCity, onLocationChange]);

  return (
    <div className="animate-slide-down">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="glass-morphism border border-gray-100 flex items-center gap-2 px-4 py-2 text-gray-700 bg-white shadow-sm hover:bg-gray-50 transition-all"
          >
            <MapPin size={18} className="text-gray-500" />
            {selectedState && selectedCity ? (
              <span className="text-sm font-medium">
                {selectedCity && availableCities.find(c => c.value === selectedCity)?.label}{selectedState ? `, ${selectedState}` : ''}
              </span>
            ) : (
              <span className="text-sm font-medium">Selecionar localização</span>
            )}
            <ChevronDown size={16} className="ml-2 text-gray-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden" align="start">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-700">Localização</h3>
            <p className="text-xs text-gray-500 mt-1">Selecione o estado e a cidade</p>
          </div>
          
          <div className="p-4 space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Estado</label>
              <Select
                value={selectedState}
                onValueChange={(value) => setSelectedState(value)}
              >
                <SelectTrigger className="w-full border border-gray-200 rounded-lg">
                  <SelectValue placeholder="Selecione um estado" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-white border border-gray-100 shadow-lg rounded-lg max-h-[300px]">
                  {brazilianStates.map((state) => (
                    <SelectItem 
                      key={state.value} 
                      value={state.value}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Cidade</label>
              <Select
                value={selectedCity}
                onValueChange={(value) => setSelectedCity(value)}
                disabled={!selectedState}
              >
                <SelectTrigger className="w-full border border-gray-200 rounded-lg">
                  <SelectValue placeholder="Selecione uma cidade" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-white border border-gray-100 shadow-lg rounded-lg max-h-[200px]">
                  {availableCities.map((city) => (
                    <SelectItem 
                      key={city.value} 
                      value={city.value}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-2">
              <div className="text-xs font-medium text-gray-500 mb-2">Cidades principais</div>
              <div className="grid grid-cols-2 gap-2">
                {mainCities.map((city) => (
                  <Button
                    key={city.value}
                    variant="outline"
                    size="sm"
                    className={`h-auto py-1.5 px-3 text-xs justify-start ${
                      selectedCity === city.value ? 'bg-black text-white' : 'bg-white text-gray-700'
                    }`}
                    onClick={() => {
                      // Find the state that contains this city
                      for (const state of brazilianStates) {
                        const cityExists = state.cities.some(c => c.value === city.value);
                        if (cityExists) {
                          setSelectedState(state.value);
                          setSelectedCity(city.value);
                          break;
                        }
                      }
                      setIsPopoverOpen(false);
                    }}
                  >
                    {city.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-100 flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedState("");
                setSelectedCity("");
              }}
              className="text-sm"
            >
              Limpar
            </Button>
            <Button
              size="sm"
              onClick={() => setIsPopoverOpen(false)}
              disabled={!selectedState || !selectedCity}
              className="bg-black hover:bg-gray-800 text-white text-sm"
            >
              Aplicar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationSelector;
