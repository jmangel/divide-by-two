import { openDB } from 'idb';

const dbName = 'song-scaler'

const storeNames = [
  'songs',
  'settings',
]

export async function openDb() {
  return await openDB(dbName, 5, {
    upgrade(db, _oldVersion, _newVersion, _transaction) {
      storeNames.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) db.createObjectStore(storeName)
      })
    }
  });
}