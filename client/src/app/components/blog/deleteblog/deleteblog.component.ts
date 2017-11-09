
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deleteblog',
  templateUrl: './deleteblog.component.html',
  styleUrls: ['./deleteblog.component.css']
})
export class DeleteblogComponent implements OnInit {
message;
messageClass;
currentUrl;
blog;

  constructor(private blogService : BlogService,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit() { 
    this.currentUrl  = this.activatedRoute.snapshot.params; 
    console.log("delete url", this.currentUrl)
      this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data => {
      if(!data.success) {
this.messageClass = "alert alert-danger";
this.message = data.message;
      }  else {
        this.blog = {
          title: data.blog.title,
          body: data.blog.body,
          creayedBy: data.blog.creayedBy,
          createdAt: data.blog.createdAt,
        }
      }})
  }


deleteblog() {
this.blogService.deleteBlog(this.currentUrl.id).subscribe(data => {
  console.log("resssss",data)
})
}
}
