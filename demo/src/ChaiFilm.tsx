import React from 'react';
import {AbsoluteFill,Audio,Img,staticFile,useCurrentFrame} from 'remotion';

// All visual assets are original procedural artwork. No source-channel image is used.
export const C={paper:'#f1ebe1',ink:'#191714',orange:'#fb790b',deep:'#b94705',white:'#fffdf8',red:'#e94f70',green:'#33735c',muted:'#82786b'};
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const ease=(x:number)=>1-Math.pow(1-clamp(x),3);
const mix=(a:number,b:number,x:number)=>a+(b-a)*clamp(x);
const pop=(t:number,start:number,d=.48)=>{const u=clamp((t-start)/d);return 1-Math.pow(1-u,3)*Math.cos(u*Math.PI*2.2);};
const num=(x:number)=>'₹'+Math.round(x).toLocaleString('en-IN');
const shadow='0 13px 24px #48352220, 0 2px 3px #48352216';
const at=(x:number,y:number,w?:number):React.CSSProperties=>({position:'absolute',left:x,top:y,...(w?{width:w}:{})});

export const Coin=({size=300,value='',mood='happy',t=0}:{size?:number;value?:string;mood?:string;t?:number})=>{
  const blink=Math.sin(t*1.7)>.996;
  return <svg width={size} height={size*1.12} viewBox="0 0 300 336">
    <defs><radialGradient id="gold" cx="32%" cy="23%" r="80%"><stop stopColor="#ffb555"/><stop offset=".42" stopColor="#ff8b21"/><stop offset=".88" stopColor="#e75c05"/><stop offset="1" stopColor="#a63c00"/></radialGradient><linearGradient id="rim" x2="1" y2="1"><stop stopColor="#ffd08c"/><stop offset=".3" stopColor="#ff9b38"/><stop offset="1" stopColor="#9b3f05"/></linearGradient></defs>
    <ellipse cx="153" cy="315" rx="95" ry="13" fill="#6b3b16" opacity=".12"/>
    <circle cx="153" cy="151" r="139" fill="url(#rim)" stroke="#6e360c" strokeWidth="3"/>
    <circle cx="148" cy="145" r="128" fill="url(#gold)" stroke="#ffb769" strokeWidth="3"/>
    <circle cx="148" cy="145" r="115" fill="none" stroke="#ffd19a" strokeWidth="1.5" opacity=".6"/>
    <path d="M49 92A110 110 0 0 1 115 42" fill="none" stroke="#fff3d4" strokeWidth="9" strokeLinecap="round" opacity=".55"/>
    {value&&<text x="148" y="109" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize={value.length>6?39:48} fill="white">{value}</text>}
    <g transform={`translate(0,${value?17:0})`} stroke="#542907" strokeWidth="5" strokeLinecap="round" fill="none">
      <path d={mood==='worried'?'M94 140l22 -9 M182 131l22 9':'M94 134q10 -10 21 0 M181 134q10 -10 21 0'}/>
      {blink?<path d="M102 157h13 M183 157h13"/>:<g strokeWidth="0" fill="#3c200d"><ellipse cx="109" cy="156" rx="7" ry="11"/><ellipse cx="189" cy="156" rx="7" ry="11"/><circle cx="111" cy="152" r="2.5" fill="white"/><circle cx="191" cy="152" r="2.5" fill="white"/></g>}
      <path d={mood==='worried'?'M132 199q17 -18 34 0':'M129 185q19 27 39 0'} fill={mood==='worried'?'none':'#6b2c08'}/>
      <path d="M147 165q-7 13 3 14" strokeWidth="3"/>
    </g>
    <ellipse cx="89" cy={value?191:174} rx="14" ry="7" fill="#fd5240" opacity=".28"/><ellipse cx="209" cy={value?191:174} rx="14" ry="7" fill="#fd5240" opacity=".28"/>
  </svg>;
};

