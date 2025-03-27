
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Phone, Calendar, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ListingModal from "@/components/ListingModal";

interface BikeDetails {
  id: string;
  name: string;
  size: string;
  description: string;
  seller: string;
  phone: string;
  location: string;
  created_at: string;
  images: string[];
}

const BikeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState<BikeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchBikeDetails = async () => {
      try {
        const { data: bikeData, error: bikeError } = await supabase
          .from('bikes')
          .select('*')
          .eq('id', id)
          .single();

        if (bikeError) throw bikeError;
        
        const { data: imagesData, error: imagesError } = await supabase
          .from('bike_images')
          .select('url')
          .eq('bike_id', id);

        if (imagesError) throw imagesError;

        setBike({
          ...bikeData,
          images: imagesData?.map(img => img.url) || ["/placeholder.svg"]
        });
      } catch (error) {
        console.error('Error fetching bike details:', error);
        toast.error('Erro ao carregar os detalhes da bike');
      } finally {
        setLoading(false);
      }
    };

    fetchBikeDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleEditSubmit = async (bikeData: any) => {
    try {
      // Update bike details
      const { error: updateError } = await supabase
        .from('bikes')
        .update({
          name: bikeData.name,
          size: bikeData.size,
          description: bikeData.description,
          seller: bikeData.seller,
          phone: bikeData.phone,
          location: bikeData.location
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // If there are new images, add them
      if (bikeData.images && bikeData.images.length > 0) {
        const file = bikeData.images[0];
        const imageUrl = URL.createObjectURL(file);
        
        const { error: imageError } = await supabase
          .from('bike_images')
          .insert({
            bike_id: id,
            url: imageUrl
          });

        if (imageError) throw imageError;
      }

      // Reload bike details
      const { data: updatedBike, error: fetchError } = await supabase
        .from('bikes')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const { data: updatedImages, error: imagesError } = await supabase
        .from('bike_images')
        .select('url')
        .eq('bike_id', id);

      if (imagesError) throw imagesError;

      setBike({
        ...updatedBike,
        images: updatedImages?.map(img => img.url) || ["/placeholder.svg"]
      });

      toast.success('Anúncio atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating bike:', error);
      toast.error('Erro ao atualizar anúncio');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Anúncio não encontrado</h1>
          <p className="text-gray-600 mb-8">O anúncio que você está procurando não existe ou foi removido.</p>
          <Button onClick={handleBack} className="bg-black hover:bg-gray-800 text-white">
            Voltar para a página inicial
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-white/90 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft size={18} />
            Voltar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Edit size={16} />
            Editar anúncio
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                {bike.images.length > 0 ? (
                  <img 
                    src={bike.images[currentImageIndex]} 
                    alt={bike.name} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    Sem imagem
                  </div>
                )}
              </div>

              {bike.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {bike.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`aspect-square rounded overflow-hidden cursor-pointer ${
                        index === currentImageIndex ? 'ring-2 ring-black' : 'opacity-70'
                      }`}
                      onClick={() => handleImageChange(index)}
                    >
                      <img 
                        src={image} 
                        alt={`Imagem ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{bike.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-full px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium inline-flex items-center">
                  Aro {bike.size}
                </div>
                
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={16} className="mr-1" />
                  <time dateTime={bike.created_at}>
                    {formatDistanceToNow(new Date(bike.created_at), {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </time>
                </div>
              </div>
              
              <div className="border-t border-b border-gray-100 py-4 mb-4">
                <h2 className="text-lg font-medium mb-2">Descrição</h2>
                <p className="text-gray-700 whitespace-pre-line">{bike.description}</p>
              </div>
              
              <div className="border-b border-gray-100 py-4 mb-4">
                <h2 className="text-lg font-medium mb-3">Informações de contato</h2>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <span className="font-medium text-lg">{bike.seller.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{bike.seller}</p>
                      <p className="text-sm text-gray-500">Vendedor</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={18} className="text-gray-500" />
                    <span>{bike.phone || "Telefone não informado"}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={18} className="text-gray-500" />
                    <span>{bike.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="py-4">
                <Button 
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  onClick={() => {
                    if (bike.phone) {
                      window.location.href = `tel:${bike.phone}`;
                    } else {
                      toast.error("Telefone não informado");
                    }
                  }}
                >
                  <Phone size={18} className="mr-2" />
                  Ligar para o vendedor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {isEditModalOpen && bike && (
        <ListingModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditSubmit}
          editBike={{
            id: bike.id,
            name: bike.name,
            size: bike.size,
            description: bike.description,
            seller: bike.seller,
            phone: bike.phone || "",
            location: bike.location
          }}
        />
      )}
    </div>
  );
};

export default BikeDetailPage;
