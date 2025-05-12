/* SECTIONS - START */
const addFormSection = document.getElementById("form-section");
const mainSection = document.getElementById("main-section");
/* SECTIONS - END */

/* SECTIONS CONTENT SIDE - START */
const openContent = document.getElementById("main-section-open-content");
const inprogressContent = document.getElementById(
  "main-section-in-progress-content"
);
const closedContent = document.getElementById("main-section-closed-content");
const wontfixContent = document.getElementById("main-section-wont-fix-content");
/* SECTIONS CONTENT SIDE - END */

/* ADD BUTTONS - START */
const openSectionBottomAdd = document.getElementById(
  "main-section-open-bottom-add"
);
const inprogressSectionBottomAdd = document.getElementById(
  "main-section-in-progress-bottom-add"
);
const closedSectionBottomAdd = document.getElementById(
  "main-section-closed-bottom-add"
);
const wontfixSectionBottomAdd = document.getElementById(
  "main-section-wont-fix-bottom-add"
);
/* ADD BUTTONS - END */

/* FORM ELEMENTS - START  */
const cancelForm = document.getElementById("cancel-form");
const saveButton = document.getElementById("save-button");
const cancelSavingButton = document.getElementById("cancel-button");
const priorityOptions = document.querySelectorAll("#option .label");
console.log(priorityOptions);
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
/* FORM ELEMENTS - END  */

/* PRIORITY SELECTION - START */
const priorityLevels = document.getElementsByClassName("label");
/* PRIORITY SELECTION - END */

let clickedAddButtonName = undefined;

const addButtons = [
  openSectionBottomAdd,
  inprogressSectionBottomAdd,
  closedSectionBottomAdd,
  wontfixSectionBottomAdd,
];

/* RESET CARD COUNT NUMBER - START */
let addElementParagraph = 1;
const content = [openContent, inprogressContent, closedContent, wontfixContent];
function resetCountElements() {
  do {
    document.getElementById(`add-${addElementParagraph}-count`).innerText =
      content[addElementParagraph - 1].childElementCount + " cards";
    console.log(content[addElementParagraph - 1]);
    addElementParagraph++;
  } while (addElementParagraph < 5);
}
resetCountElements();
/* RESET CARD COUNT NUMBER - END */

addButtons.forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(e);
    clickedAddButtonName = e.target.attributes[0].nodeValue;
    console.log(e.target.attributes[0].nodeValue);
    addFormSection.classList.add("active");
    addFormSection.classList.remove("passive");
    addFormSection.classList.add("blur");
  });
});

cancelForm.addEventListener("click", (e) => {
  e.preventDefault();
  addFormSection.classList.remove("blur");
  addFormSection.classList.remove("active");
  addFormSection.classList.add("passive");
});

cancelSavingButton.addEventListener("click", (e) => {
  e.preventDefault();
  addFormSection.classList.remove("blur");
  addFormSection.classList.remove("active");
  addFormSection.classList.add("passive");
});

saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const fullDate =
    (Math.floor(day / 10) === 0 ? "0" + day : day) +
    "/" +
    (Math.floor(month / 10) === 0 ? "0" + month : month) +
    "/" +
    year;
  let option = selectOption();
  let optionLabel;
  console.log(option);

  switch (option) {
    case "low":
      optionLabel = "wont-fix-label";
      break;
    case "medium":
      optionLabel = "in-progress-label";
      break;
    case "high":
      optionLabel = "open-label";
      break;
  }
  const userNameValue = userName.value;
  const userEmailValue = userEmail.value;
  console.log();

  const newCard = document.createElement("div");
  newCard.innerHTML = `
  <div id="card">
  <div id="card-top">
                <i class="bx bxs-bug"></i>
                <p>Issues</p>
              </div>
              <ul>
                <li>
                  <p>Name</p>
                  <div>
                    <p>${userNameValue}</p>
                  </div>
                </li>
                <li>
                  <p>Priority</p>
                  <div>
                  <span>
                    <p class ="${optionLabel}">${option}</p></span>
                    <i class="bx bx-caret-down-square"></i>
                  </div>
                </li>
                
                <li>
                  <p>Assignee</p>
                  <div id="assignee-side">
                    <img src="./assets/img/man-1.jpg" alt="" />
                    <p>${
                      userEmailValue.length > 18
                        ? userEmailValue.substring(0, 15) + "..."
                        : userEmailValue
                    }</p>
                    <i class="bx bx-user"></i>
                  </div>
                </li>
                <li>
                  <p>Reporter</p>
                  <div id="reporter-side">
                    <img src="./assets/img/man-2.jpg" alt="" />
                    <p>ahmetmehmet.@g...</p>
                    <i class="bx bx-user"></i>
                  </div>
                </li>
                <li>
                  <p>Opened</p>
                  <div>
                    <p>${fullDate}</p>
                    <i class="bx bx-calendar-event"></i>
                  </div>
                </li>
                <li>
                  <p>Resolved</p>
                  <div>
                    <i class="bx bx-calendar-event calendar"></i>
                  </div>
                </li>
                <li>
                  <i class="bx bx-plus"></i>
                </li>
              </ul>
              </div>
  `;

  switch (clickedAddButtonName) {
    case "add-1":
      openContent.appendChild(newCard);
      break;
    case "add-2":
      inprogressContent.appendChild(newCard);
      break;

    case "add-3":
      closedContent.appendChild(newCard);
      break;

    case "add-4":
      wontfixContent.appendChild(newCard);
      break;
    default:
      console.log(`Invalid case`);
  }

  console.log(openContent.childElementCount);
  let calculateNum = parseInt(
    document.getElementById(`${clickedAddButtonName}-count`).innerText
  );

  document.getElementById(
    `${clickedAddButtonName}-count`
  ).innerText = `${++calculateNum} cards`;

  addFormSection.classList.remove("blur");
  addFormSection.classList.remove("active");
  addFormSection.classList.add("passive");
});

Array.from(priorityLevels).forEach((item) => {
  item.addEventListener("click", (e) => {
    removeAllSelectedTag();
    e.target.classList.add("selected");
  });
});

function removeAllSelectedTag() {
  Array.from(priorityLevels).forEach((item) => {
    item.classList.remove("selected");
  });
}

function selectOption() {
  let level = undefined;
  priorityOptions.forEach((item) => {
    //console.log(item.id);
    console.log(item.classList.contains("selected"));
    if (item.classList.contains("selected")) level = item.id;
  });
  return level;
}
