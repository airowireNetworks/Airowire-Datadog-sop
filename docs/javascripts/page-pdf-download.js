document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".md-header__inner");
  if (!header) return;

  const slug = document.documentElement.getAttribute("data-md-page-slug");
  if (!slug) return;

  // plugin creates pdf using slug path
  const pdfUrl = `/pdf/${slug}.pdf`;

  const btn = document.createElement("a");
  btn.href = pdfUrl;
  btn.innerHTML = "⬇ Download Full PDF";
  btn.className = "md-header__button md-icon";
  btn.target = "_blank";
  btn.title = "Download Full Document PDF";

  header.appendChild(btn);
});

