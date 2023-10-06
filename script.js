var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var form = document.getElementById("form");
var resultArea = document.querySelector(".comment");
var modalContent = document.querySelector(".modal-content");
var modalText = document.querySelector("#modalText");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// Fungsi untuk menampilkan modal dengan pesan tertentu
function showModal(message) {
  modal.style.display = "block";
  modalText.innerHTML = message;
}

function calculate() {
  const formData = {
    age: age.value,
    height: height.value,
    weight: weight.value,
    gender: male.checked ? "male" : female.checked ? "female" : "",
  };

  // Memeriksa apakah ada input yang kosong atau jenis kelamin tidak dipilih
  if (
    formData.age === "" ||
    formData.height === "" ||
    formData.weight === "" ||
    formData.gender === ""
  ) {
    showModal("Please check your data!");
  } else if (
    formData.weight < 2.1 ||
    formData.weight > 1400 ||
    formData.height < 122 ||
    formData.height > 272
  ) {
    showModal("Please enter valid weight and height values!");
  } else {
    // Jika input valid, panggil fungsi countBmi() untuk menghitung BMI
    countBmi();
  }
}

// Fungsi untuk mengumpulkan data BMI dari formulir (usia, tinggi, berat, dan jenis kelamin)
function countBmi() {
  var p = [age.value, height.value, weight.value];

  if (male.checked) {
    p.push("male");
  } else if (female.checked) {
    p.push("female");
  }

  // Rumus BMI: berat (kg) / ((tinggi (m) / 100) * tinggi (m))
  var bmi = Number(p[2]) / (((Number(p[1]) / 100) * Number(p[1])) / 100);

  // Variabel kategori BMI
  var result = "";
  if (bmi < 18.5) {
    result = "Underweight";
  } else if (18.5 <= bmi && bmi <= 24.9) {
    result = "Normal weight";
  } else if (25 <= bmi && bmi <= 29.9) {
    result = "Overweight";
  } else if (30 <= bmi && bmi <= 34.9) {
    result = "Obesity";
  } else if (35 <= bmi) {
    result = "Extremely obesity";
  }

  // Menunjukkan hasil penghitungan BMI dan memberikan feedback atau komentar berdasarkan hasilnya
  resultArea.style.display = "block";
  document.querySelector(
    ".comment"
  ).innerHTML = ` which means You are <span id="comment">${result}</span>`;
  document.querySelector("#result").innerHTML = bmi.toFixed(2);
}

// Saat pengguna mengklik <span> (x), tutup modal
span.onclick = function () {
  modal.style.display = "none";
};

// Saat pengguna mengklik di mana saja di luar modal, tutuplah
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Menambahkan event listener ke form
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah form dari pengiriman default
  calculate(); // Panggil fungsi calculate() ketika form di-submit
});
