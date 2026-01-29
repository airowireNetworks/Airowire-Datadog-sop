document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".md-header__inner");
  if (!header) return;

  let path = window.location.pathname remember; 

  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  const pdfPath = "/pdf" + path + ".pdf";

  const btn = document.createElement("a");
  btn.href = pdfPath;
  btn.innerHTML = "⬇ Download PDF";
  btn.className = "md-header__button md-button";
  btn.style.marginLeft = "12px";
  btn.setAttribute("download", "");

  const search = document.querySelector(".md-search");
  if (search && search.parentNode) {
    search.parentNode.insertBefore(btn, search);
  }
});
