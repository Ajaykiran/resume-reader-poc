const ResumeParser = require('simple-resume-parser');

const parseDoc = (req) => {
  var ename = req.file.filename;
  resume = new ResumeParser("./resumes/" + ename);

  return resume.parseToJSON()
    .then(data => {
      var name = data.parts.name;
      var email = data.parts.email;
      var phoneNumber = data.parts.phone;
      // var linked = data.parts.profiles;
      var skills = data.parts.skills;
      var college = data.parts.college;
      var currentEmployer = data.parts.currentEmployer;

      // .done();
      var dats = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        skills: skills,
        college: college,
        currentEmployer = currentEmployer
      }
      return dats;
    })
}

exports.parseDoc = parseDoc;