document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".md-header__inner");
  if (!header) return;

  const slug = document.documentElement.getAttribute("data-md-page-slug");
  if (!slug) return;

  const pdfPath = `/pdf/${slug}.pdf`;

  const btn = document.createElement("a");
  btn.href = pdfPath;
  btn.textContent = "⬇ Download PDF";
  btn.className = "md-header__button md-button md-button--primary";
  btn.style.marginLeft = "12px";
  btn.setAttribute("download", "");

  header.appendChild(btn);
});

