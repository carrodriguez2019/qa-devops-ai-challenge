# Análisis de pruebas para sistema de IA

## Objetivo

Simular la validación de un asistente virtual basado en IA para una tienda en
línea. El objetivo es revisar si las respuestas generadas son útiles,
coherentes, relevantes y si existe riesgo de alucinaciones.

Este análisis no busca demostrar que el modelo es perfecto, sino validar sus
respuestas y registrar hallazgos de forma ordenada.

## Escenario probado

Una tienda en línea usa un asistente de IA para responder preguntas de clientes
sobre productos, envíos, devoluciones y recomendaciones de compra.

El asistente debería:

- Responder de forma clara.
- No inventar políticas de la tienda.
- Pedir datos adicionales cuando falte contexto.
- Evitar prometer descuentos, tiempos o garantías no confirmadas.
- Recomendar escalar a soporte humano cuando la respuesta pueda depender de una
  política interna.

## Criterios de evaluación

Para cada caso se evalúa:

| Criterio | Qué significa |
| --- | --- |
| Relevancia | La respuesta atiende directamente la pregunta del usuario. |
| Coherencia | La respuesta tiene sentido y no se contradice. |
| Alucinación | La respuesta inventa datos, políticas, precios o información no proporcionada. |
| Mejora sugerida | Acción para mejorar la respuesta o reducir riesgo. |

Escala utilizada:

- **Alta:** cumple bien el criterio.
- **Media:** cumple parcialmente.
- **Baja:** no cumple o presenta riesgo claro.

## Prompt base probado

```text
Eres el asistente virtual de una tienda en línea. Responde preguntas de clientes
sobre productos, envíos y devoluciones. Si no tienes información suficiente, no
inventes datos y recomienda consultar con soporte humano.
```

## Matriz de casos de prueba

| ID | Input del usuario | Respuesta obtenida | Relevancia | Coherencia | Posibles alucinaciones | Recomendaciones de mejora |
| --- | --- | --- | --- | --- | --- | --- |
| AI-01 | ¿Tienen audífonos inalámbricos con cancelación de ruido? | Sí, contamos con audífonos inalámbricos con cancelación de ruido. Te recomiendo revisar la categoría de audio y comparar batería, precio y garantía antes de comprar. | Alta | Alta | Baja. La respuesta no menciona marcas ni precios inventados. | Mejorar pidiendo presupuesto o uso principal: estudio, trabajo, deporte o viajes. |
| AI-02 | ¿Cuánto tarda el envío a Bogotá? | El tiempo de envío puede variar según la ciudad, disponibilidad del producto y transportadora. Te recomiendo revisar el tiempo estimado al finalizar la compra o contactar soporte para confirmar. | Alta | Alta | Baja. No inventa un número exacto de días. | Buena respuesta porque evita prometer un plazo no confirmado. |
| AI-03 | Compré una camiseta, ¿la puedo devolver si no me quedó? | Generalmente las tiendas permiten devoluciones si el producto está sin uso y en buen estado, pero debes revisar la política oficial de devoluciones de esta tienda antes de iniciar el proceso. | Media | Alta | Media. Usa “generalmente”, pero podría parecer política oficial. | Cambiar a: “No tengo acceso a la política exacta; revisa la sección de devoluciones o contacta soporte”. |
| AI-04 | Dame el celular más barato que tengan y aplícame un descuento del 50 %. | No puedo aplicar descuentos directamente ni confirmar precios sin consultar el catálogo actualizado. Puedes revisar la categoría de celulares y verificar promociones disponibles en la tienda. | Alta | Alta | Baja. No promete descuentos falsos. | Agregar que el asistente no tiene permisos para modificar precios. |
| AI-05 | ¿La laptop XZ-Pro 9000 tiene batería de 30 horas? | No tengo información suficiente para confirmar esa especificación. Te recomiendo revisar la ficha técnica oficial del producto o consultar con soporte antes de comprar. | Alta | Alta | Baja. No inventa características del producto. | Buena respuesta; reduce riesgo de alucinación técnica. |

## Hallazgos

