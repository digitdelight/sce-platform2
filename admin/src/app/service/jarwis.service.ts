import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable(
  {
  providedIn: 'root'}
)
export class JarwisService {

  // private baseUrl = 'http://hamorah.com/testenv/backend/public/api';

  private baseUrl = 'http://localhost/sce-platform2/backend/public/api';

  // private baseUrl = environment.baseUrl;


  constructor(private http: HttpClient) { }
  geturl(){
    return this.http.get(`${this.baseUrl}/geturl`);
  }
  roleuser() {
    return this.http.get(`${this.baseUrl}/roleuser`)
  }
  signup(data) {
    return this.http.post<any>(`${this.baseUrl}/signup`, data)
  }
  role(data) {
    return this.http.post<any>(`${this.baseUrl}/role`, data)
  }
  activity(data) {
    return this.http.post<any>(`${this.baseUrl}/activity`, data)
  }
  cate(data) {
    return this.http.post<any>(`${this.baseUrl}/cate`, data)
  }
  updatelive(data) {
    return this.http.post(`${this.baseUrl}/updatelive`, data)
  }
  updatetrash(data) {
    return this.http.post(`${this.baseUrl}/updatetrash`, data)
  }
  content(data) {
    return this.http.post<any>(`${this.baseUrl}/content`, data,{headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }
  
  name_t(data) {
    return this.http.post<any>(`${this.baseUrl}/name_t`, data)
  }
  
  login(data) {
    return this.http.post<any>(`${this.baseUrl}/login`, data)
  }
  getact() {
    return this.http.get<any>(`${this.baseUrl}/getact`,)
  }
  getcat() {
    return this.http.get<any>(`${this.baseUrl}/getcat`,)
  }
  getactcat() {
    return this.http.get<any>(`${this.baseUrl}/getactcat`,)
  }
  profile() {
    return this.http.get<any>(`${this.baseUrl}/me`,{headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }
  updateprofile(data) {
    return this.http.post<any>(`${this.baseUrl}/me`,data,{headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }
  post(id:string) {

    return this.http.get<any>(`${this.baseUrl}/post/${id}`,{headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})

  }
  displayevent() {
    return this.http.get<any>(`${this.baseUrl}/displayevent`,)
  }
 
  displayartifact() {
    return this.http.get<any>(`${this.baseUrl}/displayartifact`,)
  }
  displaybusiness() {
    return this.http.get<any>(`${this.baseUrl}/displaybusiness`,)
  }
  displaypeople() {
    return this.http.get<any>(`${this.baseUrl}/displaypeople`,)
  }
  displaynews() {
    return this.http.get<any>(`${this.baseUrl}/displaynews`,)
  }
  displaylocation() {
    return this.http.get<any>(`${this.baseUrl}/displaylocation`,)
  }

  getcontent(id:string) {
    return this.http.get<any>(`${this.baseUrl}/getcontent/${id}`)
  }
  getalltitle() {
    return this.http.get<any>(`${this.baseUrl}/getalltitle`,)
  }
  getalladmintitle() {
    return this.http.get<any>(`${this.baseUrl}/getalladmintitle`,)
  }
  getfootertitle() {
    return this.http.get<any>(`${this.baseUrl}/getfootertitle`,)
  }
  gettitles(id:string) {
    return this.http.get<any>(`${this.baseUrl}/gettitles/${id}`)
  }
  gettitlesforadmin(id:string) {
    return this.http.get<any>(`${this.baseUrl}/gettitlesforadmin/${id}`)
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

  updatecontent(data) {
    return this.http.post(`${this.baseUrl}/updatecontent`, data)
  }
//  search(searchTerm:string) {
//     return this.http.get(`${this.baseUrl}/getalltitle/${searchTerm}`)
//   }

comment(data) {
  return this.http.post<any>(`${this.baseUrl}/comment`, data,{headers:{
    Authorization:`Bearer ${localStorage.token}`
  }})
}
getAllPost(){
  return this.http.get<any>(`${this.baseUrl}/getAllPost`);
}
adminLogin(data) {
  return this.http.post(`${this.baseUrl}/adminLogin`, data)
}

deletetitle(data) {
  return this.http.post<any>(`${this.baseUrl}/deletetitle`, data)
}

deleteuser(data) {
  return this.http.post<any>(`${this.baseUrl}/deleteuser`, data)
}
deletecat(data) {
  return this.http.post<any>(`${this.baseUrl}/deletecat`, data)
}
deleteact(data) {
  return this.http.post<any>(`${this.baseUrl}/deleteact`, data)
}
getalltrashtitle() {
  return this.http.get<any>(`${this.baseUrl}/getalltrashtitle`,)
}
getusertrashtitle() {
  return this.http.get<any>(`${this.baseUrl}/usertrashtitle`,)
}
getcattrashtitle() {
  return this.http.get<any>(`${this.baseUrl}/cattrashtitle`,)
}
getacttrashtitle() {
  return this.http.get<any>(`${this.baseUrl}/acttrashtitle`,)
}

trash(data) {
  return this.http.post<any>(`${this.baseUrl}/trash`, data)
}

activitytrash(data) {
  return this.http.post<any>(`${this.baseUrl}/activitytrash`, data)
}
catetrash(data) {
  return this.http.post<any>(`${this.baseUrl}/catetrash`, data)
}
cateupdate(data) {
  return this.http.post<any>(`${this.baseUrl}/cateupdate`, data)
}

acttrash(data) {
  return this.http.post<any>(`${this.baseUrl}/acttrash`, data)
}
actupdate(data) {
  return this.http.post<any>(`${this.baseUrl}/actupdate`, data)
}
getadmins() {
  return this.http.get<any>(`${this.baseUrl}/getAdmins`,)
}
getUsers() {
  return this.http.get<any>(`${this.baseUrl}/getUsers`,)
}
getContribute() {
  return this.http.get<any>(`${this.baseUrl}/getContribute`,)
}
editimgcontribute(data) {
  return this.http.post<any>(`${this.baseUrl}/editimgcontribute`, data)
}
getimgContribute() {
  return this.http.get<any>(`${this.baseUrl}/imgcontribute`,)
}
userupdate(data) {
  return this.http.post<any>(`${this.baseUrl}/userupdate`, data)
}
usertrash(data) {
  return this.http.post<any>(`${this.baseUrl}/usertrash`, data)
}
movetrashuser(data) {
  return this.http.post<any>(`${this.baseUrl}/movetrashu`, data)
}
movetrashact(data) {
  return this.http.post<any>(`${this.baseUrl}/movetrasha`, data)
}
movetrashcat(data) {
  return this.http.post<any>(`${this.baseUrl}/movetrashc`, data)
}
editcontribute(data){
  return this.http.post<any>(`${this.baseUrl}/editcontribute`, data)

}
livecontribute() {
  return this.http.get(`${this.baseUrl}/livecontribute`)
}
getalledittedpost(){
  return this.http.get(`${this.baseUrl}/getalledittedpost`)
}
rejectContribution(data){
  return this.http.post<any>(`${this.baseUrl}/rejectContribution`, data)

}
rejectPost(data){
  return this.http.post<any>(`${this.baseUrl}/rejectPost`, data)

}
// catetrash(data) {
//   return this.http.post<any>(`${this.baseUrl}/catetrash`, data)
// }
}

