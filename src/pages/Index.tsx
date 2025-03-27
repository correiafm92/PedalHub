import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocationSelector from "@/components/LocationSelector";
import BikeCard from "@/components/BikeCard";
import BikeFilter from "@/components/BikeFilter";
import ListingModal from "@/components/ListingModal";
import { BikeType } from "@/utils/data";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bikes, setBikes] = useState<BikeType[]>([]);
  const [filteredBikes, setFilteredBikes] = useState<BikeType[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      setIsLoading(true);
      try {
        const { data: bikesData, error: bikesError } = await supabase
          .from('bikes')
          .select('*')
          .order('created_at', { ascending: false });

        if (bikesError) throw bikesError;

        const formattedBikes: BikeType[] = [];

        for (const bike of bikesData || []) {
          const { data: imagesData, error: imagesError } = await supabase
            .from('bike_images')
            .select('url')
            .eq('bike_id', bike.id);

          if (imagesError) throw imagesError;

          formattedBikes.push({
            id: bike.id,
            name: bike.name,
            size: bike.size,
            description: bike.description,
            seller: bike.seller,
            location: bike.location,
            createdAt: new Date(bike.created_at),
            images: imagesData?.map(img => img.url) || ["/placeholder.svg"]
          });
        }

        setBikes(formattedBikes);
        setFilteredBikes(formattedBikes);
      } catch (error) {
        console.error('Error fetching bikes:', error);
        toast.error('Erro ao carregar anúncios');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const handleLocationChange = (state: string, city: string) => {
    setSelectedState(state);
    setSelectedCity(city);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddBike = async (bikeData: any) => {
    try {
      const { data: newBike, error: bikeError } = await supabase
        .from('bikes')
        .insert({
          name: bikeData.name,
          size: bikeData.size,
          description: bikeData.description,
          seller: bikeData.seller,
          phone: bikeData.phone,
          location: bikeData.location || (selectedState && selectedCity 
            ? `${selectedCity}, ${selectedState}` 
            : "Localização não especificada")
        })
        .select()
        .single();

      if (bikeError) throw bikeError;

      if (bikeData.images && bikeData.images.length > 0) {
        const file = bikeData.images[0];
        const fileName = `${newBike.id}/${Date.now()}-${file.name}`;
        
        const imageUrl = URL.createObjectURL(file);
        
        const { error: imageError } = await supabase
          .from('bike_images')
          .insert({
            bike_id: newBike.id,
            url: imageUrl
          });

        if (imageError) throw imageError;
      }

      const addedBike: BikeType = {
        id: newBike.id,
        name: newBike.name,
        size: newBike.size,
        images: bikeData.images.length > 0 
          ? [URL.createObjectURL(bikeData.images[0])]
          : ["/placeholder.svg"],
        description: newBike.description,
        seller: newBike.seller,
        phone: newBike.phone,
        location: newBike.location,
        createdAt: new Date(newBike.created_at)
      };

      setBikes(prevBikes => [addedBike, ...prevBikes]);
      toast.success('Anúncio publicado com sucesso!');
    } catch (error) {
      console.error('Error adding bike:', error);
      toast.error('Erro ao publicar anúncio');
    }
  };

  useEffect(() => {
    let filtered = bikes;

    if (selectedState && selectedCity) {
      filtered = filtered.filter(bike => 
        bike.location.includes(selectedState) ||
        bike.location.includes(selectedCity)
      );
    }

    if (selectedSize) {
      filtered = filtered.filter(bike => bike.size === selectedSize);
    }

    setFilteredBikes(filtered);
  }, [selectedState, selectedCity, selectedSize, bikes]);

  return (
    <div className="min-h-screen bg-white">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1">
            <LocationSelector onLocationChange={handleLocationChange} />
          </div>
          
          <div className="md:col-span-2">
            <BikeFilter 
              selectedSize={selectedSize} 
              onSizeChange={handleSizeChange} 
            />
          </div>
          
          <div className="md:col-span-1 flex items-end justify-end">
            <div className="text-sm text-gray-500">
              {filteredBikes.length} {filteredBikes.length === 1 ? 'anúncio' : 'anúncios'} encontrados
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 aspect-[4/3] rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : filteredBikes.length > 0 ? (
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
              <p className="text-gray-500 mb-6">Não encontramos anúncios com os filtros selecionados</p>
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
      
      <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2023 BikeHaven. Todos os direitos reservados.</p>
            <p className="mt-2">Um marketplace para compra e venda de bicicletas.</p>
          </div>
        </div>
      </footer>
      
      <ListingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBike}
      />
    </div>
  );
};

export default Index;
