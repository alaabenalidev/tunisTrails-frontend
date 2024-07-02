import {User} from "../Classes/User";
import {EventModel} from "./event.model";

export interface ReservationModel {
  idReservation: number;
  name: string;

  numberOfParticipants: number;
  adults: number;
  childrens: number;

  reservationTime: number;

  user: User;

  event: EventModel;

}

export interface ReservationAddRequest {
  name: string;
  numberOfParticipants: number;
  adults: number;
  childrens: number;

  reservationTime: number;

  event: number;

}
