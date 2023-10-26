import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  
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
