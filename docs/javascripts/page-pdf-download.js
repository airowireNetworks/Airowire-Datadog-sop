document.addEventListener("DOMContentLoaded", function () {
  const search = document.querySelector(".md-search");
  if (!search || !search.parentNode) return;

  let path = window.location.pathname;

  // Remove index.html if present
  if (path.endsWith("index.html")) {
    path = path.replace("index.html", "");
  }

  // Remove trailing slash
  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  // Build correct PDF path
  // Example:
  // /azure/logs/logs -> /pdf/azure/logs/logs.pdf
  const pdfPath = "/pdf" + path + ".pdf";

  const btn = document.createElement("a");
  btn.href = pdfPath;
  btn.innerHTML = "⬇ Download PDF";
  btn.className = "md-header__button md-button md-button--primary";
  btn.style.marginLeft = "12px";
  btn.setAttribute("download", "");

  search.parentNode.insertBefore(btn, search);
});

