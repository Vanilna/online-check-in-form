(function () {
    //window.scrollTo(0,40); - this shioul make page go to top, when it's reloaded, but it go up only for a secund and then go back down

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

    var counter; // this var will indicate whether there is some some invalid input or not (if it's 0)
    var checkboxLabel;

    function formValidation() {
        counter = 0;
        var elementsRequired = document.querySelectorAll(".required");
        var element;
        var firstInvalid;

        for (i = 0; i < elementsRequired.length; i++) {
            element = elementsRequired[i];
            if (!(element.value) || (element.type == "checkbox" && element.checked == false)) { //if the first evaluetes to true
                //it checkes whether the elemnt is checkbox an is it cheked or not
                if (element.type == "checkbox") {
                    checkboxLabel = document.querySelector("#" + element.id + " + label");
                    checkboxLabel.style.border = "0.1em solid #d10a10";
                }
                element.style.border = "0.1em solid #d10a10";
                counter++;
                if (counter === 1) {
                    firstInvalid = element; // I'm saving the first invalid input element to scroll to it after submit
                }
            }
        }

        if (counter > 0) {
            var rect = firstInvalid.getBoundingClientRect();
            
            var invalidPosition = window.pageYOffset + rect.top - 40; //I'm checking how far is the page scrolled 
            //then add the rect.top (which is negative value), so the difference between this two elements will tell me the distans
            // from the top of the page to first invalid input element
            //-40 is to be sure that the label of input will be shown too

            scrollOptions = {
                top: invalidPosition,
                behavior: "smooth"
            }
            window.scrollTo(scrollOptions);
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        var checkinForm = document.getElementById("checkin-form");

        checkinForm.addEventListener("click", function (e) {//click event instead of focus, 
            //bocouse my checkboxes are label-imitations ant can't be focused
            e.target.style.border = "";
        }, true);//to remove red color when invalid input is clicked to be fulfilled

        checkinForm.addEventListener("blur", function (ev) {
            if (ev.target.invalid) {
                console.log(1);
            }
        }, true);//this is not finished jet

        checkinForm.addEventListener("submit", function (evnt) {
            evnt.preventDefault();
            formValidation();
            if (counter === 0) {
                var personJSON = createJSON(this);
                console.log(personJSON);
            }//if there's no more invalid input's (counter === 0), we can submit form.
            //I don't know backEnd jet, so I'm just printing the result to console
        }, false);
    });
})();

document.querySelector("#invoceAggree").addEventListener("change", function () {
    var invoice = document.querySelector(".invoice");

    if (this.checked) {           //checking if the checkbox of invoiceAgree is checked (if the guest want's an invoice)
        var disabled = invoice.querySelectorAll("input[disabled]");  //taking all the input elements with disabled argument
        for (i = 0; i < disabled.length; i++) {
            disabled[i].removeAttribute("disabled"); //making them active, so the invoice data can be entered
        }
    } else {
        var toDisable = invoice.querySelectorAll("input");
        for (i = 1; i < toDisable.length; i++) {
            toDisable[i].value = "";
            toDisable[i].setAttribute("disabled", ""); //if the checkbox will be unclicked again, the form will be emptied and disable again
        }
    }
});