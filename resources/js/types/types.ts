// src/types.ts
export interface Logbook {
    id: number;
    tanggal: string;
    mulai: string;
    selesai: string;
    keterangan: string;
    dokumentasi: string;
    status?: string;
  }
  
  export interface AkunPamong {
    id: number;
    nama: string;
    nipNik: string;
    noHp: string;
    role: string;
    pangkatGolongan: string;
    noRekening: string;
    anRekening: string;
    namaBank: string;
    sekolah: string;
    email: string;
    password: string;
  }

  export interface AkunDosen {
    id: number;
    nama: string;
    nip: string;
    noHp: string;
    email: string;
    password: string;
  }

  export interface Smk{
    id: number;
    nama: string;
  }

  export interface Keminatan{
    id: number;
    nama: string;
  }
  