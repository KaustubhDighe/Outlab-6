import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { GetPostService, FormData } from "../get-post.service";
import { Validators } from '@angular/forms';

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  formData: FormData;
  feedBackForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl("",[
  	Validators.required,
  	Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    toggle: new FormControl("",[ Validators.required]),
    comment: new FormControl("")
  });
  successMessage: string = "";

  constructor(private getPostService: GetPostService) {}

  updateForm() {
    this.feedBackForm.patchValue({
      name: this.formData.name,
      email: this.formData.email,
      toggle: this.formData.feedback,
      comment: this.formData.comment
    });
  }

  clearForm() {
    this.successMessage =
      "Name : " +
      this.formData.name +
      "<br/>  E-Mail: " +
      this.formData.email +
      "<br/>Feedback: " +
      this.formData.feedback +
      "<br/>Comment: " +
      this.formData.comment +
      "<br/> </br> SUBMISSION SUCCESSFUL";
    this.feedBackForm.patchValue({
      name: "",
      email: "",
      toggle: "",
      comment: ""
    });
  }

  showFormData() {
    this.getPostService.getFormData().subscribe((data: FormData) => {
      this.formData = { ...data }; // success path
      this.updateForm();
    });
  }

  showError() {
    this.successMessage = "ERROR";
    this.feedBackForm.patchValue({
      name: "error",
      email: "error",
      toggle: "",
      comment: "error"
    });
  }

  onSubmit() {
    this.formData = {
      name: this.feedBackForm.value.name,
      email: this.feedBackForm.value.email,
      feedback: this.feedBackForm.value.toggle,
      comment: this.feedBackForm.value.comment
    };
    this.getPostService.postForm(this.formData).subscribe(
      response => {
        this.clearForm();
        //this.formData = response;
        //this.updateForm();
      },
      error => this.showError()
    );
  }

  ngOnInit() {
    this.showFormData();
  }
}
