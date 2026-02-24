import type { TableHeader } from "../../types/TableHeader.type"

type TableProps = {
    tHeaders: TableHeader[]
}

const Table = ({ tHeaders }: TableProps) => {
    return (
        <table className="w-full max-w-300 mx-auto">
            <tr>
                {tHeaders.map((h, i) => (
                    <th className="text-start font-normal text-xl" key={i}>
                        {h.tHeader}
                    </th>
                ))}
            </tr>
        </table>
    )
}
export default Table
