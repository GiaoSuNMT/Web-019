// window.onload = () => {};

$(document).ready(() => {
  // find element
  const textArea = document.getElementById("question");

  // .addEventListener()
  textArea.addEventListener("input", event => {
    const contentLength = textArea.value.length;

    //find element
    const remainCharacters = document.getElementById("counter");

    // change content
    remainCharacters.innerText = `${200 - contentLength} characters left`;
  });

  $("#btn_ask").click(() => {
    $.ajax({
      url: "/create-question",
      type: "POST",
      data: { content: textArea.value },
      success: data => {
        window.location.assign(data.url);
      },
      error: error => {
        console.log(error);
      }
    });
  });
});
