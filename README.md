# AuthMe - Authentication Middleware

AuthMe es un middleware de autenticación modular y escalable diseñado para autenticar aplicaciones a través de la creación de tokens JWT. El sistema permite la integración sencilla con APIs, proporciona logs de autenticación y es completamente compatible con aplicaciones móviles, web y otros dispositivos.

## Estructura del Proyecto

La estructura del proyecto sigue una organización clara para facilitar la escalabilidad y el mantenimiento.

```
.
├── src/
│   ├── config/              # Archivos de configuración (base de datos, etc.)
│   ├── middlewares/         # Middlewares, como el de autenticación
│   ├── models/              # Modelos de Mongoose para la base de datos
│   ├── services/            # Lógica para servicios como la creación de tokens
│   ├── types/               # Tipos y definiciones personalizadas de TypeScript
│   └── index.ts             # Entrada principal del proyecto
├── dist/                    # Carpeta donde se compila el código TypeScript
├── .dockerignore            # Archivos para ignorar al crear imagen Docker
├── .gitignore               # Archivos para ignorar en el control de versiones
├── docker-compose.yml       # Definición de los contenedores de Docker
├── tsconfig.json            # Configuración de TypeScript
├── package.json             # Dependencias y scripts del proyecto
└── README.md                # Documentación del proyecto
```

## Getting Started

Para comenzar a trabajar con el proyecto, sigue los siguientes pasos:

### Requisitos Previos

- **Node.js** (versión >= 14.x)
- **Docker** (opcional, para base de datos MongoDB)

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/authme.git
   cd authme
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. (Opcional) Si estás utilizando Docker para MongoDB, ejecuta:

   ```bash
   docker-compose up
   ```

### Configuración de la Base de Datos

Si estás utilizando MongoDB en Docker, asegúrate de que la base de datos esté corriendo. El contenedor de MongoDB se conecta a la aplicación mediante `localhost:27017` y está configurado con el nombre de usuario `admin` y la contraseña `password123`.

### Comenzar la Aplicación

Para iniciar el servidor de autenticación:

```bash
npm run dev
```

Esto compilará y ejecutará el proyecto en modo de desarrollo, escuchando en el puerto especificado.

---

## Scripts de NPM

El proyecto incluye los siguientes scripts de NPM que puedes utilizar durante el desarrollo:

### `npm run dev`

Inicia el servidor en modo desarrollo con `ts-node`.

### `npm run format`

Este comando formatea todo el código fuente utilizando **Prettier** para garantizar que el código tenga una estructura coherente y legible.

```bash
npm run format
```

### `npm run addComments`

Agrega comentarios automáticos a los archivos del proyecto. Este script recorre el directorio `src` y agrega los comentarios estándar (incluyendo derechos reservados, versión, descripción, etc.) a cada archivo.

```bash
npm run addComments
```

---

## Extensiones de Proyecto

### Middleware de Autenticación (`authMiddleware.ts`)

El middleware de autenticación verifica los tokens JWT proporcionados por las aplicaciones cliente (móviles, web, etc.). Si el token es válido, el middleware agrega la información decodificada del usuario al objeto `req` como `req.user`.

```typescript
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Añade el usuario decodificado al request
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
```

### Base de Datos

La base de datos MongoDB está conectada mediante Mongoose y se utiliza para registrar la información de los tokens generados y sus metadatos, como la IP, dispositivo, y medios de conexión.

```typescript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb://admin:password123@localhost:27017/authme',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error conectando a MongoDB', error);
    process.exit(1);
  }
};
```

---

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. **Forkea el repositorio**
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz un commit (`git commit -am 'Agregada nueva funcionalidad'`)
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un pull request

---

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

### Detalles Adicionales

#### 1. **Formato de Comentarios**

El script `npm run addComments` agrega comentarios estándar a cada archivo de código fuente para mantener la consistencia y la documentación, como:

- **Derechos reservados**
- **Versión del archivo**
- **Descripción del archivo**
- **Comentarios sobre funciones o clases importantes**

#### 2. **Código de Calidad**

El proyecto utiliza **Prettier** para garantizar que el código esté formateado correctamente. Puedes configurar Prettier para que se ejecute automáticamente en tu editor, o simplemente puedes ejecutar el script `npm run format` manualmente.
