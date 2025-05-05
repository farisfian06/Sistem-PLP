// src/types.ts
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    details: string;
    email_verified_at: string;
}

export interface NavItem {
    href?: string;
    label: string;
    icon?: JSX.Element;
    collapse?: NavItem[];
}

export interface NewEditUser {
    id: number;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
    details: string;
}

export interface Authentication {
    [key: string]: any;
    auth: {
        user: User;
    };
}

export interface PendaftaranProps {
    [key: string]: any;
    auth: {
        user: User;
    };
    smks: {
        id: number;
        name: string;
    }[];
    keminatans: {
        id: number;
        name: string;
    }[];
    pendaftaranPlp: Array<{
        dosen_pembimbing: any;
        id: number;
        keminatan_id: number;
        nilai_plp_1: string;
        nilai_micro_teaching: string;
        pilihan_smk_1: number;
        pilihan_smk_2: number;
        penempatan: any;
    }>;
}

export interface Logbook {
    id: number;
    tanggal: string;
    mulai: string;
    selesai: string;
    keterangan: string;
    dokumentasi: string;
    status?: string;
  }

  export interface SelectOption {
      id: string | number;
      name: string;
  }

export interface PendaftaranPlp {
    id: number;
    user_id: string;
    keminatan_id: string;
    nilai_plp_1: string;
}

export interface FlashProps {
    [key: string]: any;
    auth: {
        user: User;
    };
    flash: {
        success?: string;
        error?: string;
        componentSuccess?: string;
    };
}

export interface AssignPendaftaran {
    [key: string]: any;
    id: number;
    penempatan: number;
    dosen_pembimbing: number;
}

  export interface AkunPamong {
    id: number;
    nama: string;
    nipNik: string;
    noHp: string;
    pangkatGolongan: string;
    noRekening: string;
    anRekening: string;
    namaBank: string;
    sekolah: string;
    email: string;
    password: string;
  }

export interface AkunPJ {
    id: number;
    nama: string;
    nip: string;
    notel: string;
    status: string;
    pangkat: string;
    norek: string;
    norek_an: string;
    nama_bank: string;
    smk_id: number;
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
    name: string;
  }

  export interface Keminatan{
    id: number;
    name: string;
  }
