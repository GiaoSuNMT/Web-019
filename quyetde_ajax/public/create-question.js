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

  $("#btn_ask").click(e => {
    //e.preventDefault(); -> huy hanh dong mac dinh (submit cua form,....)
    if (!textArea.value) {
      document.getElementById("error-message").innerText =
        "Please input question!";
      //nen dung: npm i yup
    } else {
      $.ajax({
        url: "/create-question",
        type: "POST",
        data: {
          content: textArea.value
        },
        success: data => {
          window.location.assign(data.url);
        },
        error: error => {
          console.log(error);
        }
      });
    }
  });
});
