// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // prevent page reload

  // Collect input values
  const username = (document.getElementById('username') as HTMLInputElement).value.trim();
  const name = (document.getElementById('name') as HTMLInputElement).value.trim();
  const email = (document.getElementById('email') as HTMLInputElement).value.trim();
  const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
  const education = (document.getElementById('education') as HTMLTextAreaElement).value.trim();
  const experience = (document.getElementById('experience') as HTMLTextAreaElement).value.trim();
  const skills = (document.getElementById('skills') as HTMLTextAreaElement).value.trim();

  // Validate inputs
  if (!username || !name || !email || !phone) {
    alert('Please fill in all required fields.');
    return;
  }

  // Save form data in localStorage with the username as the key
  const resumeData = { name, email, phone, education, experience, skills };
  localStorage.setItem(username, JSON.stringify(resumeData)); // Save data locally

  // Generate the resume content dynamically
  const resumeHTML = `
    <h2>Editable Resume</h2>
    <h3>Personal Information</h3>
    <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
    <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
    <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
    <h3>Education</h3>
    <p contenteditable="true">${education}</p>
    <h3>Experience</h3>
    <p contenteditable="true">${experience}</p>
    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p>
  `;
  resumeDisplayElement.innerHTML = resumeHTML;

  // Generate a shareable URL with the username
  const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
  shareableLinkContainer.style.display = 'block';
  shareableLinkElement.href = shareableURL;
  shareableLinkElement.textContent = shareableURL;
});

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
  const originalContent = document.body.innerHTML;
  const printableContent = resumeDisplayElement.innerHTML;
  document.body.innerHTML = printableContent; // Replace body with resume content
  window.print();
  document.body.innerHTML = originalContent; // Restore original content
  window.location.reload(); // Ensure the page reloads with the original state
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  if (username) {
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);
      (document.getElementById('username') as HTMLInputElement).value = username;
      (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
      (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
      (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
      (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
      (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
      (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
    }
  }
});
