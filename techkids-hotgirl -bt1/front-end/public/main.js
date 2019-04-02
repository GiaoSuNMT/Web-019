$(document).ready(() => {
  // $.ajax({
  //   url: "http://localhost:3000/api/auth/test",
  //   type: "GET",
  //   success: data => {
  //     // window.location.href = "http://localhost:3001/login";
  //   },
  //   error: error => {
  //     console.log(error);
  //   }
  // });
  $("#btn-logout").click(event => {
    $.ajax({
      url: "http://localhost:3000/api/auth/logout",
      type: "GET",
      success: data => {
        window.location.href = "http://localhost:3001/login";
      },
      error: error => {
        console.log(error);
      }
    });
  });
});
