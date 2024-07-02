import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventModel} from "../_models/event.model";

export class EventService {

  private BASE_URL: string = environment.apiUrl + 'coupon/'

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.BASE_URL + 'all');
  }

  add(item: EventModel): Observable<Object> {
    return this.http.post<any>(this.BASE_URL + 'add', item);
  }
}
