import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/_services/app-state.service';

@Component({
  selector: 'app-demo-warning',
  templateUrl: './demo-warning.component.html',  styleUrls: ['./demo-warning.component.scss'],
  animations: [  
    trigger('warningVisibility', [
        state('visible', style ({
            opacity: 1,
            backgroundColor: '#ff8c00',
            display: 'inline-block'                    
        })),
        state('invisible', style ({  
            opacity: 0,       
            backgroundColor: 'transparent',
            display: 'none'          
        })),     
        transition('visible => invisible', [
            animate('2s ease')
        ]) 
    ]),
    // trigger('warningPosition', [
    //     state('there', style ({
    //         top: '10rem',         
    //     })),
    //     state('notThere', style ({          
    //         top: '-40rem',            
    //     })), 
    //     transition('there => notThere', [
    //         animate('0.1s 2s ease')
    //     ]),       
    // ]) 
  ]          
})
export class DemoWarningComponent implements OnInit {

    get displayWarning(): boolean {
        return this.appState.displayWarning;    
    }

    get warningVisibility(): string {
        return this.appState.displayWarning ? 'visible' : 'invisible';    
    }

    warningPosition = 'notThere';


    constructor(private appState: AppStateService) { }

    ngOnInit() {}
    
    ngAfterViewInit() {   

        if (!sessionStorage.warningAlreadyShown) {  
            setTimeout(()=>{
                this.appState.displayWarning=true;
                this.warningPosition='there';    
            },1);                     
        }
    }

    startDemo() {   
        this.appState.removeWarning();
        this.warningPosition = 'notThere';
        setTimeout(()=>{this.warningPosition='notThere'}, 1);
    }

}
