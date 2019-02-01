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

    document.addEventListener("DOMContentLoaded", function () {
        var checkinForm = document.querySelector("#checkin-form");
        checkinForm.addEventListener("submit", function (evnt) {
            evnt.preventDefault();
            var personJSON = createJSON(this);
            document.querySelector("#result") = personJSON;
        }, false);
    });
})();