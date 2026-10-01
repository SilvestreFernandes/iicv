// Conteúdo institucional do IICV (procedimentos, vídeos, convênios). Dados reais do cliente.

export type Procedimento = {
  titulo: string;
  itens: string[];
};

export const procedimentos: Procedimento[] = [
  {
    titulo: "Hemodinâmica",
    itens: [
      "Cineangiocoronariografia",
      "Angioplastia coronariana",
      "Implante de stent",
      "Valvoplastia",
      "Fechamento de CIA, FOP e PCA",
      "Prótese transcateter (TAVI)",
      "Ultrassom coronariano",
    ],
  },
  {
    titulo: "Eletrofisiologia",
    itens: [
      "Estudo eletrofisiológico",
      "Ablação de arritmias",
      "Ablação de fibrilação atrial",
      "Cardioversão",
      "Mapeamento eletroanatômico",
      "Crioablação",
      "Implante de dispositivos",
    ],
  },
  {
    titulo: "Radiologia Intervencionista",
    itens: [
      "Angiografia cerebral",
      "Angioplastia carótida",
      "Angioplastia periférica",
      "Embolização de aneurisma",
      "Tratamento de MAV",
      "Implante de cateter",
      "Endoprótese aórtica",
    ],
  },
  {
    titulo: "Cirurgia Cardiovascular",
    itens: [
      "Implante de marcapasso",
      "Implante de desfibrilador",
      "Ressincronizador cardíaco",
      "Cirurgia vascular",
      "Revascularização coronariana",
      "Cirurgias de válvulas",
    ],
  },
];

export const videosInstitucionais = [
  { titulo: "Vídeo institucional", youtubeId: "1OI3CCz1a_Y" },
  { titulo: "Conheça o IICV", youtubeId: "gTBn-l8pGJM" },
];

export const convenios = [
  "Amil",
  "Unimed",
  "Bradesco Saúde",
  "Caixa Saúde",
  "Sul América",
  "Allianz Saúde",
  "Cigna",
  "Petrobras Saúde",
  "Cassi",
  "BRB Saúde",
  "Care Plus",
  "Gama Saúde",
  "Medservice",
  "Quality Pro",
  "E-Vida",
  "Assist Card",
];

export const diferenciais = [
  {
    titulo: "Salas de intervenção",
    texto:
      "Equipadas com angiógrafos de última geração, permitindo visualização em tempo real dos procedimentos com máxima precisão e segurança.",
  },
  {
    titulo: "Equipe especializada",
    texto:
      "Cardiologistas, cirurgiões e especialistas em radiologia intervencionista com ampla experiência nacional e internacional.",
  },
  {
    titulo: "Atendimento 24h",
    texto:
      "Disponível para urgências e emergências cardiovasculares todos os dias da semana, com equipe preparada para qualquer situação.",
  },
];
