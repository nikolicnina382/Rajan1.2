import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ponuda } from '../ponuda';
import { Subscription } from 'rxjs';
import { PonudaService } from '../services/ponuda.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-li',
  templateUrl: './add-li.component.html',
  styleUrls: ['./add-li.component.css']
})
export class AddLiComponent implements OnInit, OnDestroy{

  
  loadedPosts: Ponuda[] = [];
  isFetching = false;
  error: any;
  private errorSub!: Subscription;

  constructor(private todoService: PonudaService, private http: HttpClient, private authService: AuthService){}


  ngOnInit(): void {
    this.errorSub = this.todoService.error.subscribe((errorMessage)=>{
      this.error = errorMessage ? errorMessage :null;
    });
    this.isFetching =true;
    this.todoService.fetchPosts().subscribe({
      next: (posts) => {
        this.isFetching =false;
        this.loadedPosts = posts;
      },
      error: (error) => {
        console.log('ERROR=', error);
        this.isFetching = false;
        this.loadedPosts = error.message;
      },
    });

    this.userSub = this.authService.user.subscribe(user => {
         this.isAuthenticated = !!user;
        console.log(!user);
          console.log(!!user);
        });
  }

  onCreatePost(postData: Ponuda) {
    this.todoService.createAndStorePost(postData.id, postData.list );
  } 


  onClearPosts() {
    this.todoService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  isAuthenticated = false;
  private userSub!: Subscription;


  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
