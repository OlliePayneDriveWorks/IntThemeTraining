// this constant is where we can store DriveWorks settings to access use siteSettings.{name}
const siteSettings = {
  dwEndpoint: "http://wsm-tech-olip",
  dwGroup: "Alias",
  dwProject: "",
};

//Select the div to inset a spec into...
const specForm = document.getElementById("specification-form");

let dwAPI;

//Inject the Integration theme JS into the webpage
const injectClientLib = function () {
  apiLink = document.createElement("script");
  apiLink.src =
    siteSettings.dwEndpoint + "/DriveWorksLiveIntegrationClient.min.js";
  document.body.appendChild(apiLink);
  console.log(`client loaded`);
  loadDriveWorks();
};

//function to connect to DriveWorks and load the form
async function loadDriveWorks() {
  try {
    console.log(window);

    dwAPI = new window.DriveWorksLiveClient(siteSettings.dwEndpoint);

    const group = await dwAPI.loginGroup(siteSettings.dwGroup);
    console.log(group);

    console.log(dwAPI.sessionid);
  } catch (err) {
    console.log(err);
  }
}

injectClientLib();
