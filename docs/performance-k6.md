# Evidencia de prueba de performance con K6

## Objetivo

Validar de forma básica que un endpoint público responda correctamente bajo
carga. Esta prueba es sencilla porque está pensada como práctica inicial de QA
performance.

## Herramienta utilizada

- K6
- Endpoint probado: `https://test.k6.io`
- Script: `performance/k6/api-load-test.js`

## Escenario configurado

La prueba usa:

- 5 usuarios virtuales.
- 30 segundos de duración.
- Peticiones HTTP GET al endpoint público.
- Validaciones básicas de status code y tiempo de respuesta.

## Thresholds de aceptación

La prueba se considera aprobada si cumple estos criterios:

| Métrica | Criterio |
| --- | --- |
| `http_req_failed` | Menor al 1 % |
| `http_req_duration` promedio | Menor a 500 ms |
| `http_req_duration` p95 | Menor a 1000 ms |
| `checks` | Al menos 99 % de checks exitosos |

## Comando utilizado

Para ejecutar la prueba localmente:

```bash
k6 run --summary-export performance/k6/results/k6-summary.json performance/k6/api-load-test.js
```

Si se quiere probar otro endpoint sin cambiar el archivo:

```bash
k6 run -e BASE_URL=https://test.k6.io --summary-export performance/k6/results/k6-summary.json performance/k6/api-load-test.js
```

## Resultado obtenido

La prueba se ejecutó localmente el 23 de junio de 2026 con el comando indicado.
El resultado fue exitoso.

Métricas principales:

| Métrica | Resultado | Criterio | Estado |
| --- | --- | --- | --- |
| `checks` | 100.00 % exitosos | Mayor o igual a 99 % | Aprobado |
| `http_req_failed` | 0.00 % | Menor a 1 % | Aprobado |
| `http_req_duration` promedio | 51.58 ms | Menor a 500 ms | Aprobado |
| `http_req_duration` p95 | 75.39 ms | Menor a 1000 ms | Aprobado |
| Iteraciones | 134 | Informativo | Registrado |
| Requests HTTP | 268 | Informativo | Registrado |

Fragmento resumido de consola:

```text
checks................: 100.00% 268 out of 268
http_req_failed.......: 0.00%   0 out of 268
http_req_duration.....: avg=51.58ms p(95)=75.39ms
iterations............: 134
vus...................: 5
```

Además, el pipeline de GitHub Actions guarda el archivo
`performance/k6/results/k6-summary.json` como artefacto llamado
`k6-performance-report`.

## Conclusión

La prueba queda **aprobada** porque no hubo errores HTTP, los checks fueron
exitosos y los tiempos de respuesta estuvieron por debajo de los thresholds
definidos.

Si algún threshold falla, la conclusión es **rechazado** y se debe revisar si el
endpoint está lento, si hay errores HTTP o si la carga configurada es demasiado
alta para el servicio probado.
