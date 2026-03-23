# Gabarito: Desafios de LFA - Aula 6 (Aprofundamento AFD)

Este documento contém a resolução matemática formal para os dois desafios propostos na Aula 6.

---

## Desafio 1: Início e Fim Iguais
**Enunciado:** Construa um AFD sobre Σ={a,b} que aceite palavras que começam e terminam com a mesma letra. (Ex: a, b, aba, aaba, bb).

**Lógica de Resolução:**
Precisamos que o autômato lembre a primeira letra lida e verifique se a última bate com ela.
- `q0`: Estado inicial (nenhuma leitura ainda).
- `q1`: Primeira letra foi `a`, e a atual/última lida também é `a` (Aceitação).
- `q2`: Primeira letra foi `a`, mas a última lida foi `b` (Rejeição temporária).
- `q3`: Primeira letra foi `b`, e a atual/última lida também é `b` (Aceitação).
- `q4`: Primeira letra foi `b`, mas a última lida foi `a` (Rejeição temporária).

**Tabela de Transição (Gabarito):**

| Estado Atual | Lê 'a' | Lê 'b' | Status |
| :--- | :---: | :---: | :--- |
| **-> q0** | q1 | q3 | Inicial |
| **\* q1** | q1 | q2 | Final |
| **q2** | q1 | q2 | Não-Final |
| **\* q3** | q4 | q3 | Final |
| **q4** | q4 | q3 | Não-Final |

*(A tabela acima é exatamente a resposta correta exigida no jogo de Drag and Drop da Aula 6).*

---

## Desafio 2 (Boss): O Problema da Paridade
**Enunciado:** Construa um AFD sobre Σ={0,1} que aceite cadeias com número **PAR de zeros** e número **ÍMPAR de uns**.

**Lógica de Resolução:**
Como as condições são independentes (paridade do 0 e paridade do 1), geramos o Produto Cartesiano dos estados booleanos: 2 x 2 = 4 estados no total. Um Autômato "Lembra" a paridade alternando os eixos x e y do grafo.

- `q0`: (Par de 0, Par de 1) -> Estado Inicial (0 zeros e 0 uns).
- `q1`: (Par de 0, Ímpar de 1) -> **Estado Final / Aceitação**. (Exato alvo do desafio).
- `q2`: (Ímpar de 0, Par de 1).
- `q3`: (Ímpar de 0, Ímpar de 1).

**Tabela de Transição (Gabarito):**

| Estado Atual | Lê '0' | Lê '1' | Explicação da Transição |
| :--- | :---: | :---: | :--- |
| **-> q0** | q2 | q1 | Ler '0' altera paridade do 0 para Ímpar (q2). Ler '1' altera do 1 para Ímpar (q1). |
| **\* q1** | q3 | q0 | Ler '0' altera paridade do 0 para Ímpar (q3). Ler '1' volta paridade do 1 para Par (q0). |
| **q2** | q0 | q3 | Ler '0' volta paridade do 0 para Par (q0). Ler '1' altera do 1 para Ímpar (q3). |
| **q3** | q1 | q2 | Ler '0' volta paridade do 0 para Par (q1). Ler '1' volta paridade do 1 para Par (q2). |

*(Esta estrutura dita a arquitetura visual da máquina de testes contida no final da Aula 6)*.
