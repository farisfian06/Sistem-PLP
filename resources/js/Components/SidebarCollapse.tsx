import { useState } from "react";
import { HiChartPie,HiDocumentAdd, HiBookOpen, HiCubeTransparent, HiUser} from "react-icons/hi";
import {Link, router, usePage} from "@inertiajs/react";
import {NavItem} from "@/types/types";

type SidebarCollapseProps = {
    label?: string;
    icon?: JSX.Element | null;
    items?: NavItem[];
    [key: string]: any;
};

export default function SidebarCollapse(
    {
        label = "",
        icon: IconComponent = null,
        pIcon: PIconComponent = null,
        items = [],
        ...props
    }: SidebarCollapseProps
) {
    const [collapseOpen, setCollapseOpen] = useState(false);

    return (
        <>
            <li>
                <button type="button"
                        className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        aria-controls="dropdown-example" data-collapse-toggle="dropdown-example"
                        onClick={() => {
                            setCollapseOpen(!collapseOpen)
                        }}
                >
                    {IconComponent}
                    <span
                        className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{label}</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                <ul id="dropdown-example" className={`${collapseOpen ? '' : 'hidden'} py-2 space-y-2`}>
                    {items.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href || ""}
                                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-8 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <span className="ml-3">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
        </>
    );
};

