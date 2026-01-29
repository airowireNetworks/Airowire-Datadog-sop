document.addEventListener("DOMContentLoaded", function () {
  const search = document.querySelector(".md-search");
  if (!search || !search.parentNode) return;

  // Build PDF name from URL path
  // /azure/logs/logs/ -> azure-logs-logs.pdf
  let parts = window.location.pathname
    .split("/")
    .filter(Boolean);

  // Skip homepage
  if (parts.length === 0) return;

  const pdfName = parts.join("-") + ".pdf";
  const pdfPath = "/pdf/" + pdfName;

  const btn = document.createElement("a");
  btn.href = pdfPath;
  btn.innerHTML = "⬇ Download PDF";
  btn.className = "md-header__button md-button md-button--primary";
  btn.style.marginLeft = "12px";
  btn.setAttribute("download", "");

  search.parentNode.insertBefore(btn, search);
});

