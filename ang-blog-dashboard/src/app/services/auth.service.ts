import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth:AngularFireAuth, private toastr:ToastrService,private router: Router) { }

  login(email:any,password:any){
    this.afsAuth.signInWithEmailAndPassword(email,password).then(logRef => {
      this.toastr.success('Logged In Successfully');
      this.router.navigate(['']);
    }).catch(e=>{
      this.toastr.warning(e);
    })
  }
}
