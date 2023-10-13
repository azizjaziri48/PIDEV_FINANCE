import { Component, OnInit } from '@angular/core';
import { Support } from 'app/Models/Support';
import { SupportService } from 'app/services/support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

//-------------------------------------------------------------------------------------
Support:Support;
listSupport:any;
Supportupdate:any;
SupportDetails:any;
list:any;
Event:Support; 
url: string | ArrayBuffer;

constructor(private SupportService:SupportService) { 
  this.getAllSupport();
}

  ngOnInit():void {
  //  this.getAllSupport()
    this.Support = {
      id: null,
      nom: null,
      description: null,
      date_publication:null,
      type:null,
      medialink:null
    
     }
     this.Supportupdate = {
      id: null,
      nom: null,
      description: null,
      date_publication:null,
      type:null
     }
  }
  
  getAllSupport() {
    this.SupportService.getAllSupport().subscribe(res => {
      this.listSupport = res;
      
    });
  }
  
  addSupport(){
    this.SupportService.addSupport(this.Support).subscribe(()=> this.getAllSupport());

  }

  deleteSupport(idSupport:number){
    this.SupportService.deleteSupport(idSupport).subscribe(()=>this.getAllSupport() ,res=>{this.listSupport=res});
     }

     edit(Event: any){
      this.Supportupdate = Event;
    }
    getActivitydetails(){
      this.SupportService.getSupport(this.Supportupdate.id).subscribe(res=>{this.SupportDetails=res});
    }
     updateSupport(){
      this.SupportService.updateSupport(this.Supportupdate).subscribe(
        (resp) => {
          console.log(resp);
        },
        (err) => {
          console.log(err);
        }
      );}
      readUrl(event:any) {

        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
      
          reader.onload = (event: ProgressEvent) => {
            this.url = (<FileReader>event.target).result;
          }

          reader.readAsDataURL(event.target.files[0]);
        }
      }
      isImage(link: string): boolean {
        return link.endsWith('.jpg') || link.endsWith('.jpeg') || link.endsWith('.png') || link.endsWith('.webp');
    }
 
   
}
