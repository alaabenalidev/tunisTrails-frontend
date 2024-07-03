// user.model.ts
import {Role} from './Role.enum';

export interface User {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
  password: string;
  enabled:boolean;
  accountLocked:boolean;
  role: Role; // Use Role enum
}
