import { Component, OnInit } from '@angular/core';
import { PonudaService } from '../services/ponuda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PIC } from '../pic';
import { Subscription } from 'rxjs';
import { GaleryService } from '../services/galery.service';

@Component({
  selector: 'app-galerija',
  templateUrl: './galerija.component.html',
  styleUrls: ['./galerija.component.css']
})
export class GalerijaComponent implements OnInit{

  zoomed: boolean = false;

  zoomImage() {
    this.zoomed = !this.zoomed;
  }

  

  images: { src: string; alt: string }[] = [
    { src: 'https://picsum.photos/200', alt: 'Nature' },
    { src: 'https://picsum.photos/200', alt: 'Snow' },
    { src: 'https://picsum.photos/200', alt: 'Mountains' },
    { src: 'https://picsum.photos/200', alt: 'Lights' }
  ];

  expandedImage: { src: string; alt: string } | null = null;

  showImage(image: { src: string; alt: string }) {
    this.expandedImage = image;
  }

  closeExpandedView() {
    this.expandedImage = null;
  }


     
  Ime='';
  SearchIme= '';
  SortbyParam = '';
  SortDirection='name';
  p:number =1;
  id:any;
    
constructor(private picService: GaleryService,  private route: ActivatedRoute,
  private router: Router){}

loadedPosts: PIC[] = [];
isFetching = false;
error!: string ;
private errorSub!: Subscription;
ngOnInit(): void {


this.isFetching = true;
this.picService.fetchPosts().subscribe({
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

  this.picService.fetchPosts().subscribe(() => {
    this.loadedPosts.splice(i,1)
console.log(this.loadedPosts)
  });
}

onClearPosts(i:number) {
  this.picService.deletePosts().subscribe(() => {
    this.loadedPosts.splice(i,1) ;
  });
}



}
