# Plan de pruebas

## Objetivo

Validar que cada cambio propuesto para QA Store cumpla criterios mínimos de
calidad, seguridad y trazabilidad antes de integrarse en la rama `main`.

## Alcance

Este plan cubre:

- Pruebas automatizadas funcionales incluidas en `tests/`.
- Validación de secretos expuestos en el historial del repositorio.
- Conservación de reportes como artefactos de GitHub Actions.
- Pruebas de performance con K6.
- Prueba básica de performance con JMeter.

## Estrategia de ejecución

El workflow `.github/workflows/qa-ci-pipeline.yml` se ejecuta automáticamente
en cada Pull Request dirigido a `main`. El pipeline ejecuta las pruebas
automatizadas, el análisis de secretos y la prueba de performance con K6 en
jobs independientes. Al final, el job `Quality Gate` evalúa el resultado
consolidado.

La prueba con JMeter queda documentada como evidencia manual porque se ejecuta
desde Apache JMeter o desde la consola local de quien tenga la herramienta
instalada.

Para reproducir las pruebas automatizadas de forma local:

```bash
python -m unittest discover -s tests -v
```

Para reproducir la prueba de performance con K6:

```bash
k6 run --summary-export performance/k6/results/k6-summary.json performance/k6/api-load-test.js
```

Para reproducir la prueba de performance con JMeter:

```bash
jmeter -n -t performance/jmeter/basic-api-test.jmx -l performance/jmeter/results/jmeter-results.jtl -e -o performance/jmeter/results/html-report
```

## Quality Gates definidos

Un Pull Request se considera **aprobado** únicamente cuando cumple todos los
gates aplicables:

| Gate | Criterio de aceptación | Evidencia | Estado |
| --- | --- | --- | --- |
| Pruebas automatizadas | 100 % de las pruebas deben finalizar correctamente; no se permiten pruebas fallidas ni errores de ejecución. | Artefacto `automated-test-report` con `test-results.txt`. | Activo en CI |
| Secretos expuestos | Gitleaks no debe detectar contraseñas, tokens, claves privadas ni otros secretos en el repositorio o su historial. | Resultado del job `Secret scan`. | Activo en CI |
| Evidencia del PR | El reporte de pruebas debe generarse y publicarse como artefacto. La ausencia del archivo hace fallar el job. | Artefacto descargable desde la ejecución de GitHub Actions, retenido durante 14 días. | Activo en CI |
| Tasa de errores de performance K6 | La métrica `http_req_failed` debe ser menor al 1 %. | Artefacto `k6-performance-report` y salida del job `Performance tests with K6`. | Activo en CI |
| Tiempo de respuesta K6 | El promedio de `http_req_duration` debe ser menor a 500 ms y el percentil 95 menor a 1000 ms. | Artefacto `k6-performance-report` y salida del job `Performance tests with K6`. | Activo en CI |
| Escenario JMeter | El endpoint debe responder HTTP `200` y tardar menos de 1000 ms. | Archivo `.jmx`, resultado `.jtl` y reporte HTML local. | Manual |

Los umbrales de performance de K6 están definidos dentro del script de K6. Si no
se cumplen, K6 termina con error y el `Quality Gate` rechaza el Pull Request.

El escenario de JMeter se conserva como práctica manual para demostrar que el
participante sabe configurar usuarios, ramp-up, iteraciones, assertions y
reporte de resultados.

## Criterio de aprobación del Pull Request

El job final `Quality Gate` debe aparecer en estado exitoso. Para impedir que
se integre código que no cumpla los criterios, la rama `main` debe configurarse
en GitHub con una regla de protección que:

1. Exija un Pull Request antes de hacer merge.
2. Exija el status check `Quality Gate`.
3. Exija que la rama esté actualizada antes del merge.
4. Impida omitir los checks requeridos.

La protección de rama se configura desde **Settings > Branches > Branch
protection rules** y no puede establecerse únicamente desde un archivo del
repositorio.

## Gestión de hallazgos

Cuando un gate falle, el Pull Request queda rechazado hasta corregir la causa:

- Una prueba fallida requiere corregir el código o la prueba y volver a ejecutar
  el pipeline.
- Un secreto detectado debe revocarse, eliminarse del historial cuando
  corresponda y reemplazarse por un secret de GitHub Actions.
- Una métrica de performance fuera del umbral requiere registrar el hallazgo,
  analizar el cuello de botella y repetir la prueba.
- La falta de evidencia requiere corregir la generación o publicación del
  artefacto.
