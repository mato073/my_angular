import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../services/contact.service'
import {Contact} from '../../models/contact.model'
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {

  contactForm ?: FormGroup;
  errorMessage ?: string;
  constructor(private contactService: ContactService,
    private formBuilder: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      content: ['', [Validators.required]],
    })
  }

  async onSubmit(form: NgForm) {
    const firstName = form.value['firstName'];
    const lastName = form.value['lastName'];
    const content = form.value['content'];

    console.log('contact =', {firstName, lastName, content});
    
    this.postContact({firstName, lastName, content});
  }

  postContact(cont: Contact) {
    this.router.navigate(['Landing']);
    this.contactService.createNewContact(cont);
  }
}
