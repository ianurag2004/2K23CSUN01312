   const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJpYW51cmFnMjAwNUBnbWFpbC5jb20iLCJleHAiOjE3Nzc5NzI3MzYsImlhdCI6MTc3Nzk3MTgzNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjgzZTQ0MzllLTE5NjItNDA5Yy04NWZjLTg4ODA2NmQxMTdjMiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFudXJhZyBzcml2YXN0YXZhIiwic3ViIjoiNGQzMzI3OWQtZDkxZS00ZDM0LTk4M2EtYmUxNGZlODM1ZmM4In0sImVtYWlsIjoiaWFudXJhZzIwMDVAZ21haWwuY29tIiwibmFtZSI6ImFudXJhZyBzcml2YXN0YXZhIiwicm9sbE5vIjoiMmsyM2NzdW4wMTMxMiIsImFjY2Vzc0NvZGUiOiJYanZUWngiLCJjbGllbnRJRCI6IjRkMzMyNzlkLWQ5MWUtNGQzNC05ODNhLWJlMTRmZTgzNWZjOCIsImNsaWVudFNlY3JldCI6IkhzZkFOeHR4dVR6d1pCTnoifQ.wEGgswB84rZ7sPx1MwNGGxRvyPnPdqBzq8eYZXeEA9E"; 

   export async function Log(stack, level, pkg, message) {
       const url = "http://20.207.122.201/evaluation-service/logs";

       const payload = {
           stack: stack,
           level: level,
           package: pkg, 
           message: message
       };

       try {
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
           console.error("Logger encountered a network error:", error);
       }
   }