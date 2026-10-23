const productList = document.getElementById("product-list");
const loading = document.getElementById("loading");
const registrationForm = document.getElementById("registration-form");
const formMessage = document.getElementById("form-message");

// Mengambil data produk dari API
async function getProducts() {
    try {
        loading.textContent = "Memuat produk...";

        const response = await fetch("https://dummyjson.com/products");

        // Memeriksa apakah request berhasil
        if (!response.ok) {
            throw new Error("Gagal mengambil data produk");
        }

        // Mengubah response menjadi JSON
        const data = await response.json(); 

        // Menghilangkan pesan loading
        loading.textContent = "";

        // Menampilkan produk ke halaman
        data.products.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
         <h3>${product.title}</h3>
         <p>Harga: $${product.price}</p>
        `;
  

            productList.appendChild(productCard);
        });

    } catch (error) {
        loading.textContent = "Terjadi kesalahan: " + error.message;
    }
}

// Menjalankan fungsi saat halaman dibuka
getProducts();

registrationForm.addEventListener("submit", function(event) {
    // Mencegah halaman refresh saat form dikirim
    event.preventDefault();

    // Mengambil nilai input dari form
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const prodi = document.getElementById("prodi").value.trim();

    // Validasi input
    if (nama === "" || email === "" || prodi === "") {
        formMessage.textContent = "Semua kolom wajib diisi!";
        formMessage.style.color = "red";
        return;
    }

    // Validasi format email sederhana
    if (!email.includes("@") || !email.includes(".")) {
        formMessage.textContent = "Masukkan alamat email yang valid!";
        formMessage.style.color = "red";
        return;
    }

    // Menampilkan hasil form menggunakan DOM
    formMessage.textContent =
        "Pendaftaran berhasil! Selamat datang, " + nama +
        " dari program studi " + prodi + ".";

    formMessage.style.color = "green";

    // Mengosongkan form setelah berhasil
    registrationForm.reset();
});