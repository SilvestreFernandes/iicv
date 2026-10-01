// Equipe médica do IICV. Dados reais fornecidos pelo cliente — não inventar nem remover sem pedido.
export type Profissional = {
  nome: string;
  especialidade: string;
  crm: string;
};

export const especialidades = [
  "Cardiologista",
  "Cirurgião",
  "Neuroradiologista",
  "Eletrofisiologista",
] as const;

export const equipe: Profissional[] = [
  { nome: "Adriano Galhardo", especialidade: "Cirurgia Vascular/endovascular", crm: "24738" },
  { nome: "Alane Miranda Leite", especialidade: "Cirurgia Vascular/endovascular", crm: "28205" },
  { nome: "Alba Godoy", especialidade: "Eletrofisiologista/Cardiologista", crm: "26189" },
  { nome: "André Luiz Guimarães Câmara", especialidade: "Angiorradiologista", crm: "13355" },
  { nome: "Anwer Marques Costa Arbati", especialidade: "Cirurgia Vascular/endovascular", crm: "23970" },
  { nome: "Bruno de Sousa Mendes Parente", especialidade: "Neuroradiologista Intervencionista", crm: "14756" },
  { nome: "Bruno Sepulveda Resis", especialidade: "Cirurgião Cardiovascular", crm: "16098" },
  { nome: "Camila Leandro Gadelha", especialidade: "Cirurgia Vascular/endovascular", crm: "18048" },
  { nome: "Candido Rodrigues Martins Gomes", especialidade: "Cirurgião Cardiovascular", crm: "4755" },
  { nome: "Carla Septmio Margalho", especialidade: "Eletrofisiologista/Cardiologista", crm: "10301" },
  { nome: "Carlos Eduardo Dias P. M Ontiveros", especialidade: "Neuroradiologista Intervencionista", crm: "12493" },
  { nome: "Daniel França Vasconcelos", especialidade: "Cardiologista", crm: "4686" },
  { nome: "Daniel Nobile", especialidade: "Cirurgia Vascular/endovascular", crm: "32104" },
  { nome: "Eduardo Siqueira Waihrich", especialidade: "Neuroradiologista Intervencionista", crm: "14180" },
  { nome: "Fábio Feuerharmel Giuseppin", especialidade: "Cardiologista", crm: "16552" },
  { nome: "Fabricio Caied", especialidade: "Cardiologista/Hemodinamicista", crm: "31466" },
  { nome: "Fernanda Cordeiro da Silva", especialidade: "Cirurgia Vascular/endovascular", crm: "30873" },
  { nome: "Fernando Diogo", especialidade: "Neurocirurgião", crm: "10591" },
  { nome: "Glauco Kalil da Silva Pina", especialidade: "Cirurgião Cardiovascular", crm: "21469" },
  { nome: "Gustavo Lara Moscardi", especialidade: "Cirurgião Cardiovascular", crm: "18483" },
  { nome: "Gustavo Paludetto Oliveira", especialidade: "Cirurgião Endovascular", crm: "14598" },
  { nome: "Henrique César Maia", especialidade: "Cardiologista/Eletrofisiologista", crm: "7159" },
  { nome: "Iruena Moraes Kessler", especialidade: "Neuroradiologista Intervencionista", crm: "7717" },
  { nome: "Isaac Azevedo Silva", especialidade: "Cirurgião Cardiovascular", crm: "18207" },
  { nome: "Jairo Macedo da Rocha", especialidade: "Eletrofisiologista/Cardiologista", crm: "10396" },
  { nome: "José Mario Baggio Júnior", especialidade: "Cirurgião Cardiovascular", crm: "13833" },
  { nome: "Marcus Vinicius Nascimento Santos", especialidade: "Cirurgião Cardiovascular", crm: "14157" },
  { nome: "Maria Cristina Rezende", especialidade: "Cirurgião Cardiovascular", crm: "5700" },
  { nome: "Monica Pante", especialidade: "Cirurgia Vascular e Endovascular", crm: "15315" },
  { nome: "Nestor Sabatovicz", especialidade: "Cirurgião Cardiovascular", crm: "7196" },
  { nome: "Paula Damasco", especialidade: "Eletrofisiologista/Cardiologista", crm: "22218" },
  { nome: "Paulo Antônio Marra da Motta", especialidade: "Cardiologista/Hemodinamicista", crm: "9169" },
  { nome: "Pedro Felipe Prates Silva", especialidade: "Eletrofisiologista/Cardiologista", crm: "18951" },
  { nome: "Rafaella Melo", especialidade: "Cirurgia Vascular/endovascular", crm: "16594" },
  { nome: "Ricardo Barros Corso", especialidade: "Cirurgião Cardiovascular", crm: "13283" },
  { nome: "Ricardo Borges Carranza", especialidade: "Cirurgião Cardiovascular", crm: "3640" },
  { nome: "Rodrigo Jaqueto Nomura", especialidade: "Cirurgia Vascular/endovascular", crm: "32344" },
  { nome: "Ruiter Carlos Arantes Filho", especialidade: "Eletrofisiologista/Cardiologista", crm: "15693" },
  { nome: "Samuel Mariani Passos da Silva", especialidade: "Eletrofisiologista/Cardiologista", crm: "22409" },
  { nome: "Tamer Najar Seixas", especialidade: "Eletrofisiologista/Cardiologista", crm: "3534" },
  { nome: "Tatiana Maia Jorge Ulhoa Barbosa", especialidade: "Cirurgião Cardiovascular", crm: "14172" },
  { nome: "Thiago Almeida Barroso", especialidade: "Cirurgia Vascular/endovascular", crm: "23261" },
];
