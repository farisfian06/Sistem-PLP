import React, { useState } from "react";
import SidebarComponent from "@/Components/SidebarComponent";
import { HiCheckCircle } from "react-icons/hi";
import { Head } from "@inertiajs/react";

export default function PendaftaranPlp() {
  // State untuk form data
  const [formData, setFormData] = useState({
    namaLengkap: "",
    angkatan: "",
    bidangKeahlian: "",
    nilaiPlp1: "",
    nilaiMicroTeaching: "",
    pilihanSmk1: "",
    pilihanSmk2: "",
  });

  // State untuk status pendaftaran dan error
  const [statusPendaftaran, setStatusPendaftaran] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Data yang dikirim:", formData);
    // Validasi semua form diisi
    const isFormValid = Object.values(formData).every((value) => value !== "");
    
    if (!isFormValid) {
      setErrorMessage("Semua field harus diisi!");
      return;
    }

    // Reset error message jika semua valid
    setErrorMessage(null);

    // Mengirim formData ke backend
    try {
      const response = await fetch('/api/pendaftaran-plp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      
      // Mengecek keberhasilan request
      if (!response.ok) {
        throw new Error('Terjadi kesalahan saat mengirim data');
      }

      setStatusPendaftaran("Pendaftaran berhasil! Anda telah berhasil melakukan pendaftaran PLP. Penentuan lokasi dan dosen pembimbing Anda akan ditampilkan pada dashboard.");
    } catch (error) {
      console.error('Error:', error);
      setStatusPendaftaran("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
    }
  };

  // Form fields configuration
  const formFields = [
    {
      label: "Nama Lengkap",
      name: "namaLengkap",
      type: "text",
      value: formData.namaLengkap,
      placeholder: "Masukkan Nama Lengkap",
    },
    {
      label: "Angkatan",
      name: "angkatan",
      type: "text",
      value: formData.angkatan,
      placeholder: "Masukkan Angkatan",
    },
    {
      label: "Bidang Keahlian",
      name: "bidangKeahlian",
      type: "select",
      value: formData.bidangKeahlian,
      placeholder: "Pilih Bidang Keahlian",
      options: ["Pengembangan Perangkat Lunak dan Gim", "Teknik Jaringan Komputer dan Telekomunikasi"],
      isLarge: true,
    },
    {
      label: "Nilai PLP 1",
      name: "nilaiPlp1",
      type: "select",
      value: formData.nilaiPlp1,
      placeholder: "Pilih Nilai Plp I",
      options: ["A", "B+", "B", "C", "D"]
    },
    {
      label: "Nilai Micro Teaching",
      name: "nilaiMicroTeaching",
      type: "select",
      value: formData.nilaiMicroTeaching,
      placeholder: "Pilih Nilai Micro Teaching",
      options: ["A", "B+", "B", "C", "D"]
    },
    {
      label: "Pilihan SMK 1",
      name: "pilihanSmk1",
      type: "select",
      value: formData.pilihanSmk1,
      placeholder: "Pilih SMK yang Diminati",
      options: ["SMKN 1 Malang","SMKN 2 Malang","SMKN 3 Malang","SMKN 4 Malang","SMKN 5 Malang","SMKN 6 Malang","SMKN 7 Malang","SMKN 8 Malang","SMKN 9 Malang","SMKN 10 Malang","SMKN 11 Malang","SMKN 12 Malang","SMKN 13 Malang"]
    },
    {
      label: "Pilihan SMK 2",
      name: "pilihanSmk2",
      type: "select",
      value: formData.pilihanSmk2,
      placeholder: "Pilih SMK yang Diminati",
      options: ["SMKN 1 Malang","SMKN 2 Malang","SMKN 3 Malang","SMKN 4 Malang","SMKN 5 Malang","SMKN 6 Malang","SMKN 7 Malang","SMKN 8 Malang","SMKN 9 Malang","SMKN 10 Malang","SMKN 11 Malang","SMKN 12 Malang","SMKN 13 Malang"]
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="lg:w-1/4">
        <SidebarComponent />
      </div>
      {/* Konten Utama */}
      <div className="flex-1 p-6 w-full lg:w-3/4">
        <Head title="Pendaftaran PLP" />
        <h2 className="text-2xl text-center font-extrabold p-6 ">Pendaftaran PLP</h2>

        {/* Menampilkan pesan status pendaftaran */}
        {statusPendaftaran && (
        <div className="bg-green-400 text-white p-4 mb-4 rounded-lg flex items-start">
          <HiCheckCircle size={30} className="mr-2 text-white" />
          <div>
            <span className="font-bold">Pendaftaran berhasil!</span>
            <br />
            <span className="text-sm">{statusPendaftaran.replace("Pendaftaran berhasil!", "").trim()}</span>
          </div>
        </div>
      )}

        {/* Menampilkan pesan error jika ada */}
        {errorMessage && (
          <div className="bg-red-400 text-white p-4 mb-4 rounded-lg flex items-start">
            <HiCheckCircle size={30} className="mr-2 text-white" />
            <div>
              <span className="font-bold">Error!</span>
              <br />
              <span className="text-sm">{errorMessage}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-white border rounded grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Render form fields */}
          {formFields.map((field, index) => (
            <div className={`mb-4 ${field.isLarge ? 'col-span-2' : ''}`} key={index}>
              <span className="block text-sm">{field.label}</span>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  className="bg-gray-100 p-2 w-full rounded "
                >
                  <option value="" disabled hidden>
                    {field.placeholder}
                  </option>
                  {field.options?.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  className="bg-gray-100 p-2 w-full rounded"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded col-span-2 mt-4"
          >
            Daftar PLP
          </button>
        </form>
      </div>
    </div>
  );
}
