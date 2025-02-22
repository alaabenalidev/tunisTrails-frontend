import {User} from "../Classes/User";

export interface EventModel {
  idEvent: number
  title: string
  type: string
  ville: string
  image: Blob
  description: string
  startDate: Date
  endDate: Date
  latitude: string
  longitude: string
  maxParticipants: number
  ratingsList: any[]
  commentsList: any[]
  user:User
}
