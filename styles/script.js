//add an arrow to the selected item when you click on a link in the sidebar
addEventListener(
    "click",
    function (e) {
        if (this.document.querySelector(".selected")) {
            //remove <i class="bi bi-arrow-left"></i> from the html
            this.document.querySelector(".selected").innerHTML = this.document
                .querySelector(".selected")
                .innerHTML.replace(
                    /<i class="bi bi-arrow-left-short"><\/i>/g,
                    ""
                );

            this.document.querySelector(".selected").innerHTML;
            this.document
                .querySelector(".selected")
                .classList.remove("selected");
        }
        if (
            e.target.tagName === "A" && //if the target dont have the class selected
            !e.target.classList.contains("selected")
        ) {
            e.target.classList.add("selected");
            e.target.innerHTML += '<i class="bi bi-arrow-left-short"></i>';
        }
    },
    false
);

//select the item in the sidebar when you scroll to it
addEventListener("scroll", function (e) {
    let scroll = this.document.documentElement.scrollTop;
    let items = this.document.querySelectorAll(".sidebar-item");
    let item;
    for (let i = 0; i < items.length; i++) {
        item = items[i];
        if (
            item.offsetTop <= scroll &&
            item.offsetTop + item.offsetHeight > scroll
        ) {
            if (this.document.querySelector(".selected")) {
                this.document.querySelector(".selected").innerHTML =
                    this.document
                        .querySelector(".selected")
                        .innerHTML.replace(
                            /<i class="bi bi-arrow-left-short"><\/i>/g,
                            ""
                        );
                this.document
                    .querySelector(".selected")
                    .classList.remove("selected");
            }
            item.classList.add("selected");
            item.innerHTML += '<i class="bi bi-arrow-left-short"></i>';
        }
    }
});
