const form = document.getElementById("user-form");
const input = document.getElementById("user-input");

const classSelected = document.getElementById("class-name");
const idSelected = document.getElementById("id-name");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const selector = input.value;

  if (idSelected.checked) {
    chrome.storage.sync.set({ selector: `#${selector}` });
  } else {
    chrome.storage.sync.set({ selector: `.${selector}` });
  }

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: killSelector,
  });
});

function killSelector() {
  chrome.storage.sync.get("selector", (obj) => {
    const kill = document.querySelector(obj.selector);
    kill.style.display = "none";
  });
}
