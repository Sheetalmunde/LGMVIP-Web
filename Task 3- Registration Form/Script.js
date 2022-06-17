var form = document.querySelector("#userForm");
const allUsersData = [];


const resetForm = function () {
  form.classList.remove('was-validated')
  const name = document.getElementById('name');
  name.value = "";

  const email = document.getElementById('email');
  email.value = "";

  const college = document.getElementById('college');
  college.value = "";

  const image = document.getElementById('image');
  image.value = "";

  const genderEl = document.querySelectorAll('input[name="gender"]');
  for (const rb of genderEl) {
    rb.checked = false;
  }

  const branchE1 = document.querySelectorAll('input[name="branch"]');
  for (const rb of branchE1) {
    rb.checked = false;
  }
};



const getData = function () {
  const name = document.getElementById('name').value;
  const contact = document.getElementById('contact').value;
  const email = document.getElementById('email').value;
  const college = document.getElementById('college').value;
  const image = document.getElementById('image').value;
  let gender;
  let branch = [];

  const genderEl = document.querySelectorAll('input[name="gender"]');
  for (const rb of genderEl) {
    if (rb.checked) {
      gender = rb.value;
      break;
    }
  };

  const branchE1 = document.querySelectorAll('input[name="branch"]');
  for (const rb of branchE1) {
    if (rb.checked) {
      branch.push(rb.value);
    }
  }
  return { name,contact, email, college, image, gender, branch };
};


form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (form.checkValidity()) {
    const data = getData();
    allUsersData.push(data);
    printResult(data);
    resetForm();


  } else {
    form.classList.add('was-validated');
  };
  removeSpan();
});



function removeSpan() {
  var span = document.getElementById("span");
  if(span){
    span.remove();
  }

};


function printResult(data) {
  const resultEl = document.getElementById('enrolled-students');
  let sectionHeading = null;
  if (allUsersData.length == 1) {

    sectionHeading = document.createElement('div');
    const description = document.createElement('p');
    description.innerHTML = "Description";
    description.className = "description";

    const image = document.createElement('p');
    image.innerHTML = "Image"
    image.className = "Image";

    sectionHeading.className = "sectionHeading";
    sectionHeading.append(description, image);
  };

  const wrapper = document.createElement('div');
  wrapper.className = "wrapper";
  wrapper.addEventListener('click', function (e) {
    console.log(e.target.className);
    if (e.target.className.includes('userDeleteBtn')) {
      console.log('aaadfasdfasdf');
      e.currentTarget.remove();
    }

  });

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = "+";
  deleteBtn.className = "userDeleteBtn";

  const textInfoContainer = document.createElement('div');
  textInfoContainer.className = "textInfoContainer";

  const imageContainer = document.createElement('div');
  imageContainer.className = "imageContainer";

  const imageHyperlink = document.createElement('a');
  imageHyperlink.href = data.image;
  imageHyperlink.target = "_blank";


  let name = document.createElement('p');
  name.className = "infoText userName";
  name.innerHTML = data.name;

  let contact = document.createElement('p');
  contact.className = "infoText Contact No";
  contact.innerHTML = data.contact;

  let gender = document.createElement('p');
  gender.className = "infoText gender";
  gender.innerHTML = data.gender;

  let email = document.createElement('p');
  email.className = "infoText email";
  email.innerHTML = data.email;

  let college = document.createElement('p');
  college.className = "infoText college";
  college.innerHTML = data.college;



  let branch = document.createElement('p');
  branch.className = "infoText branch";
  branch.innerHTML = data.branch.join(', ');


  let userImage = document.createElement('img');
  userImage.className = "userImage";
  userImage.src = data.image;


  textInfoContainer.append(name, contact, gender, email, college, branch);
  imageHyperlink.appendChild(userImage);
  imageContainer.appendChild(imageHyperlink);

  wrapper.append(textInfoContainer, imageContainer, deleteBtn);

  if (sectionHeading == null) {
    resultEl.append(wrapper);
  } else {
    resultEl.append(sectionHeading, wrapper)
  };

};


