import type { BaseDados } from '@/types';
import { CARGOS } from './cargos';

/**
 * Massa de dados institucional de demonstracao.
 *
 * Gerada de forma deterministica para que a plataforma possa ser avaliada
 * ponta a ponta sem backend. Ao conectar uma API real, basta substituir
 * `criarBaseInicial` pela carga remota — as telas consomem apenas os tipos.
 */
const DADOS: Omit<BaseDados, 'cargos'> = {
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
      "dataIngresso": "2023-06-22T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "História das ideias",
        "Lógica",
        "Ética"
      ],
      "areasAtuacao": [
        "Tecnologia",
        "Eventos"
      ],
      "xp": 12517,
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
      "cargoId": "cargo-presidente",
      "situacao": "ativo",
      "dataIngresso": "2023-07-17T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Estética",
        "Antropologia filosófica",
        "Lógica"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Eventos"
      ],
      "xp": 11987,
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
      "cargoId": "cargo-secretario",
      "situacao": "ativo",
      "dataIngresso": "2023-08-11T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Epistemologia",
        "Lógica",
        "História das ideias"
      ],
      "areasAtuacao": [
        "Documentação",
        "Finanças"
      ],
      "xp": 11483,
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
      "cargoId": "cargo-tesoureiro",
      "situacao": "ativo",
      "dataIngresso": "2023-09-05T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Metafísica",
        "Retórica",
        "História das ideias"
      ],
      "areasAtuacao": [
        "Organização territorial",
        "Formação"
      ],
      "xp": 11153,
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
      "cargoId": "cargo-vice",
      "situacao": "ativo",
      "dataIngresso": "2023-09-30T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Ética",
        "Lógica",
        "Doutrina social"
      ],
      "areasAtuacao": [
        "Documentação",
        "Formação"
      ],
      "xp": 11412,
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
      "cargoId": "cargo-dirigente",
      "situacao": "ativo",
      "dataIngresso": "2023-10-25T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "História das ideias",
        "Filosofia do direito",
        "Antropologia filosófica"
      ],
      "areasAtuacao": [
        "Relações institucionais",
        "Tecnologia"
      ],
      "xp": 10575,
      "nivel": 11,
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
      "cargoId": "cargo-dirigente",
      "situacao": "ativo",
      "dataIngresso": "2023-11-19T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Ética",
        "Estética",
        "Lógica"
      ],
      "areasAtuacao": [
        "Mobilização",
        "Documentação"
      ],
      "xp": 10857,
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
      "cargoId": "cargo-dirigente",
      "situacao": "ativo",
      "dataIngresso": "2023-12-14T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Ética",
        "Economia política",
        "Retórica"
      ],
      "areasAtuacao": [
        "Estudos",
        "Eventos"
      ],
      "xp": 10165,
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
      "cargoId": "cargo-dirigente",
      "situacao": "ativo",
      "dataIngresso": "2024-01-08T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Doutrina social",
        "Filosofia do direito",
        "Economia política"
      ],
      "areasAtuacao": [
        "Eventos",
        "Finanças"
      ],
      "xp": 10188,
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
      "cargoId": "cargo-dirigente",
      "situacao": "ativo",
      "dataIngresso": "2024-02-02T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Ética",
        "Lógica",
        "Estética"
      ],
      "areasAtuacao": [
        "Eventos",
        "Mobilização"
      ],
      "xp": 9730,
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
      "cargoId": "cargo-dirigente",
      "situacao": "ativo",
      "dataIngresso": "2024-02-27T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Filosofia política",
        "Metafísica",
        "Antropologia filosófica"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Finanças"
      ],
      "xp": 9336,
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
      "cargoId": "cargo-dirigente",
      "situacao": "ativo",
      "dataIngresso": "2024-03-23T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Ética",
        "Antropologia filosófica",
        "Economia política"
      ],
      "areasAtuacao": [
        "Organização territorial",
        "Finanças"
      ],
      "xp": 9560,
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
      "cargoId": "cargo-dirigente",
      "situacao": "ativo",
      "dataIngresso": "2024-04-17T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Economia política",
        "História das ideias",
        "Lógica"
      ],
      "areasAtuacao": [
        "Tecnologia",
        "Relações institucionais"
      ],
      "xp": 9100,
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
      "cargoId": "cargo-dirigente",
      "situacao": "ativo",
      "dataIngresso": "2024-05-12T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Doutrina social",
        "Ética",
        "História das ideias"
      ],
      "areasAtuacao": [
        "Tecnologia",
        "Relações institucionais"
      ],
      "xp": 8877,
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
      "cargoId": "cargo-coordenador",
      "situacao": "ativo",
      "dataIngresso": "2024-06-06T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Economia política",
        "Doutrina social",
        "Lógica"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Organização territorial"
      ],
      "xp": 8436,
      "nivel": 10,
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
      "cargoId": "cargo-coordenador",
      "situacao": "ativo",
      "dataIngresso": "2024-07-01T13:00:00.000Z",
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
      "xp": 8440,
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
      "cargoId": "cargo-coordenador",
      "situacao": "ativo",
      "dataIngresso": "2024-07-26T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Antropologia filosófica",
        "Lógica",
        "Filosofia política"
      ],
      "areasAtuacao": [
        "Documentação",
        "Mobilização"
      ],
      "xp": 8406,
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
      "cargoId": "cargo-coordenador",
      "situacao": "ativo",
      "dataIngresso": "2024-08-20T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "História das ideias",
        "Epistemologia",
        "Lógica"
      ],
      "areasAtuacao": [
        "Finanças",
        "Estudos"
      ],
      "xp": 7912,
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
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "dataIngresso": "2024-09-14T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Estética",
        "Retórica",
        "Economia política"
      ],
      "areasAtuacao": [
        "Eventos",
        "Comunicação"
      ],
      "xp": 7218,
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
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "dataIngresso": "2024-10-09T13:00:00.000Z",
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
      "xp": 7317,
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
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "dataIngresso": "2024-11-03T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Doutrina social",
        "Retórica",
        "História das ideias"
      ],
      "areasAtuacao": [
        "Finanças",
        "Documentação"
      ],
      "xp": 6665,
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
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "dataIngresso": "2024-11-28T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Ética",
        "Filosofia política",
        "Metafísica"
      ],
      "areasAtuacao": [
        "Estudos",
        "Formação"
      ],
      "xp": 6667,
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
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "dataIngresso": "2024-12-23T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "História das ideias",
        "Retórica",
        "Lógica"
      ],
      "areasAtuacao": [
        "Organização territorial",
        "Estudos"
      ],
      "xp": 6390,
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
      "cargoId": "cargo-membro",
      "situacao": "ativo",
      "dataIngresso": "2025-01-17T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Doutrina social",
        "Estética",
        "Epistemologia"
      ],
      "areasAtuacao": [
        "Eventos",
        "Documentação"
      ],
      "xp": 6112,
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
      "dataIngresso": "2025-02-11T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Retórica",
        "Doutrina social",
        "Metafísica"
      ],
      "areasAtuacao": [
        "Finanças",
        "Estudos"
      ],
      "xp": 5677,
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
      "dataIngresso": "2025-03-08T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Economia política",
        "Antropologia filosófica",
        "Filosofia do direito"
      ],
      "areasAtuacao": [
        "Relações institucionais",
        "Finanças"
      ],
      "xp": 5765,
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
      "dataIngresso": "2025-04-02T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Epistemologia",
        "Economia política",
        "Doutrina social"
      ],
      "areasAtuacao": [
        "Formação",
        "Estudos"
      ],
      "xp": 5701,
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
      "dataIngresso": "2025-04-27T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Antropologia filosófica",
        "Economia política",
        "Epistemologia"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Eventos"
      ],
      "xp": 5538,
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
      "dataIngresso": "2025-05-22T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Metafísica",
        "Filosofia do direito",
        "Filosofia política"
      ],
      "areasAtuacao": [
        "Organização territorial",
        "Estudos"
      ],
      "xp": 4730,
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
      "dataIngresso": "2025-06-16T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Economia política",
        "Lógica",
        "Metafísica"
      ],
      "areasAtuacao": [
        "Finanças",
        "Relações institucionais"
      ],
      "xp": 4634,
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
      "dataIngresso": "2025-07-11T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Ética",
        "História das ideias",
        "Epistemologia"
      ],
      "areasAtuacao": [
        "Finanças",
        "Relações institucionais"
      ],
      "xp": 4167,
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
      "dataIngresso": "2025-08-05T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Metafísica",
        "Economia política",
        "Filosofia do direito"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Organização territorial"
      ],
      "xp": 4288,
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
      "dataIngresso": "2025-08-30T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Metafísica",
        "Lógica",
        "Filosofia política"
      ],
      "areasAtuacao": [
        "Estudos",
        "Documentação"
      ],
      "xp": 4347,
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
      "dataIngresso": "2025-09-24T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Estética",
        "Retórica",
        "Filosofia política"
      ],
      "areasAtuacao": [
        "Mobilização",
        "Relações institucionais"
      ],
      "xp": 3959,
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
      "dataIngresso": "2025-10-19T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "História das ideias",
        "Economia política",
        "Epistemologia"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Documentação"
      ],
      "xp": 3574,
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
      "dataIngresso": "2025-11-13T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Estética",
        "Lógica",
        "Retórica"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Mobilização"
      ],
      "xp": 2903,
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
      "dataIngresso": "2025-12-08T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Ética",
        "Filosofia política",
        "Metafísica"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Formação"
      ],
      "xp": 3021,
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
      "dataIngresso": "2026-01-02T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "História das ideias",
        "Filosofia política",
        "Metafísica"
      ],
      "areasAtuacao": [
        "Relações institucionais",
        "Organização territorial"
      ],
      "xp": 3022,
      "nivel": 7,
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
      "dataIngresso": "2026-01-27T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Economia política",
        "Lógica",
        "Estética"
      ],
      "areasAtuacao": [
        "Finanças",
        "Formação"
      ],
      "xp": 2079,
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
      "dataIngresso": "2026-08-07T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "História das ideias",
        "Ética",
        "Lógica"
      ],
      "areasAtuacao": [
        "Estudos",
        "Eventos"
      ],
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
      "dataIngresso": "2026-07-27T13:00:00.000Z",
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
      "dataIngresso": "2026-08-14T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Filosofia do direito",
        "Filosofia política",
        "Epistemologia"
      ],
      "areasAtuacao": [
        "Comunicação",
        "Mobilização"
      ],
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
      "dataIngresso": "2026-05-07T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "Antropologia filosófica",
        "Economia política",
        "História das ideias"
      ],
      "areasAtuacao": [
        "Documentação",
        "Mobilização"
      ],
      "xp": 1462,
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
      "dataIngresso": "2026-06-01T13:00:00.000Z",
      "biografia": "",
      "interessesFilosoficos": [
        "História das ideias",
        "Metafísica",
        "Lógica"
      ],
      "areasAtuacao": [
        "Mobilização",
        "Eventos"
      ],
      "xp": 829,
      "nivel": 3,
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
      "dataIngresso": "2026-06-26T13:00:00.000Z",
      "biografia": "Membro dedicado à formação filosófica e à organização territorial da Ordem.",
      "interessesFilosoficos": [
        "Retórica",
        "Doutrina social",
        "Economia política"
      ],
      "areasAtuacao": [
        "Formação",
        "Comunicação"
      ],
      "xp": 766,
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
      "dirigenteId": "me-001",
      "secretarioId": "me-010",
      "tesoureiroId": "me-019",
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
      "dirigenteId": "me-002",
      "secretarioId": "me-011",
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
      "dirigenteId": "me-003",
      "secretarioId": "me-012",
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
      "dirigenteId": "me-004",
      "secretarioId": "me-013",
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
      "dirigenteId": "me-005",
      "secretarioId": "me-014",
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
      "dirigenteId": "me-006",
      "secretarioId": "me-015",
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
      "dirigenteId": "me-007",
      "secretarioId": "me-016",
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
      "dirigenteId": "me-008",
      "secretarioId": "me-017",
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
      "dirigenteId": "me-009",
      "secretarioId": "me-018",
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
      "titulo": "Estatuto da Ordem",
      "descricao": "Norma fundamental que define natureza, finalidade, estrutura e regime de membresia.",
      "categoria": "estatuto",
      "responsavelId": "me-003",
      "nivelAcesso": [],
      "versaoAtual": "4.0",
      "atualizadoEm": "2026-08-08T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-001.pdf",
      "tamanho": "1,8 MB"
    },
    {
      "id": "do-002",
      "titulo": "Regimento Interno",
      "descricao": "Disciplina o funcionamento dos órgãos, dos Núcleos e das assembleias.",
      "categoria": "regimento",
      "responsavelId": "me-004",
      "nivelAcesso": [],
      "versaoAtual": "2.3",
      "atualizadoEm": "2026-07-21T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-002.pdf",
      "tamanho": "920 KB"
    },
    {
      "id": "do-003",
      "titulo": "Código de Conduta",
      "descricao": "Deveres éticos do membro e regime disciplinar.",
      "categoria": "codigo",
      "responsavelId": "me-004",
      "nivelAcesso": [],
      "versaoAtual": "1.5",
      "atualizadoEm": "2026-06-21T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-003.pdf",
      "tamanho": "540 KB"
    },
    {
      "id": "do-004",
      "titulo": "Códice de Formação",
      "descricao": "Compêndio doutrinário das trilhas de formação filosófica e política.",
      "categoria": "codice",
      "responsavelId": "me-007",
      "nivelAcesso": [],
      "versaoAtual": "3.0",
      "atualizadoEm": "2026-07-30T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-004.pdf",
      "tamanho": "6,2 MB"
    },
    {
      "id": "do-005",
      "titulo": "Regulamento de Tesouraria",
      "descricao": "Regras de arrecadação, custeio, prestação de contas e auditoria.",
      "categoria": "regulamento",
      "responsavelId": "me-005",
      "nivelAcesso": [
        "administrador",
        "presidente",
        "tesoureiro",
        "dirigente_nucleo"
      ],
      "versaoAtual": "1.2",
      "atualizadoEm": "2026-07-06T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-005.pdf",
      "tamanho": "410 KB"
    },
    {
      "id": "do-006",
      "titulo": "Manual do Dirigente de Núcleo",
      "descricao": "Procedimentos de condução, registro e representação do Núcleo.",
      "categoria": "manual",
      "responsavelId": "me-004",
      "nivelAcesso": [
        "administrador",
        "presidente",
        "secretario",
        "dirigente_nucleo",
        "coordenador"
      ],
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
      "versaoAtual": "4.0",
      "atualizadoEm": "2026-08-18T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-007.pdf",
      "tamanho": "2,4 MB"
    },
    {
      "id": "do-008",
      "titulo": "Balancete Consolidado — Agosto",
      "descricao": "Demonstrativo mensal de receitas e despesas.",
      "categoria": "financeiro",
      "responsavelId": "me-005",
      "nivelAcesso": [
        "administrador",
        "presidente",
        "vice_presidente",
        "tesoureiro"
      ],
      "versaoAtual": "1.0",
      "atualizadoEm": "2026-08-18T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-008.pdf",
      "tamanho": "640 KB"
    },
    {
      "id": "do-009",
      "titulo": "Cartilha do Novo Membro",
      "descricao": "Orientações iniciais sobre direitos, deveres e primeiros passos.",
      "categoria": "manual",
      "responsavelId": "me-004",
      "nivelAcesso": [],
      "versaoAtual": "1.4",
      "atualizadoEm": "2026-05-22T13:00:00.000Z",
      "arquivoUrl": "/documentos/do-009.pdf",
      "tamanho": "780 KB"
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
      "id": "do-004-v3",
      "documentoId": "do-004",
      "versao": "3.0",
      "notas": "Revisão aprovada em assembleia.",
      "publicadoEm": "2026-07-30T13:00:00.000Z",
      "publicadoPor": "me-007"
    },
    {
      "id": "do-004-v2",
      "documentoId": "do-004",
      "versao": "2.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2026-01-31T13:00:00.000Z",
      "publicadoPor": "me-007"
    },
    {
      "id": "do-004-v1",
      "documentoId": "do-004",
      "versao": "1.0",
      "notas": "Versão anterior arquivada.",
      "publicadoEm": "2025-08-04T13:00:00.000Z",
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
      "capaCor": "#2a78d6"
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
      "capaCor": "#eb6834"
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
      "capaCor": "#1baf7a"
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
      "capaCor": "#eda100"
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
      "nome": "Contribuição ordinária",
      "tipo": "receita",
      "cor": "#2a78d6"
    },
    {
      "id": "cf-002",
      "nome": "Doação",
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
      "data": "2025-09-06T10:00:00.000Z",
      "descricao": "Contribuições ordinárias do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 18688.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0002",
      "tipo": "receita",
      "data": "2025-09-07T10:00:00.000Z",
      "descricao": "Doações de apoiadores",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 4288.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0003",
      "tipo": "receita",
      "data": "2025-09-08T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 3933.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0003.pdf"
    },
    {
      "id": "la-0004",
      "tipo": "receita",
      "data": "2025-09-09T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2122.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0005",
      "tipo": "receita",
      "data": "2025-09-10T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1396.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0006",
      "tipo": "receita",
      "data": "2025-09-11T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1458.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0006.pdf"
    },
    {
      "id": "la-0007",
      "tipo": "receita",
      "data": "2025-09-12T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1124.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0008",
      "tipo": "receita",
      "data": "2025-09-13T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 841.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0009",
      "tipo": "receita",
      "data": "2025-09-14T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1085.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0009.pdf"
    },
    {
      "id": "la-0010",
      "tipo": "receita",
      "data": "2025-09-15T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1077.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0011",
      "tipo": "receita",
      "data": "2025-09-16T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 730.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0012",
      "tipo": "receita",
      "data": "2025-09-17T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 767.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0012.pdf"
    },
    {
      "id": "la-0013",
      "tipo": "receita",
      "data": "2025-09-18T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 383.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0014",
      "tipo": "despesa",
      "data": "2025-09-19T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 5367.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0015",
      "tipo": "despesa",
      "data": "2025-09-20T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3081.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0015.pdf"
    },
    {
      "id": "la-0016",
      "tipo": "despesa",
      "data": "2025-09-21T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2239.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0017",
      "tipo": "despesa",
      "data": "2025-09-22T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1521.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0018",
      "tipo": "despesa",
      "data": "2025-09-23T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 596.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0018.pdf"
    },
    {
      "id": "la-0019",
      "tipo": "despesa",
      "data": "2025-09-24T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 632.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0020",
      "tipo": "despesa",
      "data": "2025-09-25T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 252.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0021",
      "tipo": "receita",
      "data": "2025-10-26T10:00:00.000Z",
      "descricao": "Contribuições ordinárias do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 19444.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0021.pdf"
    },
    {
      "id": "la-0022",
      "tipo": "receita",
      "data": "2025-10-27T10:00:00.000Z",
      "descricao": "Doações de apoiadores",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 4159.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0023",
      "tipo": "receita",
      "data": "2025-10-28T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 3720.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0024",
      "tipo": "receita",
      "data": "2025-10-05T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 1962.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0024.pdf"
    },
    {
      "id": "la-0025",
      "tipo": "receita",
      "data": "2025-10-06T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1485.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0026",
      "tipo": "receita",
      "data": "2025-10-07T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1515.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0027",
      "tipo": "receita",
      "data": "2025-10-08T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1437.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0027.pdf"
    },
    {
      "id": "la-0028",
      "tipo": "receita",
      "data": "2025-10-09T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1082.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0029",
      "tipo": "receita",
      "data": "2025-10-10T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 807.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0030",
      "tipo": "receita",
      "data": "2025-10-11T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 700.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0030.pdf"
    },
    {
      "id": "la-0031",
      "tipo": "receita",
      "data": "2025-10-12T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 697.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0032",
      "tipo": "receita",
      "data": "2025-10-13T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 776.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0033",
      "tipo": "receita",
      "data": "2025-10-14T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 751.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0033.pdf"
    },
    {
      "id": "la-0034",
      "tipo": "despesa",
      "data": "2025-10-15T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 5563.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0035",
      "tipo": "despesa",
      "data": "2025-10-16T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3357.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0036",
      "tipo": "despesa",
      "data": "2025-10-17T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2241.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0036.pdf"
    },
    {
      "id": "la-0037",
      "tipo": "despesa",
      "data": "2025-10-18T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1692.8,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0038",
      "tipo": "despesa",
      "data": "2025-10-19T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 1035.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0039",
      "tipo": "despesa",
      "data": "2025-10-20T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 628.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0039.pdf"
    },
    {
      "id": "la-0040",
      "tipo": "despesa",
      "data": "2025-10-21T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 532.8,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0041",
      "tipo": "receita",
      "data": "2025-11-21T10:00:00.000Z",
      "descricao": "Contribuições ordinárias do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 20061.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0042",
      "tipo": "receita",
      "data": "2025-11-22T10:00:00.000Z",
      "descricao": "Doações de apoiadores",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 4785.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0042.pdf"
    },
    {
      "id": "la-0043",
      "tipo": "receita",
      "data": "2025-11-23T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 4162.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0044",
      "tipo": "receita",
      "data": "2025-11-24T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 1897.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0045",
      "tipo": "receita",
      "data": "2025-11-25T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1431.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0045.pdf"
    },
    {
      "id": "la-0046",
      "tipo": "receita",
      "data": "2025-11-26T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1604.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0047",
      "tipo": "receita",
      "data": "2025-11-27T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1150.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0048",
      "tipo": "receita",
      "data": "2025-11-04T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1176.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0048.pdf"
    },
    {
      "id": "la-0049",
      "tipo": "receita",
      "data": "2025-11-05T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1262.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0050",
      "tipo": "receita",
      "data": "2025-11-06T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 970.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0051",
      "tipo": "receita",
      "data": "2025-11-07T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 587.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0051.pdf"
    },
    {
      "id": "la-0052",
      "tipo": "receita",
      "data": "2025-11-08T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 577.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0053",
      "tipo": "receita",
      "data": "2025-11-09T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 357.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0054",
      "tipo": "despesa",
      "data": "2025-11-10T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 5603.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0054.pdf"
    },
    {
      "id": "la-0055",
      "tipo": "despesa",
      "data": "2025-11-11T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3402.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0056",
      "tipo": "despesa",
      "data": "2025-11-12T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2721.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0057",
      "tipo": "despesa",
      "data": "2025-11-13T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1754.6,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0057.pdf"
    },
    {
      "id": "la-0058",
      "tipo": "despesa",
      "data": "2025-11-14T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 884.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0059",
      "tipo": "despesa",
      "data": "2025-11-15T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 808.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0060",
      "tipo": "despesa",
      "data": "2025-11-16T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 371.6,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0060.pdf"
    },
    {
      "id": "la-0061",
      "tipo": "receita",
      "data": "2025-12-17T10:00:00.000Z",
      "descricao": "Contribuições ordinárias do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 20594.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0062",
      "tipo": "receita",
      "data": "2025-12-18T10:00:00.000Z",
      "descricao": "Doações de apoiadores",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 4468.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0063",
      "tipo": "receita",
      "data": "2025-12-19T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 4210.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0063.pdf"
    },
    {
      "id": "la-0064",
      "tipo": "receita",
      "data": "2025-12-20T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2443.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0065",
      "tipo": "receita",
      "data": "2025-12-21T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1376.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0066",
      "tipo": "receita",
      "data": "2025-12-22T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1318.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0066.pdf"
    },
    {
      "id": "la-0067",
      "tipo": "receita",
      "data": "2025-12-23T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1294.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0068",
      "tipo": "receita",
      "data": "2025-12-24T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1254.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0069",
      "tipo": "receita",
      "data": "2025-12-25T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1227.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0069.pdf"
    },
    {
      "id": "la-0070",
      "tipo": "receita",
      "data": "2025-12-26T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1179.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0071",
      "tipo": "receita",
      "data": "2025-12-27T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 926.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0072",
      "tipo": "receita",
      "data": "2025-12-04T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 626.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0072.pdf"
    },
    {
      "id": "la-0073",
      "tipo": "receita",
      "data": "2025-12-05T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 681.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0074",
      "tipo": "despesa",
      "data": "2025-12-06T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 6040.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0075",
      "tipo": "despesa",
      "data": "2025-12-07T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3572.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0075.pdf"
    },
    {
      "id": "la-0076",
      "tipo": "despesa",
      "data": "2025-12-08T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2659.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0077",
      "tipo": "despesa",
      "data": "2025-12-09T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1884.4,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0078",
      "tipo": "despesa",
      "data": "2025-12-10T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 726.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0078.pdf"
    },
    {
      "id": "la-0079",
      "tipo": "despesa",
      "data": "2025-12-11T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 471.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0080",
      "tipo": "despesa",
      "data": "2025-12-12T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 251.4,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0081",
      "tipo": "receita",
      "data": "2026-01-12T10:00:00.000Z",
      "descricao": "Contribuições ordinárias do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 21512.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0081.pdf"
    },
    {
      "id": "la-0082",
      "tipo": "receita",
      "data": "2026-01-13T10:00:00.000Z",
      "descricao": "Doações de apoiadores",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 4890.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0083",
      "tipo": "receita",
      "data": "2026-01-14T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 4323.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0084",
      "tipo": "receita",
      "data": "2026-01-15T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2309.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0084.pdf"
    },
    {
      "id": "la-0085",
      "tipo": "receita",
      "data": "2026-01-16T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1567.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0086",
      "tipo": "receita",
      "data": "2026-01-17T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1440.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0087",
      "tipo": "receita",
      "data": "2026-01-18T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1225.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0087.pdf"
    },
    {
      "id": "la-0088",
      "tipo": "receita",
      "data": "2026-01-19T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1212.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0089",
      "tipo": "receita",
      "data": "2026-01-20T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1250.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0090",
      "tipo": "receita",
      "data": "2026-01-21T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1014.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0090.pdf"
    },
    {
      "id": "la-0091",
      "tipo": "receita",
      "data": "2026-01-22T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1050.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0092",
      "tipo": "receita",
      "data": "2026-01-23T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 584.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0093",
      "tipo": "receita",
      "data": "2026-01-24T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 738.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0093.pdf"
    },
    {
      "id": "la-0094",
      "tipo": "despesa",
      "data": "2026-01-25T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 6119.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0095",
      "tipo": "despesa",
      "data": "2026-01-26T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3784.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0096",
      "tipo": "despesa",
      "data": "2026-01-03T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2486.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0096.pdf"
    },
    {
      "id": "la-0097",
      "tipo": "despesa",
      "data": "2026-01-04T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1750.2,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0098",
      "tipo": "despesa",
      "data": "2026-01-05T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 704.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0099",
      "tipo": "despesa",
      "data": "2026-01-06T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 692.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0099.pdf"
    },
    {
      "id": "la-0100",
      "tipo": "despesa",
      "data": "2026-01-07T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 612.2,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0101",
      "tipo": "receita",
      "data": "2026-02-07T10:00:00.000Z",
      "descricao": "Contribuições ordinárias do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 22139.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0102",
      "tipo": "receita",
      "data": "2026-02-08T10:00:00.000Z",
      "descricao": "Doações de apoiadores",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 4862.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0102.pdf"
    },
    {
      "id": "la-0103",
      "tipo": "receita",
      "data": "2026-02-09T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 4434.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0104",
      "tipo": "receita",
      "data": "2026-02-10T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2452.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0105",
      "tipo": "receita",
      "data": "2026-02-11T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1908.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0105.pdf"
    },
    {
      "id": "la-0106",
      "tipo": "receita",
      "data": "2026-02-12T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1409.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0107",
      "tipo": "receita",
      "data": "2026-02-13T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1238.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0108",
      "tipo": "receita",
      "data": "2026-02-14T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1116.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0108.pdf"
    },
    {
      "id": "la-0109",
      "tipo": "receita",
      "data": "2026-02-15T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1128.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0110",
      "tipo": "receita",
      "data": "2026-02-16T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 991.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0111",
      "tipo": "receita",
      "data": "2026-02-17T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 736.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0111.pdf"
    },
    {
      "id": "la-0112",
      "tipo": "receita",
      "data": "2026-02-18T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 632.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0113",
      "tipo": "receita",
      "data": "2026-02-19T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 848.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0114",
      "tipo": "despesa",
      "data": "2026-02-20T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 6702.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0114.pdf"
    },
    {
      "id": "la-0115",
      "tipo": "despesa",
      "data": "2026-02-21T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3784.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0116",
      "tipo": "despesa",
      "data": "2026-02-22T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2895.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0117",
      "tipo": "despesa",
      "data": "2026-02-23T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1630.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0117.pdf"
    },
    {
      "id": "la-0118",
      "tipo": "despesa",
      "data": "2026-02-24T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 1045.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0119",
      "tipo": "despesa",
      "data": "2026-02-25T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 632.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0120",
      "tipo": "despesa",
      "data": "2026-02-02T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 761.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0120.pdf"
    },
    {
      "id": "la-0121",
      "tipo": "receita",
      "data": "2026-03-05T10:00:00.000Z",
      "descricao": "Contribuições ordinárias do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 23026.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0122",
      "tipo": "receita",
      "data": "2026-03-06T10:00:00.000Z",
      "descricao": "Doações de apoiadores",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 5227.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0123",
      "tipo": "receita",
      "data": "2026-03-07T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 4621.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0123.pdf"
    },
    {
      "id": "la-0124",
      "tipo": "receita",
      "data": "2026-03-08T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2623.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0125",
      "tipo": "receita",
      "data": "2026-03-09T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1971.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0126",
      "tipo": "receita",
      "data": "2026-03-10T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1440.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0126.pdf"
    },
    {
      "id": "la-0127",
      "tipo": "receita",
      "data": "2026-03-11T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1565.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0128",
      "tipo": "receita",
      "data": "2026-03-12T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1106.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0129",
      "tipo": "receita",
      "data": "2026-03-13T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Rio de Janeiro",
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
      "data": "2026-03-14T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1119.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0131",
      "tipo": "receita",
      "data": "2026-03-15T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 672.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0132",
      "tipo": "receita",
      "data": "2026-03-16T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 584.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0132.pdf"
    },
    {
      "id": "la-0133",
      "tipo": "receita",
      "data": "2026-03-17T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 769.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0134",
      "tipo": "despesa",
      "data": "2026-03-18T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 6643.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0135",
      "tipo": "despesa",
      "data": "2026-03-19T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3833.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0135.pdf"
    },
    {
      "id": "la-0136",
      "tipo": "despesa",
      "data": "2026-03-20T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2698.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0137",
      "tipo": "despesa",
      "data": "2026-03-21T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1985.8,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0138",
      "tipo": "despesa",
      "data": "2026-03-22T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 876.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0138.pdf"
    },
    {
      "id": "la-0139",
      "tipo": "despesa",
      "data": "2026-03-23T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 820.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0140",
      "tipo": "despesa",
      "data": "2026-03-24T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 696.8,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0141",
      "tipo": "receita",
      "data": "2026-04-24T10:00:00.000Z",
      "descricao": "Contribuições ordinárias do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 23471.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0141.pdf"
    },
    {
      "id": "la-0142",
      "tipo": "receita",
      "data": "2026-04-25T10:00:00.000Z",
      "descricao": "Doações de apoiadores",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 5298.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0143",
      "tipo": "receita",
      "data": "2026-04-26T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 4672.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0144",
      "tipo": "receita",
      "data": "2026-04-03T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2669.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0144.pdf"
    },
    {
      "id": "la-0145",
      "tipo": "receita",
      "data": "2026-04-04T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1883.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0146",
      "tipo": "receita",
      "data": "2026-04-05T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1884.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0147",
      "tipo": "receita",
      "data": "2026-04-06T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1443.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0147.pdf"
    },
    {
      "id": "la-0148",
      "tipo": "receita",
      "data": "2026-04-07T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1555.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0149",
      "tipo": "receita",
      "data": "2026-04-08T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1124.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0150",
      "tipo": "receita",
      "data": "2026-04-09T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1259.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0150.pdf"
    },
    {
      "id": "la-0151",
      "tipo": "receita",
      "data": "2026-04-10T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 995.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0152",
      "tipo": "receita",
      "data": "2026-04-11T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 795.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0153",
      "tipo": "receita",
      "data": "2026-04-12T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 708.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0153.pdf"
    },
    {
      "id": "la-0154",
      "tipo": "despesa",
      "data": "2026-04-13T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 6873.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0155",
      "tipo": "despesa",
      "data": "2026-04-14T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 3882.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0156",
      "tipo": "despesa",
      "data": "2026-04-15T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2806.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0156.pdf"
    },
    {
      "id": "la-0157",
      "tipo": "despesa",
      "data": "2026-04-16T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1945.6,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0158",
      "tipo": "despesa",
      "data": "2026-04-17T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 986.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0159",
      "tipo": "despesa",
      "data": "2026-04-18T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 620.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0159.pdf"
    },
    {
      "id": "la-0160",
      "tipo": "despesa",
      "data": "2026-04-19T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 486.6,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0161",
      "tipo": "receita",
      "data": "2026-05-20T10:00:00.000Z",
      "descricao": "Contribuições ordinárias do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 24306.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0162",
      "tipo": "receita",
      "data": "2026-05-21T10:00:00.000Z",
      "descricao": "Doações de apoiadores",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 5502.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0162.pdf"
    },
    {
      "id": "la-0163",
      "tipo": "receita",
      "data": "2026-05-22T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 5158.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0164",
      "tipo": "receita",
      "data": "2026-05-23T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2573.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0165",
      "tipo": "receita",
      "data": "2026-05-24T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1703.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0165.pdf"
    },
    {
      "id": "la-0166",
      "tipo": "receita",
      "data": "2026-05-25T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1681.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0167",
      "tipo": "receita",
      "data": "2026-05-26T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1531.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0168",
      "tipo": "receita",
      "data": "2026-05-03T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1162.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0168.pdf"
    },
    {
      "id": "la-0169",
      "tipo": "receita",
      "data": "2026-05-04T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1208.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0170",
      "tipo": "receita",
      "data": "2026-05-05T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1179.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0171",
      "tipo": "receita",
      "data": "2026-05-06T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 751.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0171.pdf"
    },
    {
      "id": "la-0172",
      "tipo": "receita",
      "data": "2026-05-07T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 853.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0173",
      "tipo": "receita",
      "data": "2026-05-08T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 672.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0174",
      "tipo": "despesa",
      "data": "2026-05-09T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 7093.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0174.pdf"
    },
    {
      "id": "la-0175",
      "tipo": "despesa",
      "data": "2026-05-10T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 4173.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0176",
      "tipo": "despesa",
      "data": "2026-05-11T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 2914.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0177",
      "tipo": "despesa",
      "data": "2026-05-12T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1981.4,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0177.pdf"
    },
    {
      "id": "la-0178",
      "tipo": "despesa",
      "data": "2026-05-13T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 822.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0179",
      "tipo": "despesa",
      "data": "2026-05-14T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 866.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0180",
      "tipo": "despesa",
      "data": "2026-05-15T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 479.4,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0180.pdf"
    },
    {
      "id": "la-0181",
      "tipo": "receita",
      "data": "2026-06-15T10:00:00.000Z",
      "descricao": "Contribuições ordinárias do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 24902.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0182",
      "tipo": "receita",
      "data": "2026-06-16T10:00:00.000Z",
      "descricao": "Doações de apoiadores",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 5882.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0183",
      "tipo": "receita",
      "data": "2026-06-17T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 5422.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0183.pdf"
    },
    {
      "id": "la-0184",
      "tipo": "receita",
      "data": "2026-06-18T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2672.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0185",
      "tipo": "receita",
      "data": "2026-06-19T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 2143.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0186",
      "tipo": "receita",
      "data": "2026-06-20T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1956.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0186.pdf"
    },
    {
      "id": "la-0187",
      "tipo": "receita",
      "data": "2026-06-21T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1591.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0188",
      "tipo": "receita",
      "data": "2026-06-22T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1245.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0189",
      "tipo": "receita",
      "data": "2026-06-23T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1551.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0189.pdf"
    },
    {
      "id": "la-0190",
      "tipo": "receita",
      "data": "2026-06-24T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1050.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0191",
      "tipo": "receita",
      "data": "2026-06-25T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1211.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0192",
      "tipo": "receita",
      "data": "2026-06-02T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 811.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0192.pdf"
    },
    {
      "id": "la-0193",
      "tipo": "receita",
      "data": "2026-06-03T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 713.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0194",
      "tipo": "despesa",
      "data": "2026-06-04T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 7288.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0195",
      "tipo": "despesa",
      "data": "2026-06-05T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 4472.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0195.pdf"
    },
    {
      "id": "la-0196",
      "tipo": "despesa",
      "data": "2026-06-06T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 3181.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0197",
      "tipo": "despesa",
      "data": "2026-06-07T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 1934.2,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0198",
      "tipo": "despesa",
      "data": "2026-06-08T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 1305.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0198.pdf"
    },
    {
      "id": "la-0199",
      "tipo": "despesa",
      "data": "2026-06-09T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 1025.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0200",
      "tipo": "despesa",
      "data": "2026-06-10T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 340.2,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0201",
      "tipo": "receita",
      "data": "2026-07-11T10:00:00.000Z",
      "descricao": "Contribuições ordinárias do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 26129.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0201.pdf"
    },
    {
      "id": "la-0202",
      "tipo": "receita",
      "data": "2026-07-12T10:00:00.000Z",
      "descricao": "Doações de apoiadores",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 5952.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0203",
      "tipo": "receita",
      "data": "2026-07-13T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 5494.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0204",
      "tipo": "receita",
      "data": "2026-07-14T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2796.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0204.pdf"
    },
    {
      "id": "la-0205",
      "tipo": "receita",
      "data": "2026-07-15T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1997.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0206",
      "tipo": "receita",
      "data": "2026-07-16T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1876.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0207",
      "tipo": "receita",
      "data": "2026-07-17T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1463.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0207.pdf"
    },
    {
      "id": "la-0208",
      "tipo": "receita",
      "data": "2026-07-18T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1252.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0209",
      "tipo": "receita",
      "data": "2026-07-19T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1435.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0210",
      "tipo": "receita",
      "data": "2026-07-20T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 995.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0210.pdf"
    },
    {
      "id": "la-0211",
      "tipo": "receita",
      "data": "2026-07-21T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1028.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0212",
      "tipo": "receita",
      "data": "2026-07-22T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 787.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0213",
      "tipo": "receita",
      "data": "2026-07-23T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 661.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0213.pdf"
    },
    {
      "id": "la-0214",
      "tipo": "despesa",
      "data": "2026-07-24T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 7749.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0215",
      "tipo": "despesa",
      "data": "2026-07-25T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 4337.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0216",
      "tipo": "despesa",
      "data": "2026-07-02T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 3414.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0216.pdf"
    },
    {
      "id": "la-0217",
      "tipo": "despesa",
      "data": "2026-07-03T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 2374.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0218",
      "tipo": "despesa",
      "data": "2026-07-04T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 1228.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0219",
      "tipo": "despesa",
      "data": "2026-07-05T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 1029.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0219.pdf"
    },
    {
      "id": "la-0220",
      "tipo": "despesa",
      "data": "2026-07-06T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 331.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0221",
      "tipo": "receita",
      "data": "2026-08-06T10:00:00.000Z",
      "descricao": "Contribuições ordinárias do mês",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 26788.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0222",
      "tipo": "receita",
      "data": "2026-08-07T10:00:00.000Z",
      "descricao": "Doações de apoiadores",
      "categoriaId": "cf-002",
      "contaId": "ct-001",
      "valor": 6030.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0222.pdf"
    },
    {
      "id": "la-0223",
      "tipo": "receita",
      "data": "2026-08-08T10:00:00.000Z",
      "descricao": "Inscrições em eventos de formação",
      "categoriaId": "cf-003",
      "contaId": "ct-002",
      "valor": 5291.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0224",
      "tipo": "receita",
      "data": "2026-08-09T10:00:00.000Z",
      "descricao": "Venda de material didático",
      "categoriaId": "cf-004",
      "contaId": "ct-002",
      "valor": 2841.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "previsto",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0225",
      "tipo": "receita",
      "data": "2026-08-10T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Jaboatão dos Guararapes",
      "categoriaId": "cf-001",
      "contaId": "ct-003",
      "valor": 1851.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0225.pdf"
    },
    {
      "id": "la-0226",
      "tipo": "receita",
      "data": "2026-08-11T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Recife Central",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1809.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-recife",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0227",
      "tipo": "receita",
      "data": "2026-08-12T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo São Paulo Central",
      "categoriaId": "cf-001",
      "contaId": "ct-004",
      "valor": 1931.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0228",
      "tipo": "receita",
      "data": "2026-08-13T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Campinas",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1711.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-campinas",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0228.pdf"
    },
    {
      "id": "la-0229",
      "tipo": "receita",
      "data": "2026-08-14T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Rio de Janeiro",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1587.4,
      "responsavelId": "me-005",
      "nucleoId": "nu-rj",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0230",
      "tipo": "receita",
      "data": "2026-08-15T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Belo Horizonte",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1302.0,
      "responsavelId": "me-005",
      "nucleoId": "nu-bh",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0231",
      "tipo": "receita",
      "data": "2026-08-16T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Salvador",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1173.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-salvador",
      "situacao": "previsto",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0231.pdf"
    },
    {
      "id": "la-0232",
      "tipo": "receita",
      "data": "2026-08-17T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Brasília",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 1038.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-brasilia",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0233",
      "tipo": "receita",
      "data": "2026-08-18T10:00:00.000Z",
      "descricao": "Contribuições do Núcleo Lisboa",
      "categoriaId": "cf-001",
      "contaId": "ct-001",
      "valor": 972.8,
      "responsavelId": "me-005",
      "nucleoId": "nu-lisboa",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0234",
      "tipo": "despesa",
      "data": "2026-08-19T10:00:00.000Z",
      "descricao": "Aluguel e manutenção da sede nacional",
      "categoriaId": "cf-005",
      "contaId": "ct-001",
      "valor": 7787.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0234.pdf"
    },
    {
      "id": "la-0235",
      "tipo": "despesa",
      "data": "2026-08-20T10:00:00.000Z",
      "descricao": "Impressão de material de formação",
      "categoriaId": "cf-006",
      "contaId": "ct-002",
      "valor": 4600.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0236",
      "tipo": "despesa",
      "data": "2026-08-21T10:00:00.000Z",
      "descricao": "Plataforma de transmissão e comunicação",
      "categoriaId": "cf-007",
      "contaId": "ct-001",
      "valor": 3339.0,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0237",
      "tipo": "despesa",
      "data": "2026-08-22T10:00:00.000Z",
      "descricao": "Serviços administrativos e contábeis",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 2302.8,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0237.pdf"
    },
    {
      "id": "la-0238",
      "tipo": "despesa",
      "data": "2026-08-23T10:00:00.000Z",
      "descricao": "Custeio do Núcleo Jaboatão",
      "categoriaId": "cf-005",
      "contaId": "ct-003",
      "valor": 1052.2,
      "responsavelId": "me-005",
      "nucleoId": "nu-jaboatao",
      "situacao": "previsto",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0239",
      "tipo": "despesa",
      "data": "2026-08-24T10:00:00.000Z",
      "descricao": "Custeio do Núcleo São Paulo",
      "categoriaId": "cf-005",
      "contaId": "ct-004",
      "valor": 679.6,
      "responsavelId": "me-005",
      "nucleoId": "nu-sp",
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": null
    },
    {
      "id": "la-0240",
      "tipo": "despesa",
      "data": "2026-08-01T10:00:00.000Z",
      "descricao": "Custeio dos demais Núcleos",
      "categoriaId": "cf-008",
      "contaId": "ct-001",
      "valor": 473.8,
      "responsavelId": "me-005",
      "nucleoId": null,
      "situacao": "liquidado",
      "observacao": null,
      "comprovanteUrl": "/comprovantes/la-0240.pdf"
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
  ]
} as unknown as Omit<BaseDados, 'cargos'>;

export function criarBaseInicial(): BaseDados {
  return structuredClone({ ...DADOS, cargos: CARGOS }) as BaseDados;
}
