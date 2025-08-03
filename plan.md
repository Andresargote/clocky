# Clocky - Time Tracker Learning Project Plan

## Objetivo del Proyecto
- Aprender arquitectura de software (hexagonal, capacidades, POO) construyendo un time tracker personal llamado "Clocky"
- Usar HTML y JS puro, enfocándose en aprender y aplicar conceptos arquitectónicos paso a paso
- Método activo de aprendizaje: el usuario propone, la IA actúa como coach evaluando y dando feedback

## Casos de Uso Definidos
1. El usuario selecciona su hora de inicio mediante un select
2. El usuario selecciona su hora de fin mediante un select
3. El usuario cierra la sesión de trabajo con un botón de confirmación
4. Si la sesión es menor a 8h, se calcula "deuda" de horas; si es mayor, se genera crédito
5. El crédito se descuenta cuando el usuario hace menos de 8h, o puede resetearlo
6. El usuario puede configurar horas efectivas y de comida, afectando el cálculo de jornada
7. Se suman las horas trabajadas durante la semana
8. Todo se registra en localStorage

## Arquitectura Definida
- **Arquitectura en 3 capas:**
  - Capa 1: Interfaz (HTML/DOM) - donde el usuario interactúa
  - Capa 2: Lógica de Negocio - casos de uso, validaciones, cálculos
  - Capa 3: Persistencia - métodos para guardar/obtener del localStorage

## Estructura de Archivos
```
/
├── index.html
├── persistence/
│   └── local-storage.js
└── business-logic/
    └── hours-configuration.js
```

## Conceptos Arquitectónicos Aplicados
- ✅ **Arquitectura en Capas** - separación clara de responsabilidades
- ✅ **Principio de Inversión de Dependencias** - capas superiores no conocen detalles de implementación
- ✅ **Encapsulación** - "hacia fuera no tienen por qué saber"
- ✅ **Contratos entre capas** - métodos con responsabilidades específicas
- ✅ **Patrón Strategy + Factory** - múltiples implementaciones de persistencia

## Estado Actual
- [x] Casos de uso definidos y validados
- [x] Arquitectura en capas diseñada
- [x] Estructura de archivos definida
- [ ] Implementar primer caso de uso: configuración de horas de trabajo y comida (solo enteros)

## Próximos Pasos
1. Crear estructura básica de archivos
2. Implementar `local-storage.js` con métodos genéricos (save, get)
3. Implementar `hours-configuration.js` con validaciones
4. Crear `index.html` con interfaz básica
5. Conectar las capas y probar el primer caso de uso

## Notas de Aprendizaje
- Usuario prefiere método activo: propone, recibe feedback
- Enfoque paso a paso en conceptos arquitectónicos
- Empezar sencillo, luego evolucionar
- Validaciones: solo números enteros para horas (1-24)
