import { Log } from "logging_middleware";


const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJpYW51cmFnMjAwNUBnbWFpbC5jb20iLCJleHAiOjE3Nzc5NzI3MzYsImlhdCI6MTc3Nzk3MTgzNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjgzZTQ0MzllLTE5NjItNDA5Yy04NWZjLTg4ODA2NmQxMTdjMiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFudXJhZyBzcml2YXN0YXZhIiwic3ViIjoiNGQzMzI3OWQtZDkxZS00ZDM0LTk4M2EtYmUxNGZlODM1ZmM4In0sImVtYWlsIjoiaWFudXJhZzIwMDVAZ21haWwuY29tIiwibmFtZSI6ImFudXJhZyBzcml2YXN0YXZhIiwicm9sbE5vIjoiMmsyM2NzdW4wMTMxMiIsImFjY2Vzc0NvZGUiOiJYanZUWngiLCJjbGllbnRJRCI6IjRkMzMyNzlkLWQ5MWUtNGQzNC05ODNhLWJlMTRmZTgzNWZjOCIsImNsaWVudFNlY3JldCI6IkhzZkFOeHR4dVR6d1pCTnoifQ.wEGgswB84rZ7sPx1MwNGGxRvyPnPdqBzq8eYZXeEA9E";

async function getTop10Notifications() {
    
    await Log("backend", "info", "utils", "Starting priority notification fetch process.");
    
    try {
        const response = await fetch("http://20.207.122.201/evaluation-service/notifications", {
            headers: { "Authorization": `Bearer ${AUTH_TOKEN}` }
        });

        if (!response.ok) {
            await Log("backend", "error", "utils", `Failed to fetch notifications. Status: ${response.status}`);
            return;
        }

        const rawData = await response.json();
        
        // Let's print the raw data to the terminal just to see its exact structure
        console.log("Raw Data from API:", rawData);

        await Log("backend", "debug", "utils", `Successfully fetched data from notifications API.`);

        // FIX 2: Safely extract the array from the response object
        let notificationsArray = [];
        if (Array.isArray(rawData)) {
            notificationsArray = rawData;
        } else if (rawData && Array.isArray(rawData.notifications)) {
            notificationsArray = rawData.notifications; // if it's wrapped in { notifications: [...] }
        } else if (rawData && Array.isArray(rawData.data)) {
            notificationsArray = rawData.data; // if it's wrapped in { data: [...] }
        } else {
            console.error("Could not find an array in the API response.");
            return;
        }

        const weights = {
            "Placement": 3,
            "Result": 2,
            "Event": 1
        };

        notificationsArray.sort((a, b) => {
            const weightA = weights[a.Type] || 0;
            const weightB = weights[b.Type] || 0;

            if (weightA !== weightB) {
                return weightB - weightA; 
            }

            const timeA = new Date(a.Timestamp).getTime();
            const timeB = new Date(b.Timestamp).getTime();
            return timeB - timeA;
        });

        const top10 = notificationsArray.slice(0, 10);
        
        console.log("\n=== TOP 10 PRIORITY NOTIFICATIONS ===");
        console.table(top10.map(n => ({ Type: n.Type, Message: n.Message, Time: n.Timestamp })));

        await Log("backend", "info", "utils", "Successfully calculated and displayed top 10 notifications.");

    } catch (error) {
        await Log("backend", "fatal", "utils", `Critical error in priority script: ${error.message}`);
        console.error("Script failed:", error);
    }
}

getTop10Notifications();