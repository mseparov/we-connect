import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "../helper-components/data.service";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private router:Router, private data:DataService){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean | UrlTree> {
    
    
    return this.data.isLoggedIn
    .pipe(
        map(loggedIn => !loggedIn? true: this.router.parseUrl("/home"))
    );
    }

}