export const Cup=({size=260,t=0,face=true}:{size?:number;t?:number;face?:boolean})=><svg width={size} height={size*1.15} viewBox="0 0 260 300">
  <defs><linearGradient id="clay"><stop stopColor="#bd6534"/><stop offset=".25" stopColor="#e8a46c"/><stop offset=".65" stopColor="#ce7d45"/><stop offset="1" stopColor="#8c4627"/></linearGradient></defs>
  <ellipse cx="130" cy="277" rx="89" ry="12" fill="#663e27" opacity=".13"/>
  {[0,1,2].map(i=><path key={i} d={`M${95+i*35} 78q${-14+Math.sin(t*2+i)*9} -20 0 -37t0 -28`} fill="none" stroke="#94705a" strokeWidth="5" strokeLinecap="round" opacity={.18+.12*Math.sin(t*2+i)}/>)}
  <path d="M40 113L65 251Q130 278 196 251L220 113Z" fill="url(#clay)" stroke="#743d24" strokeWidth="3"/>
  {[148,168,188,208,228].map(y=><path key={y} d={`M${40+(y-113)*.18} ${y}Q130 ${y+28} ${220-(y-113)*.18} ${y}`} fill="none" stroke="#9d5730" opacity=".4" strokeWidth="2"/>)}
  <ellipse cx="130" cy="113" rx="90" ry="28" fill="#e6a26e" stroke="#743d24" strokeWidth="3"/><ellipse cx="130" cy="115" rx="79" ry="20" fill="#7b431e"/><ellipse cx="124" cy="112" rx="69" ry="13" fill="#b78043"/>
  <path d="M61 117q35 -18 73 -10" fill="none" stroke="#f3cf91" strokeWidth="3" opacity=".55"/>
  {face&&<g stroke="#4d2c1c" strokeWidth="4" strokeLinecap="round"><ellipse cx="104" cy="182" rx="5" ry="8" fill="#4d2c1c"/><ellipse cx="161" cy="182" rx="5" ry="8" fill="#4d2c1c"/><path d="M118 207q15 15 29 -2" fill="none"/><path d="M94 166q10 -5 18 0m38 0q10 -5 18 0" fill="none"/></g>}
</svg>;

const Kettle=()=> <svg width="190" height="180" viewBox="0 0 200 190"><defs><linearGradient id="metal"><stop stopColor="#90968e"/><stop offset=".3" stopColor="#f1eee3"/><stop offset=".7" stopColor="#a7aaa0"/><stop offset="1" stopColor="#686f67"/></linearGradient></defs><path d="M147 77Q199 -8 104 19" fill="none" stroke="#464a41" strokeWidth="13"/><path d="M45 72L10 42 8 62 37 105Z" fill="url(#metal)" stroke="#50544b" strokeWidth="3"/><path d="M46 62Q19 137 59 161Q107 179 157 155Q179 134 149 61Z" fill="url(#metal)" stroke="#50544b" strokeWidth="3"/><ellipse cx="98" cy="63" rx="53" ry="12" fill="#b3b6aa" stroke="#555c50" strokeWidth="3"/><path d="M80 51v-9h35v9" fill="#444b40"/><path d="M67 83Q47 123 72 146" fill="none" stroke="white" opacity=".6" strokeWidth="7" strokeLinecap="round"/></svg>;

