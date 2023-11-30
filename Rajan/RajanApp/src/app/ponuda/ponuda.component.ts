import { Component, OnInit } from '@angular/core';
import { PonudaService } from '../services/ponuda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ponuda } from '../ponuda';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ponuda',
  templateUrl: './ponuda.component.html',
  styleUrls: ['./ponuda.component.css']
})
export class PonudaComponent implements OnInit{

  Ime='';
  SearchIme= '';
  SortbyParam = '';
  SortDirection='name';
  p:number =1;
  id:any;
    
constructor(private dataService: PonudaService,  private route: ActivatedRoute,
  private router: Router){}

loadedPosts: Ponuda[] = [];
isFetching = false;
error!: string ;
private errorSub!: Subscription;
ngOnInit(): void {


this.isFetching = true;
this.dataService.fetchPosts().subscribe({
  next: (posts) => {
    this.isFetching = false;
    this.loadedPosts = posts;
  },
  error: (error) => {
    console.log('ERROR =', error);
    this.isFetching = false;
    this.error = error.message;
  },
});
console.log("tt");
      console.log(this.loadedPosts.length);
}


deleteItem(i:number) {

  this.dataService.fetchPosts().subscribe(() => {
    this.loadedPosts.splice(i,1)
console.log(this.loadedPosts)
  });
}

onClearPosts(i:number) {
  this.dataService.deletePosts().subscribe(() => {
    this.loadedPosts.splice(i,1) ;
  });
}








}
