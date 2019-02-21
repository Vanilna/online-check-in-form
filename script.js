(function () {
    function createJSON(form) {
        var person = {};
        var dataElements = document.querySelectorAll("input");

        for (i = 0; i < dataElements.length; i++) {
            var dataElement = dataElements[i];
            var name = dataElement.name;
            var value = dataElement.value;

            if (name) {
                person[name] = value;
            }
        }

        return JSON.stringify(person);
    }

    var counter;

    function formValidation() {
        counter = 0;
        var elementsRequired = document.querySelectorAll(".required");
        var element;
        for (i = 0; i < elementsRequired.length; i++) {
            element = elementsRequired[i];
            if (element.value == false || "on") {
                element.style.boxShadow = "inset 0em 0em 0.3em red";
                counter++;
            }
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        var checkinForm = document.getElementById("checkin-form");

        checkinForm.addEventListener("focus", function (e) {
            e.target.style.boxShadow = "";
        }, true);

        checkinForm.addEventListener("blur", function (ev) {
            if (ev.target.invalid) {
                console.log(1);
            }
        }, true);

        checkinForm.addEventListener("submit", function (evnt) {
            evnt.preventDefault();
            formValidation();
            if (counter === 0) {
                var personJSON = createJSON(this);
                console.log(personJSON);
            }
        }, false);
    });
})();

document.querySelector("#invoceAggree").addEventListener("change", function () {
    var invoice = document.querySelector(".invoice");
    

    if (this.checked) {
        var disabled = invoice.querySelectorAll("input[disabled]");
        for (i = 0; i < disabled.length; i++) {
            disabled[i].removeAttribute("disabled");
        }
    } else {
        var toDisable = invoice.querySelectorAll("input");
        for (i = 1; i < toDisable.length; i++) {
            toDisable[i].setAttribute("disabled", "");
        }
    }
});