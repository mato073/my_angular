import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})

export class LoginAdminComponent implements OnInit {

  loginForm ?: FormGroup;
  errorMessage ?: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  onSubmit(form: NgForm) {
    const email = form.value['email'];
    const password = form.value['password'];
    
    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['Admin-page']);
      },
      (error) =>{
       this.errorMessage = error;
      }
    )
    }
}
