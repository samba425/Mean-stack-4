import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service';

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
userName;
blogPosts;
  constructor(private formBuilder: FormBuilder,private auth: AuthService,private blogService : BlogService) { 
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
   this.getAllblogs();
  this.loadBlog = true;
  setTimeout(()=> {
  this.loadBlog = false;
  },1000)
}

onBlogSubmit() {
  const blog = { 
    title: this.form.value.title,
    createdBy: this.userName,
    body: this.form.value.body
  } 
  this.blogService.formBlog(blog).subscribe( res => {
        if(!res.success){
          this.messageClass="alert alert-danger";
          this.message = res.message;

        } else {
          this.messageClass = "alert alert-success";
          this.message = res.message;
          this.getAllblogs();
        this.form.reset();
          setTimeout(() => {
          this.messageClass='';
            this.message = '';
            this.newPost =false;
          },2000)
        }
  })
}
postComment() {

}

goBack(){
  window.location.reload();
}

getAllblogs() {
  this.blogService.getBlogs().subscribe(data => {
    this.blogPosts = data.message;
    console.log("my blogs", this.blogPosts)
  } )
}
  ngOnInit() {
    this.auth.getProfile().subscribe( res => {
      this.userName = res.user.username;
    });
    this.getAllblogs();
  }

}
