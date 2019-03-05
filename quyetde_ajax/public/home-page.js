// $(document).ready(() => {

//   $.ajax({
//     url: `/get-question-by-id?questionId=${randomId}`,
//     type: "GET",
//     success: data => {
//       $("#text_question").html(data.content);
//       //console.log(randomId);
//     },
//     error: error => {
//       console.log(error);
//     }
//   });
// });

// let randomId = 0;
//   $.getJSON("/data.json", data => {
//     randomId = Math.floor(Math.random() * data.length);
//     console.log(randomId);
//   });

$.when($.getJSON("/data.json"), $.ready).done(function(data) {
  let randomId = Math.floor(Math.random() * data[0].length);
  getQuestion(randomId);

  const a = $("button");
  for (let i = 0; i < a.length; i++) {
    $(a[i]).click(() => {
      if (a[i].value == "cauhoikhac") {
        randomId = Math.floor(Math.random() * data[0].length);
        getQuestion(randomId);
      } else {
        $.ajax({
          url: `/yes-no?questionId=${randomId}&value=${a[i].value}`,
          type: "POST",
          success: data => {
            window.location.assign(data.url);
          },
          error: error => {
            console.log(error);
          }
        });
      }
    });
  }
});

function getQuestion(randomId) {
  $.ajax({
    url: `/get-question-by-id?questionId=${randomId}`,
    type: "GET",
    success: data => {
      $("#text_question").html(data.content);
      //console.log(randomId);
    },
    error: error => {
      console.log(error);
    }
  });
}
