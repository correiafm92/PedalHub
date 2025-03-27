
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import ImageUpload from "./ImageUpload";
import { bikeSizes, brazilianStates } from "@/utils/data";
import { toast } from "sonner";
import LocationSelector from "./LocationSelector";

interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bikeData: any) => void;
  editBike?: {
    id: string;
    name: string;
    size: string;
    description: string;
    seller: string;
    phone: string;
    location: string;
  };
}

const ListingModal: React.FC<ListingModalProps> = ({ isOpen, onClose, onSubmit, editBike }) => {
  const [bikeName, setBikeName] = useState("");
  const [bikeSize, setBikeSize] = useState("");
  const [description, setDescription] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Populate form fields if in edit mode
  useEffect(() => {
    if (editBike) {
      setBikeName(editBike.name);
      setBikeSize(editBike.size);
      setDescription(editBike.description);
      setSellerName(editBike.seller);
      setPhone(editBike.phone);
      setLocation(editBike.location);
    }
  }, [editBike]);

  const handleImagesChange = (newImages: File[]) => {
    setImages(newImages);
  };

  const handleLocationChange = (state: string, city: string) => {
    setSelectedState(state);
    setSelectedCity(city);
    
    // Find the state and city objects
    const stateObj = brazilianStates.find(s => s.value === state);
    const cityObj = stateObj?.cities.find(c => c.value === city);
    
    if (stateObj && cityObj) {
      setLocation(`${cityObj.label}, ${stateObj.label}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!bikeName.trim()) {
      toast.error("Por favor, insira o nome da bike");
      return;
    }
    
    if (!bikeSize) {
      toast.error("Por favor, selecione o aro da bike");
      return;
    }
    
    if (!description.trim()) {
      toast.error("Por favor, adicione uma descrição");
      return;
    }
    
    if (!sellerName.trim()) {
      toast.error("Por favor, insira seu nome");
      return;
    }
    
    if (!location.trim()) {
      toast.error("Por favor, informe a localização");
      return;
    }
    
    if (!phone.trim()) {
      toast.error("Por favor, informe um telefone para contato");
      return;
    }
    
    // Only require images for new listings, not for edits
    if (!editBike && images.length === 0) {
      toast.error("Por favor, adicione pelo menos uma foto");
      return;
    }
    
    setIsSubmitting(true);
    
    // Create an object with all the form data
    const bikeData = {
      name: bikeName,
      size: bikeSize,
      description,
      seller: sellerName,
      location,
      phone,
      images,
      createdAt: new Date()
    };
    
    // Submit the data to parent component
    onSubmit(bikeData);
    
    // Reset form if not editing
    if (!editBike) {
      setBikeName("");
      setBikeSize("");
      setDescription("");
      setSellerName("");
      setLocation("");
      setPhone("");
      setImages([]);
    }
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-white rounded-2xl">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {editBike ? 'Editar Anúncio' : 'Anunciar Bicicleta'}
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8 rounded-full"
            >
              <X size={18} />
              <span className="sr-only">Fechar</span>
            </Button>
          </div>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            Preencha os dados da sua bicicleta para anunciar
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-2 max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <Label htmlFor="bikeName" className="text-sm font-medium">
                Nome da Bike
              </Label>
              <Input
                id="bikeName"
                value={bikeName}
                onChange={(e) => setBikeName(e.target.value)}
                placeholder="Ex: Mountain Bike Pro X3"
                className="mt-1 input-field"
              />
            </div>
            
            <div>
              <Label htmlFor="bikeSize" className="text-sm font-medium">
                Tamanho do Aro
              </Label>
              <Select value={bikeSize} onValueChange={setBikeSize}>
                <SelectTrigger id="bikeSize" className="mt-1 input-field">
                  <SelectValue placeholder="Selecione o tamanho do aro" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {bikeSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="location" className="text-sm font-medium">
                Localização
              </Label>
              <div className="mt-1">
                <LocationSelector 
                  onLocationChange={handleLocationChange} 
                  defaultLocation={location}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                Telefone para Contato
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: (11) 98765-4321"
                className="mt-1 input-field"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium">
                Fotos
              </Label>
              <div className="mt-1">
                <ImageUpload onImagesChange={handleImagesChange} />
              </div>
              {editBike && (
                <p className="text-xs text-gray-500 mt-1">
                  Adicionar novas fotos. As fotos existentes serão mantidas.
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Descrição
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva as características, estado de conservação, etc."
                className="mt-1 input-field min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="sellerName" className="text-sm font-medium">
                Seu Nome
              </Label>
              <Input
                id="sellerName"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                placeholder="Seu nome completo"
                className="mt-1 input-field"
              />
            </div>
          </div>
          
          <DialogFooter className="pb-6 px-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mr-2"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="bg-black hover:bg-gray-800 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publicando...' : editBike ? 'Salvar Alterações' : 'Publicar Anúncio'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ListingModal;
