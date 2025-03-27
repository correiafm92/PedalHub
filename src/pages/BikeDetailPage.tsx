
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Phone, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { BikeType } from "@/utils/data";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

const BikeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bike, setBike] = useState<BikeType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchBikeDetails = async () => {
      setIsLoading(true);
      try {
        // Fetch bike data
        const { data: bikeData, error: bikeError } = await supabase
          .from('bikes')
          .select('*')
          .eq('id', id)
          .single();

        if (bikeError) throw bikeError;

        // Fetch bike images
        const { data: imagesData, error: imagesError } = await supabase
          .from('bike_images')
          .select('url')
          .eq('bike_id', id);

        if (imagesError) throw imagesError;

        setBike({
          id: bikeData.id,
          name: bikeData.name,
          size: bikeData.size,
          description: bikeData.description,
          seller: bikeData.seller,
          location: bikeData.location,
          phone: bikeData.phone || "Não informado",
          createdAt: new Date(bikeData.created_at),
          images: imagesData?.map(img => img.url) || ["/placeholder.svg"]
        });
      } catch (error) {
        console.error('Error fetching bike details:', error);
        toast.error('Erro ao carregar detalhes da bicicleta');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBikeDetails();
    }
  }, [id, navigate]);

  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ptBR
    });
  };

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const handlePhoneClick = () => {
    if (bike?.phone) {
      window.location.href = `tel:${bike.phone}`;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-gray-200 aspect-[4/3] rounded-xl mb-8"></div>
            <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded my-6"></div>
            <div className="h-10 bg-gray-200 rounded w-full mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Bicicleta não encontrada</h2>
          <p className="mb-6">O anúncio que você está procurando não existe ou foi removido.</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-black hover:bg-gray-800 text-white"
          >
            Voltar para a página principal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-white/90 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="mr-2"
            >
              <ChevronLeft size={20} />
              <span className="sr-only">Voltar</span>
            </Button>
            <h1 className="text-xl font-bold">
              Bike<span className="text-gray-500">Haven</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Bike Images Gallery */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                {bike.images && bike.images.length > 0 ? (
                  <img 
                    src={bike.images[activeImageIndex]} 
                    alt={bike.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    Sem imagem
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="grid grid-cols-2 gap-2 h-full">
                {bike.images && bike.images.slice(0, 4).map((image, index) => (
                  <div 
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer ${
                      index === activeImageIndex ? 'ring-2 ring-black' : ''
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${bike.name} - imagem ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bike Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{bike.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-6">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{bike.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <time dateTime={bike.createdAt.toISOString()}>{formatDate(bike.createdAt)}</time>
              </div>
              <div className="rounded-full px-2 py-1 bg-gray-100 text-gray-600 text-sm">
                Aro {bike.size}
              </div>
            </div>
            
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Descrição</h2>
                <p className="text-gray-700 whitespace-pre-line">{bike.description}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Informações do vendedor</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <User size={20} className="mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Vendedor</p>
                      <p className="font-medium">{bike.seller}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin size={20} className="mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Localização</p>
                      <p className="font-medium">{bike.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone size={20} className="mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Telefone</p>
                      <p className="font-medium">{bike.phone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 md:relative md:bg-transparent md:border-0 md:p-0 md:mt-8">
            <Button
              className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg"
              onClick={handlePhoneClick}
            >
              <Phone size={20} className="mr-2" />
              Ligar para o vendedor
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BikeDetailPage;
