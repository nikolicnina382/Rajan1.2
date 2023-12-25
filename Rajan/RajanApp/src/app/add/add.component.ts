import { Component, OnDestroy, OnInit } from '@angular/core';
import { TODO } from '../todo';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy{

  
  loadedPosts: TODO[] = [];
  isFetching = false;
  error: any;
  private errorSub!: Subscription;

  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(private todoService: DataService, private http: HttpClient, private authService: AuthService){}


  ngOnInit(): void { 
    this.userSub = this.authService.user.subscribe(user => {
         this.isAuthenticated = !!user;
        console.log(!user);
          console.log(!!user);
        });

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

  }

  onCreatePost(postData: TODO) {
    this.todoService.createAndStorePost(postData.id, postData.name ,postData.grad, postData.slika);
  } 


  onClearPosts() {
    this.todoService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
