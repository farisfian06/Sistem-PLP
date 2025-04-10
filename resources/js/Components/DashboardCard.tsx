import {Button, Card} from "flowbite-react";
import {usePage} from "@inertiajs/react";

export default function DashboardCard(
    {
        heading = "",
        title = '',
        content = '',
        contentNumber = '',
        icon: IconComponent = null,
        pIcon: PIconComponent = null,
        buttonValue = '',
        buttonHref = '',
        className = '',
        ...props
    }
) {

    return (
        <Card className={`rounded-2xl ` + className}>
            <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2 justify-between">
                    {IconComponent && (
                        <IconComponent className="mr-3 text-5xl text-gray-300" />
                    )}
                    <div className="flex flex-col">
                        {PIconComponent && (
                            <PIconComponent className="text-gray-500 inline mb-3 text-s"/>
                        )}
                        <h2 className="text-md font-semibold text-black">
                            {heading}
                        </h2>
                        <p className="text-sm text-gray-600 flex items-center">
                            {title}
                        </p>
                        <h2 className={"text-lg font-bold text-gray-900"}>
                            {content}
                        </h2>
                        <h2 className={"text-3xl font-bold text-gray-900"}>
                            {contentNumber}
                        </h2>
                    </div>
                </div>
                {buttonValue && (
                    <div>
                        <Button color={"alternative"} href={buttonHref ? buttonHref : "#"}>{buttonValue}</Button>
                    </div>
                )}
            </div>
        </Card>
    )
}
