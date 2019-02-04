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

    function formValidation () {
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

        checkinForm.addEventListener("focus", function(e){
            console.log(1);
            e.target.style.boxShadow = "";
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