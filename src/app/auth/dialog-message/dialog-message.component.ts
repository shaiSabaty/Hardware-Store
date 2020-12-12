import { Component, OnInit, Inject } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent implements OnInit {

  error(){
 this.router.navigate["/login"];
         location.reload() ;
  }

  register(){
   
    //this.router.navigate["/signup"];
  
  }
  constructor(public router : Router,public dialogRef: MatDialogRef<DialogMessageComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
   
  }
  onClose(): void {
    this.dialogRef.close('closed');
  }

}
