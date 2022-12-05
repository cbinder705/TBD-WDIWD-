const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#event-name").value.trim();
  const elocation = document.querySelector("#event-location").value.trim();
  const description = document.querySelector("#event-desc").value.trim();
  const etime = document.querySelector("#event-time").value.trim();
  const edate = document.querySelectorAll("#event-date").value.trim();

  if (name && elocation && description && etime && edate) {
    const response = await fetch(`/api/event`, {
      method: "POST",
      body: JSON.stringify({ name, description, elocation, etime, edate }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create project");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/event/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to remove event");
    }
  }
};

document
  .querySelector(".new-event-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".event-list")
  .addEventListener("click", delButtonHandler);
