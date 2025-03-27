
import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { 
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { brazilianStates, mainCities, StateOption, CityOption } from "@/utils/data";

interface LocationSelectorProps {
  onLocationChange: (state: string, city: string) => void;
  defaultLocation?: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationChange, defaultLocation }) => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Parse default location if provided
  useEffect(() => {
    if (defaultLocation) {
      const parts = defaultLocation.split(', ');
      if (parts.length === 2) {
        const city = parts[0];
        const state = parts[1];
        
        // Try to find matching state and city
        const stateOption = brazilianStates.find(s => s.value === state || s.label === state);
        
        if (stateOption) {
          setSelectedState(stateOption.value);
          
          // Find city in this state
          const cityOption = stateOption.cities.find(c => c.value === city || c.label === city);
          if (cityOption) {
            setSelectedCity(cityOption.value);
          }
        }
      }
    }
  }, [defaultLocation]);

  useEffect(() => {
    if (selectedState && selectedCity) {
      const state = brazilianStates.find(s => s.value === selectedState);
      const city = state?.cities.find(c => c.value === selectedCity);
      
      if (state && city) {
        onLocationChange(state.value, city.value);
      }
    }
  }, [selectedState, selectedCity, onLocationChange]);

  const handleSelectState = (stateValue: string) => {
    setSelectedState(stateValue);
    setSelectedCity("");
  };

  const handleSelectCity = (cityValue: string) => {
    setSelectedCity(cityValue);
    setIsPopoverOpen(false);
  };

  const handleSelectMainCity = (cityValue: string) => {
    // Find the state that contains this city
    for (const state of brazilianStates) {
      const cityExists = state.cities.some(c => c.value === cityValue);
      if (cityExists) {
        setSelectedState(state.value);
        setSelectedCity(cityValue);
        setIsPopoverOpen(false);
        break;
      }
    }
  };

  const currentState = brazilianStates.find(s => s.value === selectedState);
  const currentCity = currentState?.cities.find(c => c.value === selectedCity);
  
  return (
    <div className="animate-slide-down">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="glass-morphism border border-gray-200 flex items-center gap-2 px-4 py-2 text-gray-700 bg-white shadow-sm hover:bg-gray-50 transition-all w-full justify-start"
          >
            <MapPin size={18} className="text-gray-500" />
            {selectedState && selectedCity ? (
              <span className="text-sm font-medium">
                {currentCity?.label}, {currentState?.label}
              </span>
            ) : (
              <span className="text-sm font-medium">Selecionar localização</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0 bg-white rounded-xl shadow-lg border border-gray-200" align="start">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-700">Localização</h3>
            <p className="text-xs text-gray-500 mt-1">Selecione o estado e a cidade</p>
          </div>
          
          <Command>
            <CommandInput 
              placeholder="Buscar estado ou cidade..." 
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="border-none focus:ring-0"
            />
            
            <CommandList className="max-h-[300px] overflow-auto">
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
              
              {!selectedState ? (
                <CommandGroup heading="Estados">
                  {brazilianStates
                    .filter(state => 
                      searchTerm === "" || 
                      state.label.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(state => (
                      <CommandItem 
                        key={state.value}
                        onSelect={() => handleSelectState(state.value)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        {state.label}
                      </CommandItem>
                    ))
                  }
                </CommandGroup>
              ) : (
                <CommandGroup heading={`Cidades em ${currentState?.label}`}>
                  <CommandItem
                    onSelect={() => setSelectedState("")}
                    className="text-blue-600 cursor-pointer"
                  >
                    ← Voltar para estados
                  </CommandItem>
                  
                  {currentState?.cities
                    .filter(city => 
                      searchTerm === "" || 
                      city.label.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(city => (
                      <CommandItem 
                        key={city.value}
                        onSelect={() => handleSelectCity(city.value)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        {city.label}
                      </CommandItem>
                    ))
                  }
                </CommandGroup>
              )}
              
              <CommandGroup heading="Cidades principais">
                <div className="grid grid-cols-2 gap-2 p-2">
                  {mainCities
                    .filter(city => 
                      searchTerm === "" || 
                      city.label.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(city => (
                      <Button
                        key={city.value}
                        variant="outline"
                        size="sm"
                        className={`h-auto py-1.5 px-3 text-xs justify-start ${
                          selectedCity === city.value ? 'bg-black text-white' : 'bg-white text-gray-700'
                        }`}
                        onClick={() => handleSelectMainCity(city.value)}
                      >
                        {city.label}
                      </Button>
                    ))
                  }
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
          
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
