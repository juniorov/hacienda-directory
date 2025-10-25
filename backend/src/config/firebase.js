import { cert, initializeApp} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar configuración de Firebase
const serviceAccount = JSON.parse(
    readFileSync(join(__dirname, '../../service-account-key.json'), 'utf8')
);

// Inicializar Firebase Admin
const app = initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore(app);

db.settings({
    ignoreUndefinedProperties: true
});

export { db };
export default app;