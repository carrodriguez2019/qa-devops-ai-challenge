# Evidencia de prueba de performance con JMeter

## Objetivo

Crear un escenario básico en JMeter para consultar un endpoint público y medir
el comportamiento de la respuesta bajo una carga pequeña.

La idea no es hacer una prueba de estrés avanzada, sino practicar cómo se
configura un plan de prueba, cómo se ejecuta y cómo se documentan los
resultados.

## Archivo del escenario

El archivo JMeter se guarda en:

```text
performance/jmeter/basic-api-test.jmx
```

## Escenario configurado

| Elemento | Configuración |
| --- | --- |
| Tipo de flujo | Consulta de una API/página pública |
| Endpoint inicial | `https://test.k6.io/` |
| Endpoint final observado | `https://quickpizza.grafana.com/` |
| Método HTTP | `GET` |
| Usuarios virtuales | 5 |
| Ramp-up | 10 segundos |
| Iteraciones por usuario | 3 |
| Peticiones principales esperadas | 15 |

Durante la ejecución, JMeter siguió redirecciones del endpoint inicial, por eso
el reporte final registró más muestras que las 15 peticiones principales.

## Validaciones configuradas

El plan incluye dos validaciones sencillas:

- El endpoint debe responder con status HTTP `200`.
- La respuesta debe tardar menos de `1000 ms`.

Estas validaciones ayudan a saber si la prueba fue exitosa o si el servicio
falló durante la ejecución.

## Comando utilizado

Desde la raíz del proyecto:

```bash
jmeter -n -t performance/jmeter/basic-api-test.jmx -l performance/jmeter/results/jmeter-results.jtl -e -o performance/jmeter/results/html-report
```

Qué significa cada parte:

- `-n`: ejecuta JMeter sin interfaz gráfica.
- `-t`: indica el archivo `.jmx` que se va a ejecutar.
- `-l`: guarda los resultados en un archivo `.jtl`.
- `-e -o`: genera un reporte HTML.

## Resultados obtenidos

La prueba se ejecutó localmente el 23 de junio de 2026. El reporte HTML fue
generado correctamente en:

```text
performance/jmeter/results/html-report/index.html
```

Métricas principales:

| Métrica | Resultado |
| --- | --- |
| Muestras totales | 45 |
| Errores encontrados | 1 |
| Porcentaje de error | 2.22 % |
| Tiempo promedio de respuesta | 169.02 ms |
| Tiempo mínimo | 22 ms |
| Tiempo máximo | 1963 ms |
| Mediana | 67 ms |
| Percentil 90 | 290.00 ms |
| Percentil 95 | 1199.20 ms |
| Percentil 99 | 1963.00 ms |
| Throughput | 5.50 transacciones/segundo |

## Error encontrado

JMeter reportó 1 error por superar el límite de tiempo configurado:

```text
The operation lasted too long: It took 1,963 milliseconds,
but should not have lasted longer than 1,000 milliseconds.
```

Esto significa que el endpoint respondió con status correcto, pero una de las
respuestas tardó más de lo permitido por la validación de duración.

## Conclusión

La prueba queda **rechazada** porque se encontró 1 error y el porcentaje de
error fue de 2.22 %. Además, una respuesta tardó 1963 ms, superando el límite de
1000 ms configurado en el escenario.

Desde el análisis de QA, este resultado no significa que todo el sistema esté
mal. Significa que se encontró una respuesta lenta puntual y se debe dejar
registrada como hallazgo para revisar si fue un pico aislado, una redirección
lenta o un comportamiento repetible del endpoint.
