# Clocky ⏰

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Clocky es una aplicación web ligera y fácil de usar para el control de horas de trabajo, diseñada para ayudarte a llevar un registro preciso de tus jornadas laborales, horas extras y tiempo pendiente.

## Características

- Registro sencillo de horas de entrada y salida
- Cálculo automático de horas trabajadas, extras y pendientes
- Almacenamiento local de datos (no se pierden al actualizar)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/clocky.git
   cd clocky
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecutar pruebas

```bash
npm test
```

## Uso

1. **Configuración Inicial**:
   - Establece tus horas de trabajo diarias y tiempo de descanso

2. **Registra tu jornada**:
   - Selecciona tu hora de entrada y salida
   - La aplicación calculará automáticamente las horas trabajadas

3. **Monitorea tu balance**:
   - Revisa tus horas trabajadas totales
   - Controla tus horas extras acumuladas
   - Lleva registro de horas pendientes

## Jornada Laboral Estándar

- Jornada laboral estándar: 8 horas de trabajo efectivo + 30 minutos de descanso
- Las horas extras se calculan automáticamente cuando excedes la jornada estándar
- Las horas pendientes se acumulan cuando no completas la jornada estándar

## Estructura del Proyecto

```
clocky/
├── business-logic/    # Lógica de negocio
│   ├── hours-setup.js    # Configuración de horas
│   └── work-hours-tracker.js  # Gestión de jornadas
├── persistence/       # Capa de persistencia
│   ├── index.js       # Interfaz de almacenamiento
│   └── local-storage.js # Implementación con localStorage
├── tests/            # Pruebas unitarias
│   ├── hours-setup.test.js
│   └── work-hours-tracker.test.js
├── index.html        # Interfaz principal
├── index.js          # Punto de entrada de la aplicación
└── README.md         # Este archivo
```

## Contribución

Las contribuciones son bienvenidas. Por favor, lee nuestras [pautas de contribución](CONTRIBUTING.md) antes de enviar un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---
