import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Horse } from 'src/app/_models/horse';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-horse-detail',
  templateUrl: './horse-detail.component.html',
  styleUrls: ['./horse-detail.component.scss']
})
export class HorseDetailComponent implements OnInit {

    horse: Horse;

    updateAccessAllowed: boolean=false;

    constructor(private activatedRoute: ActivatedRoute,
                private authService:    AuthService,
                private messageService: MessageService) { }

    ngOnInit(): void {        
        this.updateAccessAllowed = this.authService.updateAllowed;

        if (this.updateAccessAllowed) {
            this.messageService.displayStatusMessage();
        }

        this.activatedRoute.data.subscribe(data => {        
            this.horse=data['horse'];            
        })   
    }
}
