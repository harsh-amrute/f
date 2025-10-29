interface VTMConfig {
  base_url?: string;
  url?: string;
  pingurl?: string;
  baseUrl?: string;
}
 
interface VTMSession {
  userId: string;
  username: string;
  sessionId: string;
  createdAt: number;
  roles: string[];
 
}
 
interface VTMUser {
  id: string;
  name: string;
  role: string[];
}
interface Session {
  id : string
}
 
interface Window {
  vtmConfig?: VTMConfig;
  vtm?: any;
  initVTM?: (user: VTMUser) => void;
  terminateVTM: () => void;
}
 