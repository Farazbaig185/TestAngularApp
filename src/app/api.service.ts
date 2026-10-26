import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpInterceptorFn, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export const authInterceptor: HttpInterceptorFn = (req,next) => {
  const token = sessionStorage.getItem('pas_token');
  if (token && !/^\/api\/v1\/auth\/(login|register|forgot-password|reset-password|refresh-token)$/.test(new URL(req.url, 'http://localhost').pathname)) return next(req.clone({setHeaders:{Authorization:'Bearer '+token}}));
  return next(req);
};
@Injectable({providedIn:'root'}) export class ApiService {
  private http=inject(HttpClient);
  // Requests use Angular's dev-server proxy (see proxy.conf.json).
  baseUrl='';
  call(method:string,path:string,payload?:any,blob=false):Observable<any> {
    return this.http.request(method,this.baseUrl+path,{body:payload,responseType:blob?'blob':'json'});
  }
  uploadKycPair(aadhaarNumber:string,aadhaarFile:File,panNumber:string,panFile:File):Observable<any>{
    const form=new FormData();form.append('aadhaarNumber',aadhaarNumber);form.append('aadhaarFile',aadhaarFile);form.append('panNumber',panNumber);form.append('panFile',panFile);
    return this.call('POST','/api/v1/kyc/me/documents',form);
  }
  upload(kycId:string,documentType:string,documentNumber:string,file:File):Observable<any>{
    const fd=new FormData(); fd.append('kycId',kycId);fd.append('documentType',documentType);fd.append('documentNumber',documentNumber);fd.append('file',file);
    return this.call('POST','/api/v1/kyc/documents',fd);
  }
}
