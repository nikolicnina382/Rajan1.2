import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TODO } from '../todo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-proces',
  templateUrl: './proces.component.html',
  styleUrls: ['./proces.component.css']
})
export class ProcesComponent implements OnInit{

  
  Ime='';
  SearchIme= '';
  SortbyParam = '';
  SortDirection='name';
  p:number =1;
  id:any;
    
constructor(private dataService: DataService,  private route: ActivatedRoute,
  private router: Router){}

loadedPosts: TODO[] = [];
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
onImeFilter(){
  this.SearchIme = this.Ime;
}
onImeFilterClear(){
  this.SearchIme = '';
  this.Ime = '';
}

onSortDirection(){
  if(this.SortDirection === 'vreme'){
    this.SortDirection ='name';
  } else{
    this.SortDirection = 'vreme';
  }
}

onEdit(){
  this.router.navigate([ 'edit'], {relativeTo: this.route});
}



}
