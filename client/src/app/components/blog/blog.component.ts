import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms'; 

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
messageClass;
message; 
newPost = false;
loadBlog = false;
form : FormGroup;
processing = false;
  constructor(private formBuilder: FormBuilder) { 
    this.createBlog();
  }

  createBlog() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidator
      ])],
      body: ['', Validators.required] 
    })
  }


alphaNumericValidator(controls) {
  const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
  if(regExp.test(controls.value)) {
    return null;
  } else {
    return { 'alphaNumericValidator': true }
  }
}
newBlogForm() {
  this.newPost = true;
}

loadBlogPosts(){
  this.loadBlog = true;
  setTimeout(()=> {
  this.loadBlog = false;
  },3000)
}

onBlogSubmit() {
  console.log("foblog form")
}
postComment() {

}

goBack(){
  window.location.reload();
}
  ngOnInit() {
  }

}
