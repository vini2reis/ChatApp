# ChatApp

## Tecnologias

- Backend: Python 3, Django, Django REST Framework
- Banco de dados: SQLite
- Frontend: React
- Controle de versão: Git


## Backend

### Como rodar o projeto

- Criar e ativar o ambiente virtual:

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```
- Instalar dependências:

```bash
pip install -r requirements.txt  # ou 'pip install django djangorestframework'
```

- Aplicar as migrations
- 
```bash
python manage.py migrate
```
-Rodar o servidor

```bash
python manage.py runserver
```

O Backend estará escutando em http://127.0.0.1:8000/



## Frontend

- Instalar dependencias
```
npm install
```

- Ajustar variaveis de ambiente
  - copie .env.example para o .env. Se for preciso altere o VITE_API_URL

- Rodar projeto
```
npm run dev
```

Abra http://localhost:3000 ou outro host disponibilizado


## Decisões técnicas

### Modelagem de dados

Foi criado um único model Message com os campos:

- user_id: CharField -> indica o usuário que enviou a mensagem;
    - neste campo foi adicionado o choices para ser uma redundancia na validação e por ter apenas dois usuários;
- message: TextField ->  guarda a mensagem enviada pelo usuário;
- response: TextField -> guarda a resposta mockada do sistema;
- sent_at: DateTimeField -> registra a data/hora do envio da menssagem.

É um abordagem simples, direta e de fácil entendimento, suficiente para este chatbot, e permite filtrar facilmente por usuário. Também foi adicionado um serializer para validar os campos recebidos pelo backend.

### Estrutura / Regra de negócio

Foi decidido colocar as duas views em um mesmo arquivo pela facilidade de leitura do projeto e correções, e por ser um arquivo pequno também.

As rotas foram definidas como:

GET /api/history/:user_id -> para mostrar o historico de mensagens, filtrando pelo usuário enviado na url e ordenando de forma crescente, com a mais antiga no topo e a mais recente embaixo.

POST /api/chat/ para criar uma nova mensagem:

- recebe user e message;
- gera automaticamente uma response mockada diferente para cada usuário;
- salva no banco e retorna o objeto criado.

A função get_bot_response do arquivo services é onde está a lógica da resposta simulada, facilitando futuras alterações.

## Gerenciamento de estado no React

- O usuário ativo é mantido em um UserContext via Context API
- Qualquer página pode ler o activeUser e reagir à mudança
- A página de histórico monitora currentUser e refaz a requisição quando ele muda
- A página do chat utiliza useEffect para limpar a conversa quando tem a troca de usuário

Telas

Chat:

- Envia POST para o backend e mostra as mensagens desta sessão.

Histórico:

- Busca o histórico completo do usuário ativo no backend e exibe todas as interações já salvas no banco.


## Rotas

### 📌 GET /api/history/:user_id

Buscar histórico de mensagens do usuário.

**Parâmetros:**
| Parâmetro | Tipo   | Obrigatório | Descrição |
|----------|--------|:-----------:|-----------|
| `user_id`      | string | ✅ | Id de usuario |

**Resposta — 200 OK**
```json
[
    {
        "id": 18,
        "user_id": "user_b",
        "message": "ola",
        "response": "Seu ticket foi registrado user_b! Obrigado pelo envio da sua mensagem.",
        "sent_at": "2025-11-25T20:36:45.656882-03:00"
    },
    {
        "id": 22,
        "user_id": "user_b",
        "message": "Qual é o status do meu pedido?",
        "response": "Seu ticket foi registrado user_b! Obrigado pelo envio da sua mensagem.",
        "sent_at": "2025-11-25T20:53:47.697827-03:00"
    }
]
```

### 📌 POST /api/chat/

Envia mensagem para o bot.

**Parâmetros da Body:**
| Parâmetro | Tipo   | Obrigatório | Descrição |
|----------|--------|:-----------:|-----------|
| `user_id`      | string | ✅ | Id de usuario |
| `message`      | string | ✅ | Menssagem enviada pelo usuário |

**Resposta — 201 CREATED**
```json
{
    "id": 23,
    "user_id": "user_a",
    "message": "Qual é o status do meu pedido?",
    "response": "Agradecemos pelo seu contato, user_a! Responderemos o mais breve possível.",
    "sent_at": "2025-11-25T21:09:15.326996-03:00"
}
```


