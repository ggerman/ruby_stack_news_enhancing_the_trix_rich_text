// @ assets/javascripts/controllers/trix-controller.js
import { Controller } from "@hotwired/stimulus";

export default class TrixController extends Controller {

  connect() {

    // wait for the trix editor is attached to the DOM to do stuff
    addEventListener("trix-initialize", function (event) {
      console.log("im inititalized!");

        // @ assets/javascripts/controllers/trix-controller.js
        // inside the 'trix-initialize' event listener

        // initialize underline attribute
        Trix.config.textAttributes.underline = {
            tagName: "u",
            style: { textDecoration: "underline" },
            inheritable: true,
            parser: function (element) {
            var style = window.getComputedStyle(element);
            return style.textDecoration === "underline";
            },
        };
        // create underline button
        let underlineEl = document.createElement("button");
        underlineEl.setAttribute("type", "button");
        underlineEl.setAttribute("data-trix-attribute", "underline");
        underlineEl.setAttribute("data-trix-key", "u");
        underlineEl.setAttribute("tabindex", -1);
        underlineEl.setAttribute("title", "underline");
        underlineEl.classList.add("trix-button", "trix-button--icon-underline");
        underlineEl.innerHTML = "U";

        // add button to toolbar - inside the text tools group
        document.querySelector(".trix-button-group--text-tools").appendChild(underlineEl);
    }, true);

    // remove file upload handling
    addEventListener("trix-file-accept", function (event) {
      event.preventDefault();
    }, true);

  }
}
