(function() {
  window.addEventListener("pageshow", function() {
    var mediaQueryList = window.matchMedia("(max-width: 1068px)");

    mediaQueryList.addListener(handleMediaChange);

    function addMobileToc() {
			var tocContainer = document.querySelector("#i-toc-outer-container");
			if (!tocContainer) return;
			var mobilePresenter = '<div id="i-toc-mobile-presenter"><div class="label">Table of Contents</div><ins class="i-spacer i-expandorcollapse i-expand"></ins>';
			tocContainer.insertAdjacentHTML('afterbegin', mobilePresenter);
			var tocMobilePresenter = document.querySelector("#i-toc-mobile-presenter");
			var tocContent = document.querySelector("#i-toc-content");
			var header = document.querySelector("#i-header-container");
			if (!tocMobilePresenter) return;
			tocMobilePresenter.addEventListener("click", toggleToc);
			tocContent.style.cssText = "max-height: calc(100vh - 32px - " + header.offsetHeight + "px);";
			setTimeout(function() {
				tocMobilePresenter.classList.add('visible');
			}, 100);
		}

		function removeMobileToc() {
			var tocMobilePresenter = document.querySelector("#i-toc-mobile-presenter");
			var tocContent = document.querySelector("#i-toc-content");
			if (!tocMobilePresenter) return;
			tocMobilePresenter.removeEventListener("click", toggleToc);
			tocMobilePresenter.remove();
			if (!tocContent) return;
			tocContent.style.cssText = "";
		}


    function toggleToc() {
			var tocContent = document.querySelector("#i-toc-container");
			var toToggle = document.querySelector("#i-toc-mobile-presenter .i-expandorcollapse");
      if (!tocContent) return;
			tocContent.classList.toggle('visible');
			toToggle.classList.toggle('i-expand');
			toToggle.classList.toggle('i-collapse');
    }

    function handleMediaChange(evt) {
      if (evt.matches) {
				addMobileToc();
      } else {
				removeMobileToc();
      }
    }

    handleMediaChange(mediaQueryList);
  });
})();
