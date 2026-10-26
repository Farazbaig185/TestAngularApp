import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';

interface KycRecord { id: number; customerId?: number; kycNumber?: string; verificationStatus?: string; remarks?: string; }
interface KycDocument { id: number; kycId?: number; documentType?: string; verificationStatus?: string; }

@Component({
  selector: 'app-kyc-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <section class="panel review-panel">
    <div class="review-heading"><div><div class="eyebrow">KYC VERIFICATION DESK</div><h2>Admin KYC Approval / Rejection</h2>
      <p>Verify each uploaded Aadhaar and PAN, then approve or reject the KYC request.</p></div>
      <button class="ghost small" (click)="load()" [disabled]="busy">Refresh list</button></div>
    <p *ngIf="error" class="error">{{error}}</p><p *ngIf="notice" class="review-success">{{notice}}</p>
    <p class="hint">Only ADMIN, SUPER_ADMIN, KYC_EXECUTIVE or COMPLIANCE_OFFICER can review documents. Customer accounts cannot approve KYC.</p>
    <div class="review-layout">
      <div><h3>Applications</h3><p *ngIf="!records.length" class="hint">No KYC records returned. Sign in with an authorized account and click Refresh list.</p>
        <button type="button" class="review-record" *ngFor="let k of records" (click)="select(k)" [class.review-active]="selected?.id===k.id">
          <b>{{k.kycNumber || 'KYC #'+k.id}}</b><span>Customer #{{k.customerId}}</span><small>{{k.verificationStatus}}</small>
        </button>
      </div>
      <div *ngIf="selected as k" class="review-detail">
        <h3>{{k.kycNumber || 'KYC #'+k.id}} <small>— {{k.verificationStatus}}</small></h3>
        <p *ngIf="!documents.length" class="hint">No document IDs loaded. Use the document upload screen to add Aadhaar and PAN, then enter their IDs below.</p>
        <div class="review-document" *ngFor="let doc of documents">
          <div><strong>{{doc.documentType}}</strong><small>Document #{{doc.id}} · {{doc.verificationStatus}}</small></div>
          <div class="review-actions"><button class="ghost small" (click)="download(doc)" [disabled]="busy">Download</button>
          <button class="review-yes" (click)="documentAction(doc,'verify')" [disabled]="busy || doc.verificationStatus==='Verified'">Verify</button>
          <button class="review-no" (click)="documentAction(doc,'reject')" [disabled]="busy || doc.verificationStatus==='Rejected'">Reject</button></div>
        </div>
        <p class="hint">Backend has no endpoint to list documents by KYC ID. Enter each document's ID from the upload response to load it.</p>
        <div class="review-manual"><label>Document ID<input type="number" [(ngModel)]="documentId" min="1" placeholder="e.g. 15"></label><button class="ghost small" (click)="addDocument()" [disabled]="busy || !documentId">Load document</button></div>
        <div class="review-decision"><h3>Final KYC decision</h3><p class="hint">Backend blocks approval until both Aadhaar and PAN are verified, with no pending documents.</p>
          <button class="review-yes" (click)="approve()" [disabled]="busy || k.verificationStatus==='Verified'">Approve KYC</button>
          <label>Reason for rejection<textarea [(ngModel)]="reason" rows="2" placeholder="Required: explain why KYC is rejected"></textarea></label>
          <button class="review-no" (click)="reject()" [disabled]="busy || !reason.trim()">Reject KYC</button>
        </div>
      </div>
    </div>
  </section>
  `,
  styles: [`
  .review-panel{margin-bottom:20px}.review-heading{display:flex;justify-content:space-between;align-items:start;gap:20px}.review-heading p{color:#66798c}
  .review-layout{display:grid;grid-template-columns: minmax(220px, .8fr) minmax(280px,1.2fr);gap:20px;margin-top:20px}
  .review-record{display:flex;flex-direction:column;gap:5px;width:100%;padding:14px;text-align:left;background:#f8fafc;border:1px solid #e2e8ee;border-radius:8px;margin-bottom:8px}
  .review-record span,.review-record small,.review-document small{color:#65798c;font-size:12px}.review-active{border-color:#169d87;background:#eaf8f4}
  .review-detail{border:1px solid #e4ebf1;padding:18px;border-radius:10px}.review-detail h3{margin-top:0}.review-detail h3 small{font-size:12px;color:#74889a}
  .review-document{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:12px 0;border-bottom:1px solid #e3eaf0}.review-document small{display:block;margin-top:4px}
  .review-actions{display:flex;gap:5px;flex-wrap:wrap}.review-yes,.review-no{border:0;border-radius:7px;padding:9px 13px;font-weight:700;color:white;cursor:pointer}.review-yes{background:#138366}.review-no{background:#b84848}button:disabled{opacity:.5;cursor:not-allowed}
  .review-manual{display:flex;align-items:end;gap:12px;margin-top:16px}.review-manual label{flex:1;margin-bottom:0}.review-manual button{margin-bottom:0}
  .review-decision{border-top:1px solid #e5ebef;margin-top:20px;padding-top:18px}.review-decision label{margin-top:14px}.review-success{background:#ebf8ef;color:#155d37;padding:10px;border-radius:7px}
  @media(max-width:850px){.review-layout{grid-template-columns:1fr}.review-heading{display:block}}
  `]
})
export class KycReviewComponent implements OnInit {
  private api = inject(ApiService);
  records: KycRecord[] = []; selected: KycRecord | null = null; documents: KycDocument[] = [];
  documentId: number | null = null; reason = ''; error = ''; notice = ''; busy = false;
  ngOnInit(): void { this.load(); }
  load(): void {
    this.error=''; this.notice=''; this.busy=true;
    this.api.call('GET','/api/v1/kyc').subscribe({next: res => {
      this.records=Array.isArray(res)?res:(Array.isArray(res?.data)?res.data:[]); this.busy=false;
      if(this.selected){this.selected=this.records.find(k=>k.id===this.selected?.id)||null;}
    },error:err=>{this.busy=false;this.error=err.error?.message||err.message||'Unable to load KYC applications';}});
  }
  select(k: KycRecord): void {this.selected=k;this.documents=[];this.reason='';this.error='';this.notice='';}
  addDocument(): void {
    if(!this.documentId || !this.selected)return;
    this.busy=true;this.error='';
    this.api.call('GET','/api/v1/kyc/documents/'+this.documentId).subscribe({next:doc=>{
      this.busy=false;const value:KycDocument=doc?.data||doc;
      if(value.kycId!==this.selected?.id){this.error='This document belongs to another KYC request.';return;}
      this.documents=this.documents.filter(d=>d.id!==value.id).concat(value);this.documentId=null;
    },error:err=>{this.busy=false;this.error=err.error?.message||err.message;}});
  }
  documentAction(doc:KycDocument, action:'verify'|'reject'):void {
    this.busy=true;this.error='';this.notice='';
    this.api.call('PUT','/api/v1/kyc/documents/'+doc.id+'/'+action,{}).subscribe({next:res=>{
      this.busy=false;this.documents=this.documents.map(d=>d.id===doc.id?(res?.data||res):d);this.notice=doc.documentType+' document '+action+' action completed.';
    },error:err=>{this.busy=false;this.error=err.error?.message||err.message;}});
  }
  approve():void {this.decision('approve');}
  reject():void {if(!this.reason.trim()){this.error='Rejection reason is required';return;}this.decision('reject');}
  private decision(action:'approve'|'reject'):void {
    if(!this.selected)return;this.busy=true;this.error='';this.notice='';
    this.api.call('PUT','/api/v1/kyc/'+this.selected.id+'/'+action,action==='reject'?{reason:this.reason.trim()}:{}).subscribe({next:res=>{
      this.busy=false;this.selected=res?.data||res;this.notice='KYC '+action+' completed';this.loadAfterDecision();
    },error:err=>{this.busy=false;this.error=err.error?.message||err.message;}});
  }
  private loadAfterDecision():void {
    this.api.call('GET','/api/v1/kyc').subscribe({next:res=>{
      this.records=Array.isArray(res)?res:(Array.isArray(res?.data)?res.data:[]);
      this.selected=this.records.find(k=>k.id===this.selected?.id)||this.selected;
    }});
  }
  download(doc:KycDocument):void {
    this.busy=true;this.error='';
    this.api.call('GET','/api/v1/kyc/documents/'+doc.id+'/download',undefined,true).subscribe({next:blob=>{
      this.busy=false;const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='kyc-document-'+doc.id;link.click();URL.revokeObjectURL(url);
    },error:err=>{this.busy=false;this.error=err.error?.message||err.message;}});
  }
}
