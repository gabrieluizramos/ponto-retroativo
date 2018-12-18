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
inicio=data_inicio fim=data_fim npm start
```

Onde: 
- data_inicio: uma data de inicio, seguindo modelo ISO padrao (aaaa-mm-dd)
- data_fim: uma data de fim, seguindo modelo ISO padrao (aaaa-mm-dd)


# Observações
Caso deseje alterar os horários padrões, você deverá configurar manualmente dentro do arquivo `config/custom-times.json`.
Para isso, basta alterar o json com as seguintes chaves:
    -`default`: para os horários de dias normais não definidos.
    -de `Mon` até `Fri`: para configurar os horários de um dia específico.


