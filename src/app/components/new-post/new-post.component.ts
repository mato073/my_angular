import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  PostForm ?: FormGroup;
  errorMessage ?: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.PostForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.email]],
      content: ['', [Validators.required]],
      category: ['', [Validators.required]],
    })
  }

  onSubmit(form: NgForm) {
    const title = form.value['title'];
    const content = form.value['content'];
    const category = form.value['category'];
    
    console.log('Post data', title, content, category );
    
  }

  detectFiles(event: any) {
    //this.onUploadFile(event.target.files[0]);
  }

  cansel() {
    this.router.navigate(['Admin-page']);
  }

}
