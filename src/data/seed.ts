import type { BaseDados } from '@/types';
import { CARGOS } from './cargos';
import { GRAUS } from './graus';
import { ORGAOS_CENTRAIS } from './orgaos';

/**
 * Massa de dados institucional de demonstracao.
 *
 * Gerada de forma deterministica para que a plataforma possa ser avaliada
 * ponta a ponta sem backend. Ao conectar uma API real, basta substituir
 * `criarBaseInicial` pela carga remota — as telas consomem apenas os tipos.
 */
type Carga = Omit<BaseDados, 'cargos' | 'graus' | 'orgaos'> & {
  /** Orgaos locais gerados por Nucleo; unem-se aos centrais em `criarBaseInicial`. */
  orgaosLocais: BaseDados['orgaos'];
};

const DADOS: Carga = {
  "paises": [
    {
      "id": "pa-br",
      "nome": "Brasil",
      "codigoISO": "BR",
      "moeda": "BRL"
    },
    {
      "id": "pa-pt",
      "nome": "Portugal",
      "codigoISO": "PT",
      "moeda": "EUR"
    }
  ],
  "estados": [
    {
      "id": "es-pe",
      "paisId": "pa-br",
      "nome": "Pernambuco",
      "sigla": "PE"
    },
    {
      "id": "es-sp",
      "paisId": "pa-br",
      "nome": "São Paulo",
      "sigla": "SP"
    },
    {
      "id": "es-rj",
      "paisId": "pa-br",
      "nome": "Rio de Janeiro",
      "sigla": "RJ"
    },
    {
      "id": "es-mg",
      "paisId": "pa-br",
      "nome": "Minas Gerais",
      "sigla": "MG"
    },
    {
      "id": "es-ba",
      "paisId": "pa-br",
      "nome": "Bahia",
      "sigla": "BA"
    },
    {
      "id": "es-rs",
      "paisId": "pa-br",
      "nome": "Rio Grande do Sul",
      "sigla": "RS"
    },
    {
      "id": "es-ce",
      "paisId": "pa-br",
      "nome": "Ceará",
      "sigla": "CE"
    },
    {
      "id": "es-df",
      "paisId": "pa-br",
      "nome": "Distrito Federal",
      "sigla": "DF"
    },
    {
      "id": "es-lis",
      "paisId": "pa-pt",
      "nome": "Lisboa",
      "sigla": "LIS"
    },
    {
      "id": "es-por",
      "paisId": "pa-pt",
      "nome": "Porto",
      "sigla": "POR"
    }
  ],
  "municipios": [
    {
      "id": "mu-jaboatao",
      "estadoId": "es-pe",
      "nome": "Jaboatão dos Guararapes"
    },
    {
      "id": "mu-recife",
      "estadoId": "es-pe",
      "nome": "Recife"
    },
    {
      "id": "mu-olinda",
      "estadoId": "es-pe",
      "nome": "Olinda"
    },
    {
      "id": "mu-caruaru",
      "estadoId": "es-pe",
      "nome": "Caruaru"
    },
    {
      "id": "mu-sp",
      "estadoId": "es-sp",
      "nome": "São Paulo"
    },
    {
      "id": "mu-campinas",
      "estadoId": "es-sp",
      "nome": "Campinas"
    },
    {
      "id": "mu-santos",
      "estadoId": "es-sp",
      "nome": "Santos"
    },
    {
      "id": "mu-rj",
      "estadoId": "es-rj",
      "nome": "Rio de Janeiro"
    },
    {
      "id": "mu-niteroi",
      "estadoId": "es-rj",
      "nome": "Niterói"
    },
    {
      "id": "mu-bh",
      "estadoId": "es-mg",
      "nome": "Belo Horizonte"
    },
    {
      "id": "mu-uberlandia",
      "estadoId": "es-mg",
      "nome": "Uberlândia"
    },
    {
      "id": "mu-salvador",
      "estadoId": "es-ba",
      "nome": "Salvador"
    },
    {
      "id": "mu-poa",
      "estadoId": "es-rs",
      "nome": "Porto Alegre"
    },
    {
      "id": "mu-fortaleza",
      "estadoId": "es-ce",
      "nome": "Fortaleza"
    },
    {
      "id": "mu-brasilia",
      "estadoId": "es-df",
      "nome": "Brasília"
    },
    {
      "id": "mu-lisboa",
      "estadoId": "es-lis",
      "nome": "Lisboa"
    },
    {
      "id": "mu-porto",
      "estadoId": "es-por",
      "nome": "Porto"
    }
  ],
  "membros": [
    {
      "id": "me-001",
      "numeroMembro": "AO-29352",
      "nomeCompleto": "Filipe Pereira da Silva",
      "nomeExibicao": "Filipe Pereira",
      "usuario": "filipepsoficial",
      "email": "filipeedito@gmail.com",
      "telefone": "+55 (81) 99000-4000",
      "sexo": "nao_informado",
      "dataNascimento": "1968-01-01T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "100",
        "bairro": "Centro",
        "municipioId": "mu-jaboatao",
        "estadoId": "es-pe",
        "paisId": "pa-br",
        "cep": "5004000"
      },
      "paisId": "pa-br",
      "estadoId": "es-pe",
      "municipioId": "mu-jaboatao",
      "nucleoId": "nu-jaboatao",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [],
      "dataIngresso": "2023-05-28T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Doutrina social",
        "Estética",
        "Retórica"
      ],
      "areasAtuacao": [
        "Estudos",
        "Eventos"
      ],
      "competencias": [
        "Assistência social",
        "Educação"
      ],
      "xp": 8940,
      "nivel": 11,
      "sequenciaDias": 46,
      "aliados": [
        "me-010",
        "me-019",
        "me-028"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao",
        "cq-orador",
        "cq-proposta",
        "cq-fundador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T12:00:00.000Z"
    },
    {
      "id": "me-002",
      "numeroMembro": "AO-29369",
      "nomeCompleto": "Helena Moraes Castro",
      "nomeExibicao": "Helena Moraes",
      "usuario": "helenacastro",
      "email": "helenacastro@aordem.org",
      "telefone": "+55 (81) 98989-4013",
      "sexo": "feminino",
      "dataNascimento": "1975-06-04T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "104",
        "bairro": "Centro",
        "municipioId": "mu-recife",
        "estadoId": "es-pe",
        "paisId": "pa-br",
        "cep": "5004013"
      },
      "paisId": "pa-br",
      "estadoId": "es-pe",
      "municipioId": "mu-recife",
      "nucleoId": "nu-recife",
      "cargoId": "cargo-admin",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [],
      "dataIngresso": "2023-06-22T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Lógica",
        "Ética",
        "Economia política"
      ],
      "areasAtuacao": [
        "Eventos",
        "Tecnologia"
      ],
      "competencias": [
        "Psicologia",
        "Tecnologia"
      ],
      "xp": 12063,
      "nivel": 12,
      "sequenciaDias": 45,
      "aliados": [
        "me-011",
        "me-020",
        "me-029",
        "me-038"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": true,
      "ultimoAcesso": "2026-08-20T11:00:00.000Z"
    },
    {
      "id": "me-003",
      "numeroMembro": "AO-29386",
      "nomeCompleto": "Rafael Andrade Lins",
      "nomeExibicao": "Rafael Andrade",
      "usuario": "rafaellins",
      "email": "rafaellins@aordem.org",
      "telefone": "+55 (81) 98978-4026",
      "sexo": "masculino",
      "dataNascimento": "1982-11-07T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "108",
        "bairro": "Centro",
        "municipioId": "mu-sp",
        "estadoId": "es-sp",
        "paisId": "pa-br",
        "cep": "5004026"
      },
      "paisId": "pa-br",
      "estadoId": "es-sp",
      "municipioId": "mu-sp",
      "nucleoId": "nu-sp",
      "cargoId": "cargo-grao-mestre",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-grao-mestre",
      "titulos": [],
      "dataIngresso": "2023-07-17T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Ética",
        "História das ideias",
        "Filosofia do direito"
      ],
      "areasAtuacao": [
        "Documentação",
        "Mobilização"
      ],
      "competencias": [
        "Educação",
        "Comunicação"
      ],
      "xp": 11913,
      "nivel": 12,
      "sequenciaDias": 44,
      "aliados": [
        "me-012",
        "me-021",
        "me-030",
        "me-039"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": true,
      "ultimoAcesso": "2026-08-20T10:00:00.000Z"
    },
    {
      "id": "me-004",
      "numeroMembro": "AO-29403",
      "nomeCompleto": "Beatriz Nogueira Alves",
      "nomeExibicao": "Beatriz Nogueira",
      "usuario": "beatrizalves",
      "email": "beatrizalves@aordem.org",
      "telefone": "+55 (81) 98967-4039",
      "sexo": "feminino",
      "dataNascimento": "1989-04-10T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "112",
        "bairro": "Centro",
        "municipioId": "mu-campinas",
        "estadoId": "es-sp",
        "paisId": "pa-br",
        "cep": "5004039"
      },
      "paisId": "pa-br",
      "estadoId": "es-sp",
      "municipioId": "mu-campinas",
      "nucleoId": "nu-campinas",
      "cargoId": "cargo-secretario-geral",
      "situacao": "ativo",
      "categoriaAssociativa": "honorario",
      "grauId": "grau-empeiros",
      "titulos": [],
      "dataIngresso": "2023-08-11T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Estética",
        "Retórica",
        "Metafísica"
      ],
      "areasAtuacao": [
        "Organização territorial",
        "Finanças"
      ],
      "competencias": [
        "Psicologia",
        "Assistência social"
      ],
      "xp": 11902,
      "nivel": 12,
      "sequenciaDias": 43,
      "aliados": [
        "me-013",
        "me-022",
        "me-031",
        "me-040"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T09:00:00.000Z"
    },
    {
      "id": "me-005",
      "numeroMembro": "AO-29420",
      "nomeCompleto": "Marcos Vinícius Teixeira",
      "nomeExibicao": "Marcos Vinícius",
      "usuario": "marcosteixeira",
      "email": "marcosteixeira@aordem.org",
      "telefone": "+55 (81) 98956-4052",
      "sexo": "masculino",
      "dataNascimento": "1996-09-13T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "116",
        "bairro": "Centro",
        "municipioId": "mu-rj",
        "estadoId": "es-rj",
        "paisId": "pa-br",
        "cep": "5004052"
      },
      "paisId": "pa-br",
      "estadoId": "es-rj",
      "municipioId": "mu-rj",
      "nucleoId": "nu-rj",
      "cargoId": "cargo-tesoureiro-geral",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [],
      "dataIngresso": "2023-09-05T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Metafísica",
        "Filosofia política",
        "Ética"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Documentação"
      ],
      "competencias": [
        "Direito",
        "Saúde"
      ],
      "xp": 11281,
      "nivel": 12,
      "sequenciaDias": 42,
      "aliados": [
        "me-014",
        "me-023",
        "me-032",
        "me-041"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao",
        "cq-orador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": true,
      "ultimoAcesso": "2026-08-20T08:00:00.000Z"
    },
    {
      "id": "me-006",
      "numeroMembro": "AO-29437",
      "nomeCompleto": "Camila Rocha Fontes",
      "nomeExibicao": "Camila Rocha",
      "usuario": "camilafontes",
      "email": "camilafontes@aordem.org",
      "telefone": "+55 (81) 98945-4065",
      "sexo": "feminino",
      "dataNascimento": "1971-02-16T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "120",
        "bairro": "Centro",
        "municipioId": "mu-bh",
        "estadoId": "es-mg",
        "paisId": "pa-br",
        "cep": "5004065"
      },
      "paisId": "pa-br",
      "estadoId": "es-mg",
      "municipioId": "mu-bh",
      "nucleoId": "nu-bh",
      "cargoId": "cargo-chanceler",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [
        "regalis"
      ],
      "dataIngresso": "2023-09-30T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Filosofia do direito",
        "Antropologia filosófica",
        "Estética"
      ],
      "areasAtuacao": [
        "Mobilização",
        "Tecnologia"
      ],
      "competencias": [
        "Tradução",
        "Saúde"
      ],
      "xp": 11025,
      "nivel": 12,
      "sequenciaDias": 41,
      "aliados": [
        "me-015",
        "me-024",
        "me-033"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao",
        "cq-fundador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T07:00:00.000Z"
    },
    {
      "id": "me-007",
      "numeroMembro": "AO-29454",
      "nomeCompleto": "Eduardo Barros Menezes",
      "nomeExibicao": "Eduardo Barros",
      "usuario": "eduardomenezes",
      "email": "eduardomenezes@aordem.org",
      "telefone": "+55 (81) 98934-4078",
      "sexo": "masculino",
      "dataNascimento": "1978-07-19T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "124",
        "bairro": "Centro",
        "municipioId": "mu-salvador",
        "estadoId": "es-ba",
        "paisId": "pa-br",
        "cep": "5004078"
      },
      "paisId": "pa-br",
      "estadoId": "es-ba",
      "municipioId": "mu-salvador",
      "nucleoId": "nu-salvador",
      "cargoId": "cargo-moderador",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-moderador",
      "titulos": [],
      "dataIngresso": "2023-10-25T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Estética",
        "Ética",
        "Doutrina social"
      ],
      "areasAtuacao": [
        "Mobilização",
        "Documentação"
      ],
      "competencias": [
        "Engenharia",
        "Saúde"
      ],
      "xp": 11146,
      "nivel": 12,
      "sequenciaDias": 40,
      "aliados": [
        "me-016",
        "me-025",
        "me-034",
        "me-043"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T06:00:00.000Z"
    },
    {
      "id": "me-008",
      "numeroMembro": "AO-29471",
      "nomeCompleto": "Larissa Duarte Prado",
      "nomeExibicao": "Larissa Duarte",
      "usuario": "larissaprado",
      "email": "larissaprado@aordem.org",
      "telefone": "+55 (81) 98923-4091",
      "sexo": "feminino",
      "dataNascimento": "1985-12-22T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "128",
        "bairro": "Centro",
        "municipioId": "mu-brasilia",
        "estadoId": "es-df",
        "paisId": "pa-br",
        "cep": "5004091"
      },
      "paisId": "pa-br",
      "estadoId": "es-df",
      "municipioId": "mu-brasilia",
      "nucleoId": "nu-brasilia",
      "cargoId": "cargo-auguere",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-auguere",
      "titulos": [],
      "dataIngresso": "2023-11-19T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Retórica",
        "Estética",
        "Filosofia do direito"
      ],
      "areasAtuacao": [
        "Eventos",
        "Tecnologia"
      ],
      "competencias": [
        "Tradução",
        "Contabilidade"
      ],
      "xp": 10733,
      "nivel": 11,
      "sequenciaDias": 39,
      "aliados": [
        "me-017",
        "me-026",
        "me-035",
        "me-044"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao",
        "cq-proposta"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T05:00:00.000Z"
    },
    {
      "id": "me-009",
      "numeroMembro": "AO-29488",
      "nomeCompleto": "Tiago Queiroz Amaral",
      "nomeExibicao": "Tiago Queiroz",
      "usuario": "tiagoamaral",
      "email": "tiagoamaral@aordem.org",
      "telefone": "+55 (81) 98912-4104",
      "sexo": "masculino",
      "dataNascimento": "1992-05-25T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "132",
        "bairro": "Centro",
        "municipioId": "mu-lisboa",
        "estadoId": "es-lis",
        "paisId": "pa-pt",
        "cep": "5004104"
      },
      "paisId": "pa-pt",
      "estadoId": "es-lis",
      "municipioId": "mu-lisboa",
      "nucleoId": "nu-lisboa",
      "cargoId": "cargo-epopte",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-epopte",
      "titulos": [],
      "dataIngresso": "2023-12-14T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "História das ideias",
        "Retórica",
        "Lógica"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Mobilização"
      ],
      "competencias": [
        "Saúde",
        "Educação"
      ],
      "xp": 10476,
      "nivel": 11,
      "sequenciaDias": 38,
      "aliados": [
        "me-018",
        "me-027",
        "me-036",
        "me-045"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao",
        "cq-orador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T04:00:00.000Z"
    },
    {
      "id": "me-010",
      "numeroMembro": "AO-29505",
      "nomeCompleto": "Juliana Bezerra Campos",
      "nomeExibicao": "Juliana Bezerra",
      "usuario": "julianacampos",
      "email": "julianacampos@aordem.org",
      "telefone": "+55 (81) 98901-4117",
      "sexo": "nao_informado",
      "dataNascimento": "1999-10-01T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "136",
        "bairro": "Centro",
        "municipioId": "mu-jaboatao",
        "estadoId": "es-pe",
        "paisId": "pa-br",
        "cep": "5004117"
      },
      "paisId": "pa-br",
      "estadoId": "es-pe",
      "municipioId": "mu-jaboatao",
      "nucleoId": "nu-jaboatao",
      "cargoId": "cargo-embaixador",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [],
      "dataIngresso": "2024-01-08T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Ética",
        "Filosofia política",
        "Metafísica"
      ],
      "areasAtuacao": [
        "Relações institucionais",
        "Comunicação"
      ],
      "competencias": [
        "Psicologia",
        "Construção civil"
      ],
      "xp": 10012,
      "nivel": 11,
      "sequenciaDias": 37,
      "aliados": [
        "me-001",
        "me-019",
        "me-028",
        "me-037",
        "me-046"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T03:00:00.000Z"
    },
    {
      "id": "me-011",
      "numeroMembro": "AO-29522",
      "nomeCompleto": "André Luiz Sampaio",
      "nomeExibicao": "André Luiz",
      "usuario": "andresampaio",
      "email": "andresampaio@aordem.org",
      "telefone": "+55 (81) 98890-4130",
      "sexo": "masculino",
      "dataNascimento": "1974-03-04T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "140",
        "bairro": "Centro",
        "municipioId": "mu-recife",
        "estadoId": "es-pe",
        "paisId": "pa-br",
        "cep": "5004130"
      },
      "paisId": "pa-br",
      "estadoId": "es-pe",
      "municipioId": "mu-recife",
      "nucleoId": "nu-recife",
      "cargoId": "cargo-afentis",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-afentis",
      "titulos": [],
      "dataIngresso": "2024-02-02T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Ética",
        "Antropologia filosófica",
        "Economia política"
      ],
      "areasAtuacao": [
        "Organização territorial",
        "Finanças"
      ],
      "competencias": [
        "Tecnologia",
        "Logística"
      ],
      "xp": 10070,
      "nivel": 11,
      "sequenciaDias": 36,
      "aliados": [
        "me-002",
        "me-020",
        "me-029"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao",
        "cq-fundador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T02:00:00.000Z"
    },
    {
      "id": "me-012",
      "numeroMembro": "AO-29539",
      "nomeCompleto": "Patrícia Vasconcelos",
      "nomeExibicao": "Patrícia Vasconcelos",
      "usuario": "patriciavasconcelos",
      "email": "patriciavasconcelos@aordem.org",
      "telefone": "+55 (81) 98879-4143",
      "sexo": "feminino",
      "dataNascimento": "1981-08-07T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "144",
        "bairro": "Centro",
        "municipioId": "mu-sp",
        "estadoId": "es-sp",
        "paisId": "pa-br",
        "cep": "5004143"
      },
      "paisId": "pa-br",
      "estadoId": "es-sp",
      "municipioId": "mu-sp",
      "nucleoId": "nu-sp",
      "cargoId": "cargo-afentis",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-afentis",
      "titulos": [],
      "dataIngresso": "2024-02-27T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Economia política",
        "Lógica",
        "Antropologia filosófica"
      ],
      "areasAtuacao": [
        "Relações institucionais",
        "Comunicação"
      ],
      "competencias": [
        "Educação",
        "Logística"
      ],
      "xp": 9531,
      "nivel": 11,
      "sequenciaDias": 35,
      "aliados": [
        "me-003",
        "me-021",
        "me-030",
        "me-039"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T01:00:00.000Z"
    },
    {
      "id": "me-013",
      "numeroMembro": "AO-29556",
      "nomeCompleto": "Gustavo Henrique Braga",
      "nomeExibicao": "Gustavo Henrique",
      "usuario": "gustavobraga",
      "email": "gustavobraga@aordem.org",
      "telefone": "+55 (81) 98868-4156",
      "sexo": "masculino",
      "dataNascimento": "1988-01-10T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "148",
        "bairro": "Centro",
        "municipioId": "mu-campinas",
        "estadoId": "es-sp",
        "paisId": "pa-br",
        "cep": "5004156"
      },
      "paisId": "pa-br",
      "estadoId": "es-sp",
      "municipioId": "mu-campinas",
      "nucleoId": "nu-campinas",
      "cargoId": "cargo-afentis",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-afentis",
      "titulos": [],
      "dataIngresso": "2024-03-23T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Filosofia do direito",
        "Economia política",
        "Doutrina social"
      ],
      "areasAtuacao": [
        "Tecnologia",
        "Comunicação"
      ],
      "competencias": [
        "Tradução",
        "Engenharia"
      ],
      "xp": 9363,
      "nivel": 11,
      "sequenciaDias": 34,
      "aliados": [
        "me-004",
        "me-022",
        "me-031",
        "me-040"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao",
        "cq-orador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T00:00:00.000Z"
    },
    {
      "id": "me-014",
      "numeroMembro": "AO-29573",
      "nomeCompleto": "Renata Cardoso Lima",
      "nomeExibicao": "Renata Cardoso",
      "usuario": "renatalima",
      "email": "renatalima@aordem.org",
      "telefone": "+55 (81) 98857-4169",
      "sexo": "feminino",
      "dataNascimento": "1995-06-13T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "152",
        "bairro": "Centro",
        "municipioId": "mu-rj",
        "estadoId": "es-rj",
        "paisId": "pa-br",
        "cep": "5004169"
      },
      "paisId": "pa-br",
      "estadoId": "es-rj",
      "municipioId": "mu-rj",
      "nucleoId": "nu-rj",
      "cargoId": "cargo-afentis",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-afentis",
      "titulos": [],
      "dataIngresso": "2024-04-17T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Lógica",
        "História das ideias",
        "Doutrina social"
      ],
      "areasAtuacao": [
        "Tecnologia",
        "Formação"
      ],
      "competencias": [
        "Assistência social",
        "Tecnologia"
      ],
      "xp": 9205,
      "nivel": 11,
      "sequenciaDias": 33,
      "aliados": [
        "me-005",
        "me-023",
        "me-032",
        "me-041"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T23:00:00.000Z"
    },
    {
      "id": "me-015",
      "numeroMembro": "AO-29590",
      "nomeCompleto": "Bruno Sales Figueiredo",
      "nomeExibicao": "Bruno Sales",
      "usuario": "brunofigueiredo",
      "email": "brunofigueiredo@aordem.org",
      "telefone": "+55 (81) 98846-4182",
      "sexo": "masculino",
      "dataNascimento": "1970-11-16T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "156",
        "bairro": "Centro",
        "municipioId": "mu-bh",
        "estadoId": "es-mg",
        "paisId": "pa-br",
        "cep": "5004182"
      },
      "paisId": "pa-br",
      "estadoId": "es-mg",
      "municipioId": "mu-bh",
      "nucleoId": "nu-bh",
      "cargoId": "cargo-afentis",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-afentis",
      "titulos": [],
      "dataIngresso": "2024-05-12T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Filosofia política",
        "Epistemologia",
        "Doutrina social"
      ],
      "areasAtuacao": [
        "Documentação",
        "Tecnologia"
      ],
      "competencias": [
        "Educação",
        "Comunicação"
      ],
      "xp": 8883,
      "nivel": 11,
      "sequenciaDias": 32,
      "aliados": [
        "me-006",
        "me-024",
        "me-033",
        "me-042"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao",
        "cq-proposta"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T22:00:00.000Z"
    },
    {
      "id": "me-016",
      "numeroMembro": "AO-29607",
      "nomeCompleto": "Isabela Monteiro Reis",
      "nomeExibicao": "Isabela Monteiro",
      "usuario": "isabelareis",
      "email": "isabelareis@aordem.org",
      "telefone": "+55 (81) 98835-4195",
      "sexo": "feminino",
      "dataNascimento": "1977-04-19T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "160",
        "bairro": "Centro",
        "municipioId": "mu-salvador",
        "estadoId": "es-ba",
        "paisId": "pa-br",
        "cep": "5004195"
      },
      "paisId": "pa-br",
      "estadoId": "es-ba",
      "municipioId": "mu-salvador",
      "nucleoId": "nu-salvador",
      "cargoId": "cargo-afentis",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-afentis",
      "titulos": [],
      "dataIngresso": "2024-06-06T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Retórica",
        "Filosofia do direito",
        "Filosofia política"
      ],
      "areasAtuacao": [
        "Finanças",
        "Tecnologia"
      ],
      "competencias": [
        "Educação",
        "Saúde"
      ],
      "xp": 8504,
      "nivel": 11,
      "sequenciaDias": 31,
      "aliados": [
        "me-007",
        "me-025",
        "me-034"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao",
        "cq-fundador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T21:00:00.000Z"
    },
    {
      "id": "me-017",
      "numeroMembro": "AO-29624",
      "nomeCompleto": "Daniel Fontes Aragão",
      "nomeExibicao": "Daniel Fontes",
      "usuario": "danielaragao",
      "email": "danielaragao@aordem.org",
      "telefone": "+55 (81) 98824-4208",
      "sexo": "masculino",
      "dataNascimento": "1984-09-22T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "164",
        "bairro": "Centro",
        "municipioId": "mu-brasilia",
        "estadoId": "es-df",
        "paisId": "pa-br",
        "cep": "5004208"
      },
      "paisId": "pa-br",
      "estadoId": "es-df",
      "municipioId": "mu-brasilia",
      "nucleoId": "nu-brasilia",
      "cargoId": "cargo-afentis",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-afentis",
      "titulos": [],
      "dataIngresso": "2024-07-01T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Ética",
        "Filosofia política",
        "Filosofia do direito"
      ],
      "areasAtuacao": [
        "Eventos",
        "Formação"
      ],
      "competencias": [
        "Direito",
        "Tradução"
      ],
      "xp": 8337,
      "nivel": 10,
      "sequenciaDias": 30,
      "aliados": [
        "me-008",
        "me-026",
        "me-035",
        "me-044"
      ],
      "conquistas": [
        "cq-presenca",
        "cq-formacao",
        "cq-orador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T20:00:00.000Z"
    },
    {
      "id": "me-018",
      "numeroMembro": "AO-29641",
      "nomeCompleto": "Mariana Peixoto Cunha",
      "nomeExibicao": "Mariana Peixoto",
      "usuario": "marianacunha",
      "email": "marianacunha@aordem.org",
      "telefone": "+55 (81) 98813-4221",
      "sexo": "feminino",
      "dataNascimento": "1991-02-25T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "168",
        "bairro": "Centro",
        "municipioId": "mu-lisboa",
        "estadoId": "es-lis",
        "paisId": "pa-pt",
        "cep": "5004221"
      },
      "paisId": "pa-pt",
      "estadoId": "es-lis",
      "municipioId": "mu-lisboa",
      "nucleoId": "nu-lisboa",
      "cargoId": "cargo-afentis",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-afentis",
      "titulos": [],
      "dataIngresso": "2024-07-26T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "História das ideias",
        "Retórica",
        "Epistemologia"
      ],
      "areasAtuacao": [
        "Eventos",
        "Comunicação"
      ],
      "competencias": [
        "Direito",
        "Engenharia"
      ],
      "xp": 8203,
      "nivel": 10,
      "sequenciaDias": 29,
      "aliados": [
        "me-009",
        "me-027",
        "me-036",
        "me-045"
      ],
      "conquistas": [
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T19:00:00.000Z"
    },
    {
      "id": "me-019",
      "numeroMembro": "AO-29658",
      "nomeCompleto": "Leonardo Antunes Vieira",
      "nomeExibicao": "Leonardo Antunes",
      "usuario": "leonardovieira",
      "email": "leonardovieira@aordem.org",
      "telefone": "+55 (81) 98802-4234",
      "sexo": "nao_informado",
      "dataNascimento": "1998-07-01T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "172",
        "bairro": "Centro",
        "municipioId": "mu-jaboatao",
        "estadoId": "es-pe",
        "paisId": "pa-br",
        "cep": "5004234"
      },
      "paisId": "pa-br",
      "estadoId": "es-pe",
      "municipioId": "mu-jaboatao",
      "nucleoId": "nu-jaboatao",
      "cargoId": "cargo-afentis",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-afentis",
      "titulos": [],
      "dataIngresso": "2024-08-20T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Filosofia política",
        "Filosofia do direito",
        "História das ideias"
      ],
      "areasAtuacao": [
        "Finanças",
        "Eventos"
      ],
      "competencias": [
        "Engenharia",
        "Contabilidade"
      ],
      "xp": 7633,
      "nivel": 10,
      "sequenciaDias": 28,
      "aliados": [
        "me-001",
        "me-010",
        "me-028",
        "me-037",
        "me-046"
      ],
      "conquistas": [
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T18:00:00.000Z"
    },
    {
      "id": "me-020",
      "numeroMembro": "AO-29675",
      "nomeCompleto": "Carolina Serra Dantas",
      "nomeExibicao": "Carolina Serra",
      "usuario": "carolinadantas",
      "email": "carolinadantas@aordem.org",
      "telefone": "+55 (81) 98791-4247",
      "sexo": "feminino",
      "dataNascimento": "1973-12-04T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "176",
        "bairro": "Centro",
        "municipioId": "mu-recife",
        "estadoId": "es-pe",
        "paisId": "pa-br",
        "cep": "5004247"
      },
      "paisId": "pa-br",
      "estadoId": "es-pe",
      "municipioId": "mu-recife",
      "nucleoId": "nu-recife",
      "cargoId": "cargo-thesi",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-thesi",
      "titulos": [
        "kyrios"
      ],
      "dataIngresso": "2024-09-14T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Doutrina social",
        "Estética",
        "Epistemologia"
      ],
      "areasAtuacao": [
        "Eventos",
        "Documentação"
      ],
      "competencias": [
        "Direito",
        "Construção civil"
      ],
      "xp": 7387,
      "nivel": 10,
      "sequenciaDias": 27,
      "aliados": [
        "me-002",
        "me-011",
        "me-029",
        "me-038"
      ],
      "conquistas": [
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T17:00:00.000Z"
    },
    {
      "id": "me-021",
      "numeroMembro": "AO-29692",
      "nomeCompleto": "Vinícius Moura Tavares",
      "nomeExibicao": "Vinícius Moura",
      "usuario": "viniciustavares",
      "email": "viniciustavares@aordem.org",
      "telefone": "+55 (81) 98780-4260",
      "sexo": "masculino",
      "dataNascimento": "1980-05-07T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "180",
        "bairro": "Centro",
        "municipioId": "mu-sp",
        "estadoId": "es-sp",
        "paisId": "pa-br",
        "cep": "5004260"
      },
      "paisId": "pa-br",
      "estadoId": "es-sp",
      "municipioId": "mu-sp",
      "nucleoId": "nu-sp",
      "cargoId": "cargo-thesi",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-thesi",
      "titulos": [
        "kyrios"
      ],
      "dataIngresso": "2024-10-09T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Lógica",
        "Metafísica",
        "Retórica"
      ],
      "areasAtuacao": [
        "Estudos",
        "Documentação"
      ],
      "competencias": [
        "Logística",
        "Tecnologia"
      ],
      "xp": 7530,
      "nivel": 10,
      "sequenciaDias": 26,
      "aliados": [
        "me-003",
        "me-012",
        "me-030"
      ],
      "conquistas": [
        "cq-formacao",
        "cq-orador",
        "cq-fundador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T16:00:00.000Z"
    },
    {
      "id": "me-022",
      "numeroMembro": "AO-29709",
      "nomeCompleto": "Fernanda Coelho Barreto",
      "nomeExibicao": "Fernanda Coelho",
      "usuario": "fernandabarreto",
      "email": "fernandabarreto@aordem.org",
      "telefone": "+55 (81) 98769-4273",
      "sexo": "feminino",
      "dataNascimento": "1987-10-10T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "184",
        "bairro": "Centro",
        "municipioId": "mu-campinas",
        "estadoId": "es-sp",
        "paisId": "pa-br",
        "cep": "5004273"
      },
      "paisId": "pa-br",
      "estadoId": "es-sp",
      "municipioId": "mu-campinas",
      "nucleoId": "nu-campinas",
      "cargoId": "cargo-thesi",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-thesi",
      "titulos": [
        "kyrios"
      ],
      "dataIngresso": "2024-11-03T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Antropologia filosófica",
        "Retórica",
        "Estética"
      ],
      "areasAtuacao": [
        "Documentação",
        "Tecnologia"
      ],
      "competencias": [
        "Tradução",
        "Direito"
      ],
      "xp": 6915,
      "nivel": 10,
      "sequenciaDias": 25,
      "aliados": [
        "me-004",
        "me-013",
        "me-031",
        "me-040"
      ],
      "conquistas": [
        "cq-formacao",
        "cq-proposta"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T15:00:00.000Z"
    },
    {
      "id": "me-023",
      "numeroMembro": "AO-29726",
      "nomeCompleto": "Rodrigo Pacheco Guedes",
      "nomeExibicao": "Rodrigo Pacheco",
      "usuario": "rodrigoguedes",
      "email": "rodrigoguedes@aordem.org",
      "telefone": "+55 (81) 98758-4286",
      "sexo": "masculino",
      "dataNascimento": "1994-03-13T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "188",
        "bairro": "Centro",
        "municipioId": "mu-rj",
        "estadoId": "es-rj",
        "paisId": "pa-br",
        "cep": "5004286"
      },
      "paisId": "pa-br",
      "estadoId": "es-rj",
      "municipioId": "mu-rj",
      "nucleoId": "nu-rj",
      "cargoId": "cargo-syntrofo",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-syntrofo",
      "titulos": [],
      "dataIngresso": "2024-11-28T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Estética",
        "Antropologia filosófica",
        "Economia política"
      ],
      "areasAtuacao": [
        "Documentação",
        "Comunicação"
      ],
      "competencias": [
        "Educação",
        "Saúde"
      ],
      "xp": 6663,
      "nivel": 10,
      "sequenciaDias": 24,
      "aliados": [
        "me-005",
        "me-014",
        "me-032",
        "me-041"
      ],
      "conquistas": [
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T14:00:00.000Z"
    },
    {
      "id": "me-024",
      "numeroMembro": "AO-29743",
      "nomeCompleto": "Aline Nunes Bastos",
      "nomeExibicao": "Aline Nunes",
      "usuario": "alinebastos",
      "email": "alinebastos@aordem.org",
      "telefone": "+55 (81) 98747-4299",
      "sexo": "feminino",
      "dataNascimento": "1969-08-16T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "192",
        "bairro": "Centro",
        "municipioId": "mu-bh",
        "estadoId": "es-mg",
        "paisId": "pa-br",
        "cep": "5004299"
      },
      "paisId": "pa-br",
      "estadoId": "es-mg",
      "municipioId": "mu-bh",
      "nucleoId": "nu-bh",
      "cargoId": "cargo-syntrofo",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-syntrofo",
      "titulos": [],
      "dataIngresso": "2024-12-23T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Filosofia do direito",
        "Filosofia política",
        "Metafísica"
      ],
      "areasAtuacao": [
        "Estudos",
        "Eventos"
      ],
      "competencias": [
        "Logística",
        "Assistência social"
      ],
      "xp": 6288,
      "nivel": 9,
      "sequenciaDias": 23,
      "aliados": [
        "me-006",
        "me-015",
        "me-033",
        "me-042"
      ],
      "conquistas": [
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T13:00:00.000Z"
    },
    {
      "id": "me-025",
      "numeroMembro": "AO-29760",
      "nomeCompleto": "Otávio Ramalho Freitas",
      "nomeExibicao": "Otávio Ramalho",
      "usuario": "otaviofreitas",
      "email": "otaviofreitas@aordem.org",
      "telefone": "+55 (81) 98736-4312",
      "sexo": "masculino",
      "dataNascimento": "1976-01-19T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "196",
        "bairro": "Centro",
        "municipioId": "mu-salvador",
        "estadoId": "es-ba",
        "paisId": "pa-br",
        "cep": "5004312"
      },
      "paisId": "pa-br",
      "estadoId": "es-ba",
      "municipioId": "mu-salvador",
      "nucleoId": "nu-salvador",
      "cargoId": "cargo-syntrofo",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-syntrofo",
      "titulos": [],
      "dataIngresso": "2025-01-17T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Retórica",
        "Antropologia filosófica",
        "Filosofia política"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Eventos"
      ],
      "competencias": [
        "Assistência social",
        "Comunicação"
      ],
      "xp": 6028,
      "nivel": 9,
      "sequenciaDias": 22,
      "aliados": [
        "me-007",
        "me-016",
        "me-034",
        "me-043"
      ],
      "conquistas": [
        "cq-formacao",
        "cq-orador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T12:00:00.000Z"
    },
    {
      "id": "me-026",
      "numeroMembro": "AO-29777",
      "nomeCompleto": "Luiza Cavalcanti Melo",
      "nomeExibicao": "Luiza Cavalcanti",
      "usuario": "luizamelo",
      "email": "luizamelo@aordem.org",
      "telefone": "+55 (81) 98725-4325",
      "sexo": "feminino",
      "dataNascimento": "1983-06-22T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "200",
        "bairro": "Centro",
        "municipioId": "mu-brasilia",
        "estadoId": "es-df",
        "paisId": "pa-br",
        "cep": "5004325"
      },
      "paisId": "pa-br",
      "estadoId": "es-df",
      "municipioId": "mu-brasilia",
      "nucleoId": "nu-brasilia",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [],
      "dataIngresso": "2025-02-11T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Antropologia filosófica",
        "Lógica",
        "Metafísica"
      ],
      "areasAtuacao": [
        "Tecnologia",
        "Estudos"
      ],
      "competencias": [
        "Saúde",
        "Engenharia"
      ],
      "xp": 6199,
      "nivel": 9,
      "sequenciaDias": 21,
      "aliados": [
        "me-008",
        "me-017",
        "me-035"
      ],
      "conquistas": [
        "cq-formacao",
        "cq-fundador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T11:00:00.000Z"
    },
    {
      "id": "me-027",
      "numeroMembro": "AO-29794",
      "nomeCompleto": "Paulo Sérgio Albuquerque",
      "nomeExibicao": "Paulo Sérgio",
      "usuario": "pauloalbuquerque",
      "email": "pauloalbuquerque@aordem.org",
      "telefone": "+55 (81) 98714-4338",
      "sexo": "masculino",
      "dataNascimento": "1990-11-25T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "204",
        "bairro": "Centro",
        "municipioId": "mu-lisboa",
        "estadoId": "es-lis",
        "paisId": "pa-pt",
        "cep": "5004338"
      },
      "paisId": "pa-pt",
      "estadoId": "es-lis",
      "municipioId": "mu-lisboa",
      "nucleoId": "nu-lisboa",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [
        "kyrios"
      ],
      "dataIngresso": "2025-03-08T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Metafísica",
        "Lógica",
        "Filosofia política"
      ],
      "areasAtuacao": [
        "Estudos",
        "Documentação"
      ],
      "competencias": [
        "Tradução",
        "Psicologia"
      ],
      "xp": 6132,
      "nivel": 9,
      "sequenciaDias": 20,
      "aliados": [
        "me-009",
        "me-018",
        "me-036",
        "me-045"
      ],
      "conquistas": [
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T10:00:00.000Z"
    },
    {
      "id": "me-028",
      "numeroMembro": "AO-29811",
      "nomeCompleto": "Natália Ferraz Gouveia",
      "nomeExibicao": "Natália Ferraz",
      "usuario": "nataliagouveia",
      "email": "nataliagouveia@aordem.org",
      "telefone": "+55 (81) 98703-4351",
      "sexo": "nao_informado",
      "dataNascimento": "1997-04-01T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "208",
        "bairro": "Centro",
        "municipioId": "mu-jaboatao",
        "estadoId": "es-pe",
        "paisId": "pa-br",
        "cep": "5004351"
      },
      "paisId": "pa-br",
      "estadoId": "es-pe",
      "municipioId": "mu-jaboatao",
      "nucleoId": "nu-jaboatao",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [],
      "dataIngresso": "2025-04-02T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Lógica",
        "Filosofia política",
        "Doutrina social"
      ],
      "areasAtuacao": [
        "Relações institucionais",
        "Tecnologia"
      ],
      "competencias": [
        "Educação",
        "Logística"
      ],
      "xp": 5705,
      "nivel": 9,
      "sequenciaDias": 19,
      "aliados": [
        "me-001",
        "me-010",
        "me-019",
        "me-037",
        "me-046"
      ],
      "conquistas": [
        "cq-formacao"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T09:00:00.000Z"
    },
    {
      "id": "me-029",
      "numeroMembro": "AO-29828",
      "nomeCompleto": "Ricardo Salgado Pinheiro",
      "nomeExibicao": "Ricardo Salgado",
      "usuario": "ricardopinheiro",
      "email": "ricardopinheiro@aordem.org",
      "telefone": "+55 (81) 98692-4364",
      "sexo": "masculino",
      "dataNascimento": "1972-09-04T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "212",
        "bairro": "Centro",
        "municipioId": "mu-recife",
        "estadoId": "es-pe",
        "paisId": "pa-br",
        "cep": "5004364"
      },
      "paisId": "pa-br",
      "estadoId": "es-pe",
      "municipioId": "mu-recife",
      "nucleoId": "nu-recife",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [],
      "dataIngresso": "2025-04-27T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Ética",
        "Epistemologia",
        "Filosofia política"
      ],
      "areasAtuacao": [
        "Finanças",
        "Comunicação"
      ],
      "competencias": [
        "Saúde",
        "Tecnologia"
      ],
      "xp": 5210,
      "nivel": 9,
      "sequenciaDias": 18,
      "aliados": [
        "me-002",
        "me-011",
        "me-020",
        "me-038"
      ],
      "conquistas": [
        "cq-formacao",
        "cq-orador",
        "cq-proposta"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T08:00:00.000Z"
    },
    {
      "id": "me-030",
      "numeroMembro": "AO-29845",
      "nomeCompleto": "Débora Xavier Marinho",
      "nomeExibicao": "Débora Xavier",
      "usuario": "deboramarinho",
      "email": "deboramarinho@aordem.org",
      "telefone": "+55 (81) 98681-4377",
      "sexo": "feminino",
      "dataNascimento": "1979-02-07T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "216",
        "bairro": "Centro",
        "municipioId": "mu-sp",
        "estadoId": "es-sp",
        "paisId": "pa-br",
        "cep": "5004377"
      },
      "paisId": "pa-br",
      "estadoId": "es-sp",
      "municipioId": "mu-sp",
      "nucleoId": "nu-sp",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [],
      "dataIngresso": "2025-05-22T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Filosofia política",
        "Estética",
        "Metafísica"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Formação"
      ],
      "competencias": [
        "Psicologia",
        "Educação"
      ],
      "xp": 4742,
      "nivel": 8,
      "sequenciaDias": 17,
      "aliados": [
        "me-003",
        "me-012",
        "me-021",
        "me-039"
      ],
      "conquistas": [],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T07:00:00.000Z"
    },
    {
      "id": "me-031",
      "numeroMembro": "AO-29862",
      "nomeCompleto": "Henrique Bandeira Costa",
      "nomeExibicao": "Henrique Bandeira",
      "usuario": "henriquecosta",
      "email": "henriquecosta@aordem.org",
      "telefone": "+55 (81) 98670-4390",
      "sexo": "masculino",
      "dataNascimento": "1986-07-10T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "220",
        "bairro": "Centro",
        "municipioId": "mu-campinas",
        "estadoId": "es-sp",
        "paisId": "pa-br",
        "cep": "5004390"
      },
      "paisId": "pa-br",
      "estadoId": "es-sp",
      "municipioId": "mu-campinas",
      "nucleoId": "nu-campinas",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [],
      "dataIngresso": "2025-06-16T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Metafísica",
        "Antropologia filosófica",
        "Doutrina social"
      ],
      "areasAtuacao": [
        "Organização territorial",
        "Formação"
      ],
      "competencias": [
        "Logística",
        "Assistência social"
      ],
      "xp": 4415,
      "nivel": 8,
      "sequenciaDias": 16,
      "aliados": [
        "me-004",
        "me-013",
        "me-022"
      ],
      "conquistas": [
        "cq-fundador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T06:00:00.000Z"
    },
    {
      "id": "me-032",
      "numeroMembro": "AO-29879",
      "nomeCompleto": "Sofia Rezende Tomás",
      "nomeExibicao": "Sofia Rezende",
      "usuario": "sofiatomas",
      "email": "sofiatomas@aordem.org",
      "telefone": "+55 (81) 98659-4403",
      "sexo": "feminino",
      "dataNascimento": "1993-12-13T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "224",
        "bairro": "Centro",
        "municipioId": "mu-rj",
        "estadoId": "es-rj",
        "paisId": "pa-br",
        "cep": "5004403"
      },
      "paisId": "pa-br",
      "estadoId": "es-rj",
      "municipioId": "mu-rj",
      "nucleoId": "nu-rj",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [
        "kyrios"
      ],
      "dataIngresso": "2025-07-11T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Lógica",
        "Retórica",
        "Filosofia política"
      ],
      "areasAtuacao": [
        "Eventos",
        "Comunicação"
      ],
      "competencias": [
        "Educação",
        "Contabilidade"
      ],
      "xp": 4622,
      "nivel": 8,
      "sequenciaDias": 15,
      "aliados": [
        "me-005",
        "me-014",
        "me-023",
        "me-041"
      ],
      "conquistas": [],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T05:00:00.000Z"
    },
    {
      "id": "me-033",
      "numeroMembro": "AO-29896",
      "nomeCompleto": "Alexandre Portela Vaz",
      "nomeExibicao": "Alexandre Portela",
      "usuario": "alexandrevaz",
      "email": "alexandrevaz@aordem.org",
      "telefone": "+55 (81) 98648-4416",
      "sexo": "masculino",
      "dataNascimento": "1968-05-16T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "228",
        "bairro": "Centro",
        "municipioId": "mu-bh",
        "estadoId": "es-mg",
        "paisId": "pa-br",
        "cep": "5004416"
      },
      "paisId": "pa-br",
      "estadoId": "es-mg",
      "municipioId": "mu-bh",
      "nucleoId": "nu-bh",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [],
      "dataIngresso": "2025-08-05T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Estética",
        "Doutrina social",
        "Retórica"
      ],
      "areasAtuacao": [
        "Formação",
        "Finanças"
      ],
      "competencias": [
        "Contabilidade",
        "Direito"
      ],
      "xp": 4148,
      "nivel": 8,
      "sequenciaDias": 14,
      "aliados": [
        "me-006",
        "me-015",
        "me-024",
        "me-042"
      ],
      "conquistas": [
        "cq-orador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T04:00:00.000Z"
    },
    {
      "id": "me-034",
      "numeroMembro": "AO-29913",
      "nomeCompleto": "Clarice Almeida Rangel",
      "nomeExibicao": "Clarice Almeida",
      "usuario": "claricerangel",
      "email": "claricerangel@aordem.org",
      "telefone": "+55 (81) 98637-4429",
      "sexo": "feminino",
      "dataNascimento": "1975-10-19T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "232",
        "bairro": "Centro",
        "municipioId": "mu-salvador",
        "estadoId": "es-ba",
        "paisId": "pa-br",
        "cep": "5004429"
      },
      "paisId": "pa-br",
      "estadoId": "es-ba",
      "municipioId": "mu-salvador",
      "nucleoId": "nu-salvador",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-aretaios",
      "titulos": [],
      "dataIngresso": "2025-08-30T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Ética",
        "Lógica",
        "Antropologia filosófica"
      ],
      "areasAtuacao": [
        "Relações institucionais",
        "Tecnologia"
      ],
      "competencias": [
        "Educação",
        "Comunicação"
      ],
      "xp": 3971,
      "nivel": 8,
      "sequenciaDias": 13,
      "aliados": [
        "me-007",
        "me-016",
        "me-025",
        "me-043"
      ],
      "conquistas": [],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T03:00:00.000Z"
    },
    {
      "id": "me-035",
      "numeroMembro": "AO-29930",
      "nomeCompleto": "Matheus Godoy Serrano",
      "nomeExibicao": "Matheus Godoy",
      "usuario": "matheusserrano",
      "email": "matheusserrano@aordem.org",
      "telefone": "+55 (81) 98626-4442",
      "sexo": "masculino",
      "dataNascimento": "1982-03-22T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "236",
        "bairro": "Centro",
        "municipioId": "mu-brasilia",
        "estadoId": "es-df",
        "paisId": "pa-br",
        "cep": "5004442"
      },
      "paisId": "pa-br",
      "estadoId": "es-df",
      "municipioId": "mu-brasilia",
      "nucleoId": "nu-brasilia",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-empeiros",
      "titulos": [],
      "dataIngresso": "2025-09-24T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Epistemologia",
        "Filosofia política",
        "História das ideias"
      ],
      "areasAtuacao": [
        "Organização territorial",
        "Eventos"
      ],
      "competencias": [
        "Tradução",
        "Educação"
      ],
      "xp": 4091,
      "nivel": 8,
      "sequenciaDias": 12,
      "aliados": [
        "me-008",
        "me-017",
        "me-026",
        "me-044"
      ],
      "conquistas": [],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T02:00:00.000Z"
    },
    {
      "id": "me-036",
      "numeroMembro": "AO-29947",
      "nomeCompleto": "Vitória Lemos Bittencourt",
      "nomeExibicao": "Vitória Lemos",
      "usuario": "vitoriabittencourt",
      "email": "vitoriabittencourt@aordem.org",
      "telefone": "+55 (81) 98615-4455",
      "sexo": "feminino",
      "dataNascimento": "1989-08-25T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "240",
        "bairro": "Centro",
        "municipioId": "mu-lisboa",
        "estadoId": "es-lis",
        "paisId": "pa-pt",
        "cep": "5004455"
      },
      "paisId": "pa-pt",
      "estadoId": "es-lis",
      "municipioId": "mu-lisboa",
      "nucleoId": "nu-lisboa",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-aretaios",
      "titulos": [],
      "dataIngresso": "2025-10-19T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Retórica",
        "Doutrina social",
        "Economia política"
      ],
      "areasAtuacao": [
        "Formação",
        "Comunicação"
      ],
      "competencias": [
        "Logística",
        "Comunicação"
      ],
      "xp": 3316,
      "nivel": 7,
      "sequenciaDias": 11,
      "aliados": [
        "me-009",
        "me-018",
        "me-027"
      ],
      "conquistas": [
        "cq-proposta",
        "cq-fundador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T01:00:00.000Z"
    },
    {
      "id": "me-037",
      "numeroMembro": "AO-29964",
      "nomeCompleto": "Sérgio Vilela Macedo",
      "nomeExibicao": "Sérgio Vilela",
      "usuario": "sergiomacedo",
      "email": "sergiomacedo@aordem.org",
      "telefone": "+55 (81) 98604-4468",
      "sexo": "nao_informado",
      "dataNascimento": "1996-01-01T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "244",
        "bairro": "Centro",
        "municipioId": "mu-jaboatao",
        "estadoId": "es-pe",
        "paisId": "pa-br",
        "cep": "5004468"
      },
      "paisId": "pa-br",
      "estadoId": "es-pe",
      "municipioId": "mu-jaboatao",
      "nucleoId": "nu-jaboatao",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-aretaios",
      "titulos": [],
      "dataIngresso": "2025-11-13T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Antropologia filosófica",
        "Doutrina social",
        "Lógica"
      ],
      "areasAtuacao": [
        "Eventos",
        "Relações institucionais"
      ],
      "competencias": [
        "Contabilidade",
        "Direito"
      ],
      "xp": 3430,
      "nivel": 7,
      "sequenciaDias": 10,
      "aliados": [
        "me-001",
        "me-010",
        "me-019",
        "me-028"
      ],
      "conquistas": [
        "cq-orador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-19T00:00:00.000Z"
    },
    {
      "id": "me-038",
      "numeroMembro": "AO-29981",
      "nomeCompleto": "Amanda Correia Falcão",
      "nomeExibicao": "Amanda Correia",
      "usuario": "amandafalcao",
      "email": "amandafalcao@aordem.org",
      "telefone": "+55 (81) 98593-4481",
      "sexo": "feminino",
      "dataNascimento": "1971-06-04T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "248",
        "bairro": "Centro",
        "municipioId": "mu-recife",
        "estadoId": "es-pe",
        "paisId": "pa-br",
        "cep": "5004481"
      },
      "paisId": "pa-br",
      "estadoId": "es-pe",
      "municipioId": "mu-recife",
      "nucleoId": "nu-recife",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-aretaios",
      "titulos": [],
      "dataIngresso": "2025-12-08T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Lógica",
        "Economia política",
        "Filosofia do direito"
      ],
      "areasAtuacao": [
        "Relações institucionais",
        "Finanças"
      ],
      "competencias": [
        "Saúde",
        "Contabilidade"
      ],
      "xp": 2970,
      "nivel": 7,
      "sequenciaDias": 9,
      "aliados": [
        "me-002",
        "me-011",
        "me-020",
        "me-029"
      ],
      "conquistas": [],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-18T23:00:00.000Z"
    },
    {
      "id": "me-039",
      "numeroMembro": "AO-29998",
      "nomeCompleto": "Thiago Rebouças Meira",
      "nomeExibicao": "Thiago Rebouças",
      "usuario": "thiagomeira",
      "email": "thiagomeira@aordem.org",
      "telefone": "+55 (81) 98582-4494",
      "sexo": "masculino",
      "dataNascimento": "1978-11-07T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "252",
        "bairro": "Centro",
        "municipioId": "mu-sp",
        "estadoId": "es-sp",
        "paisId": "pa-br",
        "cep": "5004494"
      },
      "paisId": "pa-br",
      "estadoId": "es-sp",
      "municipioId": "mu-sp",
      "nucleoId": "nu-sp",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "juvenil",
      "grauId": "grau-prokopos",
      "titulos": [],
      "dataIngresso": "2026-01-02T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Filosofia do direito",
        "História das ideias",
        "Ética"
      ],
      "areasAtuacao": [
        "Estudos",
        "Comunicação"
      ],
      "competencias": [
        "Logística",
        "Psicologia"
      ],
      "xp": 2571,
      "nivel": 6,
      "sequenciaDias": 8,
      "aliados": [
        "me-003",
        "me-012",
        "me-021",
        "me-030"
      ],
      "conquistas": [],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-18T22:00:00.000Z"
    },
    {
      "id": "me-040",
      "numeroMembro": "AO-30015",
      "nomeCompleto": "Elisa Marques Sobral",
      "nomeExibicao": "Elisa Marques",
      "usuario": "elisasobral",
      "email": "elisasobral@aordem.org",
      "telefone": "+55 (81) 98571-4507",
      "sexo": "feminino",
      "dataNascimento": "1985-04-10T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "256",
        "bairro": "Centro",
        "municipioId": "mu-campinas",
        "estadoId": "es-sp",
        "paisId": "pa-br",
        "cep": "5004507"
      },
      "paisId": "pa-br",
      "estadoId": "es-sp",
      "municipioId": "mu-campinas",
      "nucleoId": "nu-campinas",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "benemerito",
      "grauId": "grau-prokopos",
      "titulos": [],
      "dataIngresso": "2026-01-27T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Filosofia política",
        "Lógica",
        "Filosofia do direito"
      ],
      "areasAtuacao": [
        "Mobilização",
        "Eventos"
      ],
      "competencias": [
        "Tecnologia",
        "Logística"
      ],
      "xp": 2646,
      "nivel": 6,
      "sequenciaDias": 7,
      "aliados": [
        "me-004",
        "me-013",
        "me-022",
        "me-031"
      ],
      "conquistas": [],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-18T21:00:00.000Z"
    },
    {
      "id": "me-041",
      "numeroMembro": "AO-30032",
      "nomeCompleto": "Caio Bulhões Neves",
      "nomeExibicao": "Caio Bulhões",
      "usuario": "caioneves",
      "email": "caioneves@aordem.org",
      "telefone": "+55 (81) 98560-4520",
      "sexo": "masculino",
      "dataNascimento": "1992-09-13T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "260",
        "bairro": "Centro",
        "municipioId": "mu-rj",
        "estadoId": "es-rj",
        "paisId": "pa-br",
        "cep": "5004520"
      },
      "paisId": "pa-br",
      "estadoId": "es-rj",
      "municipioId": "mu-rj",
      "nucleoId": "nu-rj",
      "cargoId": "cargo-candidato",
      "situacao": "pendente",
      "categoriaAssociativa": "transicao",
      "grauId": "grau-recruta",
      "titulos": [],
      "dataIngresso": "2026-08-07T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Filosofia do direito",
        "Ética",
        "Estética"
      ],
      "areasAtuacao": [
        "Organização territorial",
        "Documentação"
      ],
      "competencias": [],
      "xp": 0,
      "nivel": 1,
      "sequenciaDias": 0,
      "aliados": [
        "me-005",
        "me-014",
        "me-023"
      ],
      "conquistas": [
        "cq-orador",
        "cq-fundador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T12:00:00.000Z"
    },
    {
      "id": "me-042",
      "numeroMembro": "AO-30049",
      "nomeCompleto": "Letícia Aguiar Pontes",
      "nomeExibicao": "Letícia Aguiar",
      "usuario": "leticiapontes",
      "email": "leticiapontes@aordem.org",
      "telefone": "+55 (81) 98549-4533",
      "sexo": "feminino",
      "dataNascimento": "1999-02-16T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "264",
        "bairro": "Centro",
        "municipioId": "mu-bh",
        "estadoId": "es-mg",
        "paisId": "pa-br",
        "cep": "5004533"
      },
      "paisId": "pa-br",
      "estadoId": "es-mg",
      "municipioId": "mu-bh",
      "nucleoId": "nu-bh",
      "cargoId": "cargo-candidato",
      "situacao": "pendente",
      "categoriaAssociativa": "transicao",
      "grauId": "grau-recruta",
      "titulos": [],
      "dataIngresso": "2026-07-27T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Economia política",
        "Filosofia do direito",
        "Antropologia filosófica"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Documentação"
      ],
      "competencias": [],
      "xp": 0,
      "nivel": 1,
      "sequenciaDias": 0,
      "aliados": [
        "me-006",
        "me-015",
        "me-024",
        "me-033"
      ],
      "conquistas": [],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T11:00:00.000Z"
    },
    {
      "id": "me-043",
      "numeroMembro": "AO-30066",
      "nomeCompleto": "Fábio Cordeiro Sena",
      "nomeExibicao": "Fábio Cordeiro",
      "usuario": "fabiosena",
      "email": "fabiosena@aordem.org",
      "telefone": "+55 (81) 98538-4546",
      "sexo": "masculino",
      "dataNascimento": "1974-07-19T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "268",
        "bairro": "Centro",
        "municipioId": "mu-salvador",
        "estadoId": "es-ba",
        "paisId": "pa-br",
        "cep": "5004546"
      },
      "paisId": "pa-br",
      "estadoId": "es-ba",
      "municipioId": "mu-salvador",
      "nucleoId": "nu-salvador",
      "cargoId": "cargo-candidato",
      "situacao": "pendente",
      "categoriaAssociativa": "transicao",
      "grauId": "grau-recruta",
      "titulos": [],
      "dataIngresso": "2026-08-14T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Economia política",
        "Filosofia do direito",
        "Epistemologia"
      ],
      "areasAtuacao": [
        "Documentação",
        "Tecnologia"
      ],
      "competencias": [],
      "xp": 0,
      "nivel": 1,
      "sequenciaDias": 0,
      "aliados": [
        "me-007",
        "me-016",
        "me-025",
        "me-034"
      ],
      "conquistas": [
        "cq-proposta"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T10:00:00.000Z"
    },
    {
      "id": "me-044",
      "numeroMembro": "AO-30083",
      "nomeCompleto": "Raquel Simões Trindade",
      "nomeExibicao": "Raquel Simões",
      "usuario": "raqueltrindade",
      "email": "raqueltrindade@aordem.org",
      "telefone": "+55 (81) 98527-4559",
      "sexo": "feminino",
      "dataNascimento": "1981-12-22T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "272",
        "bairro": "Centro",
        "municipioId": "mu-brasilia",
        "estadoId": "es-df",
        "paisId": "pa-br",
        "cep": "5004559"
      },
      "paisId": "pa-br",
      "estadoId": "es-df",
      "municipioId": "mu-brasilia",
      "nucleoId": "nu-brasilia",
      "cargoId": "cargo-membro",
      "situacao": "suspenso",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-mathetes",
      "titulos": [],
      "dataIngresso": "2026-05-07T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "História das ideias",
        "Filosofia política",
        "Metafísica"
      ],
      "areasAtuacao": [
        "Mobilização",
        "Tecnologia"
      ],
      "competencias": [],
      "xp": 1602,
      "nivel": 5,
      "sequenciaDias": 0,
      "aliados": [
        "me-008",
        "me-017",
        "me-026",
        "me-035"
      ],
      "conquistas": [],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T09:00:00.000Z"
    },
    {
      "id": "me-045",
      "numeroMembro": "AO-30100",
      "nomeCompleto": "Nelson Vieira Brandão",
      "nomeExibicao": "Nelson Vieira",
      "usuario": "nelsonbrandao",
      "email": "nelsonbrandao@aordem.org",
      "telefone": "+55 (81) 98516-4572",
      "sexo": "masculino",
      "dataNascimento": "1988-05-25T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "276",
        "bairro": "Centro",
        "municipioId": "mu-lisboa",
        "estadoId": "es-lis",
        "paisId": "pa-pt",
        "cep": "5004572"
      },
      "paisId": "pa-pt",
      "estadoId": "es-lis",
      "municipioId": "mu-lisboa",
      "nucleoId": "nu-lisboa",
      "cargoId": "cargo-membro",
      "situacao": "inativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-anchario",
      "titulos": [],
      "dataIngresso": "2026-06-01T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "História das ideias",
        "Economia política",
        "Lógica"
      ],
      "areasAtuacao": [
        "Finanças",
        "Formação"
      ],
      "competencias": [],
      "xp": 936,
      "nivel": 4,
      "sequenciaDias": 0,
      "aliados": [
        "me-009",
        "me-018",
        "me-027",
        "me-036"
      ],
      "conquistas": [
        "cq-orador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T08:00:00.000Z"
    },
    {
      "id": "me-046",
      "numeroMembro": "AO-30117",
      "nomeCompleto": "Cecília Torres Malta",
      "nomeExibicao": "Cecília Torres",
      "usuario": "ceciliamalta",
      "email": "ceciliamalta@aordem.org",
      "telefone": "+55 (81) 98505-4585",
      "sexo": "nao_informado",
      "dataNascimento": "1995-10-01T00:00:00.000Z",
      "endereco": {
        "logradouro": "Avenida das Assembleias",
        "numero": "280",
        "bairro": "Centro",
        "municipioId": "mu-jaboatao",
        "estadoId": "es-pe",
        "paisId": "pa-br",
        "cep": "5004585"
      },
      "paisId": "pa-br",
      "estadoId": "es-pe",
      "municipioId": "mu-jaboatao",
      "nucleoId": "nu-jaboatao",
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "categoriaAssociativa": "efetivo",
      "grauId": "grau-anchario",
      "titulos": [],
      "dataIngresso": "2026-06-26T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Filosofia política",
        "Retórica",
        "Lógica"
      ],
      "areasAtuacao": [
        "Eventos",
        "Tecnologia"
      ],
      "competencias": [
        "Comunicação",
        "Psicologia"
      ],
      "xp": 702,
      "nivel": 3,
      "sequenciaDias": 1,
      "aliados": [
        "me-001",
        "me-010",
        "me-019"
      ],
      "conquistas": [
        "cq-fundador"
      ],
      "privacidade": {
        "email": "administracao",
        "telefone": "nucleo",
        "endereco": "administracao",
        "dataNascimento": "nucleo",
        "perfil": "publico",
        "publicacoes": "publico"
      },
      "autenticacaoDoisFatores": false,
      "ultimoAcesso": "2026-08-20T07:00:00.000Z"
    }
  ],
  "nucleos": [
    {
      "id": "nu-jaboatao",
      "nome": "Núcleo Jaboatão dos Guararapes",
      "codigo": "JAB-001",
      "paisId": "pa-br",
      "estadoId": "es-pe",
      "municipioId": "mu-jaboatao",
      "endereco": "Rua da Formação, 120 — Centro",
      "dataFundacao": "2026-02-14T12:00:00.000Z",
      "dirigenteId": "me-019",
      "secretarioId": "me-001",
      "tesoureiroId": "me-010",
      "situacao": "ativo",
      "descricao": "Unidade territorial responsável pela formação, mobilização e representação da Ordem em sua área de atuação.",
      "contatoEmail": "nucleo-jaboatao-dos-guararapes@aordem.org",
      "contatoTelefone": "+55 (81) 98000-1000"
    },
    {
      "id": "nu-recife",
      "nome": "Núcleo Recife Central",
      "codigo": "REC-002",
      "paisId": "pa-br",
      "estadoId": "es-pe",
      "municipioId": "mu-recife",
      "endereco": "Rua da Formação, 157 — Centro",
      "dataFundacao": "2025-09-03T12:00:00.000Z",
      "dirigenteId": "me-011",
      "secretarioId": "me-002",
      "tesoureiroId": "me-020",
      "situacao": "ativo",
      "descricao": "Unidade territorial responsável pela formação, mobilização e representação da Ordem em sua área de atuação.",
      "contatoEmail": "nucleo-recife-central@aordem.org",
      "contatoTelefone": "+55 (81) 98013-1007"
    },
    {
      "id": "nu-sp",
      "nome": "Núcleo São Paulo Central",
      "codigo": "SPC-003",
      "paisId": "pa-br",
      "estadoId": "es-sp",
      "municipioId": "mu-sp",
      "endereco": "Rua da Formação, 194 — Centro",
      "dataFundacao": "2025-05-20T12:00:00.000Z",
      "dirigenteId": "me-012",
      "secretarioId": "me-003",
      "tesoureiroId": "me-021",
      "situacao": "ativo",
      "descricao": "Unidade territorial responsável pela formação, mobilização e representação da Ordem em sua área de atuação.",
      "contatoEmail": "nucleo-sao-paulo-central@aordem.org",
      "contatoTelefone": "+55 (81) 98026-1014"
    },
    {
      "id": "nu-campinas",
      "nome": "Núcleo Campinas",
      "codigo": "CAM-004",
      "paisId": "pa-br",
      "estadoId": "es-sp",
      "municipioId": "mu-campinas",
      "endereco": "Rua da Formação, 231 — Centro",
      "dataFundacao": "2026-01-11T12:00:00.000Z",
      "dirigenteId": "me-013",
      "secretarioId": "me-004",
      "tesoureiroId": "me-022",
      "situacao": "ativo",
      "descricao": "Unidade territorial responsável pela formação, mobilização e representação da Ordem em sua área de atuação.",
      "contatoEmail": "nucleo-campinas@aordem.org",
      "contatoTelefone": "+55 (81) 98039-1021"
    },
    {
      "id": "nu-rj",
      "nome": "Núcleo Rio de Janeiro",
      "codigo": "RIO-005",
      "paisId": "pa-br",
      "estadoId": "es-rj",
      "municipioId": "mu-rj",
      "endereco": "Rua da Formação, 268 — Centro",
      "dataFundacao": "2025-07-08T12:00:00.000Z",
      "dirigenteId": "me-014",
      "secretarioId": "me-005",
      "tesoureiroId": "me-023",
      "situacao": "ativo",
      "descricao": "Unidade territorial responsável pela formação, mobilização e representação da Ordem em sua área de atuação.",
      "contatoEmail": "nucleo-rio-de-janeiro@aordem.org",
      "contatoTelefone": "+55 (81) 98052-1028"
    },
    {
      "id": "nu-bh",
      "nome": "Núcleo Belo Horizonte",
      "codigo": "BHZ-006",
      "paisId": "pa-br",
      "estadoId": "es-mg",
      "municipioId": "mu-bh",
      "endereco": "Rua da Formação, 305 — Centro",
      "dataFundacao": "2026-03-02T12:00:00.000Z",
      "dirigenteId": "me-015",
      "secretarioId": "me-006",
      "tesoureiroId": "me-024",
      "situacao": "ativo",
      "descricao": "Unidade territorial responsável pela formação, mobilização e representação da Ordem em sua área de atuação.",
      "contatoEmail": "nucleo-belo-horizonte@aordem.org",
      "contatoTelefone": "+55 (81) 98065-1035"
    },
    {
      "id": "nu-salvador",
      "nome": "Núcleo Salvador",
      "codigo": "SSA-007",
      "paisId": "pa-br",
      "estadoId": "es-ba",
      "municipioId": "mu-salvador",
      "endereco": "Rua da Formação, 342 — Centro",
      "dataFundacao": "2026-04-19T12:00:00.000Z",
      "dirigenteId": "me-016",
      "secretarioId": "me-007",
      "tesoureiroId": "me-025",
      "situacao": "em_formacao",
      "descricao": "Unidade territorial responsável pela formação, mobilização e representação da Ordem em sua área de atuação.",
      "contatoEmail": "nucleo-salvador@aordem.org",
      "contatoTelefone": "+55 (81) 98078-1042"
    },
    {
      "id": "nu-brasilia",
      "nome": "Núcleo Brasília",
      "codigo": "BSB-008",
      "paisId": "pa-br",
      "estadoId": "es-df",
      "municipioId": "mu-brasilia",
      "endereco": "Rua da Formação, 379 — Centro",
      "dataFundacao": "2025-11-27T12:00:00.000Z",
      "dirigenteId": "me-017",
      "secretarioId": "me-008",
      "tesoureiroId": "me-026",
      "situacao": "ativo",
      "descricao": "Unidade territorial responsável pela formação, mobilização e representação da Ordem em sua área de atuação.",
      "contatoEmail": "nucleo-brasilia@aordem.org",
      "contatoTelefone": "+55 (81) 98091-1049"
    },
    {
      "id": "nu-lisboa",
      "nome": "Núcleo Lisboa",
      "codigo": "LIS-009",
      "paisId": "pa-pt",
      "estadoId": "es-lis",
      "municipioId": "mu-lisboa",
      "endereco": "Rua da Formação, 416 — Centro",
      "dataFundacao": "2026-05-30T12:00:00.000Z",
      "dirigenteId": "me-018",
      "secretarioId": "me-009",
      "tesoureiroId": "me-027",
      "situacao": "em_formacao",
      "descricao": "Unidade territorial responsável pela formação, mobilização e representação da Ordem em sua área de atuação.",
      "contatoEmail": "nucleo-lisboa@aordem.org",
      "contatoTelefone": "+55 (81) 98104-1056"
    }
  ],
  "publicacoes": [
    {
      "id": "pu-001",
      "autorId": "me-004",
      "emitidoPor": "Secretaria-Geral",
      "oficial": true,
      "categoria": "comunicado",
      "nucleoId": null,
      "titulo": "Atualização do Protocolo de Atuação Territorial",
      "conteudo": "A Secretaria-Geral comunica a conclusão da revisão trimestral dos protocolos de atuação territorial. As novas diretrizes consolidam a padronização da comunicação institucional, definem o rito de convocação das assembleias de Núcleo e atualizam o fluxo de registro de presença. A leitura é obrigatória para dirigentes e coordenadores até o dia 30.",
      "anexos": [
        {
          "tipo": "documento",
          "titulo": "Protocolo_Atuacao_Territorial_v4.pdf",
          "tamanho": "2,4 MB",
          "descricao": "Documento oficial · versão 4.0"
        }
      ],
      "criadoEm": "2026-08-20T11:00:00.000Z",
      "fixado": true,
      "destaque": true,
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023",
        "me-024",
        "me-025",
        "me-026",
        "me-027",
        "me-028",
        "me-029",
        "me-030",
        "me-031",
        "me-032",
        "me-033",
        "me-034",
        "me-035",
        "me-036",
        "me-037",
        "me-038",
        "me-039",
        "me-040",
        "me-041"
      ],
      "salvoPor": [
        "me-001"
      ],
      "compartilhamentos": 64,
      "visibilidade": "publico"
    },
    {
      "id": "pu-002",
      "autorId": "me-007",
      "emitidoPor": null,
      "oficial": false,
      "categoria": "formacao",
      "nucleoId": null,
      "titulo": "Módulo III — Fundamentos do Pensamento Político",
      "conteudo": "O terceiro módulo da trilha Fundamentos aprofunda a raiz histórica do pensamento político moderno. Compreender a formação do Estado e a disputa entre as escolas contratualistas é condição para qualquer projeção séria de atuação. Assistam antes do encontro regional de sábado.",
      "anexos": [
        {
          "tipo": "video",
          "titulo": "Aula III — Contratualismo e soberania",
          "duracao": "45:20"
        }
      ],
      "criadoEm": "2026-08-20T08:00:00.000Z",
      "fixado": false,
      "destaque": false,
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023",
        "me-024",
        "me-025",
        "me-026",
        "me-027",
        "me-028",
        "me-029",
        "me-030",
        "me-031",
        "me-032",
        "me-033",
        "me-034",
        "me-035",
        "me-036",
        "me-037",
        "me-038"
      ],
      "salvoPor": [],
      "compartilhamentos": 21,
      "visibilidade": "publico"
    },
    {
      "id": "pu-003",
      "autorId": "me-002",
      "emitidoPor": null,
      "oficial": false,
      "categoria": "noticia",
      "nucleoId": null,
      "titulo": null,
      "conteudo": "Encerramos o mês com 46 membros ativos distribuídos em nove Núcleos e dois países. O crescimento sustentado da Ordem depende menos do número e mais da qualidade da formação de cada membro. Que os novos ingressos encontrem aqui rigor e acolhimento.",
      "anexos": [],
      "criadoEm": "2026-08-20T04:00:00.000Z",
      "fixado": false,
      "destaque": false,
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023",
        "me-024",
        "me-025",
        "me-026",
        "me-027",
        "me-028",
        "me-029",
        "me-030",
        "me-031",
        "me-032",
        "me-033",
        "me-034",
        "me-035",
        "me-036",
        "me-037",
        "me-038",
        "me-039",
        "me-040",
        "me-041",
        "me-042",
        "me-043",
        "me-044"
      ],
      "salvoPor": [],
      "compartilhamentos": 12,
      "visibilidade": "publico"
    },
    {
      "id": "pu-004",
      "autorId": "me-003",
      "emitidoPor": "Presidência",
      "oficial": true,
      "categoria": "comunicado",
      "nucleoId": null,
      "titulo": "Convocação da Assembleia Ordinária",
      "conteudo": "Convocação: Assembleia Ordinária da Ordem, com pauta única sobre a reforma do Regimento Interno. A participação é aberta a todos os membros ativos e a votação será registrada nominalmente. O documento em discussão encontra-se na biblioteca institucional.",
      "anexos": [
        {
          "tipo": "evento",
          "titulo": "Assembleia Ordinária",
          "descricao": "05 de setembro · 19h · Híbrido"
        }
      ],
      "criadoEm": "2026-08-19T11:00:00.000Z",
      "fixado": false,
      "destaque": true,
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023",
        "me-024",
        "me-025",
        "me-026",
        "me-027",
        "me-028",
        "me-029",
        "me-030",
        "me-031",
        "me-032",
        "me-033",
        "me-034",
        "me-035",
        "me-036",
        "me-037",
        "me-038",
        "me-039",
        "me-040"
      ],
      "salvoPor": [
        "me-001"
      ],
      "compartilhamentos": 88,
      "visibilidade": "publico"
    },
    {
      "id": "pu-005",
      "autorId": "me-009",
      "emitidoPor": null,
      "oficial": false,
      "categoria": "nucleo",
      "nucleoId": "nu-recife",
      "titulo": null,
      "conteudo": "O Núcleo Recife Central concluiu o ciclo de leitura dirigida sobre ética e virtude cívica. Foram doze encontros, trinta e dois participantes e uma síntese coletiva que será enviada à Secretaria de Formação.",
      "anexos": [
        {
          "tipo": "imagem",
          "titulo": "Encerramento do ciclo de leitura"
        }
      ],
      "criadoEm": "2026-08-19T06:00:00.000Z",
      "fixado": false,
      "destaque": false,
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023",
        "me-024",
        "me-025",
        "me-026",
        "me-027"
      ],
      "salvoPor": [],
      "compartilhamentos": 6,
      "visibilidade": "publico"
    },
    {
      "id": "pu-006",
      "autorId": "me-005",
      "emitidoPor": "Tesouraria",
      "oficial": true,
      "categoria": "comunicado",
      "nucleoId": null,
      "titulo": "Balancete mensal disponível",
      "conteudo": "A Tesouraria informa que o balancete do mês está disponível para consulta dos membros ativos. Receitas de contribuições ordinárias somaram R$ 28.450,00 e as despesas operacionais, R$ 12.320,00. Transparência é dever, não concessão.",
      "anexos": [
        {
          "tipo": "documento",
          "titulo": "Balancete_Agosto.pdf",
          "tamanho": "640 KB"
        }
      ],
      "criadoEm": "2026-08-18T13:00:00.000Z",
      "fixado": false,
      "destaque": false,
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023",
        "me-024",
        "me-025",
        "me-026",
        "me-027",
        "me-028",
        "me-029",
        "me-030",
        "me-031",
        "me-032",
        "me-033"
      ],
      "salvoPor": [],
      "compartilhamentos": 9,
      "visibilidade": "publico"
    },
    {
      "id": "pu-007",
      "autorId": "me-012",
      "emitidoPor": null,
      "oficial": false,
      "categoria": "membro",
      "nucleoId": "nu-sp",
      "titulo": null,
      "conteudo": "Registro do círculo de debate sobre representação e legitimidade realizado ontem no Núcleo São Paulo Central. Ficou clara a necessidade de aprofundarmos a leitura dos federalistas antes do próximo encontro.",
      "anexos": [],
      "criadoEm": "2026-08-18T08:00:00.000Z",
      "fixado": false,
      "destaque": false,
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019"
      ],
      "salvoPor": [],
      "compartilhamentos": 3,
      "visibilidade": "publico"
    },
    {
      "id": "pu-008",
      "autorId": "me-004",
      "emitidoPor": "Secretaria-Geral",
      "oficial": true,
      "categoria": "evento",
      "nucleoId": null,
      "titulo": "Inscrições abertas — Congresso Regional Nordeste",
      "conteudo": "Estão abertas as inscrições para o Congresso Regional Nordeste. Vagas limitadas por Núcleo; a confirmação de presença gera 120 XP e conta para a sequência de participação.",
      "anexos": [
        {
          "tipo": "enquete",
          "titulo": "Você pretende participar presencialmente?",
          "opcoes": [
            {
              "id": "op-1",
              "texto": "Sim, presencialmente",
              "votos": 128
            },
            {
              "id": "op-2",
              "texto": "Sim, on-line",
              "votos": 74
            },
            {
              "id": "op-3",
              "texto": "Ainda avaliando",
              "votos": 31
            }
          ]
        }
      ],
      "criadoEm": "2026-08-17T15:00:00.000Z",
      "fixado": false,
      "destaque": false,
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023",
        "me-024",
        "me-025",
        "me-026",
        "me-027",
        "me-028",
        "me-029",
        "me-030",
        "me-031",
        "me-032",
        "me-033",
        "me-034",
        "me-035",
        "me-036"
      ],
      "salvoPor": [],
      "compartilhamentos": 41,
      "visibilidade": "publico"
    },
    {
      "id": "pu-009",
      "autorId": "me-016",
      "emitidoPor": null,
      "oficial": false,
      "categoria": "formacao",
      "nucleoId": null,
      "titulo": null,
      "conteudo": "Compartilho a bibliografia complementar do módulo de Filosofia do Direito. Recomendo iniciar pelo capítulo sobre normatividade antes de avançar para a crítica positivista.",
      "anexos": [
        {
          "tipo": "link",
          "titulo": "Bibliografia complementar — Filosofia do Direito",
          "url": "https://biblioteca.aordem.org/filosofia-do-direito"
        }
      ],
      "criadoEm": "2026-08-16T13:00:00.000Z",
      "fixado": false,
      "destaque": false,
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022"
      ],
      "salvoPor": [],
      "compartilhamentos": 7,
      "visibilidade": "publico"
    },
    {
      "id": "pu-010",
      "autorId": "me-021",
      "emitidoPor": null,
      "oficial": false,
      "categoria": "nucleo",
      "nucleoId": "nu-brasilia",
      "titulo": null,
      "conteudo": "O Núcleo Brasília realizou mutirão de organização do acervo documental. Agradeço a todos os que dedicaram o sábado ao trabalho silencioso que sustenta a instituição.",
      "anexos": [],
      "criadoEm": "2026-08-15T13:00:00.000Z",
      "fixado": false,
      "destaque": false,
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023",
        "me-024",
        "me-025"
      ],
      "salvoPor": [],
      "compartilhamentos": 4,
      "visibilidade": "publico"
    }
  ],
  "comentarios": [
    {
      "id": "co-1",
      "publicacaoId": "pu-001",
      "autorId": "me-009",
      "conteudo": "Leitura concluída. O novo rito de convocação resolve a ambiguidade que tivemos em junho.",
      "criadoEm": "2026-08-20T12:00:00.000Z",
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006"
      ]
    },
    {
      "id": "co-2",
      "publicacaoId": "pu-001",
      "autorId": "me-016",
      "conteudo": "Sugiro que a Secretaria publique um resumo de uma página para os Núcleos em formação.",
      "criadoEm": "2026-08-20T12:00:00.000Z",
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006"
      ]
    },
    {
      "id": "co-3",
      "publicacaoId": "pu-002",
      "autorId": "me-001",
      "conteudo": "Excelente síntese. O ponto sobre soberania mereceria um encontro próprio.",
      "criadoEm": "2026-08-20T09:00:00.000Z",
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006"
      ]
    },
    {
      "id": "co-4",
      "publicacaoId": "pu-004",
      "autorId": "me-012",
      "conteudo": "Presença confirmada. Levarei a proposta do Núcleo São Paulo Central à pauta.",
      "criadoEm": "2026-08-19T17:00:00.000Z",
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006"
      ]
    },
    {
      "id": "co-5",
      "publicacaoId": "pu-006",
      "autorId": "me-003",
      "conteudo": "Registro o reconhecimento da Presidência ao trabalho da Tesouraria.",
      "criadoEm": "2026-08-18T21:00:00.000Z",
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006"
      ]
    },
    {
      "id": "co-6",
      "publicacaoId": "pu-008",
      "autorId": "me-001",
      "conteudo": "Inscrição feita. Alguém do Núcleo Jaboatão vai de carro?",
      "criadoEm": "2026-08-18T01:00:00.000Z",
      "curtidas": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006"
      ]
    }
  ],
  "eventos": [
    {
      "id": "ev-001",
      "titulo": "Congresso Regional Nordeste",
      "descricao": "Encontro anual dos Núcleos do Nordeste, com painéis de formação, prestação de contas regional e eleição dos coordenadores de área.",
      "inicio": "2026-08-24T19:00:00.000Z",
      "fim": "2026-08-24T22:00:00.000Z",
      "local": "Centro de Convenções, Recife — PE",
      "modalidade": "presencial",
      "responsavelId": "me-004",
      "nucleoId": "nu-recife",
      "limiteParticipantes": 180,
      "xpParticipacao": 120,
      "inscricoesAbertas": true
    },
    {
      "id": "ev-002",
      "titulo": "Treinamento de Liderança de Núcleo",
      "descricao": "Formação obrigatória para dirigentes e coordenadores sobre condução de reuniões, registro de presença e prestação de contas.",
      "inicio": "2026-09-05T19:00:00.000Z",
      "fim": "2026-09-05T22:00:00.000Z",
      "local": "Transmissão on-line",
      "modalidade": "online",
      "responsavelId": "me-002",
      "nucleoId": null,
      "limiteParticipantes": null,
      "xpParticipacao": 90,
      "inscricoesAbertas": true
    },
    {
      "id": "ev-003",
      "titulo": "Assembleia Ordinária da Ordem",
      "descricao": "Pauta única: reforma do Regimento Interno. Votação nominal registrada em ata.",
      "inicio": "2026-09-11T19:00:00.000Z",
      "fim": "2026-09-11T22:00:00.000Z",
      "local": "Sede Nacional + transmissão",
      "modalidade": "hibrido",
      "responsavelId": "me-003",
      "nucleoId": null,
      "limiteParticipantes": null,
      "xpParticipacao": 150,
      "inscricoesAbertas": true
    },
    {
      "id": "ev-004",
      "titulo": "Círculo de Debate — Ética e Virtude Cívica",
      "descricao": "Sessão quinzenal de leitura dirigida, aberta a todos os membros ativos.",
      "inicio": "2026-08-27T19:00:00.000Z",
      "fim": "2026-08-27T22:00:00.000Z",
      "local": "Núcleo Jaboatão dos Guararapes",
      "modalidade": "presencial",
      "responsavelId": "me-001",
      "nucleoId": "nu-jaboatao",
      "limiteParticipantes": 40,
      "xpParticipacao": 40,
      "inscricoesAbertas": true
    },
    {
      "id": "ev-005",
      "titulo": "Encontro de Fundação — Núcleo Lisboa",
      "descricao": "Sessão solene de instalação do primeiro Núcleo europeu da Ordem.",
      "inicio": "2026-09-24T19:00:00.000Z",
      "fim": "2026-09-24T22:00:00.000Z",
      "local": "Lisboa, Portugal",
      "modalidade": "presencial",
      "responsavelId": "me-006",
      "nucleoId": "nu-lisboa",
      "limiteParticipantes": 60,
      "xpParticipacao": 150,
      "inscricoesAbertas": true
    },
    {
      "id": "ev-006",
      "titulo": "Reunião Semanal — Núcleo São Paulo Central",
      "descricao": "Reunião ordinária de acompanhamento das atividades do Núcleo.",
      "inicio": "2026-08-22T19:00:00.000Z",
      "fim": "2026-08-22T22:00:00.000Z",
      "local": "Núcleo São Paulo Central",
      "modalidade": "presencial",
      "responsavelId": "me-012",
      "nucleoId": "nu-sp",
      "limiteParticipantes": 50,
      "xpParticipacao": 50,
      "inscricoesAbertas": true
    }
  ],
  "inscricoes": [
    {
      "id": "in-0001",
      "eventoId": "ev-001",
      "membroId": "me-001",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-18T13:00:00.000Z"
    },
    {
      "id": "in-0002",
      "eventoId": "ev-001",
      "membroId": "me-002",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-17T13:00:00.000Z"
    },
    {
      "id": "in-0003",
      "eventoId": "ev-001",
      "membroId": "me-003",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-16T13:00:00.000Z"
    },
    {
      "id": "in-0004",
      "eventoId": "ev-001",
      "membroId": "me-004",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-15T13:00:00.000Z"
    },
    {
      "id": "in-0005",
      "eventoId": "ev-001",
      "membroId": "me-005",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-14T13:00:00.000Z"
    },
    {
      "id": "in-0006",
      "eventoId": "ev-001",
      "membroId": "me-006",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "in-0007",
      "eventoId": "ev-001",
      "membroId": "me-007",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-12T13:00:00.000Z"
    },
    {
      "id": "in-0008",
      "eventoId": "ev-001",
      "membroId": "me-008",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-11T13:00:00.000Z"
    },
    {
      "id": "in-0009",
      "eventoId": "ev-002",
      "membroId": "me-001",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-10T13:00:00.000Z"
    },
    {
      "id": "in-0010",
      "eventoId": "ev-002",
      "membroId": "me-002",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-09T13:00:00.000Z"
    },
    {
      "id": "in-0011",
      "eventoId": "ev-002",
      "membroId": "me-003",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-08T13:00:00.000Z"
    },
    {
      "id": "in-0012",
      "eventoId": "ev-002",
      "membroId": "me-004",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-07T13:00:00.000Z"
    },
    {
      "id": "in-0013",
      "eventoId": "ev-002",
      "membroId": "me-005",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-06T13:00:00.000Z"
    },
    {
      "id": "in-0014",
      "eventoId": "ev-002",
      "membroId": "me-006",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-05T13:00:00.000Z"
    },
    {
      "id": "in-0015",
      "eventoId": "ev-002",
      "membroId": "me-007",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-04T13:00:00.000Z"
    },
    {
      "id": "in-0016",
      "eventoId": "ev-002",
      "membroId": "me-008",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-03T13:00:00.000Z"
    },
    {
      "id": "in-0017",
      "eventoId": "ev-003",
      "membroId": "me-001",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-02T13:00:00.000Z"
    },
    {
      "id": "in-0018",
      "eventoId": "ev-003",
      "membroId": "me-002",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-01T13:00:00.000Z"
    },
    {
      "id": "in-0019",
      "eventoId": "ev-003",
      "membroId": "me-003",
      "situacao": "confirmado",
      "inscritoEm": "2026-07-31T13:00:00.000Z"
    },
    {
      "id": "in-0020",
      "eventoId": "ev-003",
      "membroId": "me-004",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-19T13:00:00.000Z"
    },
    {
      "id": "in-0021",
      "eventoId": "ev-003",
      "membroId": "me-005",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-18T13:00:00.000Z"
    },
    {
      "id": "in-0022",
      "eventoId": "ev-003",
      "membroId": "me-006",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-17T13:00:00.000Z"
    },
    {
      "id": "in-0023",
      "eventoId": "ev-003",
      "membroId": "me-007",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-16T13:00:00.000Z"
    },
    {
      "id": "in-0024",
      "eventoId": "ev-003",
      "membroId": "me-008",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-15T13:00:00.000Z"
    },
    {
      "id": "in-0025",
      "eventoId": "ev-004",
      "membroId": "me-001",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-14T13:00:00.000Z"
    },
    {
      "id": "in-0026",
      "eventoId": "ev-004",
      "membroId": "me-002",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "in-0027",
      "eventoId": "ev-004",
      "membroId": "me-003",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-12T13:00:00.000Z"
    },
    {
      "id": "in-0028",
      "eventoId": "ev-004",
      "membroId": "me-004",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-11T13:00:00.000Z"
    },
    {
      "id": "in-0029",
      "eventoId": "ev-004",
      "membroId": "me-005",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-10T13:00:00.000Z"
    },
    {
      "id": "in-0030",
      "eventoId": "ev-004",
      "membroId": "me-006",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-09T13:00:00.000Z"
    },
    {
      "id": "in-0031",
      "eventoId": "ev-004",
      "membroId": "me-007",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-08T13:00:00.000Z"
    },
    {
      "id": "in-0032",
      "eventoId": "ev-004",
      "membroId": "me-008",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-07T13:00:00.000Z"
    },
    {
      "id": "in-0033",
      "eventoId": "ev-005",
      "membroId": "me-001",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-06T13:00:00.000Z"
    },
    {
      "id": "in-0034",
      "eventoId": "ev-005",
      "membroId": "me-002",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-05T13:00:00.000Z"
    },
    {
      "id": "in-0035",
      "eventoId": "ev-005",
      "membroId": "me-003",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-04T13:00:00.000Z"
    },
    {
      "id": "in-0036",
      "eventoId": "ev-005",
      "membroId": "me-004",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-03T13:00:00.000Z"
    },
    {
      "id": "in-0037",
      "eventoId": "ev-005",
      "membroId": "me-005",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-02T13:00:00.000Z"
    },
    {
      "id": "in-0038",
      "eventoId": "ev-005",
      "membroId": "me-006",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-01T13:00:00.000Z"
    },
    {
      "id": "in-0039",
      "eventoId": "ev-005",
      "membroId": "me-007",
      "situacao": "confirmado",
      "inscritoEm": "2026-07-31T13:00:00.000Z"
    },
    {
      "id": "in-0040",
      "eventoId": "ev-005",
      "membroId": "me-008",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-19T13:00:00.000Z"
    },
    {
      "id": "in-0041",
      "eventoId": "ev-006",
      "membroId": "me-001",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-18T13:00:00.000Z"
    },
    {
      "id": "in-0042",
      "eventoId": "ev-006",
      "membroId": "me-002",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-17T13:00:00.000Z"
    },
    {
      "id": "in-0043",
      "eventoId": "ev-006",
      "membroId": "me-003",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-16T13:00:00.000Z"
    },
    {
      "id": "in-0044",
      "eventoId": "ev-006",
      "membroId": "me-004",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-15T13:00:00.000Z"
    },
    {
      "id": "in-0045",
      "eventoId": "ev-006",
      "membroId": "me-005",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-14T13:00:00.000Z"
    },
    {
      "id": "in-0046",
      "eventoId": "ev-006",
      "membroId": "me-006",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "in-0047",
      "eventoId": "ev-006",
      "membroId": "me-007",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-12T13:00:00.000Z"
    },
    {
      "id": "in-0048",
      "eventoId": "ev-006",
      "membroId": "me-008",
      "situacao": "confirmado",
      "inscritoEm": "2026-08-11T13:00:00.000Z"
    }
  ],
  "presencas": [
    {
      "id": "pr-0001",
      "eventoId": "ev-006",
      "membroId": "me-001",
      "presente": false,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0002",
      "eventoId": "ev-006",
      "membroId": "me-002",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0003",
      "eventoId": "ev-006",
      "membroId": "me-003",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0004",
      "eventoId": "ev-006",
      "membroId": "me-004",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0005",
      "eventoId": "ev-006",
      "membroId": "me-005",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0006",
      "eventoId": "ev-006",
      "membroId": "me-006",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0007",
      "eventoId": "ev-006",
      "membroId": "me-007",
      "presente": false,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0008",
      "eventoId": "ev-006",
      "membroId": "me-008",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0009",
      "eventoId": "ev-006",
      "membroId": "me-009",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0010",
      "eventoId": "ev-006",
      "membroId": "me-010",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0011",
      "eventoId": "ev-006",
      "membroId": "me-011",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0012",
      "eventoId": "ev-006",
      "membroId": "me-012",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0013",
      "eventoId": "ev-006",
      "membroId": "me-013",
      "presente": false,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0014",
      "eventoId": "ev-006",
      "membroId": "me-014",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0015",
      "eventoId": "ev-006",
      "membroId": "me-015",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0016",
      "eventoId": "ev-006",
      "membroId": "me-016",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0017",
      "eventoId": "ev-006",
      "membroId": "me-017",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0018",
      "eventoId": "ev-006",
      "membroId": "me-018",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0019",
      "eventoId": "ev-006",
      "membroId": "me-019",
      "presente": false,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0020",
      "eventoId": "ev-006",
      "membroId": "me-020",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0021",
      "eventoId": "ev-006",
      "membroId": "me-021",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0022",
      "eventoId": "ev-006",
      "membroId": "me-022",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0023",
      "eventoId": "ev-006",
      "membroId": "me-023",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "pr-0024",
      "eventoId": "ev-006",
      "membroId": "me-024",
      "presente": true,
      "registradoPor": "me-012",
      "registradoEm": "2026-08-13T13:00:00.000Z"
    }
  ],
  "documentos": [
    {
      "id": "do-001",
      "titulo": "Estatuto Social da Ordem",
      "descricao": "Norma fundamental que define denominação, natureza, finalidades, patrimônio, quadro associativo e órgãos da Ordem.",
      "categoria": "estatuto",
      "responsavelId": "me-003",
      "nivelAcesso": [],
      "nivelNormativo": "estatuto",
      "reservado": false,
      "versaoAtual": "4.0",
      "atualizadoEm": "2026-08-08T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-001.pdf",
      "tamanho": "1,8 MB"
    },
    {
      "id": "do-002",
      "titulo": "Regimento Interno",
      "descricao": "Disciplina o funcionamento dos órgãos, a admissão, a progressão, as eleições, a disciplina e os Núcleos (Est. Art. 73).",
      "categoria": "regimento",
      "responsavelId": "me-004",
      "nivelAcesso": [],
      "nivelNormativo": "regimento_interno",
      "reservado": false,
      "versaoAtual": "2.3",
      "atualizadoEm": "2026-07-21T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-002.pdf",
      "tamanho": "920 KB"
    },
    {
      "id": "do-003",
      "titulo": "Código de Disciplina e de Ética Geral (CDEG)",
      "descricao": "Deveres éticos do associado, penalidades e rito do processo disciplinar (Est. Art. 64).",
      "categoria": "codigo",
      "responsavelId": "me-004",
      "nivelAcesso": [],
      "nivelNormativo": "resolucao_geral",
      "reservado": false,
      "versaoAtual": "1.5",
      "atualizadoEm": "2026-06-21T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-003.pdf",
      "tamanho": "540 KB"
    },
    {
      "id": "do-004",
      "titulo": "Códice Verde — Base Ideológica-Filosófica",
      "descricao": "Compêndio doutrinário em 117 capítulos: pilares, metafísica, ordem política, doutrina social, crônicas e ritos.",
      "categoria": "codice",
      "responsavelId": "me-007",
      "nivelAcesso": [],
      "nivelNormativo": "nao_normativo",
      "reservado": false,
      "versaoAtual": "6.0",
      "atualizadoEm": "2026-07-30T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-004.pdf",
      "tamanho": "6,2 MB"
    },
    {
      "id": "do-005",
      "titulo": "Regulamento de Tesouraria",
      "descricao": "Regras de arrecadação, custeio, prestação de contas e fiscalização pelo Conselho Superior de Contas.",
      "categoria": "regulamento",
      "responsavelId": "me-005",
      "nivelAcesso": [
        "administrador",
        "grao_mestre",
        "tesoureiro_geral",
        "afentis"
      ],
      "nivelNormativo": "resolucao_geral",
      "reservado": false,
      "versaoAtual": "1.2",
      "atualizadoEm": "2026-07-06T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-005.pdf",
      "tamanho": "410 KB"
    },
    {
      "id": "do-006",
      "titulo": "Manual do Afentis",
      "descricao": "Procedimentos de condução, registro e representação do Núcleo pelo Mestre Titular (Est. Art. 60).",
      "categoria": "manual",
      "responsavelId": "me-004",
      "nivelAcesso": [
        "administrador",
        "grao_mestre",
        "secretario_geral",
        "afentis",
        "thesi"
      ],
      "nivelNormativo": "nao_normativo",
      "reservado": false,
      "versaoAtual": "2.0",
      "atualizadoEm": "2026-08-02T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-006.pdf",
      "tamanho": "1,1 MB"
    },
    {
      "id": "do-007",
      "titulo": "Protocolo de Atuação Territorial",
      "descricao": "Diretrizes de comunicação e mobilização nas instâncias locais.",
      "categoria": "administrativo",
      "responsavelId": "me-004",
      "nivelAcesso": [],
      "nivelNormativo": "resolucao_geral",
      "reservado": false,
      "versaoAtual": "4.0",
      "atualizadoEm": "2026-08-18T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-007.pdf",
      "tamanho": "2,4 MB"
    },
    {
      "id": "do-008",
      "titulo": "Balancete Consolidado — Agosto",
      "descricao": "Demonstrativo mensal de receitas e despesas submetido ao Conselho Superior de Contas.",
      "categoria": "financeiro",
      "responsavelId": "me-005",
      "nivelAcesso": [
        "administrador",
        "grao_mestre",
        "chanceler",
        "tesoureiro_geral"
      ],
      "nivelNormativo": "nao_normativo",
      "reservado": true,
      "versaoAtual": "1.0",
      "atualizadoEm": "2026-08-18T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-008.pdf",
      "tamanho": "640 KB"
    },
    {
      "id": "do-009",
      "titulo": "Cartilha do Eunomita",
      "descricao": "Orientações iniciais sobre direitos, deveres, ritos e primeiros passos na Ordem.",
      "categoria": "manual",
      "responsavelId": "me-004",
      "nivelAcesso": [],
      "nivelNormativo": "nao_normativo",
      "reservado": false,
      "versaoAtual": "1.4",
      "atualizadoEm": "2026-05-22T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-009.pdf",
      "tamanho": "780 KB"
    },
    {
      "id": "do-010",
      "titulo": "Ato Normativo Supremo n.º 3 — Linha de Sucessão",
      "descricao": "Fixa a ordem de precedência na ausência do Moderador Presidente (Est. Art. 39, § 1.º).",
      "categoria": "administrativo",
      "responsavelId": "me-003",
      "nivelAcesso": [
        "administrador",
        "grao_mestre",
        "chanceler",
        "moderador"
      ],
      "nivelNormativo": "ato_normativo_supremo",
      "reservado": true,
      "versaoAtual": "1.0",
      "atualizadoEm": "2026-04-22T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-010.pdf",
      "tamanho": "210 KB"
    },
    {
      "id": "do-011",
      "titulo": "Regulamento Geral Local — Núcleo Jaboatão",
      "descricao": "Regras operacionais e tetos de remuneração local, nos termos do Est. Art. 12, § 3.º.",
      "categoria": "regulamento",
      "responsavelId": "me-001",
      "nivelAcesso": [],
      "nivelNormativo": "regulamento_geral_local",
      "reservado": false,
      "versaoAtual": "1.1",
      "atualizadoEm": "2026-06-11T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-011.pdf",
      "tamanho": "330 KB"
    }
  ],
  "versoesDocumento": [
    {
      "id": "do-001-v4",
      "documentoId": "do-001",
      "versao": "4.0",
      "notas": "Revisão aprovada em assembleia.",
      "publicadoEm": "2026-08-08T13:00:00.000Z",
      "publicadoPor": "me-003"
    },
    {
      "id": "do-001-v3",
      "documentoId": "do-001",
      "versao": "3.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2026-02-09T13:00:00.000Z",
      "publicadoPor": "me-003"
    },
    {
      "id": "do-001-v2",
      "documentoId": "do-001",
      "versao": "2.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2025-08-13T13:00:00.000Z",
      "publicadoPor": "me-003"
    },
    {
      "id": "do-001-v1",
      "documentoId": "do-001",
      "versao": "1.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2025-02-14T13:00:00.000Z",
      "publicadoPor": "me-003"
    },
    {
      "id": "do-002-v2",
      "documentoId": "do-002",
      "versao": "2.0",
      "notas": "Revisão aprovada em assembleia.",
      "publicadoEm": "2026-07-21T13:00:00.000Z",
      "publicadoPor": "me-004"
    },
    {
      "id": "do-002-v1",
      "documentoId": "do-002",
      "versao": "1.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2026-01-22T13:00:00.000Z",
      "publicadoPor": "me-004"
    },
    {
      "id": "do-003-v1",
      "documentoId": "do-003",
      "versao": "1.0",
      "notas": "Revisão aprovada em assembleia.",
      "publicadoEm": "2026-06-21T13:00:00.000Z",
      "publicadoPor": "me-004"
    },
    {
      "id": "do-004-v6",
      "documentoId": "do-004",
      "versao": "6.0",
      "notas": "Revisão aprovada em assembleia.",
      "publicadoEm": "2026-07-30T13:00:00.000Z",
      "publicadoPor": "me-007"
    },
    {
      "id": "do-004-v5",
      "documentoId": "do-004",
      "versao": "5.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2026-01-31T13:00:00.000Z",
      "publicadoPor": "me-007"
    },
    {
      "id": "do-004-v4",
      "documentoId": "do-004",
      "versao": "4.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2025-08-04T13:00:00.000Z",
      "publicadoPor": "me-007"
    },
    {
      "id": "do-004-v3",
      "documentoId": "do-004",
      "versao": "3.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2025-02-05T13:00:00.000Z",
      "publicadoPor": "me-007"
    },
    {
      "id": "do-004-v2",
      "documentoId": "do-004",
      "versao": "2.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2024-08-09T13:00:00.000Z",
      "publicadoPor": "me-007"
    },
    {
      "id": "do-004-v1",
      "documentoId": "do-004",
      "versao": "1.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2024-02-11T13:00:00.000Z",
      "publicadoPor": "me-007"
    },
    {
      "id": "do-005-v1",
      "documentoId": "do-005",
      "versao": "1.0",
      "notas": "Revisão aprovada em assembleia.",
      "publicadoEm": "2026-07-06T13:00:00.000Z",
      "publicadoPor": "me-005"
    },
    {
      "id": "do-006-v2",
      "documentoId": "do-006",
      "versao": "2.0",
      "notas": "Revisão aprovada em assembleia.",
      "publicadoEm": "2026-08-02T13:00:00.000Z",
      "publicadoPor": "me-004"
    },
    {
      "id": "do-006-v1",
      "documentoId": "do-006",
      "versao": "1.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2026-02-03T13:00:00.000Z",
      "publicadoPor": "me-004"
    },
    {
      "id": "do-007-v4",
      "documentoId": "do-007",
      "versao": "4.0",
      "notas": "Revisão aprovada em assembleia.",
      "publicadoEm": "2026-08-18T13:00:00.000Z",
      "publicadoPor": "me-004"
    },
    {
      "id": "do-007-v3",
      "documentoId": "do-007",
      "versao": "3.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2026-02-19T13:00:00.000Z",
      "publicadoPor": "me-004"
    },
    {
      "id": "do-007-v2",
      "documentoId": "do-007",
      "versao": "2.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2025-08-23T13:00:00.000Z",
      "publicadoPor": "me-004"
    },
    {
      "id": "do-007-v1",
      "documentoId": "do-007",
      "versao": "1.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2025-02-24T13:00:00.000Z",
      "publicadoPor": "me-004"
    },
    {
      "id": "do-008-v1",
      "documentoId": "do-008",
      "versao": "1.0",
      "notas": "Revisão aprovada em assembleia.",
      "publicadoEm": "2026-08-18T13:00:00.000Z",
      "publicadoPor": "me-005"
    },
    {
      "id": "do-009-v1",
      "documentoId": "do-009",
      "versao": "1.0",
      "notas": "Revisão aprovada em assembleia.",
      "publicadoEm": "2026-05-22T13:00:00.000Z",
      "publicadoPor": "me-004"
    },
    {
      "id": "do-010-v1",
      "documentoId": "do-010",
      "versao": "1.0",
      "notas": "Revisão aprovada em assembleia.",
      "publicadoEm": "2026-04-22T13:00:00.000Z",
      "publicadoPor": "me-003"
    },
    {
      "id": "do-011-v1",
      "documentoId": "do-011",
      "versao": "1.0",
      "notas": "Revisão aprovada em assembleia.",
      "publicadoEm": "2026-06-11T13:00:00.000Z",
      "publicadoPor": "me-001"
    }
  ],
  "cursos": [
    {
      "id": "cu-001",
      "titulo": "Fundamentos do Pensamento Político",
      "descricao": "Da polis grega ao Estado moderno: as bases conceituais indispensáveis a qualquer atuação política séria.",
      "trilha": "Trilha Fundamental",
      "cargaHoraria": 24,
      "responsavelId": "me-007",
      "xpConclusao": 250,
      "emiteCertificado": true,
      "capaCor": "#E8B21A"
    },
    {
      "id": "cu-002",
      "titulo": "Ética e Virtude Cívica",
      "descricao": "O agir reto na vida pública: virtude, dever e responsabilidade institucional.",
      "trilha": "Trilha Fundamental",
      "cargaHoraria": 16,
      "responsavelId": "me-016",
      "xpConclusao": 200,
      "emiteCertificado": true,
      "capaCor": "#3E9E76"
    },
    {
      "id": "cu-003",
      "titulo": "Filosofia do Direito",
      "descricao": "Normatividade, legitimidade e os limites do poder.",
      "trilha": "Trilha Avançada",
      "cargaHoraria": 20,
      "responsavelId": "me-003",
      "xpConclusao": 300,
      "emiteCertificado": true,
      "capaCor": "#6CA6EC"
    },
    {
      "id": "cu-004",
      "titulo": "Organização e Método de Núcleo",
      "descricao": "Formação prática para dirigentes: condução, registro e prestação de contas.",
      "trilha": "Trilha Institucional",
      "cargaHoraria": 12,
      "responsavelId": "me-004",
      "xpConclusao": 180,
      "emiteCertificado": true,
      "capaCor": "#C99A6B"
    }
  ],
  "modulos": [
    {
      "id": "mo-001-1",
      "cursoId": "cu-001",
      "titulo": "Módulo 1",
      "ordem": 1
    },
    {
      "id": "mo-001-2",
      "cursoId": "cu-001",
      "titulo": "Módulo 2",
      "ordem": 2
    },
    {
      "id": "mo-001-3",
      "cursoId": "cu-001",
      "titulo": "Módulo 3",
      "ordem": 3
    },
    {
      "id": "mo-002-1",
      "cursoId": "cu-002",
      "titulo": "Módulo 1",
      "ordem": 1
    },
    {
      "id": "mo-002-2",
      "cursoId": "cu-002",
      "titulo": "Módulo 2",
      "ordem": 2
    },
    {
      "id": "mo-002-3",
      "cursoId": "cu-002",
      "titulo": "Módulo 3",
      "ordem": 3
    },
    {
      "id": "mo-003-1",
      "cursoId": "cu-003",
      "titulo": "Módulo 1",
      "ordem": 1
    },
    {
      "id": "mo-003-2",
      "cursoId": "cu-003",
      "titulo": "Módulo 2",
      "ordem": 2
    },
    {
      "id": "mo-003-3",
      "cursoId": "cu-003",
      "titulo": "Módulo 3",
      "ordem": 3
    },
    {
      "id": "mo-004-1",
      "cursoId": "cu-004",
      "titulo": "Módulo 1",
      "ordem": 1
    },
    {
      "id": "mo-004-2",
      "cursoId": "cu-004",
      "titulo": "Módulo 2",
      "ordem": 2
    },
    {
      "id": "mo-004-3",
      "cursoId": "cu-004",
      "titulo": "Módulo 3",
      "ordem": 3
    }
  ],
  "aulas": [
    {
      "id": "au-001-11",
      "moduloId": "mo-001-1",
      "titulo": "Exposição inicial",
      "tipo": "video",
      "duracao": "32 min",
      "ordem": 1,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-001-12",
      "moduloId": "mo-001-1",
      "titulo": "Leitura dirigida",
      "tipo": "texto",
      "duracao": "45 min",
      "ordem": 2,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-001-13",
      "moduloId": "mo-001-1",
      "titulo": "Verificação de leitura",
      "tipo": "questionario",
      "duracao": "10 min",
      "ordem": 3,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-001-21",
      "moduloId": "mo-001-2",
      "titulo": "Exposição inicial",
      "tipo": "video",
      "duracao": "32 min",
      "ordem": 1,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-001-22",
      "moduloId": "mo-001-2",
      "titulo": "Leitura dirigida",
      "tipo": "texto",
      "duracao": "45 min",
      "ordem": 2,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-001-23",
      "moduloId": "mo-001-2",
      "titulo": "Verificação de leitura",
      "tipo": "questionario",
      "duracao": "10 min",
      "ordem": 3,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-001-31",
      "moduloId": "mo-001-3",
      "titulo": "Exposição inicial",
      "tipo": "video",
      "duracao": "32 min",
      "ordem": 1,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-001-32",
      "moduloId": "mo-001-3",
      "titulo": "Leitura dirigida",
      "tipo": "texto",
      "duracao": "45 min",
      "ordem": 2,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-001-33",
      "moduloId": "mo-001-3",
      "titulo": "Verificação de leitura",
      "tipo": "questionario",
      "duracao": "10 min",
      "ordem": 3,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-002-11",
      "moduloId": "mo-002-1",
      "titulo": "Exposição inicial",
      "tipo": "video",
      "duracao": "32 min",
      "ordem": 1,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-002-12",
      "moduloId": "mo-002-1",
      "titulo": "Leitura dirigida",
      "tipo": "texto",
      "duracao": "45 min",
      "ordem": 2,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-002-13",
      "moduloId": "mo-002-1",
      "titulo": "Verificação de leitura",
      "tipo": "questionario",
      "duracao": "10 min",
      "ordem": 3,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-002-21",
      "moduloId": "mo-002-2",
      "titulo": "Exposição inicial",
      "tipo": "video",
      "duracao": "32 min",
      "ordem": 1,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-002-22",
      "moduloId": "mo-002-2",
      "titulo": "Leitura dirigida",
      "tipo": "texto",
      "duracao": "45 min",
      "ordem": 2,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-002-23",
      "moduloId": "mo-002-2",
      "titulo": "Verificação de leitura",
      "tipo": "questionario",
      "duracao": "10 min",
      "ordem": 3,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-002-31",
      "moduloId": "mo-002-3",
      "titulo": "Exposição inicial",
      "tipo": "video",
      "duracao": "32 min",
      "ordem": 1,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-002-32",
      "moduloId": "mo-002-3",
      "titulo": "Leitura dirigida",
      "tipo": "texto",
      "duracao": "45 min",
      "ordem": 2,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-002-33",
      "moduloId": "mo-002-3",
      "titulo": "Verificação de leitura",
      "tipo": "questionario",
      "duracao": "10 min",
      "ordem": 3,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-003-11",
      "moduloId": "mo-003-1",
      "titulo": "Exposição inicial",
      "tipo": "video",
      "duracao": "32 min",
      "ordem": 1,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-003-12",
      "moduloId": "mo-003-1",
      "titulo": "Leitura dirigida",
      "tipo": "texto",
      "duracao": "45 min",
      "ordem": 2,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-003-13",
      "moduloId": "mo-003-1",
      "titulo": "Verificação de leitura",
      "tipo": "questionario",
      "duracao": "10 min",
      "ordem": 3,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-003-21",
      "moduloId": "mo-003-2",
      "titulo": "Exposição inicial",
      "tipo": "video",
      "duracao": "32 min",
      "ordem": 1,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-003-22",
      "moduloId": "mo-003-2",
      "titulo": "Leitura dirigida",
      "tipo": "texto",
      "duracao": "45 min",
      "ordem": 2,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-003-23",
      "moduloId": "mo-003-2",
      "titulo": "Verificação de leitura",
      "tipo": "questionario",
      "duracao": "10 min",
      "ordem": 3,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-003-31",
      "moduloId": "mo-003-3",
      "titulo": "Exposição inicial",
      "tipo": "video",
      "duracao": "32 min",
      "ordem": 1,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-003-32",
      "moduloId": "mo-003-3",
      "titulo": "Leitura dirigida",
      "tipo": "texto",
      "duracao": "45 min",
      "ordem": 2,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-003-33",
      "moduloId": "mo-003-3",
      "titulo": "Verificação de leitura",
      "tipo": "questionario",
      "duracao": "10 min",
      "ordem": 3,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-004-11",
      "moduloId": "mo-004-1",
      "titulo": "Exposição inicial",
      "tipo": "video",
      "duracao": "32 min",
      "ordem": 1,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-004-12",
      "moduloId": "mo-004-1",
      "titulo": "Leitura dirigida",
      "tipo": "texto",
      "duracao": "45 min",
      "ordem": 2,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-004-13",
      "moduloId": "mo-004-1",
      "titulo": "Verificação de leitura",
      "tipo": "questionario",
      "duracao": "10 min",
      "ordem": 3,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-004-21",
      "moduloId": "mo-004-2",
      "titulo": "Exposição inicial",
      "tipo": "video",
      "duracao": "32 min",
      "ordem": 1,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-004-22",
      "moduloId": "mo-004-2",
      "titulo": "Leitura dirigida",
      "tipo": "texto",
      "duracao": "45 min",
      "ordem": 2,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-004-23",
      "moduloId": "mo-004-2",
      "titulo": "Verificação de leitura",
      "tipo": "questionario",
      "duracao": "10 min",
      "ordem": 3,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-004-31",
      "moduloId": "mo-004-3",
      "titulo": "Exposição inicial",
      "tipo": "video",
      "duracao": "32 min",
      "ordem": 1,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-004-32",
      "moduloId": "mo-004-3",
      "titulo": "Leitura dirigida",
      "tipo": "texto",
      "duracao": "45 min",
      "ordem": 2,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    },
    {
      "id": "au-004-33",
      "moduloId": "mo-004-3",
      "titulo": "Verificação de leitura",
      "tipo": "questionario",
      "duracao": "10 min",
      "ordem": 3,
      "conteudo": "Material de estudo disponível na biblioteca institucional."
    }
  ],
  "progressoAulas": [
    {
      "id": "pg-1",
      "membroId": "me-001",
      "aulaId": "au-001-11",
      "concluidaEm": "2026-07-21T13:00:00.000Z"
    },
    {
      "id": "pg-2",
      "membroId": "me-001",
      "aulaId": "au-001-12",
      "concluidaEm": "2026-07-22T13:00:00.000Z"
    },
    {
      "id": "pg-3",
      "membroId": "me-001",
      "aulaId": "au-001-13",
      "concluidaEm": "2026-07-23T13:00:00.000Z"
    },
    {
      "id": "pg-4",
      "membroId": "me-001",
      "aulaId": "au-001-21",
      "concluidaEm": "2026-07-24T13:00:00.000Z"
    },
    {
      "id": "pg-5",
      "membroId": "me-001",
      "aulaId": "au-001-22",
      "concluidaEm": "2026-07-25T13:00:00.000Z"
    },
    {
      "id": "pg-6",
      "membroId": "me-001",
      "aulaId": "au-001-23",
      "concluidaEm": "2026-07-26T13:00:00.000Z"
    },
    {
      "id": "pg-7",
      "membroId": "me-001",
      "aulaId": "au-001-31",
      "concluidaEm": "2026-07-27T13:00:00.000Z"
    },
    {
      "id": "pg-8",
      "membroId": "me-001",
      "aulaId": "au-001-32",
      "concluidaEm": "2026-07-28T13:00:00.000Z"
    },
    {
      "id": "pg-9",
      "membroId": "me-001",
      "aulaId": "au-001-33",
      "concluidaEm": "2026-07-29T13:00:00.000Z"
    },
    {
      "id": "pg-10",
      "membroId": "me-001",
      "aulaId": "au-002-11",
      "concluidaEm": "2026-07-30T13:00:00.000Z"
    },
    {
      "id": "pg-11",
      "membroId": "me-001",
      "aulaId": "au-002-12",
      "concluidaEm": "2026-07-31T13:00:00.000Z"
    }
  ],
  "propostas": [
    {
      "id": "pp-001",
      "titulo": "Criação do Núcleo Caruaru",
      "resumo": "Instalar Núcleo no Agreste pernambucano, com 14 membros já mobilizados.",
      "conteudo": "Instalar Núcleo no Agreste pernambucano, com 14 membros já mobilizados. A proposta detalha justificativa, impacto orçamentário estimado, cronograma de implantação e responsáveis pela execução, nos termos do Regimento Interno.",
      "categoria": "Organização territorial",
      "autorId": "me-001",
      "nucleoId": "nu-jaboatao",
      "situacao": "em_discussao",
      "apoios": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023",
        "me-024",
        "me-025",
        "me-026",
        "me-027",
        "me-028",
        "me-029",
        "me-030",
        "me-031",
        "me-032",
        "me-033",
        "me-034",
        "me-035",
        "me-036",
        "me-037",
        "me-038"
      ],
      "criadaEm": "2026-07-11T13:00:00.000Z",
      "atualizadaEm": "2026-08-10T13:00:00.000Z",
      "respostaAdministracao": null,
      "tramitacao": [
        {
          "situacao": "recebida",
          "em": "2026-07-20T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Protocolo registrado."
        },
        {
          "situacao": "em_analise",
          "em": "2026-07-27T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        },
        {
          "situacao": "em_discussao",
          "em": "2026-08-03T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        }
      ]
    },
    {
      "id": "pp-002",
      "titulo": "Biblioteca digital aberta aos candidatos",
      "resumo": "Liberar os materiais introdutórios da trilha Fundamental a candidatos em análise.",
      "conteudo": "Liberar os materiais introdutórios da trilha Fundamental a candidatos em análise. A proposta detalha justificativa, impacto orçamentário estimado, cronograma de implantação e responsáveis pela execução, nos termos do Regimento Interno.",
      "categoria": "Formação",
      "autorId": "me-016",
      "nucleoId": "nu-sp",
      "situacao": "aprovada",
      "apoios": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023",
        "me-024",
        "me-025",
        "me-026",
        "me-027",
        "me-028",
        "me-029",
        "me-030",
        "me-031",
        "me-032",
        "me-033",
        "me-034",
        "me-035",
        "me-036",
        "me-037",
        "me-038",
        "me-039",
        "me-040",
        "me-041",
        "me-042",
        "me-043",
        "me-044",
        "me-045",
        "me-046"
      ],
      "criadaEm": "2026-06-06T13:00:00.000Z",
      "atualizadaEm": "2026-07-06T13:00:00.000Z",
      "respostaAdministracao": "Aprovada em reunião de Direção; execução delegada à Secretaria-Geral.",
      "tramitacao": [
        {
          "situacao": "recebida",
          "em": "2026-06-08T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Protocolo registrado."
        },
        {
          "situacao": "em_analise",
          "em": "2026-06-15T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        },
        {
          "situacao": "em_discussao",
          "em": "2026-06-22T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        },
        {
          "situacao": "aprovada",
          "em": "2026-06-29T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        }
      ]
    },
    {
      "id": "pp-003",
      "titulo": "Prestação de contas trimestral por Núcleo",
      "resumo": "Padronizar o demonstrativo financeiro de cada Núcleo e publicá-lo no portal.",
      "conteudo": "Padronizar o demonstrativo financeiro de cada Núcleo e publicá-lo no portal. A proposta detalha justificativa, impacto orçamentário estimado, cronograma de implantação e responsáveis pela execução, nos termos do Regimento Interno.",
      "categoria": "Tesouraria",
      "autorId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "em_analise",
      "apoios": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023",
        "me-024",
        "me-025",
        "me-026",
        "me-027",
        "me-028",
        "me-029"
      ],
      "criadaEm": "2026-07-15T13:00:00.000Z",
      "atualizadaEm": "2026-08-14T13:00:00.000Z",
      "respostaAdministracao": null,
      "tramitacao": [
        {
          "situacao": "recebida",
          "em": "2026-07-31T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Protocolo registrado."
        },
        {
          "situacao": "em_analise",
          "em": "2026-08-07T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        }
      ]
    },
    {
      "id": "pp-004",
      "titulo": "Programa de padrinho para novos membros",
      "resumo": "Vincular cada novo membro a um preceptor durante os primeiros noventa dias.",
      "conteudo": "Vincular cada novo membro a um preceptor durante os primeiros noventa dias. A proposta detalha justificativa, impacto orçamentário estimado, cronograma de implantação e responsáveis pela execução, nos termos do Regimento Interno.",
      "categoria": "Formação",
      "autorId": "me-012",
      "nucleoId": "nu-sp",
      "situacao": "recebida",
      "apoios": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017"
      ],
      "criadaEm": "2026-07-19T13:00:00.000Z",
      "atualizadaEm": "2026-08-18T13:00:00.000Z",
      "respostaAdministracao": null,
      "tramitacao": [
        {
          "situacao": "recebida",
          "em": "2026-08-11T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Protocolo registrado."
        }
      ]
    },
    {
      "id": "pp-005",
      "titulo": "Encontro nacional bienal",
      "resumo": "Instituir encontro nacional a cada dois anos com delegações por Núcleo.",
      "conteudo": "Instituir encontro nacional a cada dois anos com delegações por Núcleo. A proposta detalha justificativa, impacto orçamentário estimado, cronograma de implantação e responsáveis pela execução, nos termos do Regimento Interno.",
      "categoria": "Institucional",
      "autorId": "me-003",
      "nucleoId": null,
      "situacao": "em_discussao",
      "apoios": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023",
        "me-024",
        "me-025",
        "me-026",
        "me-027",
        "me-028",
        "me-029",
        "me-030",
        "me-031",
        "me-032",
        "me-033",
        "me-034",
        "me-035",
        "me-036",
        "me-037",
        "me-038",
        "me-039",
        "me-040",
        "me-041",
        "me-042",
        "me-043",
        "me-044",
        "me-045",
        "me-046"
      ],
      "criadaEm": "2026-07-01T13:00:00.000Z",
      "atualizadaEm": "2026-07-31T13:00:00.000Z",
      "respostaAdministracao": null,
      "tramitacao": [
        {
          "situacao": "recebida",
          "em": "2026-07-10T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Protocolo registrado."
        },
        {
          "situacao": "em_analise",
          "em": "2026-07-17T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        },
        {
          "situacao": "em_discussao",
          "em": "2026-07-24T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        }
      ]
    },
    {
      "id": "pp-006",
      "titulo": "Uniformização das atas de reunião",
      "resumo": "Adotar modelo único de ata com registro nominal de presença.",
      "conteudo": "Adotar modelo único de ata com registro nominal de presença. A proposta detalha justificativa, impacto orçamentário estimado, cronograma de implantação e responsáveis pela execução, nos termos do Regimento Interno.",
      "categoria": "Secretaria",
      "autorId": "me-004",
      "nucleoId": null,
      "situacao": "aprovada",
      "apoios": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023",
        "me-024",
        "me-025",
        "me-026",
        "me-027",
        "me-028",
        "me-029",
        "me-030",
        "me-031",
        "me-032",
        "me-033",
        "me-034",
        "me-035",
        "me-036",
        "me-037",
        "me-038",
        "me-039",
        "me-040",
        "me-041",
        "me-042",
        "me-043",
        "me-044"
      ],
      "criadaEm": "2026-05-12T13:00:00.000Z",
      "atualizadaEm": "2026-06-11T13:00:00.000Z",
      "respostaAdministracao": "Aprovada em reunião de Direção; execução delegada à Secretaria-Geral.",
      "tramitacao": [
        {
          "situacao": "recebida",
          "em": "2026-05-14T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Protocolo registrado."
        },
        {
          "situacao": "em_analise",
          "em": "2026-05-21T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        },
        {
          "situacao": "em_discussao",
          "em": "2026-05-28T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        },
        {
          "situacao": "aprovada",
          "em": "2026-06-04T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        }
      ]
    },
    {
      "id": "pp-007",
      "titulo": "Cota de custeio diferenciada por região",
      "resumo": "Ajustar a contribuição ordinária ao custo de vida de cada estado.",
      "conteudo": "Ajustar a contribuição ordinária ao custo de vida de cada estado. A proposta detalha justificativa, impacto orçamentário estimado, cronograma de implantação e responsáveis pela execução, nos termos do Regimento Interno.",
      "categoria": "Tesouraria",
      "autorId": "me-021",
      "nucleoId": null,
      "situacao": "rejeitada",
      "apoios": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012",
        "me-013",
        "me-014",
        "me-015",
        "me-016",
        "me-017",
        "me-018",
        "me-019",
        "me-020",
        "me-021",
        "me-022",
        "me-023"
      ],
      "criadaEm": "2026-03-23T13:00:00.000Z",
      "atualizadaEm": "2026-04-22T13:00:00.000Z",
      "respostaAdministracao": "Indeferida por inviabilidade orçamentária no exercício corrente.",
      "tramitacao": [
        {
          "situacao": "recebida",
          "em": "2026-04-01T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Protocolo registrado."
        },
        {
          "situacao": "em_analise",
          "em": "2026-04-08T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        },
        {
          "situacao": "rejeitada",
          "em": "2026-04-15T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        }
      ]
    },
    {
      "id": "pp-008",
      "titulo": "Arquivo histórico da Ordem",
      "resumo": "Digitalizar e catalogar todos os documentos fundacionais.",
      "conteudo": "Digitalizar e catalogar todos os documentos fundacionais. A proposta detalha justificativa, impacto orçamentário estimado, cronograma de implantação e responsáveis pela execução, nos termos do Regimento Interno.",
      "categoria": "Documentação",
      "autorId": "me-009",
      "nucleoId": "nu-recife",
      "situacao": "arquivada",
      "apoios": [
        "me-001",
        "me-002",
        "me-003",
        "me-004",
        "me-005",
        "me-006",
        "me-007",
        "me-008",
        "me-009",
        "me-010",
        "me-011",
        "me-012"
      ],
      "criadaEm": "2026-01-02T13:00:00.000Z",
      "atualizadaEm": "2026-02-01T13:00:00.000Z",
      "respostaAdministracao": null,
      "tramitacao": [
        {
          "situacao": "recebida",
          "em": "2026-01-11T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Protocolo registrado."
        },
        {
          "situacao": "em_analise",
          "em": "2026-01-18T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        },
        {
          "situacao": "arquivada",
          "em": "2026-01-25T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Encaminhada à instância competente."
        }
      ]
    }
  ],
  "regrasXP": [
    {
      "id": "rx-1",
      "origem": "reuniao",
      "nome": "Presença em reunião de Núcleo",
      "descricao": "Registrada pelo dirigente ou secretário.",
      "pontos": 50,
      "ativa": true
    },
    {
      "id": "rx-2",
      "origem": "evento",
      "nome": "Participação em evento oficial",
      "descricao": "Confirmada na lista de presença.",
      "pontos": 120,
      "ativa": true
    },
    {
      "id": "rx-3",
      "origem": "formacao",
      "nome": "Conclusão de curso",
      "descricao": "Atribuída automaticamente ao concluir a trilha.",
      "pontos": 250,
      "ativa": true
    },
    {
      "id": "rx-4",
      "origem": "debate",
      "nome": "Participação em debate",
      "descricao": "Sessões de estudo e círculos de debate.",
      "pontos": 40,
      "ativa": true
    },
    {
      "id": "rx-5",
      "origem": "publicacao",
      "nome": "Publicação aprovada no feed",
      "descricao": "Conteúdo de formação ou notícia.",
      "pontos": 30,
      "ativa": true
    },
    {
      "id": "rx-6",
      "origem": "nucleo",
      "nome": "Apoio às atividades do Núcleo",
      "descricao": "Mutirões, secretaria e logística.",
      "pontos": 60,
      "ativa": true
    },
    {
      "id": "rx-7",
      "origem": "projeto",
      "nome": "Participação em projeto institucional",
      "descricao": "Projetos aprovados pela Direção.",
      "pontos": 180,
      "ativa": true
    },
    {
      "id": "rx-8",
      "origem": "atividade",
      "nome": "Cumprimento de atividade designada",
      "descricao": "Tarefas com prazo definido.",
      "pontos": 25,
      "ativa": true
    }
  ],
  "transacoesXP": [
    {
      "id": "tx-0001",
      "membroId": "me-001",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-18T13:00:00.000Z"
    },
    {
      "id": "tx-0002",
      "membroId": "me-001",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-17T13:00:00.000Z"
    },
    {
      "id": "tx-0003",
      "membroId": "me-001",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-16T13:00:00.000Z"
    },
    {
      "id": "tx-0004",
      "membroId": "me-001",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-15T13:00:00.000Z"
    },
    {
      "id": "tx-0005",
      "membroId": "me-001",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-14T13:00:00.000Z"
    },
    {
      "id": "tx-0006",
      "membroId": "me-002",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "tx-0007",
      "membroId": "me-002",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-12T13:00:00.000Z"
    },
    {
      "id": "tx-0008",
      "membroId": "me-002",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-11T13:00:00.000Z"
    },
    {
      "id": "tx-0009",
      "membroId": "me-003",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-10T13:00:00.000Z"
    },
    {
      "id": "tx-0010",
      "membroId": "me-003",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-09T13:00:00.000Z"
    },
    {
      "id": "tx-0011",
      "membroId": "me-003",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-08T13:00:00.000Z"
    },
    {
      "id": "tx-0012",
      "membroId": "me-004",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-07T13:00:00.000Z"
    },
    {
      "id": "tx-0013",
      "membroId": "me-004",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-06T13:00:00.000Z"
    },
    {
      "id": "tx-0014",
      "membroId": "me-004",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-05T13:00:00.000Z"
    },
    {
      "id": "tx-0015",
      "membroId": "me-005",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-04T13:00:00.000Z"
    },
    {
      "id": "tx-0016",
      "membroId": "me-005",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-03T13:00:00.000Z"
    },
    {
      "id": "tx-0017",
      "membroId": "me-005",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-02T13:00:00.000Z"
    },
    {
      "id": "tx-0018",
      "membroId": "me-006",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-01T13:00:00.000Z"
    },
    {
      "id": "tx-0019",
      "membroId": "me-006",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-31T13:00:00.000Z"
    },
    {
      "id": "tx-0020",
      "membroId": "me-006",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-30T13:00:00.000Z"
    },
    {
      "id": "tx-0021",
      "membroId": "me-007",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-29T13:00:00.000Z"
    },
    {
      "id": "tx-0022",
      "membroId": "me-007",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-28T13:00:00.000Z"
    },
    {
      "id": "tx-0023",
      "membroId": "me-007",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-27T13:00:00.000Z"
    },
    {
      "id": "tx-0024",
      "membroId": "me-008",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-26T13:00:00.000Z"
    },
    {
      "id": "tx-0025",
      "membroId": "me-008",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-25T13:00:00.000Z"
    },
    {
      "id": "tx-0026",
      "membroId": "me-008",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-24T13:00:00.000Z"
    },
    {
      "id": "tx-0027",
      "membroId": "me-009",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-23T13:00:00.000Z"
    },
    {
      "id": "tx-0028",
      "membroId": "me-009",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-22T13:00:00.000Z"
    },
    {
      "id": "tx-0029",
      "membroId": "me-009",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-21T13:00:00.000Z"
    },
    {
      "id": "tx-0030",
      "membroId": "me-010",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-20T13:00:00.000Z"
    },
    {
      "id": "tx-0031",
      "membroId": "me-010",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-19T13:00:00.000Z"
    },
    {
      "id": "tx-0032",
      "membroId": "me-010",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-18T13:00:00.000Z"
    },
    {
      "id": "tx-0033",
      "membroId": "me-011",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-17T13:00:00.000Z"
    },
    {
      "id": "tx-0034",
      "membroId": "me-011",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-16T13:00:00.000Z"
    },
    {
      "id": "tx-0035",
      "membroId": "me-011",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-15T13:00:00.000Z"
    },
    {
      "id": "tx-0036",
      "membroId": "me-012",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-14T13:00:00.000Z"
    },
    {
      "id": "tx-0037",
      "membroId": "me-012",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-13T13:00:00.000Z"
    },
    {
      "id": "tx-0038",
      "membroId": "me-012",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-12T13:00:00.000Z"
    },
    {
      "id": "tx-0039",
      "membroId": "me-013",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-11T13:00:00.000Z"
    },
    {
      "id": "tx-0040",
      "membroId": "me-013",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-10T13:00:00.000Z"
    },
    {
      "id": "tx-0041",
      "membroId": "me-013",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-09T13:00:00.000Z"
    },
    {
      "id": "tx-0042",
      "membroId": "me-014",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-08T13:00:00.000Z"
    },
    {
      "id": "tx-0043",
      "membroId": "me-014",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-07T13:00:00.000Z"
    },
    {
      "id": "tx-0044",
      "membroId": "me-014",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-06T13:00:00.000Z"
    },
    {
      "id": "tx-0045",
      "membroId": "me-015",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-05T13:00:00.000Z"
    },
    {
      "id": "tx-0046",
      "membroId": "me-015",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-04T13:00:00.000Z"
    },
    {
      "id": "tx-0047",
      "membroId": "me-015",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-03T13:00:00.000Z"
    },
    {
      "id": "tx-0048",
      "membroId": "me-016",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-02T13:00:00.000Z"
    },
    {
      "id": "tx-0049",
      "membroId": "me-016",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-01T13:00:00.000Z"
    },
    {
      "id": "tx-0050",
      "membroId": "me-016",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-30T13:00:00.000Z"
    },
    {
      "id": "tx-0051",
      "membroId": "me-017",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-29T13:00:00.000Z"
    },
    {
      "id": "tx-0052",
      "membroId": "me-017",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-28T13:00:00.000Z"
    },
    {
      "id": "tx-0053",
      "membroId": "me-017",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-27T13:00:00.000Z"
    },
    {
      "id": "tx-0054",
      "membroId": "me-018",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-26T13:00:00.000Z"
    },
    {
      "id": "tx-0055",
      "membroId": "me-018",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-25T13:00:00.000Z"
    },
    {
      "id": "tx-0056",
      "membroId": "me-018",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-24T13:00:00.000Z"
    },
    {
      "id": "tx-0057",
      "membroId": "me-019",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-23T13:00:00.000Z"
    },
    {
      "id": "tx-0058",
      "membroId": "me-019",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-22T13:00:00.000Z"
    },
    {
      "id": "tx-0059",
      "membroId": "me-019",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "tx-0060",
      "membroId": "me-020",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-19T13:00:00.000Z"
    },
    {
      "id": "tx-0061",
      "membroId": "me-020",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-18T13:00:00.000Z"
    },
    {
      "id": "tx-0062",
      "membroId": "me-020",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-17T13:00:00.000Z"
    },
    {
      "id": "tx-0063",
      "membroId": "me-021",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-16T13:00:00.000Z"
    },
    {
      "id": "tx-0064",
      "membroId": "me-021",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-15T13:00:00.000Z"
    },
    {
      "id": "tx-0065",
      "membroId": "me-021",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-14T13:00:00.000Z"
    },
    {
      "id": "tx-0066",
      "membroId": "me-022",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "tx-0067",
      "membroId": "me-022",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-12T13:00:00.000Z"
    },
    {
      "id": "tx-0068",
      "membroId": "me-022",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-11T13:00:00.000Z"
    },
    {
      "id": "tx-0069",
      "membroId": "me-023",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-10T13:00:00.000Z"
    },
    {
      "id": "tx-0070",
      "membroId": "me-023",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-09T13:00:00.000Z"
    },
    {
      "id": "tx-0071",
      "membroId": "me-023",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-08T13:00:00.000Z"
    },
    {
      "id": "tx-0072",
      "membroId": "me-024",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-07T13:00:00.000Z"
    },
    {
      "id": "tx-0073",
      "membroId": "me-024",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-06T13:00:00.000Z"
    },
    {
      "id": "tx-0074",
      "membroId": "me-024",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-05T13:00:00.000Z"
    },
    {
      "id": "tx-0075",
      "membroId": "me-025",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-04T13:00:00.000Z"
    },
    {
      "id": "tx-0076",
      "membroId": "me-025",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-03T13:00:00.000Z"
    },
    {
      "id": "tx-0077",
      "membroId": "me-025",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-02T13:00:00.000Z"
    },
    {
      "id": "tx-0078",
      "membroId": "me-026",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-01T13:00:00.000Z"
    },
    {
      "id": "tx-0079",
      "membroId": "me-026",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-31T13:00:00.000Z"
    },
    {
      "id": "tx-0080",
      "membroId": "me-026",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-30T13:00:00.000Z"
    },
    {
      "id": "tx-0081",
      "membroId": "me-027",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-29T13:00:00.000Z"
    },
    {
      "id": "tx-0082",
      "membroId": "me-027",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-28T13:00:00.000Z"
    },
    {
      "id": "tx-0083",
      "membroId": "me-027",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-27T13:00:00.000Z"
    },
    {
      "id": "tx-0084",
      "membroId": "me-028",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-26T13:00:00.000Z"
    },
    {
      "id": "tx-0085",
      "membroId": "me-028",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-25T13:00:00.000Z"
    },
    {
      "id": "tx-0086",
      "membroId": "me-028",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-24T13:00:00.000Z"
    },
    {
      "id": "tx-0087",
      "membroId": "me-029",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-23T13:00:00.000Z"
    },
    {
      "id": "tx-0088",
      "membroId": "me-029",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-22T13:00:00.000Z"
    },
    {
      "id": "tx-0089",
      "membroId": "me-029",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-21T13:00:00.000Z"
    },
    {
      "id": "tx-0090",
      "membroId": "me-030",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-20T13:00:00.000Z"
    },
    {
      "id": "tx-0091",
      "membroId": "me-030",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-19T13:00:00.000Z"
    },
    {
      "id": "tx-0092",
      "membroId": "me-030",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-18T13:00:00.000Z"
    },
    {
      "id": "tx-0093",
      "membroId": "me-031",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-17T13:00:00.000Z"
    },
    {
      "id": "tx-0094",
      "membroId": "me-031",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-16T13:00:00.000Z"
    },
    {
      "id": "tx-0095",
      "membroId": "me-031",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-15T13:00:00.000Z"
    },
    {
      "id": "tx-0096",
      "membroId": "me-032",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-14T13:00:00.000Z"
    },
    {
      "id": "tx-0097",
      "membroId": "me-032",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-13T13:00:00.000Z"
    },
    {
      "id": "tx-0098",
      "membroId": "me-032",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-12T13:00:00.000Z"
    },
    {
      "id": "tx-0099",
      "membroId": "me-033",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-11T13:00:00.000Z"
    },
    {
      "id": "tx-0100",
      "membroId": "me-033",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-10T13:00:00.000Z"
    },
    {
      "id": "tx-0101",
      "membroId": "me-033",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-09T13:00:00.000Z"
    },
    {
      "id": "tx-0102",
      "membroId": "me-034",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-08T13:00:00.000Z"
    },
    {
      "id": "tx-0103",
      "membroId": "me-034",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-07T13:00:00.000Z"
    },
    {
      "id": "tx-0104",
      "membroId": "me-034",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-06T13:00:00.000Z"
    },
    {
      "id": "tx-0105",
      "membroId": "me-035",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-05T13:00:00.000Z"
    },
    {
      "id": "tx-0106",
      "membroId": "me-035",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-04T13:00:00.000Z"
    },
    {
      "id": "tx-0107",
      "membroId": "me-035",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-03T13:00:00.000Z"
    },
    {
      "id": "tx-0108",
      "membroId": "me-036",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-02T13:00:00.000Z"
    },
    {
      "id": "tx-0109",
      "membroId": "me-036",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-07-01T13:00:00.000Z"
    },
    {
      "id": "tx-0110",
      "membroId": "me-036",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-30T13:00:00.000Z"
    },
    {
      "id": "tx-0111",
      "membroId": "me-037",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-29T13:00:00.000Z"
    },
    {
      "id": "tx-0112",
      "membroId": "me-037",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-28T13:00:00.000Z"
    },
    {
      "id": "tx-0113",
      "membroId": "me-037",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-27T13:00:00.000Z"
    },
    {
      "id": "tx-0114",
      "membroId": "me-038",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-26T13:00:00.000Z"
    },
    {
      "id": "tx-0115",
      "membroId": "me-038",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-25T13:00:00.000Z"
    },
    {
      "id": "tx-0116",
      "membroId": "me-038",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-24T13:00:00.000Z"
    },
    {
      "id": "tx-0117",
      "membroId": "me-039",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-23T13:00:00.000Z"
    },
    {
      "id": "tx-0118",
      "membroId": "me-039",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-22T13:00:00.000Z"
    },
    {
      "id": "tx-0119",
      "membroId": "me-039",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "tx-0120",
      "membroId": "me-040",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-19T13:00:00.000Z"
    },
    {
      "id": "tx-0121",
      "membroId": "me-040",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-18T13:00:00.000Z"
    },
    {
      "id": "tx-0122",
      "membroId": "me-040",
      "origem": "publicacao",
      "descricao": "Publicação no feed institucional",
      "pontos": 30,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-17T13:00:00.000Z"
    },
    {
      "id": "tx-0123",
      "membroId": "me-044",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-16T13:00:00.000Z"
    },
    {
      "id": "tx-0124",
      "membroId": "me-044",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-15T13:00:00.000Z"
    },
    {
      "id": "tx-0125",
      "membroId": "me-044",
      "origem": "atividade",
      "descricao": "Cumprimento de atividade designada",
      "pontos": 25,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-14T13:00:00.000Z"
    },
    {
      "id": "tx-0126",
      "membroId": "me-045",
      "origem": "projeto",
      "descricao": "Participação em projeto institucional",
      "pontos": 180,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-13T13:00:00.000Z"
    },
    {
      "id": "tx-0127",
      "membroId": "me-045",
      "origem": "reuniao",
      "descricao": "Presença em reunião de Núcleo",
      "pontos": 50,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-12T13:00:00.000Z"
    },
    {
      "id": "tx-0128",
      "membroId": "me-045",
      "origem": "formacao",
      "descricao": "Conclusão de módulo de formação",
      "pontos": 250,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-11T13:00:00.000Z"
    },
    {
      "id": "tx-0129",
      "membroId": "me-046",
      "origem": "evento",
      "descricao": "Participação em evento oficial",
      "pontos": 120,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-10T13:00:00.000Z"
    },
    {
      "id": "tx-0130",
      "membroId": "me-046",
      "origem": "debate",
      "descricao": "Participação em círculo de debate",
      "pontos": 40,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-09T13:00:00.000Z"
    },
    {
      "id": "tx-0131",
      "membroId": "me-046",
      "origem": "nucleo",
      "descricao": "Apoio às atividades do Núcleo",
      "pontos": 60,
      "registradoPor": "me-004",
      "criadoEm": "2026-08-08T13:00:00.000Z"
    }
  ],
  "niveis": [
    {
      "numero": 1,
      "titulo": "Aspirante",
      "xpMinimo": 0
    },
    {
      "numero": 2,
      "titulo": "Iniciado",
      "xpMinimo": 200
    },
    {
      "numero": 3,
      "titulo": "Aprendiz",
      "xpMinimo": 500
    },
    {
      "numero": 4,
      "titulo": "Estudante",
      "xpMinimo": 900
    },
    {
      "numero": 5,
      "titulo": "Praticante",
      "xpMinimo": 1400
    },
    {
      "numero": 6,
      "titulo": "Militante",
      "xpMinimo": 2000
    },
    {
      "numero": 7,
      "titulo": "Orador",
      "xpMinimo": 2800
    },
    {
      "numero": 8,
      "titulo": "Preceptor",
      "xpMinimo": 3800
    },
    {
      "numero": 9,
      "titulo": "Conselheiro",
      "xpMinimo": 5000
    },
    {
      "numero": 10,
      "titulo": "Guardião",
      "xpMinimo": 6500
    },
    {
      "numero": 11,
      "titulo": "Emérito",
      "xpMinimo": 8500
    },
    {
      "numero": 12,
      "titulo": "Patrono",
      "xpMinimo": 11000
    }
  ],
  "conquistas": [
    {
      "id": "cq-fundador",
      "nome": "Fundador de Núcleo",
      "descricao": "Participou da fundação de um Núcleo da Ordem.",
      "icone": "foundation",
      "criterio": "Registro de fundação"
    },
    {
      "id": "cq-formacao",
      "nome": "Trilha Concluída",
      "descricao": "Concluiu uma trilha completa de formação.",
      "icone": "school",
      "criterio": "1 trilha concluída"
    },
    {
      "id": "cq-presenca",
      "nome": "Presença Constante",
      "descricao": "Sequência de 30 dias de participação.",
      "icone": "local_fire_department",
      "criterio": "Streak de 30 dias"
    },
    {
      "id": "cq-orador",
      "nome": "Orador",
      "descricao": "Apresentou tese em encontro regional.",
      "icone": "record_voice_over",
      "criterio": "Participação em painel"
    },
    {
      "id": "cq-proposta",
      "nome": "Proposta Aprovada",
      "descricao": "Teve uma proposta aprovada pela Ordem.",
      "icone": "gavel",
      "criterio": "1 proposta aprovada"
    },
    {
      "id": "cq-decano",
      "nome": "Decano",
      "descricao": "Cinco anos de membresia ativa.",
      "icone": "military_tech",
      "criterio": "5 anos de filiação"
    }
  ],
  "conversas": [
    {
      "id": "cv-001",
      "tipo": "oficial",
      "titulo": "Comunicados da Secretaria",
      "participantes": [
        "me-001",
        "me-004"
      ],
      "nucleoId": null,
      "atualizadaEm": "2026-08-20T12:00:00.000Z",
      "fixada": true
    },
    {
      "id": "cv-002",
      "tipo": "nucleo",
      "titulo": "Núcleo Jaboatão dos Guararapes",
      "participantes": [
        "me-001",
        "me-010",
        "me-019",
        "me-028",
        "me-037",
        "me-046"
      ],
      "nucleoId": "nu-jaboatao",
      "atualizadaEm": "2026-08-20T07:00:00.000Z",
      "fixada": true
    },
    {
      "id": "cv-003",
      "tipo": "direta",
      "titulo": "Helena Moraes",
      "participantes": [
        "me-001",
        "me-002"
      ],
      "nucleoId": null,
      "atualizadaEm": "2026-08-20T02:00:00.000Z",
      "fixada": false
    },
    {
      "id": "cv-004",
      "tipo": "grupo",
      "titulo": "Coordenação de Formação",
      "participantes": [
        "me-001",
        "me-007",
        "me-016",
        "me-017"
      ],
      "nucleoId": null,
      "atualizadaEm": "2026-08-19T21:00:00.000Z",
      "fixada": false
    },
    {
      "id": "cv-005",
      "tipo": "direta",
      "titulo": "Beatriz Nogueira",
      "participantes": [
        "me-001",
        "me-004"
      ],
      "nucleoId": null,
      "atualizadaEm": "2026-08-19T16:00:00.000Z",
      "fixada": false
    }
  ],
  "mensagens": [
    {
      "id": "ms-001",
      "conversaId": "cv-001",
      "autorId": "me-004",
      "conteudo": "Membro, a leitura do Protocolo de Atuação Territorial é obrigatória até o dia 30. O documento está na biblioteca.",
      "criadaEm": "2026-08-20T10:00:00.000Z",
      "lidaPor": [
        "me-001"
      ]
    },
    {
      "id": "ms-002",
      "conversaId": "cv-001",
      "autorId": "me-001",
      "conteudo": "Confirmado. Leitura concluída hoje.",
      "criadaEm": "2026-08-20T11:00:00.000Z",
      "lidaPor": [
        "me-001"
      ]
    },
    {
      "id": "ms-003",
      "conversaId": "cv-002",
      "autorId": "me-001",
      "conteudo": "Boa noite a todos. O círculo de debate desta semana começa às 19h30, pontualmente.",
      "criadaEm": "2026-08-20T06:00:00.000Z",
      "lidaPor": [
        "me-001"
      ]
    },
    {
      "id": "ms-004",
      "conversaId": "cv-002",
      "autorId": "me-010",
      "conteudo": "Levarei os exemplares impressos do texto base.",
      "criadaEm": "2026-08-20T07:00:00.000Z",
      "lidaPor": [
        "me-001"
      ]
    },
    {
      "id": "ms-005",
      "conversaId": "cv-002",
      "autorId": "me-019",
      "conteudo": "Estarei presente. Alguém precisa de carona pelo centro?",
      "criadaEm": "2026-08-20T08:00:00.000Z",
      "lidaPor": [
        "me-001"
      ]
    },
    {
      "id": "ms-006",
      "conversaId": "cv-003",
      "autorId": "me-002",
      "conteudo": "Filipe, preciso do relatório de participação do seu Núcleo até sexta.",
      "criadaEm": "2026-08-20T04:00:00.000Z",
      "lidaPor": [
        "me-001"
      ]
    },
    {
      "id": "ms-007",
      "conversaId": "cv-003",
      "autorId": "me-001",
      "conteudo": "Envio até quinta. Já consolidei a lista de presença do último encontro.",
      "criadaEm": "2026-08-20T05:00:00.000Z",
      "lidaPor": [
        "me-001"
      ]
    },
    {
      "id": "ms-008",
      "conversaId": "cv-004",
      "autorId": "me-007",
      "conteudo": "Proponho revisarmos a bibliografia do Módulo III antes do congresso.",
      "criadaEm": "2026-08-19T11:00:00.000Z",
      "lidaPor": []
    },
    {
      "id": "ms-009",
      "conversaId": "cv-004",
      "autorId": "me-016",
      "conteudo": "Concordo. Posso preparar a síntese comparativa até segunda.",
      "criadaEm": "2026-08-19T12:00:00.000Z",
      "lidaPor": []
    },
    {
      "id": "ms-010",
      "conversaId": "cv-005",
      "autorId": "me-004",
      "conteudo": "Sua carteira de membro foi reemitida com o novo número de registro.",
      "criadaEm": "2026-08-18T11:00:00.000Z",
      "lidaPor": []
    }
  ],
  "notificacoes": [
    {
      "id": "no-001",
      "membroId": "me-001",
      "tipo": "comunicado",
      "titulo": "Novo comunicado oficial",
      "descricao": "A Secretaria-Geral publicou a atualização do Protocolo de Atuação Territorial.",
      "criadaEm": "2026-08-20T11:00:00.000Z",
      "lida": false,
      "destino": "/feed"
    },
    {
      "id": "no-002",
      "membroId": "me-001",
      "tipo": "evento",
      "titulo": "Inscrições abertas",
      "descricao": "Congresso Regional Nordeste — vagas limitadas por Núcleo.",
      "criadaEm": "2026-08-20T07:00:00.000Z",
      "lida": false,
      "destino": "/eventos"
    },
    {
      "id": "no-003",
      "membroId": "me-001",
      "tipo": "xp",
      "titulo": "+120 XP",
      "descricao": "Participação confirmada na reunião semanal do Núcleo.",
      "criadaEm": "2026-08-19T17:00:00.000Z",
      "lida": false,
      "destino": "/perfil"
    },
    {
      "id": "no-004",
      "membroId": "me-001",
      "tipo": "mensagem",
      "titulo": "Nova mensagem",
      "descricao": "Helena Moraes solicitou o relatório de participação.",
      "criadaEm": "2026-08-20T04:00:00.000Z",
      "lida": true,
      "destino": "/mensagens"
    },
    {
      "id": "no-005",
      "membroId": "me-001",
      "tipo": "atividade",
      "titulo": "Atividade com prazo hoje",
      "descricao": "Leitura do Protocolo de Atuação Territorial.",
      "criadaEm": "2026-08-20T12:00:00.000Z",
      "lida": false,
      "destino": "/hoje"
    },
    {
      "id": "no-006",
      "membroId": "me-001",
      "tipo": "administrativo",
      "titulo": "Carteira reemitida",
      "descricao": "Seu registro foi atualizado pela Secretaria.",
      "criadaEm": "2026-08-18T11:00:00.000Z",
      "lida": true,
      "destino": "/perfil"
    },
    {
      "id": "no-007",
      "membroId": "me-001",
      "tipo": "convite",
      "titulo": "Convite para projeto",
      "descricao": "Você foi convidado para o grupo de trabalho do Códice de Formação.",
      "criadaEm": "2026-08-17T13:00:00.000Z",
      "lida": true,
      "destino": "/mensagens"
    }
  ],
  "contas": [
    {
      "id": "ct-001",
      "nome": "Conta Institucional Nacional",
      "instituicao": "Banco do Brasil",
      "saldoInicial": 84500.0,
      "nucleoId": null
    },
    {
      "id": "ct-002",
      "nome": "Fundo de Formação",
      "instituicao": "Caixa Econômica",
      "saldoInicial": 32000.0,
      "nucleoId": null
    },
    {
      "id": "ct-003",
      "nome": "Caixa Núcleo Jaboatão",
      "instituicao": "Cooperativa de Crédito",
      "saldoInicial": 6400.0,
      "nucleoId": "nu-jaboatao"
    },
    {
      "id": "ct-004",
      "nome": "Caixa Núcleo São Paulo",
      "instituicao": "Banco Inter",
      "saldoInicial": 9800.0,
      "nucleoId": "nu-sp"
    }
  ],
  "categoriasFinanceiras": [
    {
      "id": "cf-001",
      "nome": "Pistis Eisphora — Contribuição de Fidelidade",
      "tipo": "receita",
      "cor": "#2a78d6"
    },
    {
      "id": "cf-002",
      "nome": "Hekousia Eisphora — Contribuição Livre",
      "tipo": "receita",
      "cor": "#eb6834"
    },
    {
      "id": "cf-003",
      "nome": "Evento e inscrição",
      "tipo": "receita",
      "cor": "#1baf7a"
    },
    {
      "id": "cf-004",
      "nome": "Venda de material",
      "tipo": "receita",
      "cor": "#eda100"
    },
    {
      "id": "cf-005",
      "nome": "Estrutura e sede",
      "tipo": "despesa",
      "cor": "#e87ba4"
    },
    {
      "id": "cf-006",
      "nome": "Formação e material",
      "tipo": "despesa",
      "cor": "#008300"
    },
    {
      "id": "cf-007",
      "nome": "Comunicação",
      "tipo": "despesa",
      "cor": "#4a3aa7"
    },
    {
      "id": "cf-008",
      "nome": "Administração",
      "tipo": "despesa",
      "cor": "#e34948"
    }
  ],
  "lancamentos": [
    {
      "id": "la-0001",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-09-06T10:00:00.000Z",
      "descricao": "Pistis Eisphora — contribuições de fidelidade do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 18542.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0002",
      "tipo": "receita",
      "modalidade": "hekousia",
      "contribuinteId": null,
      "data": "2025-09-07T10:00:00.000Z",
      "descricao": "Hekousia Eisphora — aportes livres do mês",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 4317.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0003",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-09-08T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 3718.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0003.pdf"
    },
    {
      "id": "la-0004",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-09-09T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 1824.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0005",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-09-10T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1164.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0006",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-09-11T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1244.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0006.pdf"
    },
    {
      "id": "la-0007",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-09-12T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1439.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0008",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-09-13T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 878.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0009",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-09-14T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 834.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0009.pdf"
    },
    {
      "id": "la-0010",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-09-15T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 823.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0011",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-09-16T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 796.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0012",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-09-17T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 782.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0012.pdf"
    },
    {
      "id": "la-0013",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-09-18T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 747.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0014",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-09-19T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 5498.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0015",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-09-20T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3021.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0015.pdf"
    },
    {
      "id": "la-0016",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-09-21T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2399.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0017",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-09-22T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1512.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0018",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-09-23T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 880.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0018.pdf"
    },
    {
      "id": "la-0019",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-09-24T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 723.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0020",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-09-25T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 602.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0021",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-10-26T10:00:00.000Z",
      "descricao": "Pistis Eisphora — contribuições de fidelidade do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 19093.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0021.pdf"
    },
    {
      "id": "la-0022",
      "tipo": "receita",
      "modalidade": "hekousia",
      "contribuinteId": null,
      "data": "2025-10-27T10:00:00.000Z",
      "descricao": "Hekousia Eisphora — aportes livres do mês",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 4123.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0023",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-10-28T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 3733.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0024",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-10-05T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2080.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0024.pdf"
    },
    {
      "id": "la-0025",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-10-06T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1474.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0026",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-10-07T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1256.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0027",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-10-08T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1274.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0027.pdf"
    },
    {
      "id": "la-0028",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-10-09T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1055.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0029",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-10-10T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 942.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0030",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-10-11T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 741.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0030.pdf"
    },
    {
      "id": "la-0031",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-10-12T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 740.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0032",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-10-13T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 792.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0033",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-10-14T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 568.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0033.pdf"
    },
    {
      "id": "la-0034",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-10-15T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 5808.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0035",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-10-16T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3078.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0036",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-10-17T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2527.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0036.pdf"
    },
    {
      "id": "la-0037",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-10-18T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1435.8,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0038",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-10-19T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 999.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0039",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-10-20T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 483.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0039.pdf"
    },
    {
      "id": "la-0040",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-10-21T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 423.8,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0041",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-11-21T10:00:00.000Z",
      "descricao": "Pistis Eisphora — contribuições de fidelidade do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 19780.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0042",
      "tipo": "receita",
      "modalidade": "hekousia",
      "contribuinteId": null,
      "data": "2025-11-22T10:00:00.000Z",
      "descricao": "Hekousia Eisphora — aportes livres do mês",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 4486.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0042.pdf"
    },
    {
      "id": "la-0043",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-11-23T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 4229.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0044",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-11-24T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2045.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0045",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-11-25T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1334.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0045.pdf"
    },
    {
      "id": "la-0046",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-11-26T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1267.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0047",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-11-27T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1386.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0048",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-11-04T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1383.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0048.pdf"
    },
    {
      "id": "la-0049",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-11-05T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 897.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0050",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-11-06T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 740.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0051",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-11-07T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 631.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0051.pdf"
    },
    {
      "id": "la-0052",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-11-08T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 656.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0053",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-11-09T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 532.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0054",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-11-10T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 5680.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0054.pdf"
    },
    {
      "id": "la-0055",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-11-11T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3224.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0056",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-11-12T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2708.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0057",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-11-13T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1863.6,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0057.pdf"
    },
    {
      "id": "la-0058",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-11-14T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 906.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0059",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-11-15T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 826.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0060",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-11-16T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 259.6,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0060.pdf"
    },
    {
      "id": "la-0061",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-12-17T10:00:00.000Z",
      "descricao": "Pistis Eisphora — contribuições de fidelidade do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 20829.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0062",
      "tipo": "receita",
      "modalidade": "hekousia",
      "contribuinteId": null,
      "data": "2025-12-18T10:00:00.000Z",
      "descricao": "Hekousia Eisphora — aportes livres do mês",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 4568.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0063",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-12-19T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 4513.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0063.pdf"
    },
    {
      "id": "la-0064",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-12-20T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2270.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0065",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-12-21T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1587.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0066",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-12-22T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1353.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0066.pdf"
    },
    {
      "id": "la-0067",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-12-23T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1526.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0068",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-12-24T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1433.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0069",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-12-25T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 916.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0069.pdf"
    },
    {
      "id": "la-0070",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-12-26T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1054.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0071",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-12-27T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 608.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0072",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-12-04T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 907.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0072.pdf"
    },
    {
      "id": "la-0073",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2025-12-05T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 647.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0074",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-12-06T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 5803.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0075",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-12-07T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3275.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0075.pdf"
    },
    {
      "id": "la-0076",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-12-08T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2701.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0077",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-12-09T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1649.4,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0078",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-12-10T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 862.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0078.pdf"
    },
    {
      "id": "la-0079",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-12-11T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 562.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0080",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2025-12-12T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 571.4,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0081",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-01-12T10:00:00.000Z",
      "descricao": "Pistis Eisphora — contribuições de fidelidade do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 21369.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0081.pdf"
    },
    {
      "id": "la-0082",
      "tipo": "receita",
      "modalidade": "hekousia",
      "contribuinteId": null,
      "data": "2026-01-13T10:00:00.000Z",
      "descricao": "Hekousia Eisphora — aportes livres do mês",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 4899.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0083",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-01-14T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 4584.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0084",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-01-15T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2053.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0084.pdf"
    },
    {
      "id": "la-0085",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-01-16T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1546.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0086",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-01-17T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1304.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0087",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-01-18T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1541.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0087.pdf"
    },
    {
      "id": "la-0088",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-01-19T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1332.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0089",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-01-20T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1346.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0090",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-01-21T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 919.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0090.pdf"
    },
    {
      "id": "la-0091",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-01-22T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1044.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0092",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-01-23T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 626.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0093",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-01-24T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 774.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0093.pdf"
    },
    {
      "id": "la-0094",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-01-25T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 6312.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0095",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-01-26T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3585.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0096",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-01-03T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2711.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0096.pdf"
    },
    {
      "id": "la-0097",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-01-04T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1724.2,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0098",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-01-05T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 818.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0099",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-01-06T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 604.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0099.pdf"
    },
    {
      "id": "la-0100",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-01-07T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 487.2,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0101",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-02-07T10:00:00.000Z",
      "descricao": "Pistis Eisphora — contribuições de fidelidade do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 22188.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0102",
      "tipo": "receita",
      "modalidade": "hekousia",
      "contribuinteId": null,
      "data": "2026-02-08T10:00:00.000Z",
      "descricao": "Hekousia Eisphora — aportes livres do mês",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 4841.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0102.pdf"
    },
    {
      "id": "la-0103",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-02-09T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 4509.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0104",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-02-10T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2226.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0105",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-02-11T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1638.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0105.pdf"
    },
    {
      "id": "la-0106",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-02-12T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1690.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0107",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-02-13T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1415.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0108",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-02-14T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1139.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0108.pdf"
    },
    {
      "id": "la-0109",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-02-15T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1131.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0110",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-02-16T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 994.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0111",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-02-17T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 638.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0111.pdf"
    },
    {
      "id": "la-0112",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-02-18T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 697.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0113",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-02-19T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 681.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0114",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-02-20T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 6255.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0114.pdf"
    },
    {
      "id": "la-0115",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-02-21T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3742.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0116",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-02-22T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2746.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0117",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-02-23T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1789.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0117.pdf"
    },
    {
      "id": "la-0118",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-02-24T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 1017.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0119",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-02-25T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 646.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0120",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-02-02T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 479.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0120.pdf"
    },
    {
      "id": "la-0121",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-03-05T10:00:00.000Z",
      "descricao": "Pistis Eisphora — contribuições de fidelidade do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 22733.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0122",
      "tipo": "receita",
      "modalidade": "hekousia",
      "contribuinteId": null,
      "data": "2026-03-06T10:00:00.000Z",
      "descricao": "Hekousia Eisphora — aportes livres do mês",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 5230.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0123",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-03-07T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 4637.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0123.pdf"
    },
    {
      "id": "la-0124",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-03-08T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2160.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0125",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-03-09T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1906.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0126",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-03-10T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1853.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0126.pdf"
    },
    {
      "id": "la-0127",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-03-11T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1483.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0128",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-03-12T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1565.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0129",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-03-13T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1392.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0129.pdf"
    },
    {
      "id": "la-0130",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-03-14T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1041.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0131",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-03-15T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 707.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0132",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-03-16T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1027.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0132.pdf"
    },
    {
      "id": "la-0133",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-03-17T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 538.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0134",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-03-18T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 6901.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0135",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-03-19T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3799.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0135.pdf"
    },
    {
      "id": "la-0136",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-03-20T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2858.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0137",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-03-21T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1828.8,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0138",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-03-22T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 1223.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0138.pdf"
    },
    {
      "id": "la-0139",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-03-23T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 846.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0140",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-03-24T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 387.8,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0141",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-04-24T10:00:00.000Z",
      "descricao": "Pistis Eisphora — contribuições de fidelidade do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 23925.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0141.pdf"
    },
    {
      "id": "la-0142",
      "tipo": "receita",
      "modalidade": "hekousia",
      "contribuinteId": null,
      "data": "2026-04-25T10:00:00.000Z",
      "descricao": "Hekousia Eisphora — aportes livres do mês",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 5531.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0143",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-04-26T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 4633.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0144",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-04-03T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2725.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0144.pdf"
    },
    {
      "id": "la-0145",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-04-04T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1864.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0146",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-04-05T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1825.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0147",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-04-06T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1576.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0147.pdf"
    },
    {
      "id": "la-0148",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-04-07T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1406.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0149",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-04-08T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1298.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0150",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-04-09T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 899.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0150.pdf"
    },
    {
      "id": "la-0151",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-04-10T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 701.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0152",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-04-11T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 897.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0153",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-04-12T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 470.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0153.pdf"
    },
    {
      "id": "la-0154",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-04-13T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 6904.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0155",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-04-14T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3873.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0156",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-04-15T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2877.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0156.pdf"
    },
    {
      "id": "la-0157",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-04-16T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 2134.6,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0158",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-04-17T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 995.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0159",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-04-18T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 1013.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0159.pdf"
    },
    {
      "id": "la-0160",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-04-19T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 783.6,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0161",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-05-20T10:00:00.000Z",
      "descricao": "Pistis Eisphora — contribuições de fidelidade do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 24556.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0162",
      "tipo": "receita",
      "modalidade": "hekousia",
      "contribuinteId": null,
      "data": "2026-05-21T10:00:00.000Z",
      "descricao": "Hekousia Eisphora — aportes livres do mês",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 5677.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0162.pdf"
    },
    {
      "id": "la-0163",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-05-22T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 4759.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0164",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-05-23T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2722.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0165",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-05-24T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1830.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0165.pdf"
    },
    {
      "id": "la-0166",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-05-25T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1521.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0167",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-05-26T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1590.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0168",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-05-03T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1247.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0168.pdf"
    },
    {
      "id": "la-0169",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-05-04T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1219.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0170",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-05-05T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1354.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0171",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-05-06T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1147.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0171.pdf"
    },
    {
      "id": "la-0172",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-05-07T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1036.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0173",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-05-08T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 764.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0174",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-05-09T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 7236.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0174.pdf"
    },
    {
      "id": "la-0175",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-05-10T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 4223.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0176",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-05-11T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 3260.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0177",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-05-12T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 2017.4,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0177.pdf"
    },
    {
      "id": "la-0178",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-05-13T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 1165.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0179",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-05-14T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 871.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0180",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-05-15T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 668.4,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0180.pdf"
    },
    {
      "id": "la-0181",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-06-15T10:00:00.000Z",
      "descricao": "Pistis Eisphora — contribuições de fidelidade do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 25089.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0182",
      "tipo": "receita",
      "modalidade": "hekousia",
      "contribuinteId": null,
      "data": "2026-06-16T10:00:00.000Z",
      "descricao": "Hekousia Eisphora — aportes livres do mês",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 5470.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0183",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-06-17T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 5037.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0183.pdf"
    },
    {
      "id": "la-0184",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-06-18T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2688.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0185",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-06-19T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1768.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0186",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-06-20T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1999.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0186.pdf"
    },
    {
      "id": "la-0187",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-06-21T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1842.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0188",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-06-22T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1251.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0189",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-06-23T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1283.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0189.pdf"
    },
    {
      "id": "la-0190",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-06-24T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1378.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0191",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-06-25T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 769.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0192",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-06-02T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 651.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0192.pdf"
    },
    {
      "id": "la-0193",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-06-03T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 588.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0194",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-06-04T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 7506.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0195",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-06-05T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 4134.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0195.pdf"
    },
    {
      "id": "la-0196",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-06-06T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 3073.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0197",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-06-07T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1988.2,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0198",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-06-08T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 1194.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0198.pdf"
    },
    {
      "id": "la-0199",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-06-09T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 650.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0200",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-06-10T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 526.2,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0201",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-07-11T10:00:00.000Z",
      "descricao": "Pistis Eisphora — contribuições de fidelidade do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 25943.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0201.pdf"
    },
    {
      "id": "la-0202",
      "tipo": "receita",
      "modalidade": "hekousia",
      "contribuinteId": null,
      "data": "2026-07-12T10:00:00.000Z",
      "descricao": "Hekousia Eisphora — aportes livres do mês",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 5750.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0203",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-07-13T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 5100.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0204",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-07-14T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2805.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0204.pdf"
    },
    {
      "id": "la-0205",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-07-15T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 2033.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0206",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-07-16T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1611.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0207",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-07-17T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1912.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0207.pdf"
    },
    {
      "id": "la-0208",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-07-18T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1448.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0209",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-07-19T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1102.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0210",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-07-20T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1039.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0210.pdf"
    },
    {
      "id": "la-0211",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-07-21T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 863.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0212",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-07-22T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 634.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0213",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-07-23T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 695.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0213.pdf"
    },
    {
      "id": "la-0214",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-07-24T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 7718.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0215",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-07-25T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 4232.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0216",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-07-02T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 3012.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0216.pdf"
    },
    {
      "id": "la-0217",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-07-03T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 2211.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0218",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-07-04T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 1174.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0219",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-07-05T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 1065.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0219.pdf"
    },
    {
      "id": "la-0220",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-07-06T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 752.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0221",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-08-06T10:00:00.000Z",
      "descricao": "Pistis Eisphora — contribuições de fidelidade do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 26396.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0222",
      "tipo": "receita",
      "modalidade": "hekousia",
      "contribuinteId": null,
      "data": "2026-08-07T10:00:00.000Z",
      "descricao": "Hekousia Eisphora — aportes livres do mês",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 6279.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0222.pdf"
    },
    {
      "id": "la-0223",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-08-08T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 5233.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0224",
      "tipo": "receita",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-08-09T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2601.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "previsto",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0225",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-08-10T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1781.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0225.pdf"
    },
    {
      "id": "la-0226",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-08-11T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1693.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0227",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-08-12T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1878.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0228",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-08-13T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1476.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0228.pdf"
    },
    {
      "id": "la-0229",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-08-14T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1136.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0230",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-08-15T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1092.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0231",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-08-16T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 910.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "previsto",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0231.pdf"
    },
    {
      "id": "la-0232",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-08-17T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 955.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0233",
      "tipo": "receita",
      "modalidade": "pistis",
      "contribuinteId": null,
      "data": "2026-08-18T10:00:00.000Z",
      "descricao": "Pistis Eisphora — Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 819.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0234",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-08-19T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 7536.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0234.pdf"
    },
    {
      "id": "la-0235",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-08-20T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 4246.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0236",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-08-21T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 3248.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0237",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-08-22T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 2406.8,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0237.pdf"
    },
    {
      "id": "la-0238",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-08-23T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 1192.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "previsto",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0239",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-08-24T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 850.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0240",
      "tipo": "despesa",
      "modalidade": null,
      "contribuinteId": null,
      "data": "2026-08-01T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 599.8,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0240.pdf"
    }
  ],
  "compromissos": [
    {
      "id": "co-001",
      "membroId": "me-001",
      "valorMensal": 30.0,
      "inicioVigencia": "2023-05-28T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-002",
      "membroId": "me-002",
      "valorMensal": 50.0,
      "inicioVigencia": "2023-06-22T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-004",
      "membroId": "me-004",
      "valorMensal": 120.0,
      "inicioVigencia": "2023-08-11T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-005",
      "membroId": "me-005",
      "valorMensal": 200.0,
      "inicioVigencia": "2023-09-05T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-007",
      "membroId": "me-007",
      "valorMensal": 50.0,
      "inicioVigencia": "2023-10-25T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-008",
      "membroId": "me-008",
      "valorMensal": 80.0,
      "inicioVigencia": "2023-11-19T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-010",
      "membroId": "me-010",
      "valorMensal": 200.0,
      "inicioVigencia": "2024-01-08T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-011",
      "membroId": "me-011",
      "valorMensal": 30.0,
      "inicioVigencia": "2024-02-02T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-013",
      "membroId": "me-013",
      "valorMensal": 80.0,
      "inicioVigencia": "2024-03-23T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-014",
      "membroId": "me-014",
      "valorMensal": 120.0,
      "inicioVigencia": "2024-04-17T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-016",
      "membroId": "me-016",
      "valorMensal": 30.0,
      "inicioVigencia": "2024-06-06T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-017",
      "membroId": "me-017",
      "valorMensal": 50.0,
      "inicioVigencia": "2024-07-01T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-019",
      "membroId": "me-019",
      "valorMensal": 120.0,
      "inicioVigencia": "2024-08-20T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-020",
      "membroId": "me-020",
      "valorMensal": 200.0,
      "inicioVigencia": "2024-09-14T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-022",
      "membroId": "me-022",
      "valorMensal": 50.0,
      "inicioVigencia": "2024-11-03T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-023",
      "membroId": "me-023",
      "valorMensal": 80.0,
      "inicioVigencia": "2024-11-28T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-025",
      "membroId": "me-025",
      "valorMensal": 200.0,
      "inicioVigencia": "2025-01-17T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-026",
      "membroId": "me-026",
      "valorMensal": 30.0,
      "inicioVigencia": "2025-02-11T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-028",
      "membroId": "me-028",
      "valorMensal": 80.0,
      "inicioVigencia": "2025-04-02T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-029",
      "membroId": "me-029",
      "valorMensal": 120.0,
      "inicioVigencia": "2025-04-27T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-031",
      "membroId": "me-031",
      "valorMensal": 30.0,
      "inicioVigencia": "2025-06-16T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-032",
      "membroId": "me-032",
      "valorMensal": 50.0,
      "inicioVigencia": "2025-07-11T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-034",
      "membroId": "me-034",
      "valorMensal": 120.0,
      "inicioVigencia": "2025-08-30T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-035",
      "membroId": "me-035",
      "valorMensal": 200.0,
      "inicioVigencia": "2025-09-24T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-037",
      "membroId": "me-037",
      "valorMensal": 50.0,
      "inicioVigencia": "2025-11-13T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-038",
      "membroId": "me-038",
      "valorMensal": 80.0,
      "inicioVigencia": "2025-12-08T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-040",
      "membroId": "me-040",
      "valorMensal": 200.0,
      "inicioVigencia": "2026-01-27T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    },
    {
      "id": "co-046",
      "membroId": "me-046",
      "valorMensal": 30.0,
      "inicioVigencia": "2026-06-26T13:00:00.000Z",
      "fimVigencia": null,
      "ativo": true
    }
  ],
  "atividades": [
    {
      "id": "at-001",
      "titulo": "Leitura do Protocolo de Atuação Territorial",
      "descricao": "Revise o documento publicado pela Secretaria-Geral. Confirmação de leitura obrigatória.",
      "prazo": "2026-08-20T18:00:00.000Z",
      "membroId": "me-001",
      "origem": "atividade",
      "xp": 25,
      "concluida": false,
      "destino": "/documentos"
    },
    {
      "id": "at-002",
      "titulo": "Check-in no Núcleo Jaboatão",
      "descricao": "Presença confirmada na reunião semanal.",
      "prazo": "2026-08-18T13:00:00.000Z",
      "membroId": "me-001",
      "origem": "reuniao",
      "xp": 50,
      "concluida": true,
      "destino": null
    },
    {
      "id": "at-003",
      "titulo": "Concluir Módulo III — Fundamentos",
      "descricao": "Aula e verificação de leitura pendentes.",
      "prazo": "2026-08-23T18:00:00.000Z",
      "membroId": "me-001",
      "origem": "formacao",
      "xp": 250,
      "concluida": false,
      "destino": "/formacao"
    },
    {
      "id": "at-004",
      "titulo": "Confirmar presença no Congresso Regional",
      "descricao": "Vagas limitadas por Núcleo.",
      "prazo": "2026-08-22T18:00:00.000Z",
      "membroId": "me-001",
      "origem": "evento",
      "xp": 120,
      "concluida": false,
      "destino": "/eventos"
    },
    {
      "id": "at-005",
      "titulo": "Relatório de participação do Núcleo",
      "descricao": "Consolidar a lista de presença do último encontro.",
      "prazo": "2026-08-21T18:00:00.000Z",
      "membroId": "me-001",
      "origem": "nucleo",
      "xp": 60,
      "concluida": false,
      "destino": null
    }
  ],
  "auditoria": [
    {
      "id": "au-001",
      "membroId": "me-004",
      "acao": "Aprovou cadastro",
      "modulo": "Secretaria",
      "detalhe": "Cadastro de Caio Bulhões Neves aprovado e vinculado ao Núcleo Recife Central.",
      "em": "2026-08-20T11:00:00.000Z",
      "ip": "189.40.12.7"
    },
    {
      "id": "au-002",
      "membroId": "me-005",
      "acao": "Registrou despesa",
      "modulo": "Tesouraria",
      "detalhe": "Despesa de R$ 2.300,00 na categoria Comunicação.",
      "em": "2026-08-20T04:00:00.000Z",
      "ip": "189.41.15.8"
    },
    {
      "id": "au-003",
      "membroId": "me-002",
      "acao": "Alterou permissões",
      "modulo": "Administração",
      "detalhe": "Permissão 'relatorios.gerar' concedida ao cargo Coordenador.",
      "em": "2026-08-19T21:00:00.000Z",
      "ip": "189.42.18.9"
    },
    {
      "id": "au-004",
      "membroId": "me-004",
      "acao": "Publicou comunicado",
      "modulo": "Feed",
      "detalhe": "Comunicado oficial 'Atualização do Protocolo de Atuação Territorial'.",
      "em": "2026-08-19T14:00:00.000Z",
      "ip": "189.43.21.10"
    },
    {
      "id": "au-005",
      "membroId": "me-003",
      "acao": "Tramitou proposta",
      "modulo": "Propostas",
      "detalhe": "Proposta pp-006 movida para 'aprovada'.",
      "em": "2026-08-19T07:00:00.000Z",
      "ip": "189.44.24.11"
    },
    {
      "id": "au-006",
      "membroId": "me-012",
      "acao": "Registrou presença",
      "modulo": "Eventos",
      "detalhe": "24 registros de presença no evento ev-006.",
      "em": "2026-08-19T00:00:00.000Z",
      "ip": "189.45.27.12"
    },
    {
      "id": "au-007",
      "membroId": "me-004",
      "acao": "Transferiu membro",
      "modulo": "Secretaria",
      "detalhe": "Membro AO-29556 transferido para o Núcleo Campinas.",
      "em": "2026-08-18T17:00:00.000Z",
      "ip": "189.46.30.13"
    },
    {
      "id": "au-008",
      "membroId": "me-002",
      "acao": "Suspendeu membro",
      "modulo": "Secretaria",
      "detalhe": "Membro AO-30083 suspenso por decisão disciplinar.",
      "em": "2026-08-18T10:00:00.000Z",
      "ip": "189.47.33.14"
    },
    {
      "id": "au-009",
      "membroId": "me-005",
      "acao": "Criou conta financeira",
      "modulo": "Tesouraria",
      "detalhe": "Conta 'Caixa Núcleo São Paulo' criada.",
      "em": "2026-08-18T03:00:00.000Z",
      "ip": "189.48.36.15"
    },
    {
      "id": "au-010",
      "membroId": "me-004",
      "acao": "Emitiu carteira",
      "modulo": "Secretaria",
      "detalhe": "Carteira digital reemitida para AO-29352.",
      "em": "2026-08-17T20:00:00.000Z",
      "ip": "189.49.39.16"
    },
    {
      "id": "au-011",
      "membroId": "me-007",
      "acao": "Publicou documento",
      "modulo": "Documentos",
      "detalhe": "Códice de Formação versão 3.0 publicado.",
      "em": "2026-08-17T13:00:00.000Z",
      "ip": "189.50.42.17"
    },
    {
      "id": "au-012",
      "membroId": "me-002",
      "acao": "Ajustou XP",
      "modulo": "Gamificação",
      "detalhe": "+180 XP atribuídos a AO-29471 por projeto institucional.",
      "em": "2026-08-17T06:00:00.000Z",
      "ip": "189.51.45.18"
    }
  ],
  "sessoes": [
    {
      "id": "se-001",
      "membroId": "me-001",
      "dispositivo": "Chrome · Windows 11",
      "local": "Jaboatão dos Guararapes, PE",
      "criadaEm": "2026-08-20T12:00:00.000Z",
      "atual": true
    },
    {
      "id": "se-002",
      "membroId": "me-001",
      "dispositivo": "App Android · Pixel 8",
      "local": "Recife, PE",
      "criadaEm": "2026-08-18T13:00:00.000Z",
      "atual": false
    },
    {
      "id": "se-003",
      "membroId": "me-001",
      "dispositivo": "Safari · iPad",
      "local": "Olinda, PE",
      "criadaEm": "2026-08-09T13:00:00.000Z",
      "atual": false
    }
  ],
  "orgaosLocais": [
    {
      "id": "org-jaboatao-local",
      "codigo": "coordenadoria_local",
      "nome": "Coordenadoria de Gestão Local — Jaboatão dos Guararapes",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-jaboatao",
      "minimoMembros": 1,
      "maximoMembros": null,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-jaboatao-etica",
      "codigo": "conselho_local_etica",
      "nome": "Conselho Local de Ética — Jaboatão dos Guararapes",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-jaboatao",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-jaboatao-contas",
      "codigo": "conselho_local_contas",
      "nome": "Conselho Local de Contas — Jaboatão dos Guararapes",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-jaboatao",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-recife-local",
      "codigo": "coordenadoria_local",
      "nome": "Coordenadoria de Gestão Local — Recife Central",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-recife",
      "minimoMembros": 1,
      "maximoMembros": null,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-recife-etica",
      "codigo": "conselho_local_etica",
      "nome": "Conselho Local de Ética — Recife Central",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-recife",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-recife-contas",
      "codigo": "conselho_local_contas",
      "nome": "Conselho Local de Contas — Recife Central",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-recife",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-sp-local",
      "codigo": "coordenadoria_local",
      "nome": "Coordenadoria de Gestão Local — São Paulo Central",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-sp",
      "minimoMembros": 1,
      "maximoMembros": null,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-sp-etica",
      "codigo": "conselho_local_etica",
      "nome": "Conselho Local de Ética — São Paulo Central",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-sp",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-sp-contas",
      "codigo": "conselho_local_contas",
      "nome": "Conselho Local de Contas — São Paulo Central",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-sp",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-campinas-local",
      "codigo": "coordenadoria_local",
      "nome": "Coordenadoria de Gestão Local — Campinas",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-campinas",
      "minimoMembros": 1,
      "maximoMembros": null,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-campinas-etica",
      "codigo": "conselho_local_etica",
      "nome": "Conselho Local de Ética — Campinas",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-campinas",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-campinas-contas",
      "codigo": "conselho_local_contas",
      "nome": "Conselho Local de Contas — Campinas",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-campinas",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-rj-local",
      "codigo": "coordenadoria_local",
      "nome": "Coordenadoria de Gestão Local — Rio de Janeiro",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-rj",
      "minimoMembros": 1,
      "maximoMembros": null,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-rj-etica",
      "codigo": "conselho_local_etica",
      "nome": "Conselho Local de Ética — Rio de Janeiro",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-rj",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-rj-contas",
      "codigo": "conselho_local_contas",
      "nome": "Conselho Local de Contas — Rio de Janeiro",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-rj",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-bh-local",
      "codigo": "coordenadoria_local",
      "nome": "Coordenadoria de Gestão Local — Belo Horizonte",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-bh",
      "minimoMembros": 1,
      "maximoMembros": null,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-bh-etica",
      "codigo": "conselho_local_etica",
      "nome": "Conselho Local de Ética — Belo Horizonte",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-bh",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-bh-contas",
      "codigo": "conselho_local_contas",
      "nome": "Conselho Local de Contas — Belo Horizonte",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-bh",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-salvador-local",
      "codigo": "coordenadoria_local",
      "nome": "Coordenadoria de Gestão Local — Salvador",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-salvador",
      "minimoMembros": 1,
      "maximoMembros": null,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-salvador-etica",
      "codigo": "conselho_local_etica",
      "nome": "Conselho Local de Ética — Salvador",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-salvador",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-salvador-contas",
      "codigo": "conselho_local_contas",
      "nome": "Conselho Local de Contas — Salvador",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-salvador",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-brasilia-local",
      "codigo": "coordenadoria_local",
      "nome": "Coordenadoria de Gestão Local — Brasília",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-brasilia",
      "minimoMembros": 1,
      "maximoMembros": null,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-brasilia-etica",
      "codigo": "conselho_local_etica",
      "nome": "Conselho Local de Ética — Brasília",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-brasilia",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-brasilia-contas",
      "codigo": "conselho_local_contas",
      "nome": "Conselho Local de Contas — Brasília",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-brasilia",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-lisboa-local",
      "codigo": "coordenadoria_local",
      "nome": "Coordenadoria de Gestão Local — Lisboa",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-lisboa",
      "minimoMembros": 1,
      "maximoMembros": null,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-lisboa-etica",
      "codigo": "conselho_local_etica",
      "nome": "Conselho Local de Ética — Lisboa",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-lisboa",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    },
    {
      "id": "org-lisboa-contas",
      "codigo": "conselho_local_contas",
      "nome": "Conselho Local de Contas — Lisboa",
      "descricao": "Órgão local obrigatório, nos termos do Est. Art. 59.",
      "ambito": "local",
      "nucleoId": "nu-lisboa",
      "minimoMembros": 3,
      "maximoMembros": 7,
      "mandatoAnos": 4,
      "competencias": [],
      "fundamento": "Est. Art. 59"
    }
  ],
  "assentos": [
    {
      "id": "as-001",
      "orgaoId": "org-grao-mestre",
      "membroId": "me-003",
      "funcao": "Moderador Presidente",
      "inicioMandato": "2024-08-20T13:00:00.000Z",
      "fimMandato": "2033-08-18T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-002",
      "orgaoId": "org-diretoria",
      "membroId": "me-006",
      "funcao": "Chanceler",
      "inicioMandato": "2024-08-20T13:00:00.000Z",
      "fimMandato": "2028-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-003",
      "orgaoId": "org-diretoria",
      "membroId": "me-004",
      "funcao": "Secretário-Geral",
      "inicioMandato": "2024-08-20T13:00:00.000Z",
      "fimMandato": "2028-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-004",
      "orgaoId": "org-diretoria",
      "membroId": "me-005",
      "funcao": "Tesoureiro-Geral",
      "inicioMandato": "2024-08-20T13:00:00.000Z",
      "fimMandato": "2028-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-005",
      "orgaoId": "org-conselho-alto",
      "membroId": "me-007",
      "funcao": "Conselheiro",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-006",
      "orgaoId": "org-conselho-alto",
      "membroId": "me-008",
      "funcao": "Conselheiro",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-007",
      "orgaoId": "org-conselho-alto",
      "membroId": "me-009",
      "funcao": "Conselheiro",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-008",
      "orgaoId": "org-conselho-alto",
      "membroId": "me-011",
      "funcao": "Conselheiro",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-009",
      "orgaoId": "org-conselho-baixo",
      "membroId": "me-020",
      "funcao": "Kyrios",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-010",
      "orgaoId": "org-conselho-baixo",
      "membroId": "me-021",
      "funcao": "Kyrios",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-011",
      "orgaoId": "org-conselho-baixo",
      "membroId": "me-022",
      "funcao": "Kyrios",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-012",
      "orgaoId": "org-conselho-baixo",
      "membroId": "me-027",
      "funcao": "Kyrios",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-013",
      "orgaoId": "org-conselho-baixo",
      "membroId": "me-032",
      "funcao": "Kyrios",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-014",
      "orgaoId": "org-etica",
      "membroId": "me-013",
      "funcao": "Conselheiro de Ética",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-015",
      "orgaoId": "org-etica",
      "membroId": "me-015",
      "funcao": "Conselheiro de Ética",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-016",
      "orgaoId": "org-etica",
      "membroId": "me-017",
      "funcao": "Conselheiro de Ética",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-017",
      "orgaoId": "org-contas",
      "membroId": "me-014",
      "funcao": "Conselheiro de Contas",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-018",
      "orgaoId": "org-contas",
      "membroId": "me-016",
      "funcao": "Conselheiro de Contas",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-019",
      "orgaoId": "org-contas",
      "membroId": "me-018",
      "funcao": "Conselheiro de Contas",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-020",
      "orgaoId": "org-contas",
      "membroId": "me-019",
      "funcao": "Conselheiro de Contas",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-021",
      "orgaoId": "org-jaboatao-local",
      "membroId": "me-019",
      "funcao": "Coordenador",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-022",
      "orgaoId": "org-recife-local",
      "membroId": "me-011",
      "funcao": "Coordenador",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-023",
      "orgaoId": "org-sp-local",
      "membroId": "me-012",
      "funcao": "Coordenador",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-024",
      "orgaoId": "org-campinas-local",
      "membroId": "me-013",
      "funcao": "Coordenador",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-025",
      "orgaoId": "org-rj-local",
      "membroId": "me-014",
      "funcao": "Coordenador",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-026",
      "orgaoId": "org-bh-local",
      "membroId": "me-015",
      "funcao": "Coordenador",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-027",
      "orgaoId": "org-salvador-local",
      "membroId": "me-016",
      "funcao": "Coordenador",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-028",
      "orgaoId": "org-brasilia-local",
      "membroId": "me-017",
      "funcao": "Coordenador",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    },
    {
      "id": "as-029",
      "orgaoId": "org-lisboa-local",
      "membroId": "me-018",
      "funcao": "Coordenador",
      "inicioMandato": "2025-08-20T13:00:00.000Z",
      "fimMandato": "2029-08-19T13:00:00.000Z",
      "ativo": true
    }
  ],
  "ritos": [
    {
      "id": "ri-001",
      "tipo": "oikeiosis",
      "membroId": "me-001",
      "nucleoId": "nu-jaboatao",
      "celebradoEm": "2023-05-28T13:00:00.000Z",
      "presididoPorId": "me-019",
      "local": "Núcleo Jaboatão dos Guararapes",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-002",
      "tipo": "oikeiosis",
      "membroId": "me-002",
      "nucleoId": "nu-recife",
      "celebradoEm": "2023-06-22T13:00:00.000Z",
      "presididoPorId": "me-011",
      "local": "Núcleo Recife Central",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-003",
      "tipo": "oikeiosis",
      "membroId": "me-003",
      "nucleoId": "nu-sp",
      "celebradoEm": "2023-07-17T13:00:00.000Z",
      "presididoPorId": "me-012",
      "local": "Núcleo São Paulo Central",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-004",
      "tipo": "oikeiosis",
      "membroId": "me-004",
      "nucleoId": "nu-campinas",
      "celebradoEm": "2023-08-11T13:00:00.000Z",
      "presididoPorId": "me-013",
      "local": "Núcleo Campinas",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-005",
      "tipo": "oikeiosis",
      "membroId": "me-005",
      "nucleoId": "nu-rj",
      "celebradoEm": "2023-09-05T13:00:00.000Z",
      "presididoPorId": "me-014",
      "local": "Núcleo Rio de Janeiro",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-006",
      "tipo": "oikeiosis",
      "membroId": "me-006",
      "nucleoId": "nu-bh",
      "celebradoEm": "2023-09-30T13:00:00.000Z",
      "presididoPorId": "me-015",
      "local": "Núcleo Belo Horizonte",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-007",
      "tipo": "oikeiosis",
      "membroId": "me-007",
      "nucleoId": "nu-salvador",
      "celebradoEm": "2023-10-25T13:00:00.000Z",
      "presididoPorId": "me-016",
      "local": "Núcleo Salvador",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-008",
      "tipo": "oikeiosis",
      "membroId": "me-008",
      "nucleoId": "nu-brasilia",
      "celebradoEm": "2023-11-19T13:00:00.000Z",
      "presididoPorId": "me-017",
      "local": "Núcleo Brasília",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-009",
      "tipo": "oikeiosis",
      "membroId": "me-009",
      "nucleoId": "nu-lisboa",
      "celebradoEm": "2023-12-14T13:00:00.000Z",
      "presididoPorId": "me-018",
      "local": "Núcleo Lisboa",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-010",
      "tipo": "oikeiosis",
      "membroId": "me-010",
      "nucleoId": "nu-jaboatao",
      "celebradoEm": "2024-01-08T13:00:00.000Z",
      "presididoPorId": "me-019",
      "local": "Núcleo Jaboatão dos Guararapes",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-011",
      "tipo": "oikeiosis",
      "membroId": "me-011",
      "nucleoId": "nu-recife",
      "celebradoEm": "2024-02-02T13:00:00.000Z",
      "presididoPorId": "me-011",
      "local": "Núcleo Recife Central",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-012",
      "tipo": "oikeiosis",
      "membroId": "me-012",
      "nucleoId": "nu-sp",
      "celebradoEm": "2024-02-27T13:00:00.000Z",
      "presididoPorId": "me-012",
      "local": "Núcleo São Paulo Central",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-013",
      "tipo": "oikeiosis",
      "membroId": "me-013",
      "nucleoId": "nu-campinas",
      "celebradoEm": "2024-03-23T13:00:00.000Z",
      "presididoPorId": "me-013",
      "local": "Núcleo Campinas",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-014",
      "tipo": "oikeiosis",
      "membroId": "me-014",
      "nucleoId": "nu-rj",
      "celebradoEm": "2024-04-17T13:00:00.000Z",
      "presididoPorId": "me-014",
      "local": "Núcleo Rio de Janeiro",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-015",
      "tipo": "oikeiosis",
      "membroId": "me-015",
      "nucleoId": "nu-bh",
      "celebradoEm": "2024-05-12T13:00:00.000Z",
      "presididoPorId": "me-015",
      "local": "Núcleo Belo Horizonte",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-016",
      "tipo": "oikeiosis",
      "membroId": "me-016",
      "nucleoId": "nu-salvador",
      "celebradoEm": "2024-06-06T13:00:00.000Z",
      "presididoPorId": "me-016",
      "local": "Núcleo Salvador",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-017",
      "tipo": "oikeiosis",
      "membroId": "me-017",
      "nucleoId": "nu-brasilia",
      "celebradoEm": "2024-07-01T13:00:00.000Z",
      "presididoPorId": "me-017",
      "local": "Núcleo Brasília",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-018",
      "tipo": "oikeiosis",
      "membroId": "me-018",
      "nucleoId": "nu-lisboa",
      "celebradoEm": "2024-07-26T13:00:00.000Z",
      "presididoPorId": "me-018",
      "local": "Núcleo Lisboa",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-019",
      "tipo": "oikeiosis",
      "membroId": "me-019",
      "nucleoId": "nu-jaboatao",
      "celebradoEm": "2024-08-20T13:00:00.000Z",
      "presididoPorId": "me-019",
      "local": "Núcleo Jaboatão dos Guararapes",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-020",
      "tipo": "oikeiosis",
      "membroId": "me-020",
      "nucleoId": "nu-recife",
      "celebradoEm": "2024-09-14T13:00:00.000Z",
      "presididoPorId": "me-011",
      "local": "Núcleo Recife Central",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-021",
      "tipo": "oikeiosis",
      "membroId": "me-021",
      "nucleoId": "nu-sp",
      "celebradoEm": "2024-10-09T13:00:00.000Z",
      "presididoPorId": "me-012",
      "local": "Núcleo São Paulo Central",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-022",
      "tipo": "oikeiosis",
      "membroId": "me-022",
      "nucleoId": "nu-campinas",
      "celebradoEm": "2024-11-03T13:00:00.000Z",
      "presididoPorId": "me-013",
      "local": "Núcleo Campinas",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-023",
      "tipo": "oikeiosis",
      "membroId": "me-023",
      "nucleoId": "nu-rj",
      "celebradoEm": "2024-11-28T13:00:00.000Z",
      "presididoPorId": "me-014",
      "local": "Núcleo Rio de Janeiro",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-024",
      "tipo": "oikeiosis",
      "membroId": "me-024",
      "nucleoId": "nu-bh",
      "celebradoEm": "2024-12-23T13:00:00.000Z",
      "presididoPorId": "me-015",
      "local": "Núcleo Belo Horizonte",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-025",
      "tipo": "oikeiosis",
      "membroId": "me-025",
      "nucleoId": "nu-salvador",
      "celebradoEm": "2025-01-17T13:00:00.000Z",
      "presididoPorId": "me-016",
      "local": "Núcleo Salvador",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-026",
      "tipo": "oikeiosis",
      "membroId": "me-026",
      "nucleoId": "nu-brasilia",
      "celebradoEm": "2025-02-11T13:00:00.000Z",
      "presididoPorId": "me-017",
      "local": "Núcleo Brasília",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-027",
      "tipo": "oikeiosis",
      "membroId": "me-027",
      "nucleoId": "nu-lisboa",
      "celebradoEm": "2025-03-08T13:00:00.000Z",
      "presididoPorId": "me-018",
      "local": "Núcleo Lisboa",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-028",
      "tipo": "oikeiosis",
      "membroId": "me-028",
      "nucleoId": "nu-jaboatao",
      "celebradoEm": "2025-04-02T13:00:00.000Z",
      "presididoPorId": "me-019",
      "local": "Núcleo Jaboatão dos Guararapes",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-029",
      "tipo": "oikeiosis",
      "membroId": "me-029",
      "nucleoId": "nu-recife",
      "celebradoEm": "2025-04-27T13:00:00.000Z",
      "presididoPorId": "me-011",
      "local": "Núcleo Recife Central",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-030",
      "tipo": "oikeiosis",
      "membroId": "me-030",
      "nucleoId": "nu-sp",
      "celebradoEm": "2025-05-22T13:00:00.000Z",
      "presididoPorId": "me-012",
      "local": "Núcleo São Paulo Central",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-031",
      "tipo": "oikeiosis",
      "membroId": "me-031",
      "nucleoId": "nu-campinas",
      "celebradoEm": "2025-06-16T13:00:00.000Z",
      "presididoPorId": "me-013",
      "local": "Núcleo Campinas",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-032",
      "tipo": "oikeiosis",
      "membroId": "me-032",
      "nucleoId": "nu-rj",
      "celebradoEm": "2025-07-11T13:00:00.000Z",
      "presididoPorId": "me-014",
      "local": "Núcleo Rio de Janeiro",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-033",
      "tipo": "oikeiosis",
      "membroId": "me-033",
      "nucleoId": "nu-bh",
      "celebradoEm": "2025-08-05T13:00:00.000Z",
      "presididoPorId": "me-015",
      "local": "Núcleo Belo Horizonte",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-034",
      "tipo": "oikeiosis",
      "membroId": "me-034",
      "nucleoId": "nu-salvador",
      "celebradoEm": "2025-08-30T13:00:00.000Z",
      "presididoPorId": "me-016",
      "local": "Núcleo Salvador",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-035",
      "tipo": "oikeiosis",
      "membroId": "me-035",
      "nucleoId": "nu-brasilia",
      "celebradoEm": "2025-09-24T13:00:00.000Z",
      "presididoPorId": "me-017",
      "local": "Núcleo Brasília",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-036",
      "tipo": "oikeiosis",
      "membroId": "me-036",
      "nucleoId": "nu-lisboa",
      "celebradoEm": "2025-10-19T13:00:00.000Z",
      "presididoPorId": "me-018",
      "local": "Núcleo Lisboa",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-037",
      "tipo": "oikeiosis",
      "membroId": "me-037",
      "nucleoId": "nu-jaboatao",
      "celebradoEm": "2025-11-13T13:00:00.000Z",
      "presididoPorId": "me-019",
      "local": "Núcleo Jaboatão dos Guararapes",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-038",
      "tipo": "oikeiosis",
      "membroId": "me-038",
      "nucleoId": "nu-recife",
      "celebradoEm": "2025-12-08T13:00:00.000Z",
      "presididoPorId": "me-011",
      "local": "Núcleo Recife Central",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-039",
      "tipo": "oikeiosis",
      "membroId": "me-039",
      "nucleoId": "nu-sp",
      "celebradoEm": "2026-01-02T13:00:00.000Z",
      "presididoPorId": "me-012",
      "local": "Núcleo São Paulo Central",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-040",
      "tipo": "oikeiosis",
      "membroId": "me-040",
      "nucleoId": "nu-campinas",
      "celebradoEm": "2026-01-27T13:00:00.000Z",
      "presididoPorId": "me-013",
      "local": "Núcleo Campinas",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-041",
      "tipo": "oikeiosis",
      "membroId": "me-044",
      "nucleoId": "nu-brasilia",
      "celebradoEm": "2026-05-07T13:00:00.000Z",
      "presididoPorId": "me-017",
      "local": "Núcleo Brasília",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-042",
      "tipo": "oikeiosis",
      "membroId": "me-045",
      "nucleoId": "nu-lisboa",
      "celebradoEm": "2026-06-01T13:00:00.000Z",
      "presididoPorId": "me-018",
      "local": "Núcleo Lisboa",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-043",
      "tipo": "oikeiosis",
      "membroId": "me-046",
      "nucleoId": "nu-jaboatao",
      "celebradoEm": "2026-06-26T13:00:00.000Z",
      "presididoPorId": "me-019",
      "local": "Núcleo Jaboatão dos Guararapes",
      "nota": "Acolhimento do postulante; leitura do compromisso perante a irmandade.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-044",
      "tipo": "prokope",
      "membroId": "me-001",
      "nucleoId": "nu-jaboatao",
      "celebradoEm": "2026-01-22T13:00:00.000Z",
      "presididoPorId": "me-003",
      "local": "Núcleo Jaboatão dos Guararapes",
      "nota": "Rito de Graduação celebrado após parecer favorável da Mestria.",
      "grauAlcancadoId": "grau-empeiros"
    },
    {
      "id": "ri-045",
      "tipo": "prokope",
      "membroId": "me-010",
      "nucleoId": "nu-jaboatao",
      "celebradoEm": "2025-07-16T13:00:00.000Z",
      "presididoPorId": "me-003",
      "local": "Núcleo Jaboatão dos Guararapes",
      "nota": "Rito de Graduação celebrado após parecer favorável da Mestria.",
      "grauAlcancadoId": "grau-afentis"
    },
    {
      "id": "ri-046",
      "tipo": "prokope",
      "membroId": "me-020",
      "nucleoId": "nu-recife",
      "celebradoEm": "2025-10-24T13:00:00.000Z",
      "presididoPorId": "me-003",
      "local": "Núcleo Recife Central",
      "nota": "Rito de Graduação celebrado após parecer favorável da Mestria.",
      "grauAlcancadoId": "grau-thesi"
    },
    {
      "id": "ri-047",
      "tipo": "prokope",
      "membroId": "me-023",
      "nucleoId": "nu-rj",
      "celebradoEm": "2026-02-21T13:00:00.000Z",
      "presididoPorId": "me-003",
      "local": "Núcleo Rio de Janeiro",
      "nota": "Rito de Graduação celebrado após parecer favorável da Mestria.",
      "grauAlcancadoId": "grau-syntrofo"
    },
    {
      "id": "ri-048",
      "tipo": "prokope",
      "membroId": "me-013",
      "nucleoId": "nu-campinas",
      "celebradoEm": "2025-12-03T13:00:00.000Z",
      "presididoPorId": "me-003",
      "local": "Núcleo Campinas",
      "nota": "Rito de Graduação celebrado após parecer favorável da Mestria.",
      "grauAlcancadoId": "grau-empeiros"
    },
    {
      "id": "ri-049",
      "tipo": "syzygia",
      "membroId": "me-012",
      "nucleoId": "nu-sp",
      "celebradoEm": "2026-03-23T13:00:00.000Z",
      "presididoPorId": "me-003",
      "local": "Núcleo São Paulo Central",
      "nota": "Reconhecimento matrimonial celebrado perante a Alta Mestria.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-050",
      "tipo": "reconhecimento",
      "membroId": "me-001",
      "nucleoId": "nu-jaboatao",
      "celebradoEm": "2026-05-17T13:00:00.000Z",
      "presididoPorId": "me-003",
      "local": "Núcleo Jaboatão dos Guararapes",
      "nota": "Ato civil e confessional, de natureza pedagógica e não sacramental.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-051",
      "tipo": "syssitia",
      "membroId": "me-001",
      "nucleoId": "nu-jaboatao",
      "celebradoEm": "2026-07-23T13:00:00.000Z",
      "presididoPorId": "me-010",
      "local": "Núcleo Jaboatão dos Guararapes",
      "nota": "Ágape fraterno com as famílias do Núcleo.",
      "grauAlcancadoId": null
    },
    {
      "id": "ri-052",
      "tipo": "desobrigacao",
      "membroId": "me-045",
      "nucleoId": "nu-recife",
      "celebradoEm": "2026-06-21T13:00:00.000Z",
      "presididoPorId": "me-009",
      "local": "Núcleo Recife Central",
      "nota": "Recolhimento fraterno pacífico, com devolução de encargos e voto de sigilo.",
      "grauAlcancadoId": null
    }
  ],
  "celulas": [
    {
      "id": "ce-jaboatao-spiti",
      "nucleoId": "nu-jaboatao",
      "esfera": "spiti",
      "nome": "Spíti Jaboatão dos Guararapes",
      "descricao": "Casa de recolhimento, estudo dirigido e forja da mente estoica.",
      "responsavelId": "me-001",
      "emblema": "Leão",
      "membros": [
        "me-001",
        "me-010",
        "me-019"
      ],
      "criadaEm": "2026-02-14T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-jaboatao-symphyle",
      "nucleoId": "nu-jaboatao",
      "esfera": "symphyle",
      "nome": "Symphyle Jaboatão dos Guararapes",
      "descricao": "Falange de ação, caridade estrutural e insurgência cultural local.",
      "responsavelId": "me-010",
      "emblema": "Águia",
      "membros": [
        "me-028",
        "me-037",
        "me-046"
      ],
      "criadaEm": "2026-02-14T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-recife-spiti",
      "nucleoId": "nu-recife",
      "esfera": "spiti",
      "nome": "Spíti Recife Central",
      "descricao": "Casa de recolhimento, estudo dirigido e forja da mente estoica.",
      "responsavelId": "me-002",
      "emblema": "Leopardo",
      "membros": [
        "me-002",
        "me-011"
      ],
      "criadaEm": "2025-09-03T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-recife-symphyle",
      "nucleoId": "nu-recife",
      "esfera": "symphyle",
      "nome": "Symphyle Recife Central",
      "descricao": "Falange de ação, caridade estrutural e insurgência cultural local.",
      "responsavelId": "me-011",
      "emblema": "Pelicano",
      "membros": [
        "me-020",
        "me-029",
        "me-038"
      ],
      "criadaEm": "2025-09-03T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-sp-spiti",
      "nucleoId": "nu-sp",
      "esfera": "spiti",
      "nome": "Spíti São Paulo Central",
      "descricao": "Casa de recolhimento, estudo dirigido e forja da mente estoica.",
      "responsavelId": "me-003",
      "emblema": "Lince",
      "membros": [
        "me-003",
        "me-012"
      ],
      "criadaEm": "2025-05-20T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-sp-symphyle",
      "nucleoId": "nu-sp",
      "esfera": "symphyle",
      "nome": "Symphyle São Paulo Central",
      "descricao": "Falange de ação, caridade estrutural e insurgência cultural local.",
      "responsavelId": "me-012",
      "emblema": "Cisne",
      "membros": [
        "me-021",
        "me-030",
        "me-039"
      ],
      "criadaEm": "2025-05-20T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-campinas-spiti",
      "nucleoId": "nu-campinas",
      "esfera": "spiti",
      "nome": "Spíti Campinas",
      "descricao": "Casa de recolhimento, estudo dirigido e forja da mente estoica.",
      "responsavelId": "me-004",
      "emblema": "Tigre",
      "membros": [
        "me-004",
        "me-013"
      ],
      "criadaEm": "2026-01-11T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-campinas-symphyle",
      "nucleoId": "nu-campinas",
      "esfera": "symphyle",
      "nome": "Symphyle Campinas",
      "descricao": "Falange de ação, caridade estrutural e insurgência cultural local.",
      "responsavelId": "me-013",
      "emblema": "Corvo",
      "membros": [
        "me-022",
        "me-031",
        "me-040"
      ],
      "criadaEm": "2026-01-11T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-rj-spiti",
      "nucleoId": "nu-rj",
      "esfera": "spiti",
      "nome": "Spíti Rio de Janeiro",
      "descricao": "Casa de recolhimento, estudo dirigido e forja da mente estoica.",
      "responsavelId": "me-005",
      "emblema": "Onça-pintada",
      "membros": [
        "me-005",
        "me-014"
      ],
      "criadaEm": "2025-07-08T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-rj-symphyle",
      "nucleoId": "nu-rj",
      "esfera": "symphyle",
      "nome": "Symphyle Rio de Janeiro",
      "descricao": "Falange de ação, caridade estrutural e insurgência cultural local.",
      "responsavelId": "me-014",
      "emblema": "Falcão-peregrino",
      "membros": [
        "me-023",
        "me-032"
      ],
      "criadaEm": "2025-07-08T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-bh-spiti",
      "nucleoId": "nu-bh",
      "esfera": "spiti",
      "nome": "Spíti Belo Horizonte",
      "descricao": "Casa de recolhimento, estudo dirigido e forja da mente estoica.",
      "responsavelId": "me-006",
      "emblema": "Guepardo",
      "membros": [
        "me-006",
        "me-015"
      ],
      "criadaEm": "2026-03-02T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-bh-symphyle",
      "nucleoId": "nu-bh",
      "esfera": "symphyle",
      "nome": "Symphyle Belo Horizonte",
      "descricao": "Falange de ação, caridade estrutural e insurgência cultural local.",
      "responsavelId": "me-015",
      "emblema": "Gavião-real",
      "membros": [
        "me-024",
        "me-033"
      ],
      "criadaEm": "2026-03-02T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-salvador-spiti",
      "nucleoId": "nu-salvador",
      "esfera": "spiti",
      "nome": "Spíti Salvador",
      "descricao": "Casa de recolhimento, estudo dirigido e forja da mente estoica.",
      "responsavelId": "me-007",
      "emblema": "Puma",
      "membros": [
        "me-007",
        "me-016"
      ],
      "criadaEm": "2026-04-19T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-salvador-symphyle",
      "nucleoId": "nu-salvador",
      "esfera": "symphyle",
      "nome": "Symphyle Salvador",
      "descricao": "Falange de ação, caridade estrutural e insurgência cultural local.",
      "responsavelId": "me-016",
      "emblema": "Grou",
      "membros": [
        "me-025",
        "me-034"
      ],
      "criadaEm": "2026-04-19T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-brasilia-spiti",
      "nucleoId": "nu-brasilia",
      "esfera": "spiti",
      "nome": "Spíti Brasília",
      "descricao": "Casa de recolhimento, estudo dirigido e forja da mente estoica.",
      "responsavelId": "me-008",
      "emblema": "Leão",
      "membros": [
        "me-008",
        "me-017"
      ],
      "criadaEm": "2025-11-27T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-brasilia-symphyle",
      "nucleoId": "nu-brasilia",
      "esfera": "symphyle",
      "nome": "Symphyle Brasília",
      "descricao": "Falange de ação, caridade estrutural e insurgência cultural local.",
      "responsavelId": "me-017",
      "emblema": "Águia",
      "membros": [
        "me-026",
        "me-035"
      ],
      "criadaEm": "2025-11-27T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-lisboa-spiti",
      "nucleoId": "nu-lisboa",
      "esfera": "spiti",
      "nome": "Spíti Lisboa",
      "descricao": "Casa de recolhimento, estudo dirigido e forja da mente estoica.",
      "responsavelId": "me-009",
      "emblema": "Leopardo",
      "membros": [
        "me-009",
        "me-018"
      ],
      "criadaEm": "2026-05-30T12:00:00.000Z",
      "ativa": true
    },
    {
      "id": "ce-lisboa-symphyle",
      "nucleoId": "nu-lisboa",
      "esfera": "symphyle",
      "nome": "Symphyle Lisboa",
      "descricao": "Falange de ação, caridade estrutural e insurgência cultural local.",
      "responsavelId": "me-018",
      "emblema": "Pelicano",
      "membros": [
        "me-027",
        "me-036"
      ],
      "criadaEm": "2026-05-30T12:00:00.000Z",
      "ativa": true
    }
  ],
  "servicos": [
    {
      "id": "se-001",
      "titulo": "Assessoria jurídica para regularização do Núcleo",
      "descricao": "O Núcleo precisa regularizar o contrato de locação da sede e revisar o termo de cessão.",
      "competenciaRequerida": "Direito",
      "solicitanteId": "me-010",
      "nucleoId": "nu-jaboatao",
      "celulaId": "ce-jaboatao-symphyle",
      "atendentesIds": [
        "me-013"
      ],
      "situacao": "atendido",
      "abertoEm": "2026-08-02T13:00:00.000Z",
      "concluidoEm": null,
      "xp": 120
    },
    {
      "id": "se-002",
      "titulo": "Atendimento de saúde a família assistida",
      "descricao": "Família acompanhada pela Symphyle necessita de orientação médica e encaminhamento.",
      "competenciaRequerida": "Saúde",
      "solicitanteId": "me-023",
      "nucleoId": "nu-sp",
      "celulaId": "ce-sp-symphyle",
      "atendentesIds": [],
      "situacao": "aberto",
      "abertoEm": "2026-08-15T13:00:00.000Z",
      "concluidoEm": null,
      "xp": 150
    },
    {
      "id": "se-003",
      "titulo": "Projeto de acessibilidade para a sede",
      "descricao": "Levantamento e projeto de rampa e sanitário acessível na sede do Núcleo.",
      "competenciaRequerida": "Engenharia",
      "solicitanteId": "me-009",
      "nucleoId": "nu-recife",
      "celulaId": "ce-recife-symphyle",
      "atendentesIds": [
        "me-016",
        "me-019"
      ],
      "situacao": "concluido",
      "abertoEm": "2026-06-11T13:00:00.000Z",
      "concluidoEm": "2026-07-11T13:00:00.000Z",
      "xp": 180
    },
    {
      "id": "se-004",
      "titulo": "Reforço escolar para filhos de Eunomitas",
      "descricao": "Organização de reforço em matemática e português para as famílias do Núcleo.",
      "competenciaRequerida": "Educação",
      "solicitanteId": "me-021",
      "nucleoId": "nu-brasilia",
      "celulaId": "ce-brasilia-symphyle",
      "atendentesIds": [
        "me-027"
      ],
      "situacao": "atendido",
      "abertoEm": "2026-07-26T13:00:00.000Z",
      "concluidoEm": null,
      "xp": 140
    },
    {
      "id": "se-005",
      "titulo": "Prestação de contas do exercício local",
      "descricao": "Apoio contábil para fechamento do balancete local antes da remessa ao Conselho de Contas.",
      "competenciaRequerida": "Contabilidade",
      "solicitanteId": "me-011",
      "nucleoId": "nu-bh",
      "celulaId": "ce-bh-symphyle",
      "atendentesIds": [],
      "situacao": "aberto",
      "abertoEm": "2026-08-18T13:00:00.000Z",
      "concluidoEm": null,
      "xp": 160
    }
  ],
  "mediacoes": [
    {
      "id": "me-001-arb",
      "numero": "AH 001/2026",
      "requerenteId": "me-024",
      "requeridoId": "me-029",
      "objeto": "Desavença quanto à partilha de despesas de projeto conjunto entre confrades.",
      "nucleoId": "nu-sp",
      "mediadorId": "me-012",
      "situacao": "conciliada",
      "solicitadaEm": "2026-06-06T13:00:00.000Z",
      "concluidaEm": "2026-06-23T13:00:00.000Z",
      "termoConciliacao": "As partes ajustaram a divisão proporcional das despesas e declararam encerrada a desavença, restaurada a paz fraterna.",
      "sigilosa": true
    },
    {
      "id": "me-002-arb",
      "numero": "AH 002/2026",
      "requerenteId": "me-030",
      "requeridoId": "me-036",
      "objeto": "Divergência sobre a titularidade de material didático produzido em conjunto.",
      "nucleoId": "nu-bh",
      "mediadorId": "me-011",
      "situacao": "em_mediacao",
      "solicitadaEm": "2026-08-08T13:00:00.000Z",
      "concluidaEm": null,
      "termoConciliacao": null,
      "sigilosa": true
    }
  ],
  "sucessao": [
    {
      "id": "su-001",
      "figura": "epigonos_permanente",
      "membroId": "me-025",
      "ordem": 1,
      "atoNormativoId": "do-010",
      "autorizadoParaAusencias": true,
      "designadoEm": "2025-07-16T13:00:00.000Z",
      "observacao": "Sabatinado e aprovado pelo Conselho Alto; apto a assumir nas ausências do Grão-Mestre (Art. 37, § 4.º)."
    },
    {
      "id": "su-002",
      "figura": "arquidama",
      "membroId": "me-028",
      "ordem": 2,
      "atoNormativoId": "do-010",
      "autorizadoParaAusencias": false,
      "designadoEm": "2025-07-16T13:00:00.000Z",
      "observacao": "Assume a Regência na hipótese de menoridade do Epígonos Honorário (Art. 38, § 1.º)."
    },
    {
      "id": "su-003",
      "figura": "chanceler",
      "membroId": "me-006",
      "ordem": 3,
      "atoNormativoId": "do-010",
      "autorizadoParaAusencias": true,
      "designadoEm": "2025-07-16T13:00:00.000Z",
      "observacao": "Terceiro na linha, na existência de Epígonos Permanente (Art. 39, I)."
    }
  ],
  "assembleias": [
    {
      "id": "ag-001",
      "titulo": "Assembleia Geral Ordinária de 2026",
      "descricao": "Apreciação do relatório da administração, deliberação sobre as contas da Diretoria Executiva e aprovação do orçamento anual (Est. Art. 28, II e III).",
      "orgaoId": "org-assembleia",
      "ordinaria": true,
      "convocadaEm": "2026-07-11T13:00:00.000Z",
      "inicio": "2026-09-11T13:00:00.000Z",
      "local": "Sede Nacional e transmissão",
      "modalidade": "hibrido",
      "convocacaoAplicada": null,
      "situacao": "convocada",
      "convocadaPorId": "me-003",
      "ata": null
    },
    {
      "id": "ag-002",
      "titulo": "Assembleia Geral Extraordinária — Reforma do Regimento Interno",
      "descricao": "Deliberação sobre a proposta de reforma do Regimento Interno, aprovada em ambas as câmaras do Conselho Eclesia Supremo.",
      "orgaoId": "org-assembleia",
      "ordinaria": false,
      "convocadaEm": "2026-05-16T13:00:00.000Z",
      "inicio": "2026-06-21T13:00:00.000Z",
      "local": "Transmissão on-line",
      "modalidade": "online",
      "convocacaoAplicada": "primeira",
      "situacao": "encerrada",
      "convocadaPorId": "me-003",
      "ata": "Aberta a sessão em segunda convocação, o Moderador Presidente submeteu a matéria à deliberação. Registrada a votação nominal, na forma do Art. 62."
    }
  ],
  "materias": [
    {
      "id": "ma-001",
      "assembleiaId": "ag-001",
      "titulo": "Prestação de contas do exercício",
      "descricao": "Deliberação sobre as contas da Diretoria Executiva, instruídas com parecer do Conselho Superior de Contas.",
      "ordem": 1,
      "quorum": "simples",
      "fundamento": null,
      "propostaId": null,
      "encerrada": false
    },
    {
      "id": "ma-002",
      "assembleiaId": "ag-001",
      "titulo": "Orçamento anual e plano de trabalho",
      "descricao": "Aprovação da peça orçamentária e do plano de trabalho para o exercício seguinte (Est. Art. 28, III).",
      "ordem": 2,
      "quorum": "simples",
      "fundamento": null,
      "propostaId": null,
      "encerrada": false
    },
    {
      "id": "ma-003",
      "assembleiaId": "ag-001",
      "titulo": "Criação do Núcleo Caruaru",
      "descricao": "Instalação de Núcleo no Agreste pernambucano, conforme proposta protocolada.",
      "ordem": 3,
      "quorum": "simples",
      "fundamento": null,
      "propostaId": null,
      "encerrada": false
    },
    {
      "id": "ma-004",
      "assembleiaId": "ag-002",
      "titulo": "Reforma do Regimento Interno",
      "descricao": "Ratificação da reforma aprovada por 2/3 em ambas as câmaras do Conselho Eclesia Supremo.",
      "ordem": 1,
      "quorum": "qualificado",
      "fundamento": "Est. Art. 67",
      "propostaId": null,
      "encerrada": true
    }
  ],
  "votos": [
    {
      "id": "vo-001",
      "materiaId": "ma-004",
      "membroId": "me-001",
      "opcao": "contra",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-002",
      "materiaId": "ma-004",
      "membroId": "me-002",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-003",
      "materiaId": "ma-004",
      "membroId": "me-003",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-004",
      "materiaId": "ma-004",
      "membroId": "me-004",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-005",
      "materiaId": "ma-004",
      "membroId": "me-005",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-006",
      "materiaId": "ma-004",
      "membroId": "me-006",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-007",
      "materiaId": "ma-004",
      "membroId": "me-007",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-008",
      "materiaId": "ma-004",
      "membroId": "me-008",
      "opcao": "abstencao",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-009",
      "materiaId": "ma-004",
      "membroId": "me-009",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-010",
      "materiaId": "ma-004",
      "membroId": "me-010",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-011",
      "materiaId": "ma-004",
      "membroId": "me-011",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-012",
      "materiaId": "ma-004",
      "membroId": "me-012",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-013",
      "materiaId": "ma-004",
      "membroId": "me-013",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-014",
      "materiaId": "ma-004",
      "membroId": "me-014",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-015",
      "materiaId": "ma-004",
      "membroId": "me-015",
      "opcao": "contra",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-016",
      "materiaId": "ma-004",
      "membroId": "me-016",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-017",
      "materiaId": "ma-004",
      "membroId": "me-017",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-018",
      "materiaId": "ma-004",
      "membroId": "me-018",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-019",
      "materiaId": "ma-004",
      "membroId": "me-019",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-020",
      "materiaId": "ma-004",
      "membroId": "me-020",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-021",
      "materiaId": "ma-004",
      "membroId": "me-021",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-022",
      "materiaId": "ma-004",
      "membroId": "me-022",
      "opcao": "abstencao",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-023",
      "materiaId": "ma-004",
      "membroId": "me-023",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-024",
      "materiaId": "ma-004",
      "membroId": "me-024",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-025",
      "materiaId": "ma-004",
      "membroId": "me-025",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-026",
      "materiaId": "ma-004",
      "membroId": "me-026",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-027",
      "materiaId": "ma-004",
      "membroId": "me-027",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-028",
      "materiaId": "ma-004",
      "membroId": "me-028",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-029",
      "materiaId": "ma-004",
      "membroId": "me-029",
      "opcao": "contra",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-030",
      "materiaId": "ma-004",
      "membroId": "me-030",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-031",
      "materiaId": "ma-004",
      "membroId": "me-031",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-032",
      "materiaId": "ma-004",
      "membroId": "me-032",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-033",
      "materiaId": "ma-004",
      "membroId": "me-033",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "vo-034",
      "materiaId": "ma-004",
      "membroId": "me-034",
      "opcao": "favor",
      "registradoEm": "2026-06-21T13:00:00.000Z"
    }
  ],
  "presencasAssembleia": [
    {
      "id": "pa-001",
      "assembleiaId": "ag-002",
      "membroId": "me-001",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-002",
      "assembleiaId": "ag-002",
      "membroId": "me-002",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-003",
      "assembleiaId": "ag-002",
      "membroId": "me-003",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-004",
      "assembleiaId": "ag-002",
      "membroId": "me-004",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-005",
      "assembleiaId": "ag-002",
      "membroId": "me-005",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-006",
      "assembleiaId": "ag-002",
      "membroId": "me-006",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-007",
      "assembleiaId": "ag-002",
      "membroId": "me-007",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-008",
      "assembleiaId": "ag-002",
      "membroId": "me-008",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-009",
      "assembleiaId": "ag-002",
      "membroId": "me-009",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-010",
      "assembleiaId": "ag-002",
      "membroId": "me-010",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-011",
      "assembleiaId": "ag-002",
      "membroId": "me-011",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-012",
      "assembleiaId": "ag-002",
      "membroId": "me-012",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-013",
      "assembleiaId": "ag-002",
      "membroId": "me-013",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-014",
      "assembleiaId": "ag-002",
      "membroId": "me-014",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-015",
      "assembleiaId": "ag-002",
      "membroId": "me-015",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-016",
      "assembleiaId": "ag-002",
      "membroId": "me-016",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-017",
      "assembleiaId": "ag-002",
      "membroId": "me-017",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-018",
      "assembleiaId": "ag-002",
      "membroId": "me-018",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-019",
      "assembleiaId": "ag-002",
      "membroId": "me-019",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-020",
      "assembleiaId": "ag-002",
      "membroId": "me-020",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-021",
      "assembleiaId": "ag-002",
      "membroId": "me-021",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-022",
      "assembleiaId": "ag-002",
      "membroId": "me-022",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-023",
      "assembleiaId": "ag-002",
      "membroId": "me-023",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-024",
      "assembleiaId": "ag-002",
      "membroId": "me-024",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-025",
      "assembleiaId": "ag-002",
      "membroId": "me-025",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-026",
      "assembleiaId": "ag-002",
      "membroId": "me-026",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-027",
      "assembleiaId": "ag-002",
      "membroId": "me-027",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-028",
      "assembleiaId": "ag-002",
      "membroId": "me-028",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-029",
      "assembleiaId": "ag-002",
      "membroId": "me-029",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-030",
      "assembleiaId": "ag-002",
      "membroId": "me-030",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-031",
      "assembleiaId": "ag-002",
      "membroId": "me-031",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-032",
      "assembleiaId": "ag-002",
      "membroId": "me-032",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-033",
      "assembleiaId": "ag-002",
      "membroId": "me-033",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    },
    {
      "id": "pa-034",
      "assembleiaId": "ag-002",
      "membroId": "me-034",
      "registradaEm": "2026-06-21T13:00:00.000Z"
    }
  ],
  "processos": [
    {
      "id": "pd-001",
      "numero": "CDEG 001/2026",
      "acusadoId": "me-044",
      "instanciaOrgaoId": "org-jaboatao-etica",
      "fatos": "Descumprimento reiterado das deliberações do Núcleo e conduta incompatível com o Art. 21, II e IV do Estatuto.",
      "fase": "decidido",
      "instauradoEm": "2026-06-29T13:00:00.000Z",
      "instauradoPorId": "me-004",
      "notificadoEm": "2026-07-01T13:00:00.000Z",
      "prazoDefesa": "2026-07-04T13:00:00.000Z",
      "periodoExcecao": false,
      "defesa": "O associado apresentou defesa escrita no prazo do Art. 65, § 1.º, alegando ausência justificada.",
      "relatorio": "Relatório conclusivo do Conselho Local de Ética, com recomendação de suspensão.",
      "decisao": "suspensao",
      "valorMulta": null,
      "tramitacao": [
        {
          "fase": "instaurado",
          "em": "2026-06-29T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Instauração formal, com ciência dos fatos imputados."
        },
        {
          "fase": "notificado",
          "em": "2026-07-01T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Notificação recebida; prazo de 3 dias para defesa."
        },
        {
          "fase": "defesa_apresentada",
          "em": "2026-07-03T13:00:00.000Z",
          "porId": "me-044",
          "nota": "Defesa apresentada tempestivamente."
        },
        {
          "fase": "em_instrucao",
          "em": "2026-07-05T13:00:00.000Z",
          "porId": "me-013",
          "nota": "Produção de provas."
        },
        {
          "fase": "relatorio",
          "em": "2026-07-09T13:00:00.000Z",
          "porId": "me-013",
          "nota": "Relatório conclusivo emitido."
        },
        {
          "fase": "decidido",
          "em": "2026-07-11T13:00:00.000Z",
          "porId": "me-013",
          "nota": "Decisão motivada: suspensão. Cabe recurso aos órgãos gerais (Art. 66)."
        }
      ]
    },
    {
      "id": "pd-002",
      "numero": "CDEG 002/2026",
      "acusadoId": "me-034",
      "instanciaOrgaoId": "org-sp-etica",
      "fatos": "Divulgação de informação reservada em desacordo com o dever de sigilo do Art. 21, VI.",
      "fase": "notificado",
      "instauradoEm": "2026-08-17T13:00:00.000Z",
      "instauradoPorId": "me-004",
      "notificadoEm": "2026-08-19T13:00:00.000Z",
      "prazoDefesa": "2026-08-22T13:00:00.000Z",
      "periodoExcecao": false,
      "defesa": null,
      "relatorio": null,
      "decisao": null,
      "valorMulta": null,
      "tramitacao": [
        {
          "fase": "instaurado",
          "em": "2026-08-17T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Instauração formal."
        },
        {
          "fase": "notificado",
          "em": "2026-08-19T13:00:00.000Z",
          "porId": "me-004",
          "nota": "Notificação recebida; prazo de 3 dias para defesa (Art. 65, § 1.º)."
        }
      ]
    }
  ]
} as unknown as Carga;

export function criarBaseInicial(): BaseDados {
  const { orgaosLocais, ...resto } = structuredClone(DADOS);
  return {
    ...resto,
    cargos: CARGOS,
    graus: GRAUS,
    orgaos: [...ORGAOS_CENTRAIS, ...orgaosLocais],
  } as BaseDados;
}
