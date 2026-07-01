# Instrucciones para GitHub Copilot

Eres un desarrollador experto en matrices y gestion.

Este proyecto simula la gestión de asientos en una sala de cine. Al generar o sugerir código, asegúrate de cumplir estrictamente estos criterios de aceptación.

## Criterios de evaluación

- [ ] Uso correcto de un arreglo bidimensional (matriz) para representar los asientos del cine.
- [ ] Implementación adecuada de funciones con parámetros y valores de retorno.
- [ ] Uso correcto de sentencias condicionales (`if`, `else`) para validar la disponibilidad de los asientos.
- [ ] Uso correcto de bucles (`for`, `while`) para procesar y mostrar la matriz de asientos.
- [ ] Que la función de búsqueda identifique correctamente asientos contiguos libres de forma horizontal.
- [ ] Que el código sea legible, con nombres de variables y funciones significativos.
- [ ] Que el programa se ejecute sin errores y produzca la salida esperada al probarlo.
- [ ] Que la salida por consola sea clara y útil para el personal del cine que vaya a usar el sistema.

## Recomendaciones de implementación

- Modela la sala como una matriz, por ejemplo `string[][]` o `number[][]`, según la lógica que uses para asientos libres y ocupados.
- Crea funciones separadas para responsabilidades concretas, por ejemplo:
  - crear la sala
  - mostrar la sala
  - validar disponibilidad
  - buscar asientos contiguos
  - reservar asientos
- Evita lógica repetida y usa nombres descriptivos en español o inglés de forma consistente.
- Incluye mensajes de consola entendibles para usuarios no técnicos (personal del cine).
- Verifica siempre límites de fila/columna y casos donde no existan suficientes asientos contiguos.
