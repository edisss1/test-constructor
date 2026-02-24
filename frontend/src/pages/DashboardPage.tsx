import Navbar from "../components/Layout/Navbar"
import Button from "../components/UI/Button"
import Table from "../components/UI/Table"
import type { TableHeader } from "../types/TableHeader.type"

const DashboardPage = () => {
    const tHeaders: TableHeader[] = [
        {
            tHeader: "Title",
            onClick: () => {}
        },
        {
            tHeader: "Creation Date",
            onClick: () => {}
        },
        {
            tHeader: "Number of members",
            onClick: () => {}
        },
        {
            tHeader: "Actions",
            onClick: () => {}
        }
    ]

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center w-full max-w-300 mx-auto gap-16 mt-9">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-4xl">My tests</h1>
                    <Button className="bg-primary px-3 py-2 rounded-lg text-white">
                        Create
                    </Button>
                </div>
                <Table tHeaders={tHeaders} />
            </div>
        </>
    )
}
export default DashboardPage
