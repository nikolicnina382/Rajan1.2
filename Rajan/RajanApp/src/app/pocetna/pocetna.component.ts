import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit{
  name: string= '';
  email: string = '';
  quesetion : string ='';


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


onSend(){
  if(this.name!=='' && this.email!=='' && this.quesetion!==''){
    window.location.href = 'mailto:nikolicnina50@gmail.com?subject=Mail from ' + this.email + '&body=' + this.quesetion;

  }

}
}
