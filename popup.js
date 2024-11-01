document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("queueFilter");
  const hideProcessesCheckbox = document.getElementById("hideProcesses");

  // Set up queue filter
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getQueues" },
      function (response) {
        if (response && response.queues) {
          response.queues.forEach((queue) => {
            const option = document.createElement("option");
            option.value = queue;
            option.textContent = queue;
            select.appendChild(option);
          });
        }
      }
    );
  });

  // Handle queue filter changes
  select.addEventListener("change", function (e) {
    const selectedQueue = e.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "filterQueue",
        queue: selectedQueue,
      });
    });
  });

  // Handle hide processes checkbox
  hideProcessesCheckbox.addEventListener("change", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleProcesses",
        hide: e.target.checked,
      });
    });
  });
});
