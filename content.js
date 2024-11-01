let currentQueue = "all";
let hideProcesses = false;

function getQueuesFromText(text) {
  const queuesLine = text
    .split("\n")
    .find((line) => line.trim().startsWith("critical"));

  if (!queuesLine) return [];

  return queuesLine
    .trim()
    .split(", ")
    .filter((queue) => queue.length > 0);
}

// Function to get unique queues from the busy table
function getUniqueQueues() {
  const qrow = document.querySelector("table tbody tr td.box");
  const queues = getQueuesFromText(qrow.textContent);

  return queues;
}

// Function to filter the table by queue
function filterTableByQueue(queue) {
  console.log("Filtering by queue:", queue);
  currentQueue = queue; // Store current filter

  const jobsTable = document.querySelector("table.workers tbody");

  if (!jobsTable) {
    console.log("Jobs table not found");
    return;
  }

  const jobRows = jobsTable.querySelectorAll("tr");
  jobRows.forEach((row) => {
    const queueCell = row.querySelector("td:nth-child(4)");
    if (queueCell) {
      const queueName = queueCell.textContent.trim();
      const shouldShow = queue === "all" || queueName === queue;
      row.style.display = shouldShow ? "" : "none";
    }
  });
}

function toggleProcessesTable(hide) {
  hideProcesses = hide;
  const processesSection = document.querySelector("table.processes");
  if (processesSection) {
    processesSection.style.display = hide ? "none" : "";
    // Also hide the "Processes" header if it exists
    const processesHeader = document.querySelector("h3");
    if (processesHeader && processesHeader.textContent === "Processes") {
      processesHeader.closest(".row.header").style.display = hide ? "none" : "";
    }
  }
}

setInterval(() => {
  if (currentQueue !== "all") {
    filterTableByQueue(currentQueue);
  }
  toggleProcessesTable(hideProcesses);
}, 1000);

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Message received:", request);

  if (request.action === "getQueues") {
    const queues = getUniqueQueues();
    console.log("Sending response with queues:", queues);
    sendResponse({ queues: queues });
  } else if (request.action === "filterQueue") {
    console.log("Filtering queue:", request.queue);
    filterTableByQueue(request.queue);
  }
  return true;
});

// Message listener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Message received:", request);

  if (request.action === "getQueues") {
    const queues = getUniqueQueues();
    console.log("Sending response with queues:", queues);
    sendResponse({ queues: queues });
  } else if (request.action === "filterQueue") {
    console.log("Filtering queue:", request.queue);
    filterTableByQueue(request.queue);
  } else if (request.action === "toggleProcesses") {
    toggleProcessesTable(request.hide);
  }
  return true;
});