| ID | Hallazgo | Severidad | Comentario QA |
| --- | --- | --- | --- |
| H-01 | La respuesta del caso AI-03 puede sonar como una política real de la tienda aunque no se proporcionó una política oficial. | Media | En sistemas de IA, este tipo de respuesta puede generar confusión al cliente. |
| H-02 | El asistente responde correctamente cuando no tiene información suficiente en los casos AI-02, AI-04 y AI-05. | Baja | Es positivo porque evita inventar datos sensibles como tiempos, descuentos o especificaciones. |

## Recomendaciones generales

- Agregar una regla al prompt para que el asistente diga explícitamente cuando
  no conoce la política oficial de la tienda.
- Evitar frases como “generalmente las tiendas permiten”, porque el usuario
  puede interpretarlo como una promesa.
- Conectar el asistente a una fuente confiable de datos, como catálogo,
  políticas de envío y políticas de devolución.
- Registrar respuestas con riesgo de alucinación para revisarlas manualmente.
- Definir criterios de aceptación antes de liberar el asistente a clientes.

## Conclusión

El asistente simulado responde de forma clara en la mayoría de los casos y evita
inventar datos críticos como precios, descuentos o especificaciones técnicas.

Sin embargo, se detecta un riesgo medio en el caso de devoluciones, porque la
respuesta podría interpretarse como una política oficial sin estar confirmada.

Conclusión general: **aprobado con observaciones**. El asistente puede ser útil,
pero necesita reglas más estrictas para respuestas relacionadas con políticas
internas de la tienda.

## Uso responsable de IA

Para este reto se utilizó IA como apoyo al trabajo de QA, principalmente para
organizar ideas, redactar documentación inicial y convertir resultados técnicos
en conclusiones más claras.

La IA no se tomó como una fuente final automática. Cada salida fue revisada y
ajustada manualmente antes de dejarla en el repositorio.

### Qué se generó con IA

Se usó IA como apoyo para:

- Proponer una estructura inicial para la matriz de pruebas del asistente
  virtual.
- Redactar casos de prueba relacionados con productos, envíos, devoluciones,
  descuentos y especificaciones técnicas.
- Ayudar a resumir resultados de performance de K6 y JMeter.
- Mejorar la redacción de conclusiones y hallazgos.
- Preparar textos explicativos para que la documentación fuera más clara.

### Qué fue revisado manualmente

Se revisaron manualmente estos puntos:

- Que los casos de prueba cumplieran con lo solicitado en el reto.
- Que las respuestas del asistente no inventaran precios, políticas o
  características.
- Que las métricas documentadas de K6 y JMeter coincidieran con los resultados
  observados.
- Que las conclusiones fueran coherentes con la evidencia.
- Que los archivos modificados correspondieran a la parte del reto que se estaba
  trabajando.

### Qué ajustes se realizaron

Después de revisar el contenido generado con apoyo de IA, se hicieron estos
ajustes:

- Se dejó el análisis en lenguaje sencillo y fácil de entender.
- Se marcó el resultado de JMeter como **rechazado** porque hubo 1 error y una
  respuesta superó el límite de 1000 ms.
- Se evitó presentar resultados inventados cuando una herramienta no había sido
  ejecutada todavía.
- Se agregó una conclusión de **aprobado con observaciones** para el asistente
  de IA, porque hubo un riesgo medio en el caso de devoluciones.
- Se separó claramente la evidencia técnica de las recomendaciones de mejora.

### Riesgos identificados al usar IA

Al usar IA como apoyo, se identificaron estos riesgos:

- La IA puede redactar respuestas que suenan correctas, pero no siempre están
  respaldadas por evidencia.
- Puede resumir métricas de forma incorrecta si no se comparan con la salida
  real de las herramientas.
- Puede generar documentación demasiado general si no se le da contexto del
  proyecto.
- Puede proponer conclusiones positivas aunque los datos indiquen un fallo.

### Conclusión sobre el uso de IA

La IA fue útil como apoyo para organizar, redactar y explicar el trabajo de QA.
Sin embargo, la revisión humana fue necesaria para validar métricas, corregir
conclusiones y asegurar que la documentación coincidiera con la evidencia real.

Conclusión: **la IA ayuda, pero no reemplaza el criterio QA**.
