import { useIOTStore } from '@/stores/iot';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { FIREBASE_CONFIG, IOT_INTERVAL_TIME } from '@/configs/iotConfig';
import { createGPSEntity, removeGPSEntity, updateGPSEntity } from '@/DTP_3D/module/iot/gps';

function initFirebase() {
  //console.log('InnitFirebase');
  const IOTStore = useIOTStore();
  IOTStore.app = initializeApp(FIREBASE_CONFIG);
  IOTStore.db = getFirestore(IOTStore.app);
  //console.log(' IOTStore.app', IOTStore.app);
  //console.log(' IOTStore.db', IOTStore.db);
}

async function getGPSPoint() {
  const IOTStore = useIOTStore();
  const col = collection(IOTStore.db, 'location');
  const snapshot = await getDocs(col);
  const rowList = snapshot.docs.map((doc) => doc.data());
  if (rowList.length > 0)
    return { lat: rowList[0]?.latitude, lng: rowList[0]?.longitude, height: 0 };
  return null;
}
async function visualGPS() {
  const point = await getGPSPoint();
  const IOTStore = useIOTStore();
  if (!IOTStore.gps_entity) {
    IOTStore.gps_entity = await createGPSEntity(point);
  } else {
    updateGPSEntity(IOTStore.gps_entity, point);
  }
  console.log('GPS_POINT: ', point);
}
function turnOnGPS() {
  console.log('turn on');
  const IOTStore = useIOTStore();
  IOTStore.isTrackingGPS = true;
  if (IOTStore.isInitFirebase) initFirebase();
  IOTStore.intervalId = setInterval(visualGPS, IOT_INTERVAL_TIME);
}
function turnOffGPS() {
  console.log('turn OFF');
  const IOTStore = useIOTStore();
  if (IOTStore.intervalId) clearInterval(IOTStore.intervalId);
  if (IOTStore.gps_entity) removeGPSEntity(IOTStore.gps_entity);
  IOTStore.gps_entity = null;
  IOTStore.isTrackingGPS = false;
}

export function trackingGPS() {
  const IOTStore = useIOTStore();
  //console.log(IOTStore.isTrackingGPS);
  if (IOTStore.isTrackingGPS) turnOffGPS();
  else turnOnGPS();
}
