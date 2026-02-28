import { Suspense } from "react"
import Navbar from "../components/Layout/Navbar"
import Table from "../components/UI/Table"
import type { TableHeader } from "../types/TableHeader.type"
import LoadingOverlay from "../components/Layout/LoadingOverlay"
import { Link } from "react-router"

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
        <Suspense fallback={<LoadingOverlay />}>
            <Navbar />
            <div className="flex flex-col items-center w-full max-w-300 mx-auto gap-16 mt-9">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-4xl">My tests</h1>
                    <Link
                        to={"/new-test"}
                        className="bg-primary px-3 py-2 rounded-lg text-white"
                    >
                        Create
                    </Link>
                </div>
                <Table tHeaders={tHeaders} />
            </div>
        </Suspense>
    )
}
export default DashboardPage
