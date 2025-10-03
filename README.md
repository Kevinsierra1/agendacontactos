# Sistema de Gestión de Compañías y Sucursales

Sistema web modular para la administración de compañías, sucursales y su distribución geográfica (países, regiones y ciudades).

## 📋 Descripción

Aplicación desarrollada con componentes web nativos (Web Components) y Bootstrap 5 que permite gestionar la información de compañías y sus sucursales a través de una estructura geográfica jerárquica.

## 🚀 Características

- **Gestión de ubicaciones geográficas**: Países, regiones y ciudades
- **Gestión de compañías**: Administración de empresas
- **Gestión de sucursales**: Control de las sedes de cada compañía
- **Arquitectura modular**: Componentes web reutilizables
- **Interfaz responsiva**: Diseñada con Bootstrap 5
- **API REST**: Base de datos JSON para persistencia de datos

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura base
- **JavaScript ES6+**: Módulos y Web Components
- **Bootstrap 5**: Framework CSS para diseño responsivo
- **JSON Server**: API REST simulada con `db.json`

## 📁 Estructura del Proyecto

```
proyecto/
├── index.html
├── app.js
├── db.json
├── css/
│   └── bootstrap/
│       └── bootstrap.css
├── js/
│   └── bootstrap/
│       └── bootstrap.bundle.js
└── App/
    └── Components/
        ├── navMenu/
        │   └── navMenu.js
        ├── countries/
        │   └── countryComponent.js
        ├── regions/
        │   └── regionComponent.js
        ├── cities/
        │   └── citiesComponents.js
        ├── companies/
        │   └── companyComponent.js
        └── branches/
            └── brancComponenet.js
```

## 🔧 Instalación

1. **Clonar el repositorio**

bash

```bash
git clone [url-del-repositorio]
cd [nombre-del-proyecto]
```

1. **Instalar JSON Server** (para la API REST)

bash

```bash
npm install -g json-server
```

1. **Iniciar el servidor JSON**

bash

```bash
json-server --watch db.json --port 3000
```

1. **Servir la aplicación**

Puedes usar cualquier servidor local, por ejemplo:

Con Python 3:

bash

```bash
python -m http.server 8000
```

Con Node.js (http-server):

bash

```bash
npx http-server -p 8000
```

Con VS Code: Usa la extensión "Live Server"

1. **Abrir en el navegador**

```
http://localhost:8000
```

## 📊 Estructura de Datos (db.json)

El archivo `db.json` contiene tres colecciones principales:

- **paises**: Almacena información de países
- **companias**: Almacena información de compañías
- **sucursales**: Almacena información de sucursales

## 🎯 Uso

1. Accede a la aplicación a través del navegador
2. Utiliza el menú de navegación para acceder a los diferentes módulos
3. Gestiona países, regiones, ciudades, compañías y sucursales según tus necesidades
4. Los datos se almacenan automáticamente en el servidor JSON

## 🧩 Componentes

La aplicación está construida con Web Components personalizados:

- `<nav-menu>`: Menú de navegación principal
- Componentes de países, regiones y ciudades para gestión geográfica
- Componentes de compañías y sucursales para gestión empresarial

## 📝 Notas

- Asegúrate de que JSON Server esté ejecutándose antes de usar la aplicación
- La aplicación utiliza ES6 Modules, requiere un servidor web para funcionar correctamente
- No se puede abrir directamente el archivo HTML en el navegador debido a CORS

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request