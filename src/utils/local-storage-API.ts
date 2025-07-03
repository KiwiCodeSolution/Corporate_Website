'use client';

export function readLocalStorageData(key: string) {
  return localStorage.getItem(key);
}

export function createLocalStorageData(serializedData: string, key: string) {
  localStorage.setItem(key, serializedData);
}

export function serializeData(unSerializedData) {
  return JSON.stringify(unSerializedData);
}

export function deserializeData(serializedData: string) {
  let deserializedData;

  try {
    deserializedData = JSON.parse(serializedData);
  } catch (err) {
    console.log('ERROR: ', err.message);
    console.log('ERROR CODE: ', err.code);
  }

  return deserializedData;
}

export function removeLocalStorageData(key: string) {
  localStorage.removeItem(key);
}
