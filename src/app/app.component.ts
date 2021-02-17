import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poin-projet';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const REST = 'rest';
    let _url = localStorage.getItem('URL');
    if (_url.indexOf("localhost:4200") != null) {
      _url = _url.replace("localhost:4200", "localhost:8080")
    }
    environment.apiUrl = _url;

    iconRegistry.addSvgIcon('person_circle', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/person_circle.svg'));
    iconRegistry.addSvgIcon('person', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/person-black-36dp.svg'));
  }
}
