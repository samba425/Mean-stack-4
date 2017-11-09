import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location }  from '@angular/common'; 
import { ActivatedRoute, Router  } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

 @Component({
  selector: 'app-editblog',
  templateUrl: './editblog.component.html',
  styleUrls: ['./editblog.component.css']
})
export class EditblogComponent implements OnInit {
message ;
messageClass;
currentUrl; 
 blogs = {
    title: String,
    body: String
  }
  constructor(private location: Location,
   private activatedRoute: ActivatedRoute,
   private router: Router,
   private blogService: BlogService) { }



  goBack() {
    this.location.back();
  }

  updateBlog() {
    console.log("edit blog",this.blogs)
    this.blogService.updateBlog(this.blogs).subscribe(data => {
      if(!data.success) {
       this.messageClass ="alert alert-danger";
       this.message = data.message; 
      } else { 
        console.log("success",data)
       this.messageClass ="alert alert-success";
       this.message = data.message; 
       setTimeout(() => {
         this.router.navigate(['/blog']);
       },2000);
      }
    })
  }
  ngOnInit() {
    this.currentUrl  = this.activatedRoute.snapshot.params;
    console.log("this.currentUrl",this.currentUrl)
    this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data => { 
      console.log("blog data", data)
      this.blogs = data.blog; 
    })
  }

}
