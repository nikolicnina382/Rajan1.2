import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Ponuda } from '../ponuda';

@Injectable({
  providedIn: 'root'
})
export class PonudaService {

  currentPost!: Ponuda;

  items!: Observable<Ponuda[]>;
    error = new Subject<string>();
  
    constructor(private http: HttpClient, private router:Router) {}
  
    createAndStorePost(id:string, list:any ) {
      const postData: Ponuda = {id:id, list:list };
      this.http
        .post<{ name: string }>(
          'https://rajanwood-c82cc-default-rtdb.europe-west1.firebasedatabase.app/ponuda.json',
          postData,
          {
            observe: 'response',
          }
        )
        .subscribe({
          next: (responseData) => console.log(responseData),
          error: (error) => this.error.next(error.message),
        });

    }
  
    fetchPosts() {
      let searchParams = new HttpParams();
      searchParams = searchParams.append('print', 'pretty');
      searchParams = searchParams.append('custom', 'key');
      return this.http
        .get<{ [key: string]: Ponuda }>(
          'https://rajanwood-c82cc-default-rtdb.europe-west1.firebasedatabase.app/ponuda.json',
          {
            headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
            params: searchParams,
            responseType: 'json',
          }
        )
        .pipe(
          map((responseData) => {
            console.log('ovo je response data iz servisa', responseData);
            const postsArray: Ponuda[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                postsArray.push({ ...responseData[key], id: key });
              }
            }
            return postsArray;
          }),
          catchError((errorRes) => {
            return throwError(() => Error(errorRes));
          })
        );
    }
  
  
    deletePosts() {
      return this.http
        .delete( 'https://rajanwood-c82cc-default-rtdb.europe-west1.firebasedatabase.app/ponuda.json', {
          observe: 'events',
          responseType: 'text',
        })
        .pipe(
          tap((event) => {
            console.log(event);
            if (event.type === HttpEventType.Sent) {
            }
            if (event.type === HttpEventType.Response) {
              console.log(event.body);
            }
          })
        );
    }

    

}
