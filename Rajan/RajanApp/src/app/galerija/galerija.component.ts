import { Component, OnInit } from '@angular/core';

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

  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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

}
