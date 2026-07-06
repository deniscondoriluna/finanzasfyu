# Sistema de Pagos NYU - Frontend

## Descripción

Frontend desarrollado en Angular para el proyecto *Sistema de Pagos NYU*, una pasarela académica de pagos encargada de centralizar y gestionar pagos provenientes de distintos sistemas universitarios como Matrícula, Biblioteca, Residencia y otros servicios institucionales.

La aplicación permite:

- Consultar órdenes de pago mediante un identificador único (referenceId).
- Seleccionar un medio de pago.
- Procesar pagos simulados.
- Visualizar comprobantes de pago.
- Gestionar auditoría y administración de pagos.
- Integrarse con el backend desarrollado en NestJS mediante API REST.
- Utilizar autenticación basada en JWT para operaciones protegidas.

---

# Tecnologías Utilizadas

- Angular 17
- TypeScript
- Bootstrap
- RxJS
- Angular Router
- Angular Forms (Reactive Forms)
- JWT Authentication
- REST API

---

# Arquitectura General

text
Frontend Angular ---> REST API ---> Backend NestJS ---> MySQL


---

# Instalación

## 1. Clonar repositorio

bash
git clone https://github.com/LukasTorr/Sistema_pagos_uni.git
cd Sistema_pagos_uni/frontend


## 2. Instalar dependencias

bash
npm install


## 3. Configurar entorno

Verificar el archivo:

text
src/environments/environment.ts


Configuración de ejemplo:

ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/v1'
};


Asegurarse de que el backend se encuentre ejecutándose en la misma dirección.

---

# Ejecución del Proyecto

## Modo desarrollo

bash
ng serve


o

bash
npm start


La aplicación quedará disponible en:

text
http://localhost:4200


---

# Funcionalidades Implementadas

## Pasarela de Pago

- Consulta de órdenes por referencia.
- Selección de medio de pago.
- Validación de formularios.
- Confirmación de pago.
- Visualización de comprobante.

## Métodos de Pago

- Tarjeta
- Transferencia Bancaria
- Billetera Digital

## Seguridad

- JWT Authentication
- AuthInterceptor
- Guards de protección
- Manejo de errores HTTP

## Integración Backend

Consumo de endpoints REST:

http
GET    /payments/:referenceId
PATCH  /payments/:referenceId/confirm
POST   /auth/login
POST   /auth/token


---

# Estructura del Proyecto

text
src/
│
├── app/
│   ├── core/
│   │   ├── services/
│   │   ├── interceptors/
│   │   └── guards/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── payment/
│   │   ├── orders/
│   │   ├── reports/
│   │   └── audit/
│   │
│   └── shared/
│
├── assets/
└── environments/


---

# Flujo de Pago

text
Sistema Externo ---> Genera Orden ---> Sistema de Pagos NYU ---> Selección Método de Pago
---> Confirmación ---> Comprobante



---

# Desarrollo

## Generar Componentes

bash
ng generate component nombre-componente


## Generar Servicios

bash
ng generate service nombre-servicio


---

# Equipo frontEnd Ravenclaw
- Kary tudela
- Denis Condori
- Andre Gerra
