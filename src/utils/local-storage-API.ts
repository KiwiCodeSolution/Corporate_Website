'use client';

export function readLocalStorageData(key: string) {
  return localStorage.getItem(key);
}

export function createLocalStorageData(serializedData: string, key: string) {
  localStorage.setItem(key, serializedData);
}

export function serializeData(unSerializedData: unknown) {
  return JSON.stringify(unSerializedData);
}

export function deserializeData(serializedData: string) {
  let deserializedData;

  try {
    deserializedData = JSON.parse(serializedData);
  } catch (err) {
    console.error('Failed to parse stored data:', err);
  }

  return deserializedData;
}

export function removeLocalStorageData(key: string) {
  localStorage.removeItem(key);
}
