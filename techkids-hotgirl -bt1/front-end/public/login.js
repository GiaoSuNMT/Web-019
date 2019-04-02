$(document).ready(() => {
  const userInfo = document.getElementsByClassName("form-control");
  $("#btn-register").click(e => {
    $.ajax({
      url: "http://localhost:3000/api/auth/logout",
      type: "GET",
      success: data => {
        window.location.href = "http://localhost:3001/register";
      },
      error: error => {
        console.log(error);
      }
    });
  });

  $("#btn-login").click(e => {
    e.preventDefault();
    $.ajax({
      url: "http://localhost:3000/api/auth/login",
      type: "POST",
      data: {
        email: userInfo[0].value,
        password: userInfo[1].value
      },
      success: data => {
        if (data.success == true) {
          window.location.href = "http://localhost:3001/posts";
        } else {
          const mess = (document.getElementById("message").innerText =
            data.message);
        }
      },
      error: error => {
        console.log(error);
      }
    });
  });
});
