import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const db = await openDB('jate', 1);

  const transaction = db.transaction('jate', 'readwrite');
  const obStore = transaction.objectStore('jate');
  
  //return 0 if empty
  const count = (await obStore.get('counter')) || 0;
  count++
  const result = await obStore.put({ id: count, value: content });
  
  await transaction.done;
  
  return result;
};

export const getDb = async () => {
  const db = await openDB('jate', 1);

  const transaction = db.transaction('jate', 'readwrite');
  const obStore = transaction.objectStore('jate');
  
  const result = await obStore.getAll();

  await transaction.done;

  return result.value;
}

initdb();