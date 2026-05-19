"use strict";(()=>{var e={};e.id=3558,e.ids=[3558],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},32081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},9523:e=>{e.exports=require("dns")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},21913:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>y,patchFetch:()=>m,requestAsyncStorage:()=>x,routeModule:()=>g,serverHooks:()=>f,staticGenerationAsyncStorage:()=>h});var o={};r.r(o),r.d(o,{POST:()=>u,dynamic:()=>c});var i=r(49303),s=r(88716),n=r(60670),a=r(87070),l=r(66663),p=r(6350),d=r(6113);let c="force-dynamic";async function u(e){let t;try{t=await e.json()}catch{return a.NextResponse.json({error:"Invalid JSON body"},{status:400})}let{name:r,email:o,phone:i,company:s,service:n,budget:c,source:u}=t;if(!r||"string"!=typeof r||r.trim().length<2)return a.NextResponse.json({error:"Name is required"},{status:422});if(!o||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o))return a.NextResponse.json({error:"A valid email address is required"},{status:422});let g=(0,d.randomUUID)(),x=r.trim();try{(0,l.Jl)({id:g,type:"lead",name:x,email:o,phone:i,company:s,service:n,budget:c,source:u??"website",status:"new",createdAt:new Date().toISOString()})}catch{}let h=n??"General Enquiry";return Promise.all([(0,p.GB)({toName:x,toEmail:o,subject:`Your free consultation request — Zyglo Tech Enterprise`,bodyHtml:(0,p.VP)(`
        <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#ffffff;">Hi ${x}! 🎉</h2>
        <p style="margin:0 0 20px;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;">
          Thank you for your interest in <strong style="color:#06CCE8;">${h}</strong>. Your consultation request has been received and a member of our team will contact you within <strong style="color:#06CCE8;">2 business hours</strong>.
        </p>

        <div style="background:#0F1C32;border-radius:12px;padding:20px 24px;margin:0 0 24px;">
          <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#06CCE8;">What happens next?</p>
          <table cellpadding="0" cellspacing="0">
            ${[["⚡","Our specialist reviews your request within 2 hours"],["\uD83D\uDCDE","We schedule a free 30-minute discovery call"],["\uD83D\uDCCB","You receive a customised proposal within 24 hours"],["\uD83D\uDE80","Project kickoff once you approve the plan"]].map(([e,t])=>`
              <tr>
                <td style="padding:5px 10px 5px 0;font-size:15px;">${e}</td>
                <td style="padding:5px 0;font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;">${t}</td>
              </tr>
            `).join("")}
          </table>
        </div>

        <p style="margin:0 0 16px;font-size:13px;color:rgba(255,255,255,0.5);">Need an answer sooner? Reach us directly:</p>
        <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
          <tr>
            <td style="padding:4px 0;">
              <a href="https://wa.me/919943907643" style="font-size:13px;color:#06CCE8;text-decoration:none;">💬 Chat on WhatsApp → +91 9943 907 643</a>
            </td>
          </tr>
          <tr>
            <td style="padding:4px 0;">
              <a href="tel:+919943907643" style="font-size:13px;color:#06CCE8;text-decoration:none;">📞 Call us → +91 9943 907 643</a>
            </td>
          </tr>
        </table>

        <a href="https://www.zyglo.tech" style="display:inline-block;background:#06CCE8;color:#060B17;font-size:13px;font-weight:700;padding:12px 28px;border-radius:10px;text-decoration:none;">
          Visit Zyglo.tech →
        </a>
      `)}),(0,p.E7)({subject:`🚀 New Lead — ${x} | ${h}${s?` (${s})`:""}`,bodyHtml:(0,p.VP)(`
        <h2 style="margin:0 0 20px;font-size:20px;font-weight:800;color:#ffffff;">New Lead Captured</h2>
        <table cellpadding="0" cellspacing="0" width="100%">
          ${[["Name",x],["Email",o],["Phone",i??"—"],["Company",s??"—"],["Service",h],["Budget",c??"—"],["Source",u??"website"]].map(([e,t])=>`
            <tr>
              <td style="padding:8px 0;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);width:100px;">${e}</td>
              <td style="padding:8px 0;font-size:13.5px;color:#ffffff;">${t}</td>
            </tr>
          `).join("")}
        </table>
        <div style="margin:20px 0 0;padding:16px 20px;background:rgba(6,204,232,0.08);border-radius:10px;border:1px solid rgba(6,204,232,0.2);">
          <p style="margin:0;font-size:12px;color:#06CCE8;font-weight:700;">ACTION REQUIRED: Follow up within 2 hours</p>
        </div>
        <p style="margin:16px 0 0;font-size:11px;color:rgba(255,255,255,0.3);">Lead ID: ${g}</p>
      `)})]).catch(()=>{}),a.NextResponse.json({success:!0,message:"Lead captured. Our team will reach out within 2 hours."},{status:201})}let g=new i.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/lead/route",pathname:"/api/lead",filename:"route",bundlePath:"app/api/lead/route"},resolvedPagePath:"/Users/surjith/Desktop/zyglo v1/Zyglo Tech Website Final/src/app/api/lead/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:x,staticGenerationAsyncStorage:h,serverHooks:f}=g,y="/api/lead/route";function m(){return(0,n.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:h})}},66663:(e,t,r)=>{r.d(t,{Jl:()=>d,W6:()=>p,Wr:()=>c});var o=r(57147),i=r.n(o),s=r(71017),n=r.n(s);let a=n().join(process.cwd(),"data","leads.json");function l(){let e=n().dirname(a);i().existsSync(e)||i().mkdirSync(e,{recursive:!0}),i().existsSync(a)||i().writeFileSync(a,"[]","utf-8")}function p(){l();try{return JSON.parse(i().readFileSync(a,"utf-8"))}catch{return[]}}function d(e){l();let t=p();t.unshift(e),i().writeFileSync(a,JSON.stringify(t,null,2),"utf-8")}function c(e,t){l();let r=p(),o=r.findIndex(t=>t.id===e);return -1===o?null:(r[o].status=t,i().writeFileSync(a,JSON.stringify(r,null,2),"utf-8"),r[o])}},6350:(e,t,r)=>{r.d(t,{E7:()=>a,GB:()=>n,VP:()=>l});let o=r(55245).createTransport({host:process.env.SMTP_HOST??"smtp.gmail.com",port:Number(process.env.SMTP_PORT??587),secure:!1,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}}),i=`"Zyglo Tech Enterprise" <${process.env.SMTP_USER}>`,s=process.env.NOTIFY_EMAIL??"zyglotech@gmail.com";async function n({toName:e,toEmail:t,subject:r,bodyHtml:s}){await o.sendMail({from:i,to:`"${e}" <${t}>`,subject:r,html:s})}async function a({subject:e,bodyHtml:t}){await o.sendMail({from:i,to:s,subject:e,html:t})}function l(e){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zyglo Tech Enterprise</title>
</head>
<body style="margin:0;padding:0;background:#060B17;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#060B17;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:#0B1424;border-radius:16px 16px 0 0;padding:28px 36px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <svg width="36" height="36" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="14" r="9" fill="#06CCE8"/>
                      <rect x="-8" y="-32" width="16" height="64" rx="8" fill="#06CCE8" transform="translate(35 34) rotate(38)"/>
                    </svg>
                  </td>
                  <td>
                    <div style="font-size:15px;font-weight:900;letter-spacing:0.14em;color:#ffffff;">ZYGLO</div>
                    <div style="font-size:8px;font-weight:500;letter-spacing:0.22em;color:rgba(6,204,232,0.7);text-transform:uppercase;">Tech Enterprise</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background:#0B1424;padding:36px 36px 28px;border-radius:0 0 16px 16px;">
              ${e}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);">
                Zyglo Tech Enterprise Pvt. Ltd. \xb7 Chennai, India<br/>
                <a href="https://www.zyglo.tech" style="color:#06CCE8;text-decoration:none;">www.zyglo.tech</a> \xb7
                <a href="mailto:zyglotech@gmail.com" style="color:#06CCE8;text-decoration:none;">zyglotech@gmail.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[8948,5972,5245],()=>r(21913));module.exports=o})();