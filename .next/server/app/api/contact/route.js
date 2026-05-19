"use strict";(()=>{var e={};e.id=386,e.ids=[386],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},32081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},9523:e=>{e.exports=require("dns")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},84829:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>m,patchFetch:()=>y,requestAsyncStorage:()=>x,routeModule:()=>u,serverHooks:()=>h,staticGenerationAsyncStorage:()=>f});var s={};r.r(s),r.d(s,{POST:()=>g,dynamic:()=>d});var o=r(49303),n=r(88716),i=r(60670),a=r(87070),l=r(66663),p=r(6350),c=r(6113);let d="force-dynamic";async function g(e){let t;try{t=await e.json()}catch{return a.NextResponse.json({error:"Invalid JSON body"},{status:400})}let{name:r,email:s,phone:o,company:n,message:i}=t;if(!r||"string"!=typeof r||r.trim().length<2)return a.NextResponse.json({error:"Name must be at least 2 characters"},{status:422});if(!s||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))return a.NextResponse.json({error:"A valid email address is required"},{status:422});if(!i||"string"!=typeof i||i.trim().length<10)return a.NextResponse.json({error:"Message must be at least 10 characters"},{status:422});let d=(0,c.randomUUID)(),g=r.trim(),u=i.trim();try{(0,l.Jl)({id:d,type:"contact",name:g,email:s,phone:o,company:n,message:u,source:"contact-form",status:"new",createdAt:new Date().toISOString()})}catch{}return Promise.all([(0,p.GB)({toName:g,toEmail:s,subject:"We received your message — Zyglo Tech Enterprise",bodyHtml:(0,p.VP)(`
        <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#ffffff;">Hi ${g}, we got your message!</h2>
        <p style="margin:0 0 20px;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;">
          Thank you for reaching out to Zyglo Tech Enterprise. Our team will review your enquiry and respond within <strong style="color:#06CCE8;">2 business hours</strong>.
        </p>

        <div style="background:#0F1C32;border-radius:12px;padding:20px 24px;margin:0 0 24px;border-left:3px solid #06CCE8;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(6,204,232,0.7);">Your Message</p>
          <p style="margin:0;font-size:13.5px;color:rgba(255,255,255,0.8);line-height:1.7;">${u}</p>
        </div>

        <p style="margin:0 0 6px;font-size:13px;color:rgba(255,255,255,0.5);">In the meantime, you can also reach us directly:</p>
        <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
          <tr>
            <td style="padding:4px 0;">
              <span style="font-size:13px;color:rgba(255,255,255,0.5);">📞 </span>
              <a href="tel:+919943907643" style="font-size:13px;color:#06CCE8;text-decoration:none;">+91 9943 907 643</a>
            </td>
          </tr>
          <tr>
            <td style="padding:4px 0;">
              <span style="font-size:13px;color:rgba(255,255,255,0.5);">💬 </span>
              <a href="https://wa.me/919943907643" style="font-size:13px;color:#06CCE8;text-decoration:none;">WhatsApp Us</a>
            </td>
          </tr>
        </table>

        <a href="https://www.zyglo.tech/demo" style="display:inline-block;background:#06CCE8;color:#060B17;font-size:13px;font-weight:700;padding:12px 28px;border-radius:10px;text-decoration:none;">
          Book a Free Consultation →
        </a>
      `)}),(0,p.E7)({subject:`🔔 New Contact Enquiry — ${g}${n?` (${n})`:""}`,bodyHtml:(0,p.VP)(`
        <h2 style="margin:0 0 20px;font-size:20px;font-weight:800;color:#ffffff;">New Contact Form Submission</h2>
        <table cellpadding="0" cellspacing="0" width="100%">
          ${[["Name",g],["Email",s],["Phone",o??"—"],["Company",n??"—"]].map(([e,t])=>`
            <tr>
              <td style="padding:8px 0;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);width:100px;">${e}</td>
              <td style="padding:8px 0;font-size:13.5px;color:#ffffff;">${t}</td>
            </tr>
          `).join("")}
        </table>
        <div style="background:#0F1C32;border-radius:12px;padding:20px 24px;margin:20px 0 0;border-left:3px solid #06CCE8;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(6,204,232,0.7);">Message</p>
          <p style="margin:0;font-size:13.5px;color:rgba(255,255,255,0.8);line-height:1.7;">${u}</p>
        </div>
        <p style="margin:20px 0 0;font-size:11px;color:rgba(255,255,255,0.3);">Lead ID: ${d}</p>
      `)})]).catch(()=>{}),a.NextResponse.json({success:!0,message:"Your message has been received. We will respond within 2 business hours."},{status:200})}let u=new o.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},resolvedPagePath:"/Users/surjith/Desktop/zyglo v1/Zyglo Tech Website Final/src/app/api/contact/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:x,staticGenerationAsyncStorage:f,serverHooks:h}=u,m="/api/contact/route";function y(){return(0,i.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:f})}},66663:(e,t,r)=>{r.d(t,{Jl:()=>c,W6:()=>p,Wr:()=>d});var s=r(57147),o=r.n(s),n=r(71017),i=r.n(n);let a=i().join(process.cwd(),"data","leads.json");function l(){let e=i().dirname(a);o().existsSync(e)||o().mkdirSync(e,{recursive:!0}),o().existsSync(a)||o().writeFileSync(a,"[]","utf-8")}function p(){l();try{return JSON.parse(o().readFileSync(a,"utf-8"))}catch{return[]}}function c(e){l();let t=p();t.unshift(e),o().writeFileSync(a,JSON.stringify(t,null,2),"utf-8")}function d(e,t){l();let r=p(),s=r.findIndex(t=>t.id===e);return -1===s?null:(r[s].status=t,o().writeFileSync(a,JSON.stringify(r,null,2),"utf-8"),r[s])}},6350:(e,t,r)=>{r.d(t,{E7:()=>a,GB:()=>i,VP:()=>l});let s=r(55245).createTransport({host:process.env.SMTP_HOST??"smtp.gmail.com",port:Number(process.env.SMTP_PORT??587),secure:!1,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}}),o=`"Zyglo Tech Enterprise" <${process.env.SMTP_USER}>`,n=process.env.NOTIFY_EMAIL??"zyglotech@gmail.com";async function i({toName:e,toEmail:t,subject:r,bodyHtml:n}){await s.sendMail({from:o,to:`"${e}" <${t}>`,subject:r,html:n})}async function a({subject:e,bodyHtml:t}){await s.sendMail({from:o,to:n,subject:e,html:t})}function l(e){return`<!DOCTYPE html>
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
</html>`}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[8948,5972,5245],()=>r(84829));module.exports=s})();