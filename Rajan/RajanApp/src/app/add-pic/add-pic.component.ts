import { Component, OnDestroy, OnInit } from '@angular/core';
import { PIC } from '../pic';
import { Subscription, finalize } from 'rxjs';
import { PonudaService } from '../services/ponuda.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GaleryService } from '../services/galery.service';

@Component({
  selector: 'app-add-pic',
  templateUrl: './add-pic.component.html',
  styleUrls: ['./add-pic.component.css']
})
export class AddPicComponent implements OnInit, OnDestroy{


  loadedPosts: PIC[] = [];
  isFetching = false;
  error: any;
  private errorSub!: Subscription;

  constructor(private picService: GaleryService, private http: HttpClient){}


  ngOnInit(): void {
    this.errorSub = this.picService.error.subscribe((errorMessage)=>{
      this.error = errorMessage ? errorMessage :null;
    });
    this.isFetching =true;
    this.picService.fetchPosts().subscribe({
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

  onCreatePost(postData: PIC) {
    this.picService.createAndStorePost(postData.id, postData.slika);
  } 


  onClearPosts() {
    this.picService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }
  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }





  // selectedFile: any;
  // constructor(private http: HttpClient){}
  
  // onFileSelected(event: any){
  //   this.selectedFile = event.target.files[0];
  //   if(this.selectedFile){
  //     console.log(this.selectedFile)
  //   }

  // }
  // onUpload(){
  //   const fd= new FormData();
  //   fd.append('image', this.selectedFile, this.selectedFile.name);
  //   this.http.post('gs://rajanwood-c82cc.appspot.com/uploadFile',fd)
  //   .subscribe(res=>{
  //     console.log(res);
  //   });

  // }





}
