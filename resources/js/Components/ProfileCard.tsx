import {Card} from "flowbite-react";
import {FaUserCircle} from "react-icons/fa";
import {usePage} from "@inertiajs/react";

export default function ProfileCard() {

    const user = usePage().props.auth.user;

    return (
        <Card className={`rounded-2xl`}>
            <div className="flex items-center gap-2">
                <FaUserCircle className="mr-3 text-5xl text-gray-300"/>
                <div className="flex flex-col">
                    <h2 className="text-lg font-medium text-gray-900">
                        {user.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        {user.role === "Mahasiswa" ? "Mahasiswa PLP" : user.role}
                    </p>
                </div>
            </div>
        </Card>
    )
}
