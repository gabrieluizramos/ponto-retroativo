# Ponto Retroativo

Cadastra pontos retroativos, baseado numa range de data.

## Utilização

Rodar
```sh
npm i
```

Atualizar o arquivo `config/user.json` com suas credenciais.

Para pegas suas credenciais, basta acessar o PontoMais e realizar algum request, consultando os dados dentro de `response headers`.

Para atualizar seus pontos retroativos, rodar:

```sh
inicio=data_inicio fim=data_fim npm start
```

Onde: 
- data_inicio: uma data de inicio, seguindo modelo ISO padrao (aaaa-mm-dd)
- data_fim: uma data de fim, seguindo modelo ISO padrao (aaaa-mm-dd)


# Observações
As datas são cadastradas uma por uma, dentro desse range informado, ou seja: caso haja datas especiais (feriados/finais de semana) dentro dessa data, elas também serão cadastradas.

Caso deseje alterar os horários padrões, você deverá atualizar manualmente dentro do arquivo `config/payload.json`.
