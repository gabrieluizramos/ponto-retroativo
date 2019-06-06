# Ponto Retroativo

Cadastra pontos retroativos, baseado numa range de data.

## Utilização

Rodar
```sh
npm i
```

Atualizar o arquivo `config/user.json` com suas credenciais.

Para descobrir suas credenciais, basta acessar o PontoMais e realizar algum request, consultando os dados dentro de `response headers`.

Para atualizar seus pontos retroativos, rodar:

```sh
inicio=data_inicio fim=data_fim random=booleano(opcional) npm start
```

Onde: 
- data_inicio: uma data de inicio, seguindo modelo ISO padrao (aaaa-mm-dd)
- data_fim: uma data de fim, seguindo modelo ISO padrao (aaaa-mm-dd)
- (opcional) random: caso seja `true`, randomiza os minutos (em um range de, no máximo, 10) dos horários


# Observações
Caso deseje alterar os horários padrões, você deverá configurar manualmente dentro do arquivo `config/custom-times.json`.
Para isso, basta alterar o json com as seguintes chaves:
  - `default`: para os horários de dias normais não definidos.
  - de `Mon` até `Fri`: para configurar os horários de um dia específico.


**Feriados municipais**
O app utiliza a API de [Calendário](http://www.calendario.com.br/api_feriados_municipais_estaduais_nacionais.php) para checar eventuais feriados municipais.
Por padrão a cidade e estado consultado é São Paulo. Com os valores utilizados na consulta são:
- Cidade: 'SAO_PAULO'
- Estado: 'SP'

Foi cadastrado um token prévio para realizar a consulta nessa API. Sinta-se livre para inserir o seu diretamente no arquivo de [configurações](./config/calendario.json), ou alterar a cidade e estado da consulta.

Caso prefira, você pode passar esses valores ao executar a aplicação também (via **process.env**), como:

```sh
inicio=data_inicio fim=data_fim cidade=minha_cidade estado=meu_estado token=meu_token npm start
```
