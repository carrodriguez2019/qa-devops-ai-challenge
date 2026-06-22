# Plan de pruebas

## Objetivo

Validar que cada cambio propuesto para QA Store cumpla criterios mínimos de
calidad, seguridad y trazabilidad antes de integrarse en la rama `main`.

## Alcance

Este plan cubre:

- Pruebas automatizadas funcionales incluidas en `tests/`.
- Validación de secretos expuestos en el historial del repositorio.
- Conservación de reportes como artefactos de GitHub Actions.
- Pruebas de performance que se incorporarán con K6 en la parte 4 del reto.

## Estrategia de ejecución

El workflow `.github/workflows/qa-ci-pipeline.yml` se ejecuta automáticamente
en cada Pull Request dirigido a `main`. El pipeline ejecuta las pruebas y el
análisis de secretos en jobs independientes, publica la evidencia y finalmente
evalúa el resultado consolidado.

Para reproducir las pruebas automatizadas de forma local:

```bash
python -m unittest discover -s tests -v
```

## Quality Gates definidos

Un Pull Request se considera **aprobado** únicamente cuando cumple todos los
gates aplicables:

| Gate | Criterio de aceptación | Evidencia | Estado en CI |
| --- | --- | --- | --- |
| Pruebas automatizadas | 100 % de las pruebas deben finalizar correctamente; no se permiten pruebas fallidas ni errores de ejecución. | Artefacto `automated-test-report` con `test-results.txt`. | Activo |
| Secretos expuestos | Gitleaks no debe detectar contraseñas, tokens, claves privadas ni otros secretos en el repositorio o su historial. | Resultado del job `Secret scan`. | Activo |
| Evidencia del PR | El reporte de pruebas debe generarse y publicarse como artefacto. La ausencia del archivo hace fallar el job. | Artefacto descargable desde la ejecución de GitHub Actions, retenido durante 14 días. | Activo |
| Tasa de errores de performance | La métrica `http_req_failed` debe ser menor al 1 %. | Resumen y salida de K6. | Se activará en la parte 4 |
| Tiempo de respuesta | El promedio de `http_req_duration` debe ser menor a 500 ms y el percentil 95 menor a 1.000 ms. | Resumen y salida de K6. | Se activará en la parte 4 |

Los umbrales de performance se documentan desde ahora para evitar que el
criterio se modifique después de observar los resultados. Hasta que el script
de K6 sea incorporado, esos dos gates no participan en la decisión automática
del pipeline.

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
