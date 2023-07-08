## Description
This Dapp provides a decentralized way for users to store and manage their personal data, such as photos,videos, and documents.
By using Metamask wallet for registration and login, users can ensure that their personal data remains secure and private.

## How it works
1. Set up a Metamask Account:
   
    You must connect with Sepolia testnet.Beacause the dapp deployed on seploia testnet.<br/>
    You can get test sepolia eth from : https://sepoliafaucet.com

3. Logging In or Signing Up:

      Access the login page of the the dapp.f you already singup, enter your account credentials (account address and password) to log in.
    If you don't have a Metamask account, look for a "Sign Up" option on the login page.
    Click on the "Click here" option and follow the instructions to create a new account, which will be associated with your Metamask wallet.

3. Uploading Photos, Videos, and Files:

      After logging in, you will be navigated to the "Home" page.Look for an "Upload" button, typically accompanied by an icon for upload.
    Click on the button and select the photos, videos, or files you want to upload from your device.Wait for the upload process to complete.
    Then click upload button and confirm the transaction.Please wait some time untill transaction is completed.
   
4. Viewing Uploaded Files in "My Files" Page:

      Locate and click on the "My Files" page or tab within the application's interface.This page should display all the files you have uploaded.
    Look for file names to identify the specific files you want to view.select on a file to preview it within the application.
   
5. Share and Delete

   If you want you can share the files with other people by giving address.The person,who will be getting fille is notified in Notification page.Another is you can remove access,also you can delete the file. 
6. Logging Out:

      To log out, look for a "Logout" or "Sign Out" option in the application's user interface.

## How to run locally

1. Add sepolia testnet to your metamask wallet.<br/>
2. Install nodejs in your environment.<br/>
3. Download the project and add your "api" key and "private" key in ".env" file.<br/>
4. Deploy the smart contract using command : npx hardhat run scripts/deploy.js --network sepolia.<br/>
5. You will get artifacts folder and address in console.<br/>
6. Move artifacts to src folder and update address in App.js file with address in console.<br/>
7. Then run " npm start" in cosole.<br/>


Demo Link : https://drive.google.com/file/d/1Cp9t65p_yeAIkpEtPUwiOKYUQQmMELwt/view?usp=drive_link <br/>
Live link : https://securedatastorage.netlify.app/
