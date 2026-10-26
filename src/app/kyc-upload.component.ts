import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';

@Component({selector:'app-kyc-upload',standalone:true,imports:[CommonModule,FormsModule],template:`
<section class="panel"><div class="eyebrow">CUSTOMER DOCUMENT SUBMISSION</div><h2>Aadhaar / PAN KYC</h2>
<p>Create a KYC application for your customer ID, then upload both identity documents. Admin must verify each file before final approval.</p>
<p *ngIf="error" class="error">{{error}}</p><p *ngIf="notice" class="success">{{notice}}</p>
<div class="upload-grid"><div><h3>1. KYC application</h3><label>Customer ID<input type="number" min="1" [(ngModel)]="customerId" required></label>
<button class="primary" (click)="createKyc()" [disabled]="busy||!customerId">Create KYC request</button>
<label>KYC ID from response<input type="number" min="1" [(ngModel)]="kycId"></label>
<button class="ghost small" (click)="getKyc()" [disabled]="busy||!kycId">Check current KYC status</button></div>
<div><h3>2. Upload document</h3><label>Document type<select [(ngModel)]="type"><option>Aadhaar</option><option>PAN</option></select></label>
<label>Document number<input [(ngModel)]="number" placeholder="Enter document number"></label>
<label>Document file (PDF/JPG/PNG up to 5 MB)<input type="file" accept=".pdf,.jpg,.jpeg,.png" (change)="choose($event)"></label>
<button class="primary" (click)="upload()" [disabled]="busy||!kycId||!number||!file">Upload {{type}}</button></div></div>
<h3>Latest server response</h3><pre *ngIf="result">{{result|json}}</pre>
<p class="hint">Upload Aadhaar and PAN separately against the same KYC ID. Verification is manual by an authorized reviewer; uploading alone does not mean KYC approval.</p></section>
`,styles:[`.upload-grid{display:grid;grid-template-columns:1fr 1fr;gap:25px}.success{background:#e5f6ee;color:#126341;padding:10px;border-radius:8px}pre{padding:15px;background:#f2f6fa;overflow:auto;white-space:pre-wrap}@media(max-width:800px){.upload-grid{grid-template-columns:1fr}}`]})
export class KycUploadComponent {
 private api=inject(ApiService);customerId:number|null=null;kycId:number|null=null;type='Aadhaar';number='';file:File|null=null;busy=false;error='';notice='';result:any=null;
 private ok(r:any,msg:string){this.busy=false;this.result=r?.data||r;this.notice=msg;this.error='';}
 private fail(e:any){this.busy=false;this.error=e?.error?.message||e?.message||'Request failed';this.notice='';}
 createKyc(){if(!this.customerId)return;this.busy=true;this.api.call('POST','/api/v1/kyc',{customerId:this.customerId}).subscribe({next:r=>{this.ok(r,'KYC request created');this.kycId=(r?.data||r)?.id||this.kycId;},error:e=>this.fail(e)});}
 getKyc(){if(!this.kycId)return;this.busy=true;this.api.call('GET','/api/v1/kyc/'+this.kycId).subscribe({next:r=>this.ok(r,'KYC status loaded'),error:e=>this.fail(e)});}
 choose(event:Event){const inp=event.target as HTMLInputElement;this.file=inp.files?.[0]||null;}
 upload(){if(!this.file||!this.kycId||!this.number)return;if(this.file.size>5*1024*1024){this.error='File must be 5 MB or smaller';return;}
 this.busy=true;this.api.upload(String(this.kycId),this.type,this.number,this.file).subscribe({next:r=>{this.ok(r,this.type+' uploaded. Note document ID from response for review.');this.file=null;this.number='';},error:e=>this.fail(e)});}
}
