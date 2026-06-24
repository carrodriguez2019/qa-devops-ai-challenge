# Análisis de pruebas para sistema de IA

## Objetivo

Simular la validación de un asistente virtual basado en IA para una tienda en
línea. El objetivo es revisar si las respuestas generadas son útiles,
coherentes, relevantes y si existe riesgo de alucinaciones.

Este análisis está escrito desde una mirada junior de QA: no se busca demostrar
que el modelo es perfecto, sino practicar cómo probar sus respuestas y cómo
registrar hallazgos de forma ordenada.

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
