
var webGlObject = (function() { 
  return { 
    init: function() { 
      //alert('webGlObject initialized');
      $('.button-collapse').sideNav();
      setTimeout(function () {
        try {
          $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            hover: true, // Activate on hover
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'right' // Displays dropdown with edge aligned to the left of button
          }
        );
    } catch (e) {
      console.log(e);
    }
  }, 2000);
      
    }, 
    gnalytics: function() {
      setTimeout(function () {
        console.log('gnalytics called');
        try {
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  
          ga('create', 'UA-58475445-1', 'auto');
          ga('send', 'pageview');
         
        } catch (e) {
          console.log(e);
        }
      }, 2000);
    },
    gadsence: function() {
      setTimeout(function () {
        try {
          console.log('gadsence called');
          (adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "ca-pub-9232625970757401",
          enable_page_level_ads: true
        });
          
        } catch (e) {
        console.log(e);
      }
    }, 2000);
  },

  handleClientLoad: function() {
   
          console.log('adssss3333333s');
        gapi.client.init({
          client_id: '439913440733-t6cr4vc7l6r8go95npbjgsui4goknm62.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
     
  },
  glogin: function() {

    try {
      console.log('new try....--------');

    var scriptEl = document.createElement('script')
    document.body.appendChild(scriptEl);
    scriptEl.setAttribute("type","text/javascript");
    scriptEl.setAttribute("async","");
    scriptEl.setAttribute("defer","");
    scriptEl.setAttribute("src", "https://apis.google.com/js/api.js");
   // scriptEl.onload = handleClientLoad;
    console.log('new try...000000.');
  


        // gapi.client.init({
        //   client_id: '439913440733-t6cr4vc7l6r8go95npbjgsui4goknm62.apps.googleusercontent.com',
        //   cookiepolicy: 'single_host_origin',
        //   scope: 'profile email'
    
      
      } catch (e) {
      console.log(e);
    }
 
},


 initClient: function(){
	gapi.client.init({			
		'discoveryDocs': DISCOVERY_DOCS,
		'clientId': CLIENT_ID,
		'scope': SCOPES
	}).then(function(){			
		GoogleAuth = gapi.auth2.getAuthInstance();
		GoogleAuth.isSignedIn.listen(updateSigninStatus);
	
		console.log(GoogleAuth.currentUser.get().hasGrantedScopes(SCOPES));
		
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());			
		//=============
		authorizeButton.onclick = handleSignIn;
		signoutButton.onclick = handleSignout;
	},function(error){
		console.log(error);
	});
},

  fbinit: function() {
    setTimeout(function () {
      console.log('fb init called');
     
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
     
      window.fbAsyncInit = function() {
          FB.init({
            appId            : '1589003814712420',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.10',
            cookie: true
          });
          FB.AppEvents.logPageView();
          };
         
     
     
    }, 2000);
  }


  // gapiinit: function() {
  //   setTimeout(function () {
  //     try {
  //     console.log('gpai called');
  //     gapi.load('auth2', () => {
  //       this.auth2 = gapi.auth2.init({
  //         client_id: '439913440733-t6cr4vc7l6r8go95npbjgsui4goknm62.apps.googleusercontent.com',
  //         cookiepolicy: 'single_host_origin',
  //         scope: 'profile email'
  //       });
        
  //     });
         
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   }, 2000);
  // }






    
  } 
})(webGlObject||{})




// function init() {
//   if (window.initGapi != undefined) {
//       window.initGapi();
//   }
//   else {
//       setTimeout(init, 500); // wait for 500 ms
//   }
// } 