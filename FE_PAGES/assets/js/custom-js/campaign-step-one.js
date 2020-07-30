const isValidField = (field, type = "text") => {
  // Check if empty
  if (field.value.trim() === "") return false;
  if (type === "email")
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field.value);
  return true;
};
const updateProgressBars = (percent = 10) => {
  const progressBar = document.querySelector(".inner-progress-bar");
  const progressPercent = document.querySelector(".progress-percent");
  var valid = Array.from(formFields).reduce(
    (acc, field) => acc + 0 + isValidField(field, field.type),
    0
  );
  var length = formFields.length;
  var percent = parseInt((valid / length) * percent);
  progressBar.style.width = `${percent}%`;
  progressPercent.innerHTML = `${percent}%`;
};
const inValidateField = (field) => {
  field.classList.add("is-invalid");
};
const validateField = (field) => {
  field.classList.remove("is-invalid");
};
const formFields = document.querySelectorAll(".form-control");

// Update Progress bar on any input
formFields.forEach((elt) => {
  elt.addEventListener("input", (e) => {
    updateProgressBars();
  });
});

//On focus approve
formFields.forEach((elt) => {
  elt.addEventListener("focus", (e) => {
    validateField(elt);
  });
});
document
  .querySelector("#submit-campaign-form")
  .addEventListener("click", (e) => {
    var invalid = false;
    formFields.forEach((field) => {
      if (!isValidField(field)) {
        inValidateField(field);
        invalid = true;
      }
    });
    if (invalid) return window.scrollTo(0, 0);
    document.querySelector("#campaign-form").submit();
  });
