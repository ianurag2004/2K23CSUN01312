// getToken.js
   async function fetchToken() {
       const url = "http://20.207.122.201/evaluation-service/auth";
       const credentials = {
           "email": "ianurag2005@gmail.com", 
           "name": "Anurag Srivastava",
           "rollNo": "aa1bb2K23CSUN01312",
           "accessCode": "XjvTZx",
           "clientID": "4d33279d-d91e-4d34-983a-be14fe835fc8",
           "clientSecret": "HsfANxtxuTzwZBNz"
       };

       try {
           const response = await fetch(url, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(credentials)
           });
           
           const data = await response.json();
           console.log("\n✅ SUCCESS! Here is your token. Copy the text below:\n");
           console.log(data.access_token);
           console.log("\n");
       } catch (error) {
           console.error("Failed to get token:", error);
       }
   }

   fetchToken();