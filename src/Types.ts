export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

export interface Task {
  id: number;
  name: string;
  description: string;
  type: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface Route {
  id: number
  name: string
  description: string
  start_address: string
  end_address: string
  status: string
  start_position: PointLocation
  end_position: PointLocation
  points: PointLocation[]
}

export interface PointLocation {
  latitude: number;
  longitude: number;
  height?: number;
  index?: number;
}
export type ProtectTask = Task & {
  route: Route;
}