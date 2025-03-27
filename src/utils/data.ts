
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
    cities: [
      { value: "rio_branco", label: "Rio Branco" },
      { value: "cruzeiro_do_sul", label: "Cruzeiro do Sul" },
      { value: "sena_madureira", label: "Sena Madureira" },
      { value: "tarauaca", label: "Tarauacá" },
      { value: "feijo", label: "Feijó" }
    ]
  },
  {
    value: "AL",
    label: "Alagoas",
    cities: [
      { value: "maceio", label: "Maceió" },
      { value: "arapiraca", label: "Arapiraca" },
      { value: "palmeira_dos_indios", label: "Palmeira dos Índios" },
      { value: "rio_largo", label: "Rio Largo" },
      { value: "penedo", label: "Penedo" }
    ]
  },
  {
    value: "AP",
    label: "Amapá",
    cities: [
      { value: "macapa", label: "Macapá" },
      { value: "santana", label: "Santana" },
      { value: "laranjal_do_jari", label: "Laranjal do Jari" },
      { value: "oiapoque", label: "Oiapoque" },
      { value: "porto_grande", label: "Porto Grande" }
    ]
  },
  {
    value: "AM",
    label: "Amazonas",
    cities: [
      { value: "manaus", label: "Manaus" },
      { value: "parintins", label: "Parintins" },
      { value: "itacoatiara", label: "Itacoatiara" },
      { value: "manacapuru", label: "Manacapuru" },
      { value: "tefe", label: "Tefé" }
    ]
  },
  {
    value: "BA",
    label: "Bahia",
    cities: [
      { value: "salvador", label: "Salvador" },
      { value: "feira_de_santana", label: "Feira de Santana" },
      { value: "vitoria_da_conquista", label: "Vitória da Conquista" },
      { value: "camaçari", label: "Camaçari" },
      { value: "juazeiro", label: "Juazeiro" }
    ]
  },
  {
    value: "CE",
    label: "Ceará",
    cities: [
      { value: "fortaleza", label: "Fortaleza" },
      { value: "caucaia", label: "Caucaia" },
      { value: "juazeiro_do_norte", label: "Juazeiro do Norte" },
      { value: "maracanau", label: "Maracanaú" },
      { value: "sobral", label: "Sobral" }
    ]
  },
  {
    value: "DF",
    label: "Distrito Federal",
    cities: [
      { value: "brasilia", label: "Brasília" },
      { value: "ceilandia", label: "Ceilândia" },
      { value: "taguatinga", label: "Taguatinga" },
      { value: "planaltina", label: "Planaltina" },
      { value: "gama", label: "Gama" }
    ]
  },
  {
    value: "ES",
    label: "Espírito Santo",
    cities: [
      { value: "vitoria", label: "Vitória" },
      { value: "vila_velha", label: "Vila Velha" },
      { value: "serra", label: "Serra" },
      { value: "cariacica", label: "Cariacica" },
      { value: "linhares", label: "Linhares" }
    ]
  },
  {
    value: "GO",
    label: "Goiás",
    cities: [
      { value: "goiania", label: "Goiânia" },
      { value: "aparecida_de_goiania", label: "Aparecida de Goiânia" },
      { value: "anapolis", label: "Anápolis" },
      { value: "rio_verde", label: "Rio Verde" },
      { value: "luziania", label: "Luziânia" }
    ]
  },
  {
    value: "MA",
    label: "Maranhão",
    cities: [
      { value: "sao_luis", label: "São Luís" },
      { value: "imperatriz", label: "Imperatriz" },
      { value: "timon", label: "Timon" },
      { value: "caxias", label: "Caxias" },
      { value: "codó", label: "Codó" }
    ]
  },
  {
    value: "MT",
    label: "Mato Grosso",
    cities: [
      { value: "cuiaba", label: "Cuiabá" },
      { value: "varzea_grande", label: "Várzea Grande" },
      { value: "rondonopolis", label: "Rondonópolis" },
      { value: "sinop", label: "Sinop" },
      { value: "tangara_da_serra", label: "Tangará da Serra" }
    ]
  },
  {
    value: "MS",
    label: "Mato Grosso do Sul",
    cities: [
      { value: "campo_grande", label: "Campo Grande" },
      { value: "dourados", label: "Dourados" },
      { value: "tres_lagoas", label: "Três Lagoas" },
      { value: "corumba", label: "Corumbá" },
      { value: "ponta_pora", label: "Ponta Porã" }
    ]
  },
  {
    value: "MG",
    label: "Minas Gerais",
    cities: [
      { value: "belo_horizonte", label: "Belo Horizonte" },
      { value: "uberlandia", label: "Uberlândia" },
      { value: "contagem", label: "Contagem" },
      { value: "juiz_de_fora", label: "Juiz de Fora" },
      { value: "betim", label: "Betim" }
    ]
  },
  {
    value: "PA",
    label: "Pará",
    cities: [
      { value: "belem", label: "Belém" },
      { value: "ananindeua", label: "Ananindeua" },
      { value: "santarem", label: "Santarém" },
      { value: "maraba", label: "Marabá" },
      { value: "castanhal", label: "Castanhal" }
    ]
  },
  {
    value: "PB",
    label: "Paraíba",
    cities: [
      { value: "joao_pessoa", label: "João Pessoa" },
      { value: "campina_grande", label: "Campina Grande" },
      { value: "santa_rita", label: "Santa Rita" },
      { value: "patos", label: "Patos" },
      { value: "bayeux", label: "Bayeux" }
    ]
  },
  {
    value: "PR",
    label: "Paraná",
    cities: [
      { value: "curitiba", label: "Curitiba" },
      { value: "londrina", label: "Londrina" },
      { value: "maringa", label: "Maringá" },
      { value: "ponta_grossa", label: "Ponta Grossa" },
      { value: "cascavel", label: "Cascavel" }
    ]
  },
  {
    value: "PE",
    label: "Pernambuco",
    cities: [
      { value: "recife", label: "Recife" },
      { value: "jaboatao", label: "Jaboatão dos Guararapes" },
      { value: "olinda", label: "Olinda" },
      { value: "caruaru", label: "Caruaru" },
      { value: "petrolina", label: "Petrolina" }
    ]
  },
  {
    value: "PI",
    label: "Piauí",
    cities: [
      { value: "teresina", label: "Teresina" },
      { value: "parnaiba", label: "Parnaíba" },
      { value: "picos", label: "Picos" },
      { value: "piripiri", label: "Piripiri" },
      { value: "floriano", label: "Floriano" }
    ]
  },
  {
    value: "RJ",
    label: "Rio de Janeiro",
    cities: [
      { value: "rio_de_janeiro", label: "Rio de Janeiro" },
      { value: "sao_goncalo", label: "São Gonçalo" },
      { value: "duque_de_caxias", label: "Duque de Caxias" },
      { value: "nova_iguacu", label: "Nova Iguaçu" },
      { value: "niteroi", label: "Niterói" }
    ]
  },
  {
    value: "RN",
    label: "Rio Grande do Norte",
    cities: [
      { value: "natal", label: "Natal" },
      { value: "mossoro", label: "Mossoró" },
      { value: "parnamirim", label: "Parnamirim" },
      { value: "sao_goncalo_do_amarante", label: "São Gonçalo do Amarante" },
      { value: "ceara_mirim", label: "Ceará-Mirim" }
    ]
  },
  {
    value: "RS",
    label: "Rio Grande do Sul",
    cities: [
      { value: "porto_alegre", label: "Porto Alegre" },
      { value: "caxias_do_sul", label: "Caxias do Sul" },
      { value: "pelotas", label: "Pelotas" },
      { value: "canoas", label: "Canoas" },
      { value: "santa_maria", label: "Santa Maria" }
    ]
  },
  {
    value: "RO",
    label: "Rondônia",
    cities: [
      { value: "porto_velho", label: "Porto Velho" },
      { value: "ji_parana", label: "Ji-Paraná" },
      { value: "ariquemes", label: "Ariquemes" },
      { value: "vilhena", label: "Vilhena" },
      { value: "cacoal", label: "Cacoal" }
    ]
  },
  {
    value: "RR",
    label: "Roraima",
    cities: [
      { value: "boa_vista", label: "Boa Vista" },
      { value: "caracarai", label: "Caracaraí" },
      { value: "rorainopolis", label: "Rorainópolis" },
      { value: "alto_alegre", label: "Alto Alegre" },
      { value: "mucajai", label: "Mucajaí" }
    ]
  },
  {
    value: "SC",
    label: "Santa Catarina",
    cities: [
      { value: "florianopolis", label: "Florianópolis" },
      { value: "joinville", label: "Joinville" },
      { value: "blumenau", label: "Blumenau" },
      { value: "sao_jose", label: "São José" },
      { value: "chapeco", label: "Chapecó" }
    ]
  },
  {
    value: "SP",
    label: "São Paulo",
    cities: [
      { value: "sao_paulo", label: "São Paulo" },
      { value: "campinas", label: "Campinas" },
      { value: "guarulhos", label: "Guarulhos" },
      { value: "santos", label: "Santos" },
      { value: "sao_bernardo_do_campo", label: "São Bernardo do Campo" }
    ]
  },
  {
    value: "SE",
    label: "Sergipe",
    cities: [
      { value: "aracaju", label: "Aracaju" },
      { value: "nossa_senhora_do_socorro", label: "Nossa Senhora do Socorro" },
      { value: "lagarto", label: "Lagarto" },
      { value: "itabaiana", label: "Itabaiana" },
      { value: "estancia", label: "Estância" }
    ]
  },
  {
    value: "TO",
    label: "Tocantins",
    cities: [
      { value: "palmas", label: "Palmas" },
      { value: "araguaina", label: "Araguaína" },
      { value: "gurupi", label: "Gurupi" },
      { value: "porto_nacional", label: "Porto Nacional" },
      { value: "paraiso_do_tocantins", label: "Paraíso do Tocantins" }
    ]
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
  { value: "21", label: "Aro 21" },
  { value: "24", label: "Aro 24" },
  { value: "26", label: "Aro 26" },
  { value: "27.5", label: "Aro 27.5" },
  { value: "29", label: "Aro 29" }
];

export interface BikeType {
  id: string;
  name: string;
  size: string;
  description: string;
  seller: string;
  location: string;
  phone?: string;
  images: string[];
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
