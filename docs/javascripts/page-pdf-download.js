document.addEventListener("DOMContentLoaded", function () {
  const search = document.querySelector(".md-search");
  if (!search || !search.parentNode) return;

  // Material for MkDocs exposes the page slug here
  const slug = document.documentElement.getAttribute("data-md-page-slug");

  // No PDF on homepage
  if (!slug) return;

  // pdf-export-plugin uses slug-based filenames
  const pdfPath = `/pdf/${slug}.pdf`;

  const btn = document.createElement("a");
  btn.href = pdfPath;
  btn.innerHTML = "⬇ Download PDF";
  btn.className = "md-header__button md-button md-button--primary";
  btn.style.marginLeft = "12px";
  btn.setAttribute("download", "");

  search.parentNode.insertBefore(btn, search);
});


