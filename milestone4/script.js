// get references to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
// Handle form submission 
form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page reload
    //collecct input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var expirience = document.getElementById('expirience').value;
    var skills = document.getElementById('skills').value;
    //Generate the resume dynamically
    var resumehtml = "\n    <h2><b>Editable Resume</b></h2>\n    <h3>Personal Information</h3>\n    <p><b>Name:</b><spancontenteditable=\"true\">".concat(name, "</span></p>\n    <p><b>Name:</b><spancontenteditable=\"true\">").concat(email, "</span></p>\n    <p><b>Name:</b><spancontenteditable=\"true\">").concat(phone, "</span></p>\n\n    <h3>Education</h3>\n    <p contenteditable=\"true\">").concat(education, "</p>\n\n    <h3>Expirience</h3>\n    <p contenteditable=\"true\">").concat(expirience, "</p>\n\n    <h3>skills</h3>\n    <p contenteditable=\"true\">").concat(skills, "</p>\n    "); //Display the generated resume
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumehtml;
    }
    else {
        console.error('The resume display element is missing.');
    }
});
