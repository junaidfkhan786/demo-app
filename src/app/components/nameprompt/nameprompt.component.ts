import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nameprompt',
  templateUrl: './nameprompt.component.html',
  styleUrls: ['./nameprompt.component.scss']
})
export class NamepromptComponent implements OnInit {

  name: FormControl = new FormControl(null, Validators.required)
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogref: MatDialogRef<NamepromptComponent>) {
    this.name.patchValue(data.name ?? '')
  }
  ngOnInit(): void {

  }

}
