import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {FormEventHandler} from 'react';

export default function Register() {

    const defaultAngkatan = (new Date().getFullYear() - 3).toString();

    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        details: {
            nim: '',
            angkatan: defaultAngkatan
        },
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };


    return (
        <GuestLayout>
            <Head title="Register"/>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name"/>

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2"/>
                </div>

                <div className="mt-4">
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

                    <InputError message={errors.name} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2"/>
                </div>

                <div className="mt-4">
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
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password"/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <PrimaryButton className="w-full mr-0" disabled={processing}>
                        Daftar
                    </PrimaryButton>
                </div>


                <div className="py-4 flex items-center justify-center">
                    <span className="rounded-md text-sm mr-1 text-gray-600"
                    >
                        Sudah punya akun?
                    </span>
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
