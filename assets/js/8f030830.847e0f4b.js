"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[618],{5201:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>a});var i=s(5893),t=s(1151);const r={sidebar_position:5,title:"Environment"},o=void 0,l={id:"development",title:"Environment",description:"This guide steps you through configuring a local development environment for the Nexus Graph on macOS and Linux. If",source:"@site/docs/development.md",sourceDirName:".",slug:"/development",permalink:"/docs/development",draft:!1,unlisted:!1,editUrl:"https://github.com/QubitPi/nexusgraph/tree/master/docs/docs/development.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"Environment"},sidebar:"tutorialSidebar",previous:{title:"Design",permalink:"/docs/design"},next:{title:"Graph API",permalink:"/docs/graph-api"}},c={},a=[{value:"Development Environment",id:"development-environment",level:2},{value:"Clone the Repository",id:"clone-the-repository",level:3},{value:"System Dependencies",id:"system-dependencies",level:3},{value:"Xcode CLI tools (Mac specific)",id:"xcode-cli-tools-mac-specific",level:4},{value:"Brew",id:"brew",level:4},{value:"Node 18 &amp; Yarn",id:"node-18--yarn",level:3},{value:"Configure environment variables",id:"configure-environment-variables",level:3},{value:"Used",id:"used",level:4},{value:"Start Docker Compose to support Astraios requests",id:"start-docker-compose-to-support-astraios-requests",level:3},{value:"Load Neo4J Arc from Local",id:"load-neo4j-arc-from-local",level:3},{value:"Bootstrap",id:"bootstrap",level:2},{value:"Running the Development Server",id:"running-the-development-server",level:2},{value:"Available Scripts",id:"available-scripts",level:3},{value:"Writing TypeDoc",id:"writing-typedoc",level:2},{value:"Submitting Code",id:"submitting-code",level:2},{value:"Signing Commits with GPG Key",id:"signing-commits-with-gpg-key",level:3},{value:"Create GPG Key Locally",id:"create-gpg-key-locally",level:4},{value:"Configuring git to Use GPG Key",id:"configuring-git-to-use-gpg-key",level:4},{value:"Uploading GPG Key to GitHub",id:"uploading-gpg-key-to-github",level:4},{value:"Signing Commits",id:"signing-commits",level:5},{value:"Submitting",id:"submitting",level:3},{value:"CI/CD",id:"cicd",level:2},{value:"E2E Tests",id:"e2e-tests",level:3},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"React: Cannot assign to read only property <code>xxx</code> of object <code>#&lt;Object&gt;</code>",id:"react-cannot-assign-to-read-only-property-xxx-of-object-object",level:3},{value:"Docusaurus Relative Linking is Treated False-Negative by CI Markdown Link check",id:"docusaurus-relative-linking-is-treated-false-negative-by-ci-markdown-link-check",level:3},{value:"ESLint Reports False-Negative",id:"eslint-reports-false-negative",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",h5:"h5",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"This guide steps you through configuring a local development environment for the Nexus Graph on macOS and Linux. If\nyou're using another operating system (Plan 9, BeOS, Windows, ...) the instructions are still roughly the same, but we\ndon't maintain any official documentation for anything else for now."}),"\n",(0,i.jsxs)(n.p,{children:["Read about known issues in ",(0,i.jsx)(n.a,{href:"#troubleshooting",children:"the troubleshooting section"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"development-environment",children:"Development Environment"}),"\n",(0,i.jsx)(n.p,{children:"This will guide you through manually setting up your development environment."}),"\n",(0,i.jsx)(n.h3,{id:"clone-the-repository",children:"Clone the Repository"}),"\n",(0,i.jsxs)(n.p,{children:["To get started, clone the ",(0,i.jsx)(n.a,{href:"https://github.com/QubitPi/nexusgraph",children:"repo"})," or your fork."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"git clone git@github.com:QubitPi/nexusgraph.git\ncd nexusgraph\n"})}),"\n",(0,i.jsx)(n.p,{children:"We're going to be working out of this repository for the remainder of the setup."}),"\n",(0,i.jsx)(n.h3,{id:"system-dependencies",children:"System Dependencies"}),"\n",(0,i.jsx)(n.p,{children:"Let's make sure that our system is ready for Nexus Graph."}),"\n",(0,i.jsx)(n.h4,{id:"xcode-cli-tools-mac-specific",children:"Xcode CLI tools (Mac specific)"}),"\n",(0,i.jsx)(n.p,{children:"We'll need to first install Xcode CLI tools. Run this command and follow the instructions:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"xcode-select --install\n"})}),"\n",(0,i.jsx)(n.h4,{id:"brew",children:"Brew"}),"\n",(0,i.jsxs)(n.p,{children:["Install ",(0,i.jsx)(n.a,{href:"http://brew.sh",children:"Homebrew"}),", and then run the following command to install\n",(0,i.jsx)(n.a,{href:"https://formulae.brew.sh/formula/gnupg",children:"GPG"})," as we will ",(0,i.jsx)(n.a,{href:"#signing-commits-with-gpg-key",children:"need it later"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"brew install gnupg\n"})}),"\n",(0,i.jsx)(n.h3,{id:"node-18--yarn",children:"Node 18 & Yarn"}),"\n",(0,i.jsxs)(n.p,{children:["Installing ",(0,i.jsx)(n.a,{href:"https://nodejs.org/en",children:"node.js"})," and ",(0,i.jsx)(n.a,{href:"https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable",children:"Yarn"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm install --global yarn\n"})}),"\n",(0,i.jsx)(n.h3,{id:"configure-environment-variables",children:"Configure environment variables"}),"\n",(0,i.jsxs)(n.p,{children:["Create a ",(0,i.jsxs)(n.a,{href:"https://create-react-app.dev/docs/adding-custom-environment-variables/",children:[(0,i.jsx)(n.code,{children:".env"})," file"]})," which contains all runtime variables Nexus Graph needs. The following variables\nneeds to be defined:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"THERESA_API_URL"})," The URL of ",(0,i.jsx)(n.a,{href:"https://theresa-api.com",children:"Theresa API"})," instance, Used turning Natural Language Texts\ninto Knowledge Graphs"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"LOGTO_ENDPOINT_URL"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://docs.logto.io/",children:"Logto"})," offers a comprehensive identity solution covering both the front and backend,\ncomplete with pre-built infrastructure and enterprise-grade solutions."]}),"\n",(0,i.jsx)(n.li,{children:"In the Nexus Graph we use Logto to verify that the user has logged in and automatically generate the user login page"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"LOGTO_ENDPOINT_URL"})," is the URL of your server that will receive the ",(0,i.jsx)(n.a,{href:"https://docs.logto.io/docs/recipes/webhooks/configure-webhooks-in-console/",children:"webhook"})," POST requests when the\nevent occurs."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"LOGTO_SIGN_IN_CALLBACK_URL"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://www.oauth.com/oauth2-servers/redirect-uris/",children:"Redirect URI"})," is an OAuth 2.0 concept which implies the location should redirect after authentication"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"LOGTO_SIGN_IN_CALLBACK_URL"})," is the redirect url after authentication"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"TEST_USER_EMAIL"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://docs.logto.io/docs/references/users/#username",children:"Email"})," is used for sign-in with username and password."]}),"\n",(0,i.jsxs)(n.li,{children:["In Nexus Graph the ",(0,i.jsx)(n.strong,{children:"TEST_USER_EMAIL"})," defines a user name dedicated to local login"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"TEST_USER_PASSWORD"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Password is used for sign-in with username and password."}),"\n",(0,i.jsxs)(n.li,{children:["In Nexus Graph the ",(0,i.jsx)(n.strong,{children:"TEST_USER_PASSWORD"})," defines a password dedicated to local login"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"ASTRAIOS_GRAPHQL_API_ENDPOINT"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://astraios.io/",children:"Astraios"})," is a JSR 370 web service template that lets us spin up model driven GraphQL or JSON API web\nservice with minimal effort."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"ASTRAIOS_GRAPHQL_API_ENDPOINT"})," Define the endpoint that sends GraphQL requests to Astraios"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"ASTRAIOS_JSON_API_ENDPOINT"})," Define the endpoint that sends JSON requests to Astraios"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"used",children:"Used"}),"\n",(0,i.jsxs)(n.p,{children:["An example ",(0,i.jsx)(n.code,{children:".env"})," file is provided in ",(0,i.jsxs)(n.a,{href:"https://github.com/QubitPi/nexusgraph/blob/master/.env.test",children:[(0,i.jsx)(n.code,{children:".env.test"})," file"]})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"THERESA_API_URL=http://localhost:5000/\nLOGTO_ENDPOINT_URL=https://u4v5ne.logto.app/\nLOGTO_SIGN_IN_CALLBACK_URL=http://localhost:8080/login\nLOGTO_APP_ID=ypon89z8rtrjdg5ta669l\nTEST_USER_EMAIL=test123\nTEST_USER_PASSWORD=test123123\nASTRAIOS_GRAPHQL_API_ENDPOINT=http://localhost:8080/v1/data/\nASTRAIOS_JSON_API_ENDPOINT=http://localhost:8080/v1/data/\nNODE_ENV=development\n"})}),"\n",(0,i.jsxs)(n.p,{children:["locally and copy the contents of the ",(0,i.jsx)(n.code,{children:".env.test"})," file to the ",(0,i.jsx)(n.code,{children:".env"})," file."]}),"\n",(0,i.jsx)(n.h3,{id:"start-docker-compose-to-support-astraios-requests",children:"Start Docker Compose to support Astraios requests"}),"\n",(0,i.jsxs)(n.p,{children:["You can refer to ",(0,i.jsx)(n.a,{href:"https://astraios.io/docs/development#running-webservice-in-docker-compose",children:"Astraios Docs"})," to learn how to run Webservice in Docker Compose"]}),"\n",(0,i.jsx)(n.h3,{id:"load-neo4j-arc-from-local",children:"Load Neo4J Arc from Local"}),"\n",(0,i.jsx)(n.p,{children:"Nexus Graph's graphing capabilities is externalized to Neo4J's. When we update the library and would like to see it's\nimmediate effects, we could have nexusgraph manually depend on the local version:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/QubitPi/neo4j-browser.git\ncd neo4j-browser/src/neo4j-arc\nyarn && yarn build\n"})}),"\n",(0,i.jsxs)(n.p,{children:["In nexusgraph, delete the ",(0,i.jsx)(n.code,{children:'"neo4j-devtools-arc": "^x.y.z",'})," from ",(0,i.jsx)(n.code,{children:"dependencies"})," section in\n",(0,i.jsx)(n.a,{href:"https://github.com/QubitPi/nexusgraph/blob/master/packages/nexusgraph-graph/package.json",children:(0,i.jsx)(n.code,{children:"packages/nexusgraph-graph/package.json"})}),"\nand run"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"yarn add /abs/path/to/neo4j-browser/src/neo4j-arc/\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"yarn && yarn start\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["When we are done, do not forget to put ",(0,i.jsx)(n.code,{children:'"neo4j-devtools-arc": "^x.y.z"'})," back into ",(0,i.jsx)(n.code,{children:"package.json"})]})}),"\n",(0,i.jsx)(n.h2,{id:"bootstrap",children:"Bootstrap"}),"\n",(0,i.jsxs)(n.p,{children:["Nexus Graph uses ",(0,i.jsx)(n.a,{href:"https://classic.yarnpkg.com/lang/en/docs/workspaces/",children:"yarn workspace"})," to manage different components.\nThe command below shall install all the dependencies and put them in ",(0,i.jsx)(n.code,{children:"node_modules"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"yarn\n"})}),"\n",(0,i.jsx)(n.p,{children:"Once this command has finished we'll have Nexus Graph ready in development mode with all its required dependencies."}),"\n",(0,i.jsx)(n.h2,{id:"running-the-development-server",children:"Running the Development Server"}),"\n",(0,i.jsxs)(n.p,{children:["Now we can run the development server at ",(0,i.jsx)(n.code,{children:"http://localhost:3000"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"mv .env.test .env && yarn start\n"})}),"\n",(0,i.jsx)(n.h3,{id:"available-scripts",children:"Available Scripts"}),"\n",(0,i.jsxs)(n.p,{children:["After that, inside ",(0,i.jsx)(n.em,{children:"nexusgraph"})," directory, we can run several commands:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"yarn start"}),": Runs the app in the development mode. Open ",(0,i.jsx)(n.code,{children:"http://localhost:3000"})," to view it in\nthe browser. The page will reload if you make edits. You will also see any lint errors in the console."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"yarn test"}),": Runs all tests, including unit and integration tests"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"yarn build"}),": Builds the app for production to the ",(0,i.jsx)(n.code,{children:"build"})," folder. It correctly bundles React in production mode and\noptimizes the build for the best performance. The build is minified and the filenames include the hashes."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"yarn cypress:open"}),": Opens up the ",(0,i.jsx)(n.a,{href:"https://docs.cypress.io/guides/overview/why-cypress",children:"Cypress End-to-End testing"})," dashboard"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"yarn e2e"}),": Run end-to-end test"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"yarn wait-on-dev"}),": Auxiliary command for e2e test which waits for production server\n",(0,i.jsx)(n.code,{children:"http://localhost:3000"})," to become available on CI/CD server"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Happy building awesome knowledge graph app!"}),"\n",(0,i.jsx)(n.h2,{id:"writing-typedoc",children:"Writing TypeDoc"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.a,{href:"https://nexusgraph.qubitpi.org/api",children:"nexusgraph API"})," page was automatically generated by ",(0,i.jsx)(n.a,{href:"https://typedoc.org/guides/overview/",children:"TypeDoc"}),", which parses the inline documentation\nof nexusgraph source code. To generated them locally"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"cd docs\nyarn typedoc\n"})}),"\n",(0,i.jsx)(n.p,{children:"We can have TypeDoc watch for changes from the command line by using"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"yarn typedoc-watch\n"})}),"\n",(0,i.jsx)(n.h2,{id:"submitting-code",children:"Submitting Code"}),"\n",(0,i.jsx)(n.h3,{id:"signing-commits-with-gpg-key",children:"Signing Commits with GPG Key"}),"\n",(0,i.jsx)(n.p,{children:"The purpose of GPG key is to sign the code for the authorship of our contributor."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Error loading gpg-example.png",src:s(1567).Z+"",width:"1000",height:"114"})}),"\n",(0,i.jsx)(n.p,{children:"This section teaches how to create a GPG key locally, upload it to GitHub, and use to sign future commits."}),"\n",(0,i.jsx)(n.h4,{id:"create-gpg-key-locally",children:"Create GPG Key Locally"}),"\n",(0,i.jsx)(n.p,{children:"In terminal, execute"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"gpg --full-generate-key\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["key size must be ",(0,i.jsx)(n.strong,{children:"4096"})," bits"]}),"\n",(0,i.jsx)(n.li,{children:"email must be the one associated with your GitHub account"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"To obtain the GPG key ID created just now:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"gpg --list-secret-keys --keyid-format=long\n"})}),"\n",(0,i.jsx)(n.p,{children:"An example output might be:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"$ gpg --list-secret-keys --keyid-format=long\n/Users/hubot/.gnupg/secring.gpg\n------------------------------------\nsec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]\nuid                          Hubot <hubot@example.com>\nssb   4096R/4BB6D45482678BE3 2016-03-10\n"})}),"\n",(0,i.jsxs)(n.p,{children:["In the example above, the ",(0,i.jsx)(n.strong,{children:"GPG key ID is 3AA5C34371567BD2"}),"; ",(0,i.jsx)(n.em,{children:"we will be using this key ID in the following\ndiscussion"})]}),"\n",(0,i.jsxs)(n.admonition,{type:"info",children:[(0,i.jsx)(n.p,{children:"In case we would want to delete that key, we could do so by"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"gpg --delete-secret-keys 3AA5C34371567BD2\n"})})]}),"\n",(0,i.jsx)(n.h4,{id:"configuring-git-to-use-gpg-key",children:"Configuring git to Use GPG Key"}),"\n",(0,i.jsxs)(n.p,{children:["We now instruct ",(0,i.jsx)(n.code,{children:"git"})," to pick up the GPG key at every git commit:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"git config --global user.signingkey 3AA5C34371567BD2\n"})}),"\n",(0,i.jsx)(n.h4,{id:"uploading-gpg-key-to-github",children:"Uploading GPG Key to GitHub"}),"\n",(0,i.jsx)(n.p,{children:"Printout the GPG key in ASCII armor format:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"gpg --armor --export 3AA5C34371567BD2\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Copy the command output, i.e. the GPG key, including the ",(0,i.jsx)(n.strong,{children:"-----BEGIN PGP PUBLIC KEY BLOCK-----"}),", the\n",(0,i.jsx)(n.strong,{children:"-----END PGP PUBLIC KEY BLOCK-----"}),", as well as the contents in between."]}),"\n",(0,i.jsxs)(n.p,{children:["Then following the ",(0,i.jsx)(n.a,{href:"https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account",children:"official documentation"})," to upload the GPG key onto your GitHub account."]}),"\n",(0,i.jsx)(n.h5,{id:"signing-commits",children:"Signing Commits"}),"\n",(0,i.jsxs)(n.admonition,{type:"info",children:[(0,i.jsxs)(n.p,{children:["If this is your first time submitting code using ",(0,i.jsx)(n.em,{children:"git"}),", make sure to bind your GitHub username and account email first:"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'git config --global user.name "<username>"\ngit config --global user.email "<email>"\n'})}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Substitute ",(0,i.jsx)(n.code,{children:"<username>"})," and ",(0,i.jsx)(n.code,{children:"<email>"})," with your account info accordingly"]}),"\n"]})]}),"\n",(0,i.jsx)(n.p,{children:"To commit with GPG-signed:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'git commit -S -m "<commit message>"\n'})}),"\n",(0,i.jsx)(n.p,{children:"where"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"-S"})," tells git to sign the commit with GPG key"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<commit message>"})," should be adjusted accordingly"]}),"\n"]}),"\n",(0,i.jsxs)(n.admonition,{type:"tip",children:[(0,i.jsxs)(n.p,{children:["If the commit command above errors with ",(0,i.jsx)(n.strong,{children:"gpg: signing failed: Inappropriate ioctl for device"})," message,\n",(0,i.jsx)(n.a,{href:"https://github.com/keybase/keybase-issues/issues/2798#issue-205008630",children:"execute"}),":"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"export GPG_TTY=$(tty)\n"})}),(0,i.jsx)(n.p,{children:"then re-run the commit"})]}),"\n",(0,i.jsx)(n.h3,{id:"submitting",children:"Submitting"}),"\n",(0,i.jsx)(n.p,{children:"Before committing your code, please run the following checks locally in order to give ourselves better confidence that\nthe code will pass the automated checks online:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Prettier our code:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx prettier --write .\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Check code style using ESLint:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx eslint .\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["ESLint currently does not run on documentation source codes, i.e. ",(0,i.jsx)(n.code,{children:"/docs"})]})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Run all tests"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"yarn test\n"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"cicd",children:"CI/CD"}),"\n",(0,i.jsxs)(n.p,{children:["We use ",(0,i.jsx)(n.a,{href:"https://docs.github.com/en/actions",children:"GitHub Actions"})," for CI/CD, which contains 3 parts in the following order:"]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Code style check"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://hashicorp-aws.com/blog/yml-and-md-style-checks",children:"YAML & Markdown style checks"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://hashicorp-aws.com/blog/ui-code-style",children:"React & TypeScript code style checks by Prettier and ESLint"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Tests"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://hashicorp-aws.com/blog/ui-unit-test",children:"Unit tests"})}),"\n",(0,i.jsxs)(n.li,{children:["E2E tests via ",(0,i.jsx)(n.a,{href:"https://cypress.qubitpi.org",children:"Cypress"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/QubitPi/nexusgraph/blob/master/packages/nexusgraph-db/src/graph/default/DefaultGraphClient.ts#L28-L67",children:"JSON schema"}),"\ntests"]}),"\n",(0,i.jsxs)(n.li,{children:["Lighthouse test, an idea learned from\n",(0,i.jsx)(n.a,{href:"https://github.com/facebook/docusaurus/blob/main/.github/workflows/lighthouse-report.yml",children:"Docusaurus"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://hashicorp-aws.com/blog/npm-release",children:"Release to NPM"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Each part doesn't run until its previous dependency finishes successfully"}),"\n",(0,i.jsx)(n.h3,{id:"e2e-tests",children:"E2E Tests"}),"\n",(0,i.jsxs)(n.p,{children:["The E2E tests spins up an ",(0,i.jsx)(n.a,{href:"design#json-graphql-server",children:"in-memory database"})," to store the test graphs."]}),"\n",(0,i.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,i.jsxs)(n.h3,{id:"react-cannot-assign-to-read-only-property-xxx-of-object-object",children:["React: Cannot assign to read only property ",(0,i.jsx)(n.code,{children:"xxx"})," of object ",(0,i.jsx)(n.code,{children:"#<Object>"})]}),"\n",(0,i.jsxs)(n.p,{children:["This was caused by immer's ",(0,i.jsx)(n.code,{children:"produce"})," function which builds read-only deep copy of object. In Nexus Graph, all redux\nstates are make immutable using ",(0,i.jsx)(n.a,{href:"https://immerjs.github.io/immer/",children:"immer"}),", because, by experience, immutable states prevents bugs. As a result, all\nin-memory state mutations should utilize our dedicated ",(0,i.jsx)(n.code,{children:"immutable.ts"})," module. Failed to do that could result in the\nerror above because that indictes one is directly mutating our immutable states"]}),"\n",(0,i.jsx)(n.h3,{id:"docusaurus-relative-linking-is-treated-false-negative-by-ci-markdown-link-check",children:"Docusaurus Relative Linking is Treated False-Negative by CI Markdown Link check"}),"\n",(0,i.jsxs)(n.p,{children:["CI check for Markdown link (",(0,i.jsx)(n.code,{children:"markdown-link-check"}),") is turned on and it's not smart enough to detect relative linking by\nDocusaurus. The workaround is to disable the link check at the relevant line. For example:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-markdown",children:"\x3c!-- markdown-link-check-disable --\x3e\nknown. Additionally, this process makes it easy to implement a [blue-green deployment](continuous-delivery) or\n\x3c!-- markdown-link-check-enable --\x3e\n"})}),"\n",(0,i.jsx)(n.h3,{id:"eslint-reports-false-negative",children:"ESLint Reports False-Negative"}),"\n",(0,i.jsx)(n.p,{children:"Suppose we have the following TypeScript code"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"node.radius + 25;\n"})}),"\n",(0,i.jsx)(n.p,{children:"but ESLint complains that"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"error  Operands of '+' operation with any is possible only with string, number, bigint or any  @typescript-eslint/restrict-plus-operands\n"})}),"\n",(0,i.jsxs)(n.p,{children:["And we are sure that ",(0,i.jsx)(n.code,{children:"node.radius"})," by definition is a ",(0,i.jsx)(n.code,{children:"number"}),". This could happend due to the incorrect import, which\nresults ",(0,i.jsx)(n.code,{children:"node"})," type not properly imported. As a result, TypeScript sees ",(0,i.jsx)(n.code,{children:"node.radius"})," as to type ",(0,i.jsx)(n.code,{children:"any"})," because it\ndoesn't know what type ",(0,i.jsx)(n.code,{children:"node"})," is"]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1567:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/gpg-example-a82f69703583ff9b63b7c303c553e80b.png"},1151:(e,n,s)=>{s.d(n,{Z:()=>l,a:()=>o});var i=s(7294);const t={},r=i.createContext(t);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);