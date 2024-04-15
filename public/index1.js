
//Register function

var firebaseConfig = {
    apiKey: "AIzaSyDioYAzvJooHpspr8Z58bImI0s2jaIRU90",
    authDomain: "testlogin-c11b6.firebaseapp.com",
    projectId: "testlogin-c11b6",
    storageBucket: "testlogin-c11b6.appspot.com",
    messagingSenderId: "598921663451",
    appId: "1:598921663451:web:8bc05bbb07d312f1650dfe",
    measurementId: "G-4N0GNYZQ8J"
};

//firebase.initializeApp(firebaseConfig);

 firebase.initializeApp(firebaseConfig);


const auth = firebase.auth()
const database = firebase.database()





function valid_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }

function valid_password(password) {
    
    // Firebase only accepts lengths greater than 6
    if (password.length < 6) {
      return false
    } else {
      return true
    }
  }
function valid_name(name){
    if (name == null){
        return false
    }
    if (name.length <= 0){
        return false
    } else {
        return true
    }
}



//+ firebase.auth().currentUser.uid
function deletePatient(patientKey, Clinic, patinetDiv, editButton, deleteButton){
    const confirmDelete = confirm('Are you sure to delete this patient?')
    console.log(Clinic)
    console.log(patientKey)
    if(confirmDelete){
        database.ref('patientList/' + Clinic + '/' + patientKey).remove()
        .then(() => {
            console.log('Bệnh nhân đã được xóa khỏi cơ sở dữ liệu.');
            patinetDiv.remove()
            editButton.style.display = 'none';
            deleteButton.style.display = 'none';
            document.getElementById('searchInput').value = '';
            document.getElementById("CLINIC2").value = '';
        })
        .catch((error) => {
            console.error('Lỗi khi xóa bệnh nhân:', error);
        });
    }
}
function editPatientInfo(patientID, name,phone){
    const newName = prompt("Nhập tên", name)
    const newSDT = prompt("Nhập sđt", phone)

    if(newName !== null && newSDT !== null){
 
        database.ref('patientList/' + patientID).update({
            Ho_va_ten: newName,
            SDT: newSDT
        })
        .then(()=>{
            alert('cap nhat thanh cong')
        }
        ) .catch((error) => {
            console.error("kooix",error)
        })
    }
}


 function logout(){
     firebase.auth().signOut().then(function(){
         console.log("User signed out")
         location.reload();
     }).catch(function(error){
         console.error("Error signing out", error)
})
localStorage.removeItem('customToken')
 }

