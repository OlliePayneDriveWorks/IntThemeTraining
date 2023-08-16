// this constant is where we can store DriveWorks settings to access use siteSettings.{name}
const siteSettings = {
  dwEndpoint: "",
  dwGroup: "",
  dwProject: "",
};

//Select the div to inset a spec into...
const specForm = document.getElementById("specification-form");

let dwAPI;
let sessionId;

//Inject the Integration theme JS into the webpage
function injectClientLib() {
  apiLink = document.createElement("script");
  apiLink.src =
    siteSettings.dwEndpoint + "/DriveWorksLiveIntegrationClient.min.js";
  apiLink.onload = () => loadDriveWorks();
  document.body.appendChild(apiLink);
  console.log(`client loaded`);
}

//function to connect to DriveWorks and load the form
async function loadDriveWorks() {
  try {
    //Declaring a new DW Client 'class' - this makes it easier to use the functions of the API
    dwAPI = new window.DriveWorksLiveClient(siteSettings.dwEndpoint);

    // Logging into the Group
    const group = await dwAPI.loginGroup(siteSettings.dwGroup);

    // Storing the Session ID for use later
    sessionId = group.sessionId;
    console.log(sessionId);

    //Create a new Specification with the settings from the top
    const spec = await dwAPI.createSpecification(
      siteSettings.dwGroup,
      siteSettings.dwProject
    );

    // Render the spec in the <div> element
    await spec.render(specForm);
  } catch (err) {
    // logging any caught errors to the log
    console.error(err);
  }
}

document.getElementById("button-submit").addEventListener("click", function () {
  //Add code to do things when the 'Submit' button is pressed.
  console.log(`button pressed`);
});

injectClientLib();
