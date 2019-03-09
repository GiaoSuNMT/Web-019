$(document).ready(() => {
  $.ajax({
    url: `/get-random-question`,
    type: "GET",
    success: data => {
      $("#text_question").html(data.content);

      const a = $("button");
      for (let i = 0; i < a.length; i++) {
        $(a[i]).click(() => {
          if (a[i].value == "cauhoikhac") {
            window.location.reload();
          } else {
            $.ajax({
              url: `/yes-no?questionId=${data.id}&value=${a[i].value}`,
              type: "POST",
              success: result => {
                window.location.assign(result.url);
                // chuyen trang: window.location.href = "/..."
                // tai lai trang: window.location.reload()
              },
              error: error => {
                console.log(error);
              }
            });
          }
        });
      }
    },
    error: error => {
      console.log(error);
    }
  });
});
