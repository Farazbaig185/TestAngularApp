import {Component, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ApiService} from './api.service';

@Component({selector:'app-root', standalone:true, imports:[CommonModule,FormsModule],templateUrl:'./app.component.html'})
export class AppComponent implements OnInit {
  api=inject(ApiService);
  screen='login'; section='Dashboard'; busy=false; notice=''; error=''; user:any=null;
  loginData={username:'',password:''}; registration:any={username:'',password:'',firstName:'',lastName:'',email:'',mobileNumber:'',dateOfBirth:'2000-01-01',gender:'Male',maritalStatus:'Single',occupation:'',annualIncome:0};
  customers:any[]=[]; products:any[]=[]; quotes:any[]=[]; kycs:any[]=[]; policies:any[]=[]; underwritings:any[]=[]; users:any[]=[]; closures:any[]=[]; closureReason:Record<number,string>={}; closureReview:Record<number,string>={};
  customer:any=null; myKyc:any=null; selectedProduct:any=null; reviewKyc:any=null; selectedPolicy:any=null;
  productForm:any={productCode:'',productName:'',productType:'Health',description:'',basePremium:1000,sumInsured:100000,minAge:18,maxAge:70,termYears:1,status:'Active'};
  reviewDocs:any[]=[]; myDocuments:any[]=[]; uploadSubmitted=false;
  uploaded:Record<string,number>={}; selectedFiles:Record<string,File|null>={AADHAAR:null,PAN:null}; docNumbers:Record<string,string>={AADHAAR:'',PAN:''};
  quoteCustomerId=''; quoteProductId=''; medical=''; financial=''; rejectReason=''; adminDocumentId='';
  get isAdmin(){return ['ADMIN','SUPER_ADMIN','ADMINISTRATOR'].includes(String(this.user?.role||'').toUpperCase());}
  get isReviewer(){return this.isAdmin || ['KYC_EXECUTIVE','COMPLIANCE_OFFICER'].includes(String(this.user?.role||'').toUpperCase());}
  get isUnderwriter(){return this.isAdmin || String(this.user?.role||'').toUpperCase()==='UNDERWRITER';}
  get customerMenu(){return ['Dashboard','My Profile','My KYC','Insurance Products','My Quotes','My Policies'];}
  get staffMenu(){let x=['Dashboard','Customers','KYC Review','Insurance Products','Quotes','Policies'];if(this.isUnderwriter)x.splice(5,0,'Underwriting');if(this.isAdmin)x.push('Product Management','User Management');return x;}
  get menu(){return this.isAdmin||this.isReviewer||this.isUnderwriter?this.staffMenu:this.customerMenu;}
  get loggedIn(){return !!this.user && !!sessionStorage.getItem('pas_token');}
  ngOnInit(){try{this.user=JSON.parse(sessionStorage.getItem('pas_user')||'null');this.uploaded={};}catch{}if(this.loggedIn){this.screen='portal';this.go('Dashboard');}}
  request(method:string,path:string,body:any,done:(data:any)=>void,blob=false){this.busy=true;this.error='';this.notice='';this.api.call(method,path,body,blob).subscribe({next:(data:any)=>{this.busy=false;done(data);},error:(e:any)=>{this.busy=false;this.error=typeof e.error==='string'?e.error:(e.error?.message||e.error?.detail||(e.status===0?'Cannot reach backend API. Check Spring Boot on port 8080 and Angular proxy configuration.':e.message)||'Request failed');}});}
  flash(s:string){this.notice=s;}
  signin(){this.request('POST','/api/v1/auth/login',this.loginData,(d:any)=>{if(!d?.accessToken||!d?.user){this.error='Invalid login response';return;}sessionStorage.setItem('pas_token',d.accessToken);sessionStorage.setItem('pas_user',JSON.stringify(d.user));this.user=d.user;this.screen='portal';this.loginData.password='';this.go('Dashboard');});}
  signup(){this.request('POST','/api/v1/auth/register',this.registration,()=>{this.screen='login';this.loginData.username=this.registration.username;this.flash('Registration successful. Login with your new account.');});}
  logout(){this.api.call('POST','/api/v1/auth/logout').subscribe({next:()=>{},error:()=>{}});sessionStorage.removeItem('pas_token');sessionStorage.removeItem('pas_user');this.user=null;this.customer=null;this.screen='login';this.section='Dashboard';}
  go(name:string){this.section=name;this.error='';this.notice='';if(['Dashboard','My Profile','My KYC','My Quotes','My Policies'].includes(name))this.loadMyDetails();if(['Dashboard','My Policies','Policies'].includes(name))this.loadClosures();if(['Insurance Products','Product Management','Dashboard'].includes(name))this.loadProducts();if(['Customers','KYC Review','Quotes','Policies','Underwriting','Dashboard','User Management'].includes(name)&&(this.isReviewer||this.isUnderwriter))this.loadStaff();}
  loadMyDetails(){if(this.isReviewer||this.isUnderwriter)return;this.request('GET','/api/v1/customers/me',null,(c:any)=>{this.customer=c;this.customers=c?[c]:[];this.quotes=[];this.policies=[];this.myKyc=null;
    if(this.customer){this.quoteCustomerId=String(this.customer.id);this.api.call('GET','/api/v1/kyc/me').subscribe({next:(k:any)=>{this.myKyc=k;this.loadMyKycDocuments();},error:(e:any)=>{this.error=e?.error?.message||e.message;}});this.api.call('GET','/api/v1/quotes').subscribe({next:(x:any)=>this.quotes=Array.isArray(x)?x.filter((q:any)=>Number(q.customerId)===Number(this.customer.id)):[],error:()=>{}});this.api.call('GET','/api/v1/policies').subscribe({next:(x:any)=>this.policies=Array.isArray(x)?x.filter((p:any)=>Number(p.customerId)===Number(this.customer.id)):[],error:()=>{}});}
  });}
  loadClosures(){this.api.call('GET','/api/v1/policy-closures').subscribe({next:(data:any)=>this.closures=Array.isArray(data)?data:[],error:(e:any)=>this.error='Closure requests: '+(e.error?.message||e.status||e.message)});}
  closureRequest(p:any){const reason=(this.closureReason[p.id]||'').trim();if(reason.length<5){this.error='Enter a closure reason (minimum 5 characters).';return;}this.request('POST','/api/v1/policy-closures/'+p.id,{reason},()=>{this.closureReason[p.id]='';this.flash('Closure request submitted to admin.');this.loadClosures();this.loadMyDetails();});}
  closureDecision(c:any,approve:boolean){const remarks=(this.closureReview[c.id]||'').trim();if(!approve&&!remarks){this.error='Please enter rejection remarks.';return;}this.request('PUT','/api/v1/policy-closures/'+c.id+(approve?'/approve':'/reject'),{remarks},()=>{this.flash(approve?'Policy closure approved.':'Closure request rejected.');this.loadClosures();this.loadStaff();});}
  hasPendingClosure(policyId:number){return this.closures.some((c:any)=>Number(c.policyId)===Number(policyId)&&c.status==='PENDING');}
  loadProducts(){this.api.call('GET','/api/v1/products').subscribe({next:(d:any)=>this.products=Array.isArray(d)?d:[],error:(e:any)=>this.error=e.message});}
  loadStaff(){this.api.call('GET','/api/v1/customers').subscribe({next:(d:any)=>this.customers=Array.isArray(d)?d:[],error:(e:any)=>this.error='Customers: '+(e.error?.message||e.status)});
    if(this.isReviewer)this.api.call('GET','/api/v1/kyc').subscribe({next:(d:any)=>this.kycs=Array.isArray(d)?d:[],error:(e:any)=>this.error='KYC list: '+(e.error?.message||e.status)});
    this.api.call('GET','/api/v1/quotes').subscribe({next:(d:any)=>this.quotes=Array.isArray(d)?d:[],error:(e:any)=>this.error='Quotes: '+(e.error?.message||e.status)});
    this.api.call('GET','/api/v1/policies').subscribe({next:(d:any)=>this.policies=Array.isArray(d)?d:[],error:()=>{}});
    if(this.isUnderwriter)this.api.call('GET','/api/v1/underwriting').subscribe({next:(d:any)=>this.underwritings=Array.isArray(d)?d:[],error:(e:any)=>this.error='Underwriting: '+(e.error?.message||e.status)});
    if(this.isAdmin)this.api.call('GET','/api/v1/users').subscribe({next:(d:any)=>this.users=Array.isArray(d)?d:[],error:()=>{}});
  }
  createKyc(){this.request('POST','/api/v1/kyc/me/start',{},(d:any)=>{this.myKyc=d;this.flash('KYC created automatically');this.loadMyKycDocuments();});}
  fetchKyc(){this.api.call('GET','/api/v1/kyc/me').subscribe({next:(k:any)=>{this.myKyc=k;this.loadMyKycDocuments();},error:(e:any)=>this.error=e?.error?.message||e.message});}
  loadMyKycDocuments(){if(!this.myKyc)return;this.api.call('GET','/api/v1/kyc/me/documents').subscribe({next:(docs:any)=>{this.myDocuments=Array.isArray(docs)?docs:[];this.uploadSubmitted=['AADHAAR','PAN'].every(t=>this.myDocuments.some((d:any)=>d.documentType===t && d.verificationStatus!=='Rejected'));for(const d of this.myDocuments)this.uploaded[this.myKyc.id+':'+d.documentType]=d.id;},error:(e:any)=>{this.error='Cannot load KYC documents: '+(e.error?.message||e.status||e.message);}});}
  picked(type:string,ev:Event){this.selectedFiles[type]=(ev.target as HTMLInputElement).files?.[0]||null;}
  get canSubmitKyc(){return !!this.myKyc && (this.myKyc.verificationStatus==='Rejected'||(!this.uploadSubmitted&&this.myKyc.verificationStatus==='Pending'));}
  uploadBoth(){if(!this.canSubmitKyc){this.error='Documents are already submitted or KYC is locked. Resubmit only after rejection.';return;}if(!this.myKyc){this.error='Start KYC first';return;}
    const aadhaar=this.selectedFiles['AADHAAR'],pan=this.selectedFiles['PAN'];
    if(!aadhaar||!pan||!this.docNumbers['AADHAAR']||!this.docNumbers['PAN']){this.error='Select both files and enter both document numbers';return;}
    this.busy=true;this.error='';this.api.uploadKycPair(this.docNumbers['AADHAAR'],aadhaar,this.docNumbers['PAN'],pan).subscribe({next:(r:any)=>{this.busy=false;this.selectedFiles={AADHAAR:null,PAN:null};this.docNumbers={AADHAAR:'',PAN:''};this.uploadSubmitted=true;this.flash('Both documents submitted for admin review.');this.fetchKyc();},error:(e:any)=>{this.busy=false;this.error=e?.error?.message||e?.error?.detail||e.message;}});
  }
  docId(kycId:number,type:string){return this.uploaded[String(kycId)+':'+type]||null;}
  openReview(k:any){this.reviewKyc=k;this.reviewDocs=[];this.api.call('GET','/api/v1/kyc/'+k.id+'/documents').subscribe({next:(d:any)=>this.reviewDocs=Array.isArray(d)?d:[],error:(e:any)=>this.error=e.error?.message||e.message});}
  reviewerDocument(id:number,action:'verify'|'reject'){this.request('PUT','/api/v1/kyc/documents/'+id+'/'+action,{},()=>{this.flash('Document '+action+' completed.');if(this.reviewKyc)this.openReview(this.reviewKyc);this.loadStaff();});}
  downloadDoc(id:any){if(!id){this.error='Document ID required';return;}this.request('GET','/api/v1/kyc/documents/'+id+'/download',null,(blob:Blob)=>{const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='kyc-document';a.click();URL.revokeObjectURL(u);},true);}
  review(id:any,action:'approve'|'reject'|'resubmit'){if(action==='reject'&&!this.rejectReason.trim()){this.error='Rejection reason required';return;}const payload=action==='reject'?{reason:this.rejectReason}:{};this.request('PUT','/api/v1/kyc/'+id+'/'+action,payload,()=>{this.flash('KYC '+action+' completed');this.reviewKyc=null;this.reviewDocs=[];this.loadStaff();if(action==='resubmit'){this.fetchKyc();}this.rejectReason='';});}
  createProduct(){this.request('POST','/api/v1/products',this.productForm,()=>{this.flash('Product added');this.loadProducts();});}
  modifyProduct(p:any){this.request('PUT','/api/v1/products/'+p.id,p,()=>{this.flash('Product updated');this.loadProducts();});}
  disableProduct(p:any){if(!confirm('Deactivate this product?'))return;this.request('DELETE','/api/v1/products/'+p.id,null,()=>{this.flash('Product deactivated');this.loadProducts();});}
  chooseProduct(p:any){this.selectedProduct=p;this.quoteProductId=String(p.id);this.go('My Quotes');}
  createQuote(){const cid=Number(this.quoteCustomerId||this.customer?.id),pid=Number(this.quoteProductId||this.selectedProduct?.id);if(!cid||!pid){this.error='Select customer and product';return;}this.request('POST','/api/v1/quotes',{customerId:cid,productId:pid},()=>{this.flash('Quote submitted');if(this.isReviewer||this.isUnderwriter)this.loadStaff();else this.loadMyDetails();});}
  quoteAction(q:any,action:string){this.request('PUT','/api/v1/quotes/'+q.id+'/'+action,{},()=>{this.flash('Quote '+action);this.loadStaff();});}
  createUnderwriting(q:any){this.request('POST','/api/v1/underwriting',{quoteId:q.id},()=>{this.flash('Underwriting case created');this.loadStaff();});}
  saveUnderwritingDetails(x:any){this.request('PUT','/api/v1/underwriting/'+x.id+'/medical',{details:this.medical},()=>{this.api.call('PUT','/api/v1/underwriting/'+x.id+'/financial',{details:this.financial}).subscribe({next:()=>{this.flash('Medical and financial details saved');this.loadStaff();},error:(e:any)=>this.error=e.error?.message||e.message});});}
  underwritingAction(x:any,action:string){this.request('PUT','/api/v1/underwriting/'+x.id+'/'+action,action==='reject'?{reason:this.rejectReason}:{},()=>{this.flash('Underwriting '+action);this.loadStaff();});}
  canIssuePolicy(q:any){return q.status==='Approved' && this.underwritings.some((u:any)=>Number(u.quoteId)===Number(q.id)&&u.status==='Approved');}
  issuePolicy(q:any){this.request('PUT','/api/v1/quotes/'+q.id+'/convert',{},()=>{this.flash('Policy issued');this.loadStaff();});}
  policyAction(p:any,action:string){this.request('PUT','/api/v1/policies/'+p.id+'/'+action,{},()=>{this.flash('Policy '+action);this.loadStaff();});}
  downloadPolicy(p:any){this.request('GET','/api/v1/policies/'+p.id+'/document',null,(blob:Blob)=>{const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='policy-'+p.id+'.pdf';a.click();URL.revokeObjectURL(u);},true);}
  activateUser(u:any,action:'lock'|'unlock'){this.request('PUT','/api/v1/users/'+u.id+'/'+action,{},()=>{this.flash('User '+action+' completed');this.loadStaff();});}
  customerName(id:any){const x=this.customers.find(c=>Number(c.id)===Number(id));return x?x.firstName+' '+x.lastName:'Customer #'+id;}
  productName(id:any){return this.products.find(x=>Number(x.id)===Number(id))?.productName||'Product #'+id;}
}
