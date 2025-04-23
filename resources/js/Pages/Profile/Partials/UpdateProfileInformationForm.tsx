import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button, Card } from "flowbite-react";
import {Authentication} from "@/types/types";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    // mengambil data user
    const { auth } = usePage().props as unknown as Authentication;
    const user = auth.user;

    // mengisi data awal form
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            details: user.details ? JSON.parse(user.details) : "",
        });

    // update profil saat user mengeklik save
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <Card className={`rounded-2xl ` + className}>

            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Informasi Profil
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Anda dapat melakukan pembaruan profil anda dengan mengubah informasi di bawah
                </p>
            </header>

            {/*form yang akan diisi user*/}
            <form onSubmit={submit} className="mt-6 space-y-6">
                {/*inptu nama*/}
                <div>
                    <InputLabel htmlFor="name" value="Name"/>

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name}/>
                </div>

                {/*menampilkan input NIM jika role mahasiswa*/}
                {user?.role === "Mahasiswa" && <div>
                    <InputLabel htmlFor="nim" value="NIM"/>

                    <TextInput
                        id="nim"
                        name="nim"
                        type="number"
                        value={data.details.nim}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData('details', {
                            ...data.details,
                            nim: e.target.value
                        })}
                        required
                    />

                    <InputError className="mt-2" message={errors.name}/>
                </div>}

                {/*menampilkan input NIP jika role bukan mahasiswa*/}
                {user?.role !== "Mahasiswa" && <div>
                    <InputLabel htmlFor="nip" value="NIP"/>

                    <TextInput
                        id="nip"
                        name="nip"
                        type="number"
                        value={data.details.nip}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData('details', {
                            ...data.details,
                            nip: e.target.value
                        })}
                        required
                    />

                    <InputError className="mt-2" message={errors.name}/>
                </div>}

                <div>
                    <InputLabel htmlFor="phone" value="Nomor Telepon"/>

                    <TextInput
                        id="phone"
                        name="phone"
                        type="number"
                        value={data.details.phone}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData('details', {
                            ...data.details,
                            phone: e.target.value
                        })}
                        required
                    />

                    <InputError className="mt-2" message={errors.name}/>
                </div>

                {/*input email*/}
                <div>
                    <InputLabel htmlFor="email" value="Email"/>

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email}/>
                </div>

                {/*input angkatan jika role mahasiswa*/}
                {user?.role === "Mahasiswa" && <div>
                    <InputLabel htmlFor="angkatan" value="Angkatan"/>

                    <TextInput
                        id="angkatan"
                        type="number"
                        name="angkatan"
                        min={1999}
                        max={2050}
                        value={data.details.angkatan}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('details', {
                            ...data.details,
                            angkatan: e.target.value
                        })}
                        required
                    />

                    <InputError message={errors.email} className="mt-2"/>
                </div>}

                {/*bawaan dari breeze, buat verifikasi email. kita mungkin gak pake tapi biarin aja siapa tau perlu*/}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                {/*tombol untuk memperbarui profil*/}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Perbarui Profil</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </Card>
    );
}
