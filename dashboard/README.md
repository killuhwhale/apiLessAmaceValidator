
<img src="https://raw.githubusercontent.com/killuhwhale/app_val_dashboard/main/public/images/appvalDashboard.png?sanitize=true&raw=true" />

 Modify .env to prod URL
  - NEXTAUTH_URL="http://localhost:3000"

# Post to API via Curl
## Create App credentials
  - curl -X POST  -H "Authorization: token_here"  -H "Content-Type: application/json"  http://localhost:3000/api/createCreds
    - Credentials for downloaded apps during automation.

#Possible Chrome Ext:

Change color of apps script since itsawful to look at white screen
    Paste in console.

    (function() {
      document.body.style.backgroundColor = "black";  // Change to your desired color

      var headers = document.querySelectorAll("header");
      for(var i = 0; i < headers.length; i++) {
        headers[i].style.backgroundColor = "black";  // Change to your desired color
      }

      var elements = document.querySelectorAll('[aria-label="Apps Script project pages"]');
      elements.forEach(function(element) {
        element.style.backgroundColor = "black";
      });
      var elements = document.querySelectorAll('[class="margin"]');
      elements.forEach(function(element) {
        element.style.backgroundColor = "#b9acac";
        element.style.color = "black";
      });
      var elements = document.querySelectorAll('[class="lines-content monaco-editor-background"]');
      elements.forEach(function(element) {
        element.style.backgroundColor = "#b9acac";
      });
  })();



# Dev Env
"[typescriptreact]": {
    "editor.formatOnSave": true
}

# Errors:

ERROR
ERROR: build step 0 "us.gcr.io/gae-runtimes/utilities/gcs-fetcher:base_20230430_18_04_RC00" failed: step exited with non-zero status: 1

there was a file mentioned where the SHA mismatch, it was under .next/cache, so i just deleted it. Fixed issue.


Image Attribution:
<a href="https://www.flaticon.com/free-icons/google" title="google icons">Google icons created by Freepik - Flaticon</a>