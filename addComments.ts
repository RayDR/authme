import fs from 'fs';
import path from 'path';

// Ruta del directorio 'src'
const srcDir = path.join(__dirname, 'src');

// Función para agregar los comentarios al principio del archivo
const addCommentToFile = (filePath: string) => {
  // Verificar si es un archivo TypeScript
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    const fileName = path.basename(filePath);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Verificar si ya existen comentarios al principio (usando un patrón que podría variar según el archivo)
    const commentPattern = /^\/\*[\s\S]*?\*\//; // Patrón para comentarios multilínea
    if (commentPattern.test(fileContent)) {
      console.log(`Comentarios ya presentes en: ${filePath}`);
      return; // Si ya tiene comentarios, no hacer nada
    }

    // Información para los comentarios
    const fileStats = fs.statSync(filePath);
    const lastModifiedDate = new Date(fileStats.mtime).toLocaleDateString();
    const version = '1.0.0'; // Aquí puedes usar una versión dinámica si lo prefieres

    // Bloque de comentario que se va a agregar
    const comment = `/*
 * Filename: ${fileName}
 * Version: ${version}
 * Last modified: ${lastModifiedDate}
 * Description: [Brief overview of the file]
 */

`;

    // Agregar el comentario al principio del archivo
    const newContent = comment + fileContent;
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Comentarios agregados a: ${filePath}`);
  }
};

// Función para recorrer todos los archivos en el directorio 'src' y subdirectorios
const traverseDir = (dirPath: string) => {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);

    // Si es un directorio, recorrerlo recursivamente
    if (fs.statSync(filePath).isDirectory()) {
      traverseDir(filePath);
    } else {
      // Si es un archivo, agregar comentarios
      addCommentToFile(filePath);
    }
  });
};

// Ejecutar la función en el directorio 'src'
traverseDir(srcDir);
