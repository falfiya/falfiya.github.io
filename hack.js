function messWithBio(bios) {
  lcation = document.getElementsByName('location')[0];
  bio = document.getElementsByName('bio')[0];
  gender = document.getElementsByName('gender_id')[0];
  lcation.name = 'gender_id';
  bio.name = 'location';
  gender.name = 'bio';
  lcation.value = '1';
  bio.value = 'California';
  gender.childNodes[5].value = bios;
  document.querySelectorAll('.pure-controls')[1].childNodes[1].click();
}
messWithBio('Hello world');
