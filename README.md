# Reto 5: DevOps, Calidad Avanzada e Inteligencia Artificial Aplicada en QA práctico

## Objetivo del proyecto

Construir un flujo completo de calidad para una aplicación web o API, aplicando
buenas prácticas de control de versiones, automatización en CI/CD, quality
gates, pruebas de performance, accesibilidad y análisis asistido con
inteligencia artificial.

El proyecto automatiza validaciones con GitHub Actions, genera evidencias y
documenta los hallazgos como parte de un portafolio QA.

## Herramientas utilizadas

- **Control de versiones:** Git y GitHub.
- **Integración continua:** GitHub Actions.
- **Automatización de pruebas:** Python y `unittest`.
- **Seguridad:** Gitleaks.
- **Pruebas de performance:** K6 y Apache JMeter.
- **Análisis de calidad:** Quality Gates.
- **Inteligencia artificial:** herramientas de IA para documentación y análisis.

## Cómo ejecutar las pruebas automatizadas

Se requiere Python 3.12 o una versión compatible. Desde la raíz del repositorio,
ejecutar:

```bash
python -m unittest discover -s tests -v
```

El workflow de GitHub Actions ejecuta estas pruebas automáticamente en cada
Pull Request dirigido a `main`, analiza secretos expuestos y publica el reporte
como artefacto.

## Cómo ejecutar la prueba de performance con K6

La prueba de performance está en `performance/k6/api-load-test.js`. Para
ejecutarla localmente:

```bash
k6 run --summary-export performance/k6/results/k6-summary.json performance/k6/api-load-test.js
```

Esta prueba usa 5 usuarios virtuales durante 30 segundos y valida que el
endpoint responda correctamente. La evidencia se documenta en
[docs/performance-k6.md](docs/performance-k6.md).

## Cómo ejecutar la prueba de performance con JMeter

El escenario básico de JMeter está en `performance/jmeter/basic-api-test.jmx`.
Para ejecutarlo en modo consola:

```bash
jmeter -n -t performance/jmeter/basic-api-test.jmx -l performance/jmeter/results/jmeter-results.jtl -e -o performance/jmeter/results/html-report
```

Esta prueba usa 5 usuarios virtuales, un ramp-up de 10 segundos y 3 iteraciones
por usuario. La evidencia se documenta en
[docs/performance-jmeter.md](docs/performance-jmeter.md).

## Quality Gates definidos

Cada Pull Request hacia `main` debe cumplir los siguientes criterios:

- El 100 % de las pruebas automatizadas debe pasar.
- Gitleaks no debe detectar secretos expuestos.
- El reporte de pruebas debe publicarse como artefacto del pipeline.
- En las pruebas de performance con K6, la tasa de errores debe ser menor al
  1 %, el tiempo promedio de respuesta menor a 500 ms y el percentil 95 menor a
  1000 ms.
- En la prueba manual con JMeter, el endpoint debe responder con status `200` y
  tiempo menor a 1000 ms.
- El job consolidado `Quality Gate` debe finalizar correctamente.

La definición completa, las evidencias esperadas y el procedimiento ante fallos
se encuentran en [docs/test-plan.md](docs/test-plan.md).

## Análisis de pruebas para IA

El proyecto incluye una matriz básica para validar respuestas generadas por un
asistente virtual de una tienda en línea. El análisis se encuentra en
[docs/ai-analysis.md](docs/ai-analysis.md).

El mismo documento incluye una sección de uso responsable de IA, donde se
describe qué contenido fue generado con apoyo de IA, qué fue revisado
manualmente y qué ajustes se realizaron.
