"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[189],{1454:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>d});var r=n(5893),s=n(1151);n(4866),n(5162);const a={sidebar_position:5,title:"Design"},i=void 0,l={id:"design",title:"Design",description:"The following guide is intended for developers who want to make changes to the Nexus Graph. It will cover the design of",source:"@site/docs/design.mdx",sourceDirName:".",slug:"/design",permalink:"/docs/design",draft:!1,unlisted:!1,editUrl:"https://github.com/QubitPi/nexusgraph/tree/master/docs/docs/design.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"Design"},sidebar:"tutorialSidebar",previous:{title:"Development",permalink:"/docs/development"}},o={},d=[{value:"Module Layout",id:"module-layout",level:2},{value:"High Level Design",id:"high-level-design",level:2},{value:"Dependency Injection",id:"dependency-injection",level:2},{value:"Redux Module",id:"redux-module",level:2},{value:"Graph Module",id:"graph-module",level:2},{value:"Database Module",id:"database-module",level:2},{value:"json-graphql-server",id:"json-graphql-server",level:3},{value:"Graph API",id:"graph-api",level:3},{value:"Separating Database&#39;s Primary Key and Business Object Identifier",id:"separating-databases-primary-key-and-business-object-identifier",level:4}];function c(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.p,{children:"The following guide is intended for developers who want to make changes to the Nexus Graph. It will cover the design of\nvarious subsystems."}),"\n",(0,r.jsx)(t.h2,{id:"module-layout",children:"Module Layout"}),"\n",(0,r.jsxs)(t.p,{children:["Elide is a ",(0,r.jsx)(t.a,{href:"https://qubitpi.github.io/monorepo.tools/",children:"mono-repo"})," consisting of the following published modules:"]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Module Name"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"nexusgraph-app"}),(0,r.jsx)(t.td,{children:"The user interface where user can use all features of Nexus Graph"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"nexusgraph-db"}),(0,r.jsx)(t.td,{children:"Graph Data storage for nexusgraph CRUD API queries"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"nexusgraph-graph"}),(0,r.jsx)(t.td,{children:"The core module that handles Graph rendering"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"nexusgraph-nlp"}),(0,r.jsx)(t.td,{children:"The AI module that transforms text/audio into knowledge graphs"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"nexusgraph-oauth"}),(0,r.jsx)(t.td,{children:"Handles Authentication"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"nexusgraph-redux"}),(0,r.jsx)(t.td,{children:"The state management of the entire app"})]})]})]}),"\n",(0,r.jsx)(t.h2,{id:"high-level-design",children:"High Level Design"}),"\n",(0,r.jsx)(t.p,{children:"The following diagram represents a high level component breakout of Nexus Graph. Names in italics represent class names\nwhereas other names represent functional blocks (made up of many classes). Gray arrows represent module dependencies\nthrough the system."}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"Error loading high-level-design.png",src:n(1323).Z+"",width:"2508",height:"1642"})}),"\n",(0,r.jsx)(t.h2,{id:"dependency-injection",children:"Dependency Injection"}),"\n",(0,r.jsx)(t.p,{children:"In order to optimize our developer's experience, Nexus Graph runs against very different configurations in\nDev/Test/Prod environments. This puts some challenges on the design of system. Dependency injection is one of them.\nFor example, in dev mode, we want our UI engineer to go completely free by decoupling backend developments. We do that\nby running in-memory backend services. This means for those services, we need to automatically wire up different\nimplementations in Dev and Prod environment."}),"\n",(0,r.jsxs)(t.p,{children:["To address that, we use ",(0,r.jsx)(t.a,{href:"https://inversify.qubitpi.org/",children:"Inversify"})," to dynamically load 2 of our components:"]}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsx)(t.li,{children:"AI Entity Extraction Service"}),"\n",(0,r.jsx)(t.li,{children:"Graph API Webservice"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"redux-module",children:"Redux Module"}),"\n",(0,r.jsxs)(t.p,{children:["We are not using ",(0,r.jsx)(t.a,{href:"https://redux-toolkit.qubitpi.org/",children:"Redux Toolkit"})," because we want greater control over our\napplication states"]}),"\n",(0,r.jsx)(t.p,{children:"We employ redux by defining a GlobalState and a bunch of slices, which include reduces, to manipulate these states."}),"\n",(0,r.jsx)(t.p,{children:'The module also maintains the domain model of a "Graph" which includes 3 representations:'}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsxs)(t.li,{children:["A ",(0,r.jsx)(t.a,{href:"https://nexusgraph.qubitpi.org/api/interfaces/nexusgraph_redux_src_graph_graphDuck.Node.html",children:"Node"})]}),"\n",(0,r.jsxs)(t.li,{children:["A ",(0,r.jsx)(t.a,{href:"https://nexusgraph.qubitpi.org/api/interfaces/nexusgraph_redux_src_graph_graphDuck.Link.html",children:"Link"})]}),"\n",(0,r.jsxs)(t.li,{children:["A ",(0,r.jsx)(t.a,{href:"https://nexusgraph.qubitpi.org/api/interfaces/nexusgraph_redux_src_graph_graphDuck.Graph.html",children:"Graph"})]}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["Basically, all Nexus Graph components agree on such data structure to model a graph. If a different representation is\nneeded, such as in nexusgraph-graph module, where a node needs to encode its position on a graph canvas, a\n",(0,r.jsx)(t.a,{href:"https://nexusgraph.qubitpi.org/api/functions/nexusgraph_graph_src_mappers.mapToBasicNodes.html",children:"separate transformation"}),"\nwould be needed"]}),"\n",(0,r.jsx)(t.p,{children:"Please keep in mind that Nexus Graph uses intensively 2 of the Redux's recommended practices:"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://redux.qubitpi.org/style-guide/#use-action-creators",children:"Selector Functions"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://redux.qubitpi.org/usage/deriving-data-selectors/#basic-selector-concepts",children:"Action Creators"})}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"graph-module",children:"Graph Module"}),"\n",(0,r.jsxs)(t.p,{children:["Our graph model is deeply nested, which causes a\n",(0,r.jsx)(t.a,{href:"https://stackoverflow.com/questions/62373936/component-not-updating-on-deeply-nested-redux-object",children:"huge pain on Redux state update"}),".\nWe take an\n",(0,r.jsx)(t.a,{href:"https://redux.qubitpi.org/usage/structuring-reducers/immutable-update-patterns/#immutable-update-utility-libraries",children:"immutable approach"}),"\nto address such issue."]}),"\n",(0,r.jsx)(t.h2,{id:"database-module",children:"Database Module"}),"\n",(0,r.jsx)(t.p,{children:"Nexus Graph is storage agnostic."}),"\n",(0,r.jsxs)(t.p,{children:["Semantic layer: ",(0,r.jsx)(t.code,{children:"GraphClient"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["Our free version comes with an in-memory ",(0,r.jsx)(t.a,{href:"https://github.com/QubitPi/json-graphql-server",children:"json-graphql-server"}),". We can host our own on-premise production version with\n",(0,r.jsx)(t.a,{href:"https://astraios.io",children:"astraios.io"}),", our official supported backend for storing graphs. Or we can implement our own ",(0,r.jsx)(t.a,{href:"#graph-api",children:"graph API"})]}),"\n",(0,r.jsx)(t.h3,{id:"json-graphql-server",children:"json-graphql-server"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"cd nexusgraph\nyarn start:graph-api\n"})}),"\n",(0,r.jsxs)(t.p,{children:["The server will be running at ",(0,r.jsx)(t.a,{href:"http://localhost:5000/",children:"http://localhost:5000/"}),"."]}),"\n",(0,r.jsx)(t.admonition,{type:"tip",children:(0,r.jsxs)(t.p,{children:["There is a very useful debugging technique: if you click the axios request to the server from browser console, it will\ntake you directly to the ",(0,r.jsx)(t.a,{href:"http://localhost:5000/",children:"http://localhost:5000/"})," with the actual query printed on it, ready to be re-sent for debugging\npurposes."]})}),"\n",(0,r.jsx)(t.h3,{id:"graph-api",children:"Graph API"}),"\n",(0,r.jsx)(t.h4,{id:"separating-databases-primary-key-and-business-object-identifier",children:"Separating Database's Primary Key and Business Object Identifier"}),"\n",(0,r.jsxs)(t.p,{children:["Each Node/Link/Graph is stored in database with a primary key. In Nexus Graph, however, we always use a ",(0,r.jsx)(t.a,{href:"http://en.wikipedia.org/wiki/Natural_key",children:"natural key"}),"\nnext to the primary key to identify between nodes and links. For example, if there are the following 2 nodes with a\nconnecting link:"]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{style:{textAlign:"center"},children:"Entity"}),(0,r.jsx)(t.th,{style:{textAlign:"center"},children:"Primary Key"}),(0,r.jsx)(t.th,{style:{textAlign:"center"},children:"Natural Key"}),(0,r.jsx)(t.th,{style:{textAlign:"center"},children:"Source Node Key"}),(0,r.jsx)(t.th,{style:{textAlign:"center"},children:"Target Node"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"Source Node"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"154436"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:(0,r.jsx)(t.strong,{children:"hs7YGDf"})}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"N/A"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"N/A"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"Target Node"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"634741"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:(0,r.jsx)(t.strong,{children:"3rIH83f"})}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"N/A"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"N/A"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"Link"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"27256"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"df09%HI"}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:(0,r.jsx)(t.strong,{children:"hs7YGDf"})}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:(0,r.jsx)(t.strong,{children:"3rIH83f"})})]})]})]}),"\n",(0,r.jsxs)(t.p,{children:["The two nodes (Source Node and Target Node) are connected by the two Natural Keys: ",(0,r.jsx)(t.code,{children:"hs7YGDf"})," & ",(0,r.jsx)(t.code,{children:"3rIH83f"})," instead of\n",(0,r.jsx)(t.code,{children:"154436"})," & ",(0,r.jsx)(t.code,{children:"634741"}),", because ID's are fragile. We cannot really rely on them not changing. When we choose to move to\nanother database platform, or a new version of the current platform, and we want to move all data using\n",(0,r.jsx)(t.a,{href:"https://www.w3schools.com/sql/sql_insert.asp",children:(0,r.jsx)(t.code,{children:"INSERT"})})," statements, it is possible to lose the ID fields."]}),"\n",(0,r.jsxs)(t.p,{children:["Nexus Graph uses ",(0,r.jsx)(t.a,{href:"https://www.npmjs.com/package/uuid",children:"UUID"})," to generate the natural key on client side and then persists\nit to database."]}),"\n",(0,r.jsx)(t.p,{children:"The database primary key in Nexus Graph is only used to distinguish a CREATE and UPDATE operation. If an object\n(node/link/graph) already exists (based on the provided primary key value) then it will be updated. Otherwise, it will\nbe created."})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},5162:(e,t,n)=>{n.d(t,{Z:()=>i});n(7294);var r=n(512);const s={tabItem:"tabItem_Ymn6"};var a=n(5893);function i(e){let{children:t,hidden:n,className:i}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,r.Z)(s.tabItem,i),hidden:n,children:t})}},4866:(e,t,n)=>{n.d(t,{Z:()=>w});var r=n(7294),s=n(512),a=n(2466),i=n(6550),l=n(469),o=n(1980),d=n(7392),c=n(12);function h(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return h(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:s}}=e;return{value:t,label:n,attributes:r,default:s}}))}(n);return function(e){const t=(0,d.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function x(e){let{queryString:t=!1,groupId:n}=e;const s=(0,i.k6)(),a=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,o._X)(a),(0,r.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(s.location.search);t.set(a,e),s.replace({...s.location,search:t.toString()})}),[a,s])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:s}=e,a=u(e),[i,o]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:a}))),[d,h]=x({queryString:n,groupId:s}),[g,m]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[s,a]=(0,c.Nk)(n);return[s,(0,r.useCallback)((e=>{n&&a.set(e)}),[n,a])]}({groupId:s}),f=(()=>{const e=d??g;return p({value:e,tabValues:a})?e:null})();(0,l.Z)((()=>{f&&o(f)}),[f]);return{selectedValue:i,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);o(e),h(e),m(e)}),[h,m,a]),tabValues:a}}var m=n(2389);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var j=n(5893);function b(e){let{className:t,block:n,selectedValue:r,selectValue:i,tabValues:l}=e;const o=[],{blockElementScrollPositionUntilNextRender:d}=(0,a.o5)(),c=e=>{const t=e.currentTarget,n=o.indexOf(t),s=l[n].value;s!==r&&(d(t),i(s))},h=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const n=o.indexOf(e.currentTarget)+1;t=o[n]??o[0];break}case"ArrowLeft":{const n=o.indexOf(e.currentTarget)-1;t=o[n]??o[o.length-1];break}}t?.focus()};return(0,j.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:a}=e;return(0,j.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>o.push(e),onKeyDown:h,onClick:c,...a,className:(0,s.Z)("tabs__item",f.tabItem,a?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function y(e){let{lazy:t,children:n,selectedValue:s}=e;const a=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=a.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,j.jsx)("div",{className:"margin-top--md",children:a.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==s})))})}function v(e){const t=g(e);return(0,j.jsxs)("div",{className:(0,s.Z)("tabs-container",f.tabList),children:[(0,j.jsx)(b,{...e,...t}),(0,j.jsx)(y,{...e,...t})]})}function w(e){const t=(0,m.Z)();return(0,j.jsx)(v,{...e,children:h(e.children)},String(t))}},1323:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/high-level-design-bb484a1f02a0b54360f5963b7ab444ca.png"},1151:(e,t,n)=>{n.d(t,{Z:()=>l,a:()=>i});var r=n(7294);const s={},a=r.createContext(s);function i(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);