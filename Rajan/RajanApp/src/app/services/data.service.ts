import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { TODO } from '../todo';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentPost!: TODO;

  items!: Observable<TODO[]>;
    error = new Subject<string>();
  
    constructor(private http: HttpClient, private router:Router) {}
  
    createAndStorePost(id:string, name:any, grad: any, slika:any ) {
      const postData: TODO = {id:id, name:name, grad:grad, slika:slika };
      this.http
        .post<{ name: string }>(
          'https://rajan-e8b99-default-rtdb.firebaseio.com/posts.json',
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
        .get<{ [key: string]: TODO }>(
          'https://rajan-e8b99-default-rtdb.firebaseio.com/posts.json',
          {
            headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
            params: searchParams,
            responseType: 'json',
          }
        )
        .pipe(
          map((responseData) => {
            console.log('ovo je response data iz servisa', responseData);
            const postsArray: TODO[] = [];
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
        .delete('https://rajan-e8b99-default-rtdb.firebaseio.com/posts.json', {
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
