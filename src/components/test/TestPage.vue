<template>Hi</template>
<script setup>
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyBoT9F9Y6FulzOtJ23zlWbJRz3ps98KOUE',
  authDomain: 'tracking-location-5d973.firebaseapp.com',
  projectId: 'tracking-location-5d973',
  storageBucket: 'tracking-location-5d973.appspot.com',
  messagingSenderId: '1084050160983',
  appId: '1:1084050160983:web:9f3fe7a7e13aa4cae31212',
  measurementId: 'G-7B1ZLQ3VRD',
};

// Khởi tạo Firebase với cấu hình
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Get a list of cities from your database

async function getGPS() {
  console.log('db', db);
  const col = collection(db, 'location');
  const snapshot = await getDocs(col);
  const rowList = snapshot.docs.map((doc) => doc.data());
  console.log('rowList', rowList);
  const point = { lat: rowList[0].latitude, lng: rowList[0].longitude };
  console.log(point);
}
setInterval(getGPS, 1000);
</script>
