
export interface CityOption {
  value: string;
  label: string;
}

export interface StateOption {
  value: string;
  label: string;
  cities: CityOption[];
}

export const brazilianStates: StateOption[] = [
  {
    value: "AC",
    label: "Acre",
    cities: [{ value: "rio_branco", label: "Rio Branco" }]
  },
  {
    value: "AL",
    label: "Alagoas",
    cities: [{ value: "maceio", label: "Maceió" }]
  },
  {
    value: "AP",
    label: "Amapá",
    cities: [{ value: "macapa", label: "Macapá" }]
  },
  {
    value: "AM",
    label: "Amazonas",
    cities: [{ value: "manaus", label: "Manaus" }]
  },
  {
    value: "BA",
    label: "Bahia",
    cities: [
      { value: "salvador", label: "Salvador" },
      { value: "feira_de_santana", label: "Feira de Santana" }
    ]
  },
  {
    value: "CE",
    label: "Ceará",
    cities: [{ value: "fortaleza", label: "Fortaleza" }]
  },
  {
    value: "DF",
    label: "Distrito Federal",
    cities: [{ value: "brasilia", label: "Brasília" }]
  },
  {
    value: "ES",
    label: "Espírito Santo",
    cities: [{ value: "vitoria", label: "Vitória" }]
  },
  {
    value: "GO",
    label: "Goiás",
    cities: [{ value: "goiania", label: "Goiânia" }]
  },
  {
    value: "MA",
    label: "Maranhão",
    cities: [{ value: "sao_luis", label: "São Luís" }]
  },
  {
    value: "MT",
    label: "Mato Grosso",
    cities: [{ value: "cuiaba", label: "Cuiabá" }]
  },
  {
    value: "MS",
    label: "Mato Grosso do Sul",
    cities: [{ value: "campo_grande", label: "Campo Grande" }]
  },
  {
    value: "MG",
    label: "Minas Gerais",
    cities: [
      { value: "belo_horizonte", label: "Belo Horizonte" },
      { value: "uberlandia", label: "Uberlândia" }
    ]
  },
  {
    value: "PA",
    label: "Pará",
    cities: [{ value: "belem", label: "Belém" }]
  },
  {
    value: "PB",
    label: "Paraíba",
    cities: [{ value: "joao_pessoa", label: "João Pessoa" }]
  },
  {
    value: "PR",
    label: "Paraná",
    cities: [{ value: "curitiba", label: "Curitiba" }]
  },
  {
    value: "PE",
    label: "Pernambuco",
    cities: [{ value: "recife", label: "Recife" }]
  },
  {
    value: "PI",
    label: "Piauí",
    cities: [{ value: "teresina", label: "Teresina" }]
  },
  {
    value: "RJ",
    label: "Rio de Janeiro",
    cities: [
      { value: "rio_de_janeiro", label: "Rio de Janeiro" },
      { value: "niteroi", label: "Niterói" }
    ]
  },
  {
    value: "RN",
    label: "Rio Grande do Norte",
    cities: [{ value: "natal", label: "Natal" }]
  },
  {
    value: "RS",
    label: "Rio Grande do Sul",
    cities: [{ value: "porto_alegre", label: "Porto Alegre" }]
  },
  {
    value: "RO",
    label: "Rondônia",
    cities: [{ value: "porto_velho", label: "Porto Velho" }]
  },
  {
    value: "RR",
    label: "Roraima",
    cities: [{ value: "boa_vista", label: "Boa Vista" }]
  },
  {
    value: "SC",
    label: "Santa Catarina",
    cities: [{ value: "florianopolis", label: "Florianópolis" }]
  },
  {
    value: "SP",
    label: "São Paulo",
    cities: [
      { value: "sao_paulo", label: "São Paulo" },
      { value: "campinas", label: "Campinas" },
      { value: "santos", label: "Santos" }
    ]
  },
  {
    value: "SE",
    label: "Sergipe",
    cities: [{ value: "aracaju", label: "Aracaju" }]
  },
  {
    value: "TO",
    label: "Tocantins",
    cities: [{ value: "palmas", label: "Palmas" }]
  }
];

export const mainCities: CityOption[] = [
  { value: "sao_paulo", label: "São Paulo" },
  { value: "rio_de_janeiro", label: "Rio de Janeiro" },
  { value: "belo_horizonte", label: "Belo Horizonte" },
  { value: "porto_alegre", label: "Porto Alegre" },
  { value: "brasilia", label: "Brasília" }
];

export interface BikeSize {
  value: string;
  label: string;
}

export const bikeSizes: BikeSize[] = [
  { value: "12", label: "Aro 12" },
  { value: "14", label: "Aro 14" },
  { value: "16", label: "Aro 16" },
  { value: "20", label: "Aro 20" },
  { value: "21", label: "Aro 21" }
];

export interface BikeType {
  id: string;
  name: string;
  size: string;
  images: string[];
  description: string;
  seller: string;
  location: string;
  createdAt: Date;
}

// Sample data for bikes
export const sampleBikes: BikeType[] = [
  {
    id: "1",
    name: "Mountain Bike Pro X3",
    size: "21",
    images: ["/placeholder.svg"],
    description: "Bicicleta mountain bike em ótimo estado, com suspensão dianteira e freios a disco.",
    seller: "João Silva",
    location: "São Paulo, SP",
    createdAt: new Date("2023-06-15")
  },
  {
    id: "2",
    name: "Bike Urbana Comfort",
    size: "20",
    images: ["/placeholder.svg"],
    description: "Bicicleta urbana confortável para uso diário na cidade.",
    seller: "Maria Oliveira",
    location: "Rio de Janeiro, RJ",
    createdAt: new Date("2023-07-21")
  },
  {
    id: "3",
    name: "Infantil Kids First",
    size: "16",
    images: ["/placeholder.svg"],
    description: "Bicicleta infantil colorida e segura para crianças.",
    seller: "Carlos Santos",
    location: "Belo Horizonte, MG",
    createdAt: new Date("2023-08-03")
  }
];
