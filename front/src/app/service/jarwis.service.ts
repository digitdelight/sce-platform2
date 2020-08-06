import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable(
  {
  providedIn: 'root'}
)
export class JarwisService {

  // private baseUrl = 'http://hamorah.com/testenv/backend/public/api';

  private baseUrl = 'http://localhost/sce-platform2/backend/public/api';

  constructor(private http: HttpClient) { }
  geturl(){
    return this.http.get(`${this.baseUrl}/geturl`);
  }
  roleuser() {
    return this.http.get(`${this.baseUrl}/roleuser`)
  }
  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data)
  }
  updatecontent(data) {
    return this.http.post(`${this.baseUrl}/updatecontent`, data)
  }
  
  role(data) {
    return this.http.post(`${this.baseUrl}/role`, data)
  }
  activity(data) {
    return this.http.post(`${this.baseUrl}/activity`, data)
  }
  cate(data) {
    return this.http.post(`${this.baseUrl}/cate`, data)
  }
  
  content(data) {
    return this.http.post(`${this.baseUrl}/content`, data,{headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }

  subscribe(data) {
    return this.http.post(`${this.baseUrl}/subscribe`, data
    // ,{headers:{
    //   Authorization:`Bearer ${localStorage.token}`
    // }}
    )
  }
  
  name_t(data) {
    return this.http.post(`${this.baseUrl}/name_t`, data)
  }
  
  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data)
  }
  getact() {
    return this.http.get(`${this.baseUrl}/getact`,)
  }
  getArticle() {
    return this.http.get(`${this.baseUrl}/getArticle`,{headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }
  profile() {
    return this.http.get(`${this.baseUrl}/me`,{headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }
  updateprofile(data) {
    return this.http.post(`${this.baseUrl}/me`,data,{headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }
  post(id:string) {

    return this.http.get(`${this.baseUrl}/post/${id}`,{headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})

  }
  displayevent() {
    return this.http.get(`${this.baseUrl}/displayevent`,)
  }
  displayartifact() {
    return this.http.get(`${this.baseUrl}/displayartifact`,)
  }
  displaybusiness() {
    return this.http.get(`${this.baseUrl}/displaybusiness`,)
  }
  displaypeople() {
    return this.http.get(`${this.baseUrl}/displaypeople`,)
  }
  displaytourist() {
    return this.http.get(`${this.baseUrl}/displaytourist`,)
  }
  displaynews() {
    return this.http.get(`${this.baseUrl}/displaynews`,)
  }
  
  displayactbytitle() {
    return this.http.get<any>(`${this.baseUrl}/displayactbytitle`,)
  }
  
  updateView(data) {
    return this.http.post<any>(`${this.baseUrl}/addview`, data)
  }
  getcontent(id:string) {
    return this.http.get(`${this.baseUrl}/getcontent/${id}`,{headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }
  getcontentonly(id:string) {
    return this.http.get(`${this.baseUrl}/getcontentonly/${id}`)
  }
  getalltitle() {
    return this.http.get(`${this.baseUrl}/getalltitle`,)
  }
  getfootertitle() {
    return this.http.get(`${this.baseUrl}/getfootertitle`,)
  }
  gettitles(data) {
    return this.http.post(`${this.baseUrl}/gettitles`,data,{headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }
  getUtitles() {
    return this.http.get(`${this.baseUrl}/getUtitles`,{headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }
  getUcontent() {
    return this.http.get(`${this.baseUrl}/getUcontent`,{headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }
//  search(searchTerm:string) {
//     return this.http.get(`${this.baseUrl}/getalltitle/${searchTerm}`)
//   }
 search(searchTerm:string) {
    return this.http.get(`${this.baseUrl}/search/${searchTerm}`)
  }
contribute(data) {
  return this.http.post(`${this.baseUrl}/contribute`,data,{headers:{
    Authorization:`Bearer ${localStorage.token}`
  }})
}
contributeimage(data) {
  return this.http.post(`${this.baseUrl}/contributeimg`,data,{headers:{
    Authorization:`Bearer ${localStorage.token}`
  }})
}
like(data) {
  return this.http.post(`${this.baseUrl}/like`,data,{headers:{
    Authorization:`Bearer ${localStorage.token}`
  }})
}
follow(data) {
  return this.http.post(`${this.baseUrl}/follow`,data,{headers:{
    Authorization:`Bearer ${localStorage.token}`
  }})
}
displaytimeline() {
  return this.http.get(`${this.baseUrl}/displaytimeline`,{headers:{
    Authorization:`Bearer ${localStorage.token}`
  }})
}
timelinebyfollow() {
  return this.http.get(`${this.baseUrl}/timelinebyfollow`,{headers:{
    Authorization:`Bearer ${localStorage.token}`
  }})
}
displaygallery() {
  return this.http.get(`${this.baseUrl}/displaygallery`,{headers:{
    Authorization:`Bearer ${localStorage.token}`
  }})
}
comment(data) {
  return this.http.post(`${this.baseUrl}/comment`, data,{headers:{
    Authorization:`Bearer ${localStorage.token}`
  }})
}
getFollow(data) {
  return this.http.post(`${this.baseUrl}/getFollows`,data,{headers:{
    Authorization:`Bearer ${localStorage.token}`
  }})
}
unFollow(data) {
  return this.http.post(`${this.baseUrl}/unFollow`,data,{headers:{
    Authorization:`Bearer ${localStorage.token}`
  }})
}
follow2(data) {
  return this.http.post(`${this.baseUrl}/follow2`,data,{headers:{
    Authorization:`Bearer ${localStorage.token}`
  }})
}
// subscribes(data) {
//   return this.http.post(`${this.baseUrl}/subscribe`,data);
// }

contactus(data) {
  return this.http.post(`${this.baseUrl}/contactus`,data);
}
}
