import { useState, useEffect } from 'react';
import * as Pieces from '@pieces.app/pieces-os-client';

const DeveloperInfoComponent = () => {
  const [connectionStatus, setConnectionStatus] = useState(null);

  // Function to connect to Pieces OS
  const connectToPiecesOS = async () => {
    try {
      // Create the tracked application object exactly as specified in the README
      const tracked_application = {
        name: Pieces.ApplicationNameEnum.Unknown,
        version: "0.0.1",
        platform: Pieces.PlatformEnum.Macos, // You might need to adjust this
      };

      // Create the ConnectorApi instance
      const connectorApi = new Pieces.ConnectorApi();

      // Attempt to connect using the method from the README
      const response = await connectorApi.connect({
        seededConnectorConnection: { application: tracked_application },
      });

      // Parse the response as JSON
      const parsedResponse = JSON.parse(JSON.stringify(response));
      
      // Set the connection status
      setConnectionStatus(parsedResponse);

      // Log the response
      console.log('Pieces OS Connection Response:', parsedResponse);
    } catch (error) {
      console.error('Connection to Pieces OS failed:', error);
      setConnectionStatus(null);
    }
  };

  // Use useEffect to connect when the component mounts
  useEffect(() => {
    connectToPiecesOS();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Developer Connection</h1>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-2">Pieces OS Connection Status</h2>
        {connectionStatus ? (
          <div>
            <p className="text-green-600">✅ Successfully Connected</p>
            <pre className="text-xs mt-2 overflow-x-auto">
              {JSON.stringify(connectionStatus, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="text-red-600">❌ Not Connected</p>
        )}
      </div>
    </div>
  );
};

export default DeveloperInfoComponent;
// import React, { useState, useEffect } from 'react';
// import * as Pieces from '@pieces.app/pieces-os-client';

// const Stack = () => {
//       const [developerData, setDeveloperData] = useState(null);
    
//       useEffect(() => {
//         async function fetchData() {
//           try {
//             // Connect to Pieces OS
//             const connection = await connectToPieces();
    
//             // Fetch assets and activities
//             const assets = await fetchAssets();
//             const activities = await fetchActivities();
    
//             // Combine data as needed
//             const combinedData = {
//               connection,
//               assets,
//               activities,
//             };
    
//             setDeveloperData(combinedData);
//           } catch (error) {
//             console.error("Error fetching developer data:", error);
//           }
//         }
    
//         fetchData();
//       }, []);
    
//       if (!developerData) return <p>Loading...</p>;
    
//       return (
//         <div className="p-4 bg-gray-100 rounded-md">
//           <h2 className="text-xl font-bold">Developer Information</h2>
//           <div>
//             <h3 className="text-lg font-semibold">Activities:</h3>
//             <pre>{JSON.stringify(developerData.activities, null, 2)}</pre>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">Assets:</h3>
//             <pre>{JSON.stringify(developerData.assets, null, 2)}</pre>
//           </div>
//         </div>
//       );
//     }
    
//     async function connectToPieces() {
//       const trackedApplication = {
//         name: Pieces.ApplicationNameEnum.Unknown,
//         version: "0.0.1",
//         platform: Pieces.PlatformEnum.Macos,
//       };
    
//       const connectorApi = new Pieces.ConnectorApi();
//       const response = await connectorApi.connect({
//         seededConnectorConnection: { application: trackedApplication },
//       });
    
//       return response;
//     }
    
//     async function fetchAssets() {
//       const assetsApi = new Pieces.AssetsApi();
//       return await assetsApi.assetsSnapshot({});
//     }
    
//     async function fetchActivities() {
//       const activitiesApi = new Pieces.ActivitiesApi();
//       return await activitiesApi.activitiesSnapshot({});
//     }

// export default Stack