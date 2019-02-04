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
        for (i = 0; i < elementsRequired.length; i++) {
            if (elementsRequired[i].value) {
                console.log(1);
                elementsRequired[i].style.backgroundColor = "red";
                counter++;
            } 
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        var checkinForm = document.getElementById("checkin-form");
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