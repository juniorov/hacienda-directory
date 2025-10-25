import { db } from '../config/firebase.js';

export class FirebaseService {
    constructor(collectionName) {
        this.collection = db.collection(collectionName);
    }

    async create(document) {
        try {
            const docRef = await this.collection.add({
                ...document,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                timestamp: new Date()
            });

            return {
                id: docRef.id,
                ...document
            };
        }catch(error) {
            console.log('Error al crear documento en Firestore: ', error);
            throw new Error(`No se pudo crear el documento: ${error.message}`);
        }
    }

    async getAll(max = 10, orderByIn = 'timestamp', order = 'desc') {
        try {
            const snapshot = await this.collection
                .orderBy(orderByIn, order)
                .limit(max)
                .get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch(error) {
            console.log('Error al obtener documentos de Firestore: ', error);
            throw new Error(`No se pudieron obtener los documentos: ${error.message}`);
        }
    }

    async getById(id) {
        try{
            const doc = await this.collection.doc(id).get();

            if(!doc.exists){
                return null;
            }

            return {
                id: doc.id,
                ...doc.data()
            };
        }catch(error) {
            console.log('Error al obtener documento de Firestore: ', error);
            throw new Error(`No se pudo obtener el documento: ${error.message}`);
        }
    }

    async getByDNI(dni, field = 'dni') {
        try {
            const querySnapshot = await this.collection
                .where(field, '==', dni)
                .limit(1)
                .get();

            if (querySnapshot.empty) {
                return null;
            }

            // Asumiendo que el DNI es único, retornamos el primer documento encontrado
            const doc = querySnapshot.docs[0];

            return {
                id: doc.id,
                ...doc.data()
            };
        } catch (error) {
            console.log('Error al obtener documento por DNI de Firestore: ', error);
            throw new Error(`No se pudo obtener el documento por DNI: ${error.message}`);
        }
    }

    async updateByDNI(field, value, newData) {
        try {
            const snapshot = await this.collection
                .where(field, '==', value)
                .limit(1)
                .get();

            if (snapshot.empty) {
                return null;
            }

            const doc = snapshot.docs[0];
            await this.collection.doc(doc.id).update(newData);

            return doc.id;
        } catch (error) {
            console.log('Error al actualizar documento en Firestore: ', error);
            throw new Error(`No se pudo actualizar el documento: ${error.message}`);
        }
    }
}

// Instancia para la colección 'requests'
export const requestsService = new FirebaseService('taxpayers');