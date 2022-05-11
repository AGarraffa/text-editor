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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  console.log('Running putDb')

  // establishes contact with the db
  const jateDb = await openDB('jate', 1);

  //creates a transaction
  const tx = jateDb.transaction('jate', 'readwrite');

  // opens the object store
  const store = tx.objectStore('jate');

  // updates the data
  const request = store.put({ text: content});

  // confirm request
  const result = await request;
  
  console.log('Data updated', result);
  
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  console.error('Running getDb');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;

  console.log('result.value', result);
  return result;

};

// starts the db
initdb();
