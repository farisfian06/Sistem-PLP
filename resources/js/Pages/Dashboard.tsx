import SidebarComponent from "@/Components/SidebarComponent";
import { Head } from '@inertiajs/react';

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-1/4">
                <SidebarComponent />
            </div>
            {/* Konten Utama */}
            <div className="flex-1 p-6 w-full lg:w-3/4">
                <Head title="Dashboard" />
            </div>
        </div>
    );
};

export default Dashboard;