const Cart=({t=0}:{t?:number})=><svg width="620" height="650" viewBox="0 0 620 650">
  <defs><linearGradient id="wood" x2="0" y2="1"><stop stopColor="#bb7d47"/><stop offset="1" stopColor="#75472c"/></linearGradient></defs>
  <ellipse cx="310" cy="604" rx="242" ry="20" fill="#4b3527" opacity=".12"/>
  <path d="M95 179V551M527 179V551" stroke="#6f4b31" strokeWidth="14"/>
  <path d="M68 165L118 88H508L558 165Z" fill={C.orange} stroke="#a64610" strokeWidth="4"/>
  {[0,1,2,3,4,5].map(i=><path key={i} d={`M${100+i*73} 165l25 -77h37l6 77Z`} fill="#fff1d7"/>)}
  <rect x="68" y="165" width="490" height="34" rx="8" fill="#c95610"/>
  <rect x="150" y="205" width="325" height="98" rx="9" fill={C.white} stroke="#c19669" strokeWidth="3" transform="rotate(-2 310 250)"/>
  <text x="311" y="272" textAnchor="middle" fontFamily="Arial Black" fontSize="58" fill={C.deep}>CHAI</text>
  <path d="M83 427h462v126H83Z" fill="url(#wood)" stroke="#68412c" strokeWidth="4"/>
  <rect x="65" y="409" width="500" height="27" rx="9" fill="#c08b5a" stroke="#68412c" strokeWidth="4"/>
  <path d="M105 459h418M105 492h418M105 525h418" stroke="#5d3927" strokeWidth="2" opacity=".4"/>
  <rect x="231" y="456" width="164" height="60" rx="8" fill={C.paper}/><text x="312" y="500" textAnchor="middle" fontFamily="Arial Black" fontSize="38" fill={C.ink}>₹20</text>
  {[145,477].map(x=><g key={x}><circle cx={x} cy="565" r="43" fill="#514335" stroke="#2c2a25" strokeWidth="6"/><circle cx={x} cy="565" r="29" fill="#b5a28a"/>{[0,1,2,3].map(i=><path key={i} d={`M${x-25*Math.cos(i*Math.PI/4)} ${565-25*Math.sin(i*Math.PI/4)}L${x+25*Math.cos(i*Math.PI/4)} ${565+25*Math.sin(i*Math.PI/4)}`} stroke="#695a49" strokeWidth="3"/>)}</g>)}
</svg>;

const Label=({children,x,y,rotate=0,color=C.ink}:{children:React.ReactNode;x:number;y:number;rotate?:number;color?:string})=><div style={{...at(x,y),background:C.white,padding:'12px 22px',fontSize:30,fontWeight:900,color,borderRadius:8,boxShadow:shadow,transform:`rotate(${rotate}deg)`}}>{children}</div>;
const Card=({x,y,w=650,children,rotate=0,scale=1}:{x:number;y:number;w?:number;children:React.ReactNode;rotate?:number;scale?:number})=><div style={{...at(x,y,w),padding:'28px 34px',borderRadius:15,boxShadow:shadow,background:C.white,transform:`rotate(${rotate}deg) scale(${Math.max(0,scale)})`,transformOrigin:'50% 50%'}}>{children}</div>;
const Eyebrow=({children}:{children:React.ReactNode})=><div style={{fontSize:21,fontWeight:700,letterSpacing:3,color:C.muted,marginBottom:14}}>{children}</div>;

// Word masks preserve space so lines never reflow during the reveal.
const Headline=({t,start,lines,size=79}:{t:number;start:number;lines:Array<Array<[string,boolean?]>>;size?:number})=>{
  let idx=0;
  return <div style={{...at(116,163,1510),fontFamily:'Arial Black, Arial',fontWeight:900,fontSize:size,lineHeight:1.15,letterSpacing:-2.7}}>
    {lines.map((line,i)=><div key={i} style={{display:'flex',gap:17,marginBottom:6}}>{line.map(([word,accent],j)=>{
      const q=ease((t-start-(idx++)*.115)/.23);
      return <span key={j} style={{display:'inline-block',overflow:'hidden',clipPath:`inset(0 ${(1-q)*100}% 0 0)`,background:accent?C.orange:'transparent',color:accent?'white':C.ink,padding:accent?'1px 10px':'1px 0'}}>{word}</span>;
    })}</div>)}
  </div>;
};

const Scene=({t,start,end,children}:{t:number;start:number;end:number;children:React.ReactNode})=>{
  if(t<start||t>=end)return null;
  const enter=ease((t-start)/.36),exit=ease((t-(end-.22))/.22);
  return <AbsoluteFill style={{opacity:1-exit,transform:`translate(${(1-enter)*80-exit*65}px,${(1-enter)*12}px) scale(${1+.015*Math.sin((t-start)*.45)})`,filter:`blur(${(1-enter)*4+exit*5}px)`}}>{children}</AbsoluteFill>;
};

