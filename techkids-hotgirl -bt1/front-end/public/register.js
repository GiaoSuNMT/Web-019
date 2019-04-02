$(document).ready(() => {
  const userInfo = document.getElementsByClassName("form-control");
  $(".btn").click(e => {
    e.preventDefault();
    $.ajax({
      url: "http://localhost:3000/api/auth/register",
      type: "POST",
      data: {
        email: userInfo[0].value,
        password: userInfo[1].value,
        firstName: userInfo[2].value,
        lastName: userInfo[3].value
      },
      success: data => {
        if (data.success) {
          window.location.href = "http://localhost:3001/login";
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
