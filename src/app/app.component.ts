import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './core/services/token-storage.service';
import { AuthentificationFacade } from './state/authentification/authentification.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FlowrSpot';

  constructor(private authentificationFacade: AuthentificationFacade, private tokenStorageService: TokenStorageService){ }
  
  public ngOnInit(): void {
    const token = this.tokenStorageService.getToken();
    if(token){
      this.authentificationFacade.setAuthProps(token, true);
    }
    
  }
}
