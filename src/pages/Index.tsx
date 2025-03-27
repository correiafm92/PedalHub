
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocationSelector from "@/components/LocationSelector";
import BikeCard from "@/components/BikeCard";
import ListingModal from "@/components/ListingModal";
import { BikeType, sampleBikes } from "@/utils/data";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bikes, setBikes] = useState<BikeType[]>(sampleBikes);
  const [filteredBikes, setFilteredBikes] = useState<BikeType[]>(sampleBikes);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleLocationChange = (state: string, city: string) => {
    setSelectedState(state);
    setSelectedCity(city);
  };

  const handleAddBike = (bikeData: any) => {
    // In a real app, this would send data to an API
    // For now, we'll just add it to our local state
    
    // Create URLs for the images (in a real app, these would be uploaded)
    const imageUrls = bikeData.images.length > 0 
      ? [URL.createObjectURL(bikeData.images[0])]
      : ["/placeholder.svg"];

    const newBike: BikeType = {
      id: (bikes.length + 1).toString(),
      name: bikeData.name,
      size: bikeData.size,
      images: imageUrls,
      description: bikeData.description,
      seller: bikeData.seller,
      location: selectedState && selectedCity 
        ? `${selectedCity}, ${selectedState}` 
        : "Localização não especificada",
      createdAt: new Date()
    };

    setBikes([newBike, ...bikes]);
  };

  // Filter bikes based on selected location
  useEffect(() => {
    if (selectedState && selectedCity) {
      // In a real app, this would be a server-side filter
      // Here we're just simulating it client-side
      const locationString = `${selectedCity}, ${selectedState}`;
      const filtered = bikes.filter(bike => 
        bike.location.includes(selectedState) ||
        bike.location.includes(selectedCity)
      );
      setFilteredBikes(filtered);
    } else {
      setFilteredBikes(bikes);
    }
  }, [selectedState, selectedCity, bikes]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-white/90 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">
              Bike<span className="text-gray-500">Haven</span>
            </h1>
          </div>
          
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-black hover:bg-gray-800 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-2 transition-all duration-300"
          >
            <Plus size={16} />
            Anunciar
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Location Selector and Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-xs">
            <LocationSelector onLocationChange={handleLocationChange} />
          </div>
          
          <div className="text-sm text-gray-500">
            {filteredBikes.length} {filteredBikes.length === 1 ? 'anúncio' : 'anúncios'} encontrados
          </div>
        </div>
        
        {/* Bike Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBikes.length > 0 ? (
            filteredBikes.map((bike) => (
              <div key={bike.id} className="animate-fade-in">
                <BikeCard bike={bike} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhuma bike encontrada</h3>
              <p className="text-gray-500 mb-6">Não encontramos anúncios nesta localização</p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-black hover:bg-gray-800 text-white"
              >
                Anunciar uma bike
              </Button>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2023 BikeHaven. Todos os direitos reservados.</p>
            <p className="mt-2">Um marketplace para compra e venda de bicicletas.</p>
          </div>
        </div>
      </footer>
      
      {/* Listing Modal */}
      <ListingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBike}
      />
    </div>
  );
};

export default Index;