export const ChaiFilm=()=>{
  const t=useCurrentFrame()/60;
  const volume=Math.round(100*ease((t-5.35)/1.55));
  const cost1=ease((t-9.7)/.7),cost2=ease((t-10.8)/.7),cost3=ease((t-11.6)/.7),cost4=ease((t-12.4)/.7);
  const subtract=ease((t-16.5)/1.0);
  return <AbsoluteFill style={{background:C.paper,color:C.ink,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
    <AbsoluteFill style={{background:'radial-gradient(ellipse at 24% 52%,#ffb16d20 0%,transparent 44%),radial-gradient(ellipse at 82% 23%,#ffa45012 0%,transparent 36%)'}}/>
    <AbsoluteFill style={{backgroundImage:'radial-gradient(#9e7f5b28 0.9px, transparent 1px)',backgroundSize:'25px 25px',opacity:.55}}/>
    <Img src={staticFile('paper.png')} style={{position:'absolute',width:1920,height:1080,opacity:.2,mixBlendMode:'multiply'}}/>
    <div style={{...at(116,71),fontSize:21,letterSpacing:3.8,fontWeight:800,color:C.deep}}>EK CUP KA HISAAB</div>
    <div style={{position:'absolute',right:115,top:71,fontSize:20,color:C.muted,letterSpacing:1.5}}>30 SECOND STUDY · 01</div>

    <Scene t={t} start={0} end={5}>
      <Headline t={t} start={.15} lines={[[['₹20',true],['ki chai.']],[['Poore ₹20'],['tumhare?',true]]]}/>
      <div style={{...at(185,401),transformOrigin:'0 0',transform:`translateX(${mix(-180,0,ease((t-.2)/.65))}px) rotate(${mix(-7,0,ease((t-.2)/.7))}deg) scale(.88)`}}><Cart t={t}/></div>
      <div style={{...at(400,612),transformOrigin:'50% 100%',transform:`scale(${.88*pop(t,.65,.6)})`}}><Kettle/></div>
      <div style={{...at(1125,390),transform:`translateY(${Math.sin(t*1.5)*6}px) scale(${pop(t,.6,.7)}) rotate(-5deg)`}}><Cup size={305} t={t}/></div>
      <div style={{...at(1430,590),transform:`translate(${mix(160,0,ease((t-1.1)/.5))}px,${Math.sin(t*1.7)*5}px) scale(${pop(t,1.1)})`}}><Coin size={265} value="₹20" mood={t>2.6?'worried':'happy'} t={t}/></div>
      <Label x={1120} y={790} rotate={-4}>Ek cup · ₹20</Label>
      {t>2.65&&<div style={{...at(1460,480),fontSize:130,color:C.deep,fontFamily:'Arial Black',transform:`rotate(12deg) scale(${pop(t,2.65)})`}}>?</div>}
    </Scene>

    <Scene t={t} start={5} end={9.3}>
      <Headline t={t} start={5.15} lines={[[['100 cup'],['roz bike.',true]],[['Bikri hui...']]]}/>
      <div style={{...at(135,440),display:'grid',gridTemplateColumns:'repeat(10, 55px)',gap:'0px 14px',transform:`rotate(-3deg) scale(${mix(.8,1,ease((t-5.1)/.8))})`}}>{Array.from({length:100},(_,i)=><div key={i} style={{opacity:i<volume?1:.13,transform:`translateY(${i<volume?0:8}px)`}}><Cup size={42} t={t+i*.03} face={false}/></div>)}</div>
      <Card x={1115} y={472} w={600} rotate={3} scale={pop(t,5.5,.6)}>
        <Eyebrow>ROZ KI BIKRI</Eyebrow><div style={{fontWeight:900,fontSize:38}}>₹20 × {volume} cup</div>
        <div style={{height:2,background:'#ddd3c6',margin:'24px 0'}}/><div style={{fontFamily:'Arial Black',fontSize:112,letterSpacing:-5}}>{num(volume*20)}</div>
        <div style={{fontSize:24,color:C.muted,marginTop:12}}>Revenue · abhi kharch baaki hai</div>
      </Card>
      <div style={{...at(910,755),transform:`scale(${pop(t,7,.6)})`}}><Coin size={195} value="₹2,000" t={t}/></div>
    </Scene>

    <Scene t={t} start={9.3} end={14.7}>
      <Headline t={t} start={9.4} lines={[[['Har cup mein'],['kharcha.',true]]]} size={82}/>
      {[{label:'Doodh',n:5,p:cost1,icon:'milk'},{label:'Chai patti',n:1,p:cost2,icon:'tea'},{label:'Cheeni',n:1,p:cost3,icon:'sugar'},{label:'Cup',n:1,p:cost4,icon:'cup'}].map((c,i)=><Card key={i} x={130+i*425} y={400} w={365} rotate={[-3,2,-2,3][i]} scale={pop(t,9.5+i*.8,.5)}>
        <div style={{height:190,display:'flex',alignItems:'center',justifyContent:'center'}}>
          {c.icon==='cup'?<Cup size={150} t={t}/>:c.icon==='milk'?<svg width="115" height="165" viewBox="0 0 115 165"><path d="M33 7h49v34l16 30v85H17V71l16-30Z" fill="#f8f5e9" stroke="#9c9b8d" strokeWidth="3"/><path d="M32 7h50v20H32" fill={C.orange}/><rect x="25" y="82" width="65" height="45" rx="5" fill="#f6b67e"/><text x="57" y="110" textAnchor="middle" fontSize="17" fontWeight="900">MILK</text></svg>:c.icon==='tea'?<svg width="160" height="150" viewBox="0 0 160 150"><path d="M45 100Q8 21 86 14Q131 93 57 109" fill="#59774a" stroke="#3a4e32" strokeWidth="4"/><path d="M42 132Q46 84 86 14M55 94L34 55M65 67l38 -12" fill="none" stroke="#a9bc79" strokeWidth="4"/><ellipse cx="110" cy="123" rx="33" ry="11" fill="#835234"/><path d="M86 118l13-17 11 12 13-15 13 22" fill="#5e3e29"/></svg>:<svg width="160" height="145" viewBox="0 0 160 145"><path d="M25 65l46-25 45 21-44 30Z" fill="#fff" stroke="#d2c9b8" strokeWidth="3"/><path d="M25 65v52l47 23V91M72 91l44-30v53l-44 26" fill="#f4e9d7" stroke="#d2c9b8" strokeWidth="3"/><path d="M85 28l25-15 28 12-25 17Z" fill="#fff" stroke="#d2c9b8" strokeWidth="3"/><path d="M85 28v31l28 15V42l25-17v30l-25 19" fill="#f4e9d7" stroke="#d2c9b8" strokeWidth="3"/></svg>}
        </div>
        <div style={{fontSize:30,fontWeight:800,textAlign:'center',marginTop:20}}>{c.label}</div><div style={{fontFamily:'Arial Black',fontSize:65,color:C.deep,textAlign:'center',marginTop:12}}>₹{Math.round(c.n*c.p)}</div>
      </Card>)}
      <div style={{...at(500,850),fontSize:44,fontWeight:900,opacity:ease((t-12.9)/.4)}}>₹8 × 100 cup = <span style={{color:C.red}}>₹800 ka kharcha</span></div>
    </Scene>

    <Scene t={t} start={14.7} end={20}>
      <Headline t={t} start={14.8} lines={[[['Bache ₹1,200.']],[['Phir roz ke'],['₹500 aur.',true]]]} size={76}/>
      <Card x={1220} y={240} w={560} rotate={3} scale={pop(t,15.4,.55)}>
        <Eyebrow>DAILY OVERHEAD · MAAN LO</Eyebrow>{[['Kiraya','₹250'],['Gas + bijli','₹150'],['Safai + doosra','₹100']].map(([a,b],i)=><div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:31,fontWeight:800,margin:'18px 0',opacity:ease((t-15.6-i*.25)/.3)}}><span>{a}</span><span style={{color:C.red}}>{b}</span></div>)}
      </Card>
      <div style={{...at(150,628),fontSize:23,fontWeight:800,letterSpacing:2,color:C.muted}}>₹2,000 KI BIKRI KAHAN GAYI?</div>
      <div style={{...at(150,690,1610),height:126,display:'flex',borderRadius:14,overflow:'hidden',boxShadow:'0 8px 14px #49301815'}}>
        <div style={{width:'40%',background:C.red,display:'flex',alignItems:'center',justifyContent:'center',fontSize:47,fontWeight:900,color:'white'}}>₹800</div>
        <div style={{width:`${25*subtract}%`,background:'#c78c56',display:'flex',alignItems:'center',justifyContent:'center',fontSize:47,fontWeight:900,color:'white',overflow:'hidden'}}>{subtract>.65?'₹500':''}</div>
        <div style={{flex:1,background:C.orange,display:'flex',alignItems:'center',justifyContent:'center',fontSize:47,fontWeight:900,color:'white'}}>{num(1200-500*subtract)}</div>
      </div>
      <div style={{...at(150,850,1610),display:'flex',fontSize:27,fontWeight:700,color:C.muted}}><span style={{width:'40%'}}>Saamaan + cup</span><span style={{width:'25%',opacity:subtract}}>Roz ka kharcha</span><span style={{color:C.deep}}>Bacha hua</span></div>
    </Scene>

    <Scene t={t} start={20} end={24.8}>
      <Headline t={t} start={20.1} lines={[[['Aakhir mein...']],[['₹700',true],['bache.']]]}/>
      <div style={{...at(1160,300),transform:`translateY(${Math.sin(t*1.8)*5}px) scale(${pop(t,20.25,.7)}) rotate(4deg)`}}><Coin size={450} value="₹700" t={t}/></div>
      <Card x={153} y={541} w={790} rotate={-2} scale={pop(t,20.6,.6)}>
        <Eyebrow>IS ILLUSTRATIVE EXAMPLE MEIN</Eyebrow><div style={{fontSize:58,fontWeight:900,letterSpacing:-2,color:C.green}}>₹2,000 − ₹800 − ₹500</div><div style={{fontSize:27,marginTop:18,color:C.muted}}>Bikri − saamaan − daily overhead</div>
      </Card>
      <Label x={1115} y={854} rotate={-3} color={C.red}>Apni mehnat ki keemat? Alag.</Label>
      <div style={{...at(168,847,820),fontSize:29,lineHeight:1.45,opacity:ease((t-22.3)/.45)}}>₹700 owner labour, tax aur setup cost se pehle.<br/><b>Yeh final net profit nahi hai.</b></div>
    </Scene>

    <Scene t={t} start={24.8} end={30.5}>
      <Headline t={t} start={24.95} lines={[[['Kharch kaatkar']],[['kitna'],['bacha?',true]]]} size={91}/>
      <Card x={185} y={508} w={650} rotate={-3} scale={pop(t,25.15,.6)}><Eyebrow>DIKHNE WAALI BIKRI</Eyebrow><div style={{fontSize:102,fontFamily:'Arial Black',letterSpacing:-5}}>₹2,000</div><div style={{fontSize:27,color:C.muted,marginTop:14}}>100 cup × ₹20</div></Card>
      <div style={{...at(915,550),fontFamily:'Arial Black',fontSize:119,color:C.red,transform:`rotate(-6deg) scale(${pop(t,25.65,.5)})`}}>≠</div>
      <Card x={1110} y={508} w={620} rotate={3} scale={pop(t,26,.6)}><Eyebrow>KHARCH KE BAAD BACHE</Eyebrow><div style={{fontSize:102,fontFamily:'Arial Black',letterSpacing:-5,color:C.green}}>₹700*</div><div style={{fontSize:27,color:C.muted,marginTop:14}}>Owner labour aur tax se pehle</div></Card>
      <div style={{...at(1130,805),fontSize:27,color:C.muted,opacity:ease((t-26.4)/.5)}}>*Setup cost bhi abhi shamil nahi.</div>
      <div style={{...at(180,877),fontSize:37,fontWeight:800,opacity:ease((t-27)/.6)}}>Bikri suno. <span style={{color:C.deep}}>Hisaab bhi poochho.</span></div>
    </Scene>

    <div style={{position:'absolute',left:116,right:116,bottom:53,display:'flex',justifyContent:'space-between',fontSize:18,color:'#81776b',fontWeight:600}}><span>ILLUSTRATIVE NUMBERS · ACTUAL COSTS VARY</span><span>ORIGINAL MOTION STUDY · SYNTHETIC HINDI VOICE</span></div>
    <div style={{position:'absolute',bottom:0,left:0,height:5,width:`${Math.min(t/30,1)*100}%`,background:C.orange}}/>
    <Audio src={staticFile('mix.wav')}/>
  </AbsoluteFill>;
};
