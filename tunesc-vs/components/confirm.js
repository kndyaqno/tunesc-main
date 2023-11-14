// <script>
//   Confirm.open({
//     title: "Custom confirm window!",
//     message: "Cute ni Andrei",
//     okText: "Yeah, sure",
//     cancelText: "Nah, Imma do my own thing",
//     onOk: () => console.log("You pressed ok"), eto yung babaguhin depende kung anong action gusto mo mangyari pag ka pindot ng okay
//     onCancel: () => console.log("You cancelled"),
//   });
// </script>

//Example 1

//usage
//for example sa html mo may button ka na may id (pwede ring class)
// <button id="btnChangeBG">Change Bg Color</button>

//baguhin mo rin title, message, oktext,canceltext, onOK(kung ano gusto mo mangyari)
{
  /* <script>
document.querySelector("#btnChangeBG").addEventListener("click", () => {
  Confirm.open({
    title: "Background Change",
    message: "Are you sure you wish to change the background color?",
    okText: "Yeah, sure",
    cancelText: "Nah, Imma do my own thing",
    onOk: () => {
      document.body.style.backgroundColor = "blue";
    },
    onCancel: () => console.log("You cancelled"),
  });
});
</script>; */
}

const Confirm = {
  open(options) {
    options = Object.assign(
      {},
      {
        title: "",
        message: "",
        okText: "OK",
        cancelText: "Cancel",
        onok: function () {},
        oncancel: function () {},
      },
      options
    );

    const html = `
            <div class="confirm">
                <div class="confirm__window">
                    <div class="confirm__titlebar">
                        <span class="confirm__title">${options.title}</span>
                        <button class="confirm__close">&times;</button>
                    </div>
                    <div class="confirm__content">${options.message}</div>
                    <div class="confirm__buttons">
                        <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
                        <button class="confirm__button confirm__button--cancel">${options.cancelText}</button>
                    </div>
                </div>
            </div>
        `;

    const template = document.createElement("template");
    template.innerHTML = html;

    // Elements
    const confirmEl = template.content.querySelector(".confirm");
    const btnClose = template.content.querySelector(".confirm__close");
    const btnOk = template.content.querySelector(".confirm__button--ok");
    const btnCancel = template.content.querySelector(
      ".confirm__button--cancel"
    );

    //this is when clicking outside the confirm window, ma cclose siya
    confirmEl.addEventListener("click", (e) => {
      if (e.target === confirmEl) {
        options.oncancel();
        this._close(confirmEl);
      }
    });

    btnOk.addEventListener("click", () => {
      options.onok();
      this._close(confirmEl);
    });

    [btnCancel, btnClose].forEach((el) => {
      el.addEventListener("click", () => {
        options.oncancel();
        this._close(confirmEl);
      });
    });

    document.body.appendChild(template.content);
  },

  //to be used privately within object (method)
  _close(confirmEl) {
    confirmEl.classList.add("confirm--close");

    //removes the element from dom
    confirmEl.addEventListener("animationend", () => {
      document.body.removeChild(confirmEl);
    });
  },
};
