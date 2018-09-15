import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any = {};
  userMenu = [{ title: 'Profile' }, { title: 'Logout', route: '' }];

  constructor(
    private router: Router,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.user = this.storageService.get('user');
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login/sign-in');
  }
}
