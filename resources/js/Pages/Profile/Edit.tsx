import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {PageProps} from '@/types';
import {Head} from '@inertiajs/react';
import { FaUserCircle } from "react-icons/fa";
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import SidebarComponent from "@/Components/SidebarComponent";
import ProfileCard from "@/Components/ProfileCard";

export default function Edit({
                                 mustVerifyEmail,
                                 status,
                             }: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <div className="flex flex-col lg:flex-row">
            <Head title="Profile"/>
            <SidebarComponent/>
            <div className="flex-1 p-6 lg:ml-64 mt-16 flex flex-col gap-6">
                <h1 className="text-xl font-bold">Akun</h1>
                <ProfileCard/>
                <div className="flex gap-6 items-start">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="w-full flex-1"
                    />

                    <UpdatePasswordForm className="w-full flex-1"/>
                </div>
            </div>
        </div>


    );
}
