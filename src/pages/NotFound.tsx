
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
            <span className="text-4xl font-light">404</span>
          </div>
          <h1 className="text-3xl font-semibold mb-2">Página não encontrada</h1>
          <p className="text-gray-500 mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <Button
          onClick={() => navigate("/")}
          className="inline-flex items-center bg-black hover:bg-gray-800 text-white transition-all duration-300"
        >
          <ArrowLeft size={16} className="mr-2" />
          Voltar para a página inicial
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
