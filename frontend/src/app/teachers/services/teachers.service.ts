import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Users } from 'src/app/models/user';
import { Roles } from 'src/app/constants/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  constructor(private readonly authService: AuthService) {}

  get(): Observable<Users> {
    return this.authService.getUsers(Roles.Teacher);
  }
}
