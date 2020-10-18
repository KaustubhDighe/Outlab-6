import { Component, OnInit } from "@angular/core";
import { Creator } from "../creator";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  people: Creator[] = [
    {
      name: "Kaustubh Dighe",
      rollno: 190050058,
      email: "190050058@iitb.ac.in"
    },
    { name: "Manan Agarwal", rollno: 190050065, email: "190050065@iitb.ac.in" }
  ];

  constructor() {}

  ngOnInit() {}
}
