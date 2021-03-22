import { User } from './../core/models/User';
import { AuthenticationService } from './../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface MenuObject {
  routerLink: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {

  public isLoggedIn$: Observable<User>;
  public menuList: MenuObject[];
  // public expandedNav: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.menuList = [
      { routerLink: '/planning', icon: 'calendar_today', label: 'Planning' },
      { routerLink: '/visits', icon: 'laptop', label: 'Visites' },
      { routerLink: '/patientRecord', icon: 'folder', label: 'Dossier patient' },
      { routerLink: '/settings', icon: 'settings', label: 'Paramétrage' },
      { routerLink: '/blockchain', icon: 'security', label: 'Blockchain' },
    ];

    this.isLoggedIn$ = this.authService.getCurrentUser();
  }

  // public mouseEnterNav() {
  //   this.expandedNav = !this.expandedNav;
  //   document.body.style.marginLeft = '200px';
  // }

  // public mouseLeaveNav() {
  //   this.expandedNav = !this.expandedNav;
  //   document.body.style.marginLeft = '0';
  // }

  public logout() {
    // document.body.style.marginLeft = '0';
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
