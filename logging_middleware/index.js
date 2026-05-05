// index.js
   
   // Replace this with the token you generated!
   const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJpYW51cmFnMjAwNUBnbWFpbC5jb20iLCJleHAiOjE3Nzc5Njk1NzgsImlhdCI6MTc3Nzk2ODY3OCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjI5NDM2NzEwLWM5YmItNDExMC05OTUwLTBlOTUzYjBlMDU0NCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFudXJhZyBzcml2YXN0YXZhIiwic3ViIjoiNGQzMzI3OWQtZDkxZS00ZDM0LTk4M2EtYmUxNGZlODM1ZmM4In0sImVtYWlsIjoiaWFudXJhZzIwMDVAZ21haWwuY29tIiwibmFtZSI6ImFudXJhZyBzcml2YXN0YXZhIiwicm9sbE5vIjoiMmsyM2NzdW4wMTMxMiIsImFjY2Vzc0NvZGUiOiJYanZUWngiLCJjbGllbnRJRCI6IjRkMzMyNzlkLWQ5MWUtNGQzNC05ODNhLWJlMTRmZTgzNWZjOCIsImNsaWVudFNlY3JldCI6IkhzZkFOeHR4dVR6d1pCTnoifQ.a2SnWSKHWqH-cIX0gIM8m6DDsfe-UZkgzv7qVknFP14"; 

   export async function Log(stack, level, pkg, message) {
       const url = "http://20.207.122.201/evaluation-service/logs";

       // Construct the payload exactly as the API expects
       const payload = {
           stack: stack,
           level: level,
           package: pkg, 
           message: message
       };

       try {
           // We use the built-in fetch API to send the POST request
           const response = await fetch(url, {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
                   "Authorization": `Bearer ${AUTH_TOKEN}`
               },
               body: JSON.stringify(payload)
           });

           if (!response.ok) {
               console.error("Logger Failed: HTTP status", response.status);
           }
       } catch (error) {
           // If the network fails entirely, we catch it here so it doesn't crash your app
           console.error("Logger encountered a network error:", error);
       }
   }