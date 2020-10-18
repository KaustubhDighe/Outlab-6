import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

export interface FormData {
  name: string;
  email: string;
  feedback : string;
  comment: string;
}

@Injectable()
export class GetPostService {
  constructor(private http: HttpClient) {}

  getUrl = 'https://cs251-outlab-6.herokuapp.com/initial_values/';
  postUrl = 'https://cs251-outlab-6.herokuapp.com/add_new_feedback/';

  getFormData():Observable<FormData> {
    return this.http.get<FormData>(this.getUrl);
  }

  postForm(formData: FormData): Observable<FormData>{
    const fd = JSON.stringify(formData);
    console.log(fd);
    return this.http.post<FormData>(this.postUrl,fd).pipe(
         catchError((err) => {
           console.error(err);
           throw err;
         }
    ));
  }

}

