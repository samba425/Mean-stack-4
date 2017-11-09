import { AuthService } from './auth.service';
import { Injectable } from '@angular/core'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class BlogService {

  constructor(private http : Http, private auth: AuthService) { }
DomainUrl = this.auth.dominurl;
options;


createAuthicationHeaders() {
  this.auth.loadtoken();
  this.options = new RequestOptions({
       headers : new Headers({
       'Content-Type' : 'Application/json',
       'authorization' : this.auth.authtoken
       })
  })
  console.log("this.optionssssss",this.options)
}

formBlog(data){ 
  this.createAuthicationHeaders();
  return this.http.post(this.DomainUrl + '/blogs/newBlog', data ,this.options).map(res => res.json())
}

getBlogs() {
  this.createAuthicationHeaders();
  return this.http.get(this.DomainUrl +'/blogs/getBlogs',this.options).map(res => res.json())
  .do(res => {
    console.log("my blogs all", res)
  }) 
}


getSingleBlog(id) {
  this.createAuthicationHeaders(); 
  return this.http.get(this.DomainUrl +'/blogs/singleBlog/'+id,this.options).map( res => res.json());
  
}

updateBlog(data) {
  this.createAuthicationHeaders(); 
  console.log("response update",data)
  console.log("response update12121",this.options)
return this.http.put(this.DomainUrl +'/blogs/updateBlog', data,this.options).map(res => res.json());
}

deleteBlog(id) {
  this.createAuthicationHeaders(); 
return this.http.delete(this.DomainUrl +'/blogs/deleteBlog' + id, this.options).map(res => res.json());
}
}
