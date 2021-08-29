import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Horse } from 'src/app/_models/horse';

@Component({
  selector: 'app-horse-detail',
  templateUrl: './horse-detail.component.html',
  styleUrls: ['./horse-detail.component.scss']
})
export class HorseDetailComponent implements OnInit {

    horse: Horse;

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
        
            this.horse=data['horse'];    
          
        })   
    }

}
