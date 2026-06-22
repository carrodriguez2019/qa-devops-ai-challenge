# Reto 5: DevOps, Calidad Avanzada e Inteligencia Artificial Aplicada en QA práctico

## Objetivo del proyecto

Construir un flujo completo de calidad para una aplicación web o API, aplicando
buenas prácticas de control de versiones, automatización en CI/CD, quality
gates, pruebas de performance, accesibilidad y análisis asistido con
inteligencia artificial. El proyecto automatiza validaciones con GitHub Actions,
genera evidencias y documenta los hallazgos como parte de un portafolio QA.

## Herramientas utilizadas

- **Control de versiones:** Git y GitHub.
- **Integración continua:** GitHub Actions.
- **Automatización de pruebas:** Python y `unittest`.
- **Seguridad:** Gitleaks.
- **Pruebas de performance:** K6 y Apache JMeter.
- **Análisis de calidad:** Quality Gates.
- **Inteligencia artificial:** herramientas de IA para documentación y análisis.

## Cómo ejecutar las pruebas

Se requiere Python 3.12 o una versión compatible. Desde la raíz del repositorio,
ejecutar:

```bash
python -m unittest discover -s tests -v
```

El workflow de GitHub Actions ejecuta estas pruebas automáticamente en cada
Pull Request dirigido a `main`, analiza secretos expuestos y publica el reporte
como artefacto.

## Quality Gates definidos

Cada Pull Request hacia `main` debe cumplir los siguientes criterios:

- El 100 % de las pruebas automatizadas debe pasar.
- Gitleaks no debe detectar secretos expuestos.
- El reporte de pruebas debe publicarse como artefacto del pipeline.
- En las pruebas de performance, la tasa de errores debe ser menor al 1 %, el
  tiempo promedio de respuesta menor a 500 ms y el percentil 95 menor a
  1.000 ms. Estos umbrales se automatizarán al incorporar K6 en la parte 4.
- El job consolidado `Quality Gate` debe finalizar correctamente.

La definición completa, las evidencias esperadas y el procedimiento ante
fallos se encuentran en [docs/test-plan.md](docs/test-plan.md).
