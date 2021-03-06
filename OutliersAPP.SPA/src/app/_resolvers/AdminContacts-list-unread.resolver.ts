import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ContactsService } from "../_services/contacts.service";
import { UserContact } from "../_models/usercontact";
import { AdminContact } from "../_models/admincontact";

@Injectable()
export class AdminContactsListUnreadResolver implements Resolve<AdminContact[]>{
    constructor(private userService:ContactsService,private router:Router,private alertify:AlertifyService){}
    resolve(route:ActivatedRouteSnapshot):Observable<AdminContact[]>{
        return this.userService.GetAdminContactsUnRead().pipe(
          catchError(error => {
              this.alertify.error('يوجد مشكلة في عرض البيانات');
              this.router.navigate(['']);
              return of(null);
          })
        );
    }
}
