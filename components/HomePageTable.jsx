import {useMediaQuery, useTheme} from "@mui/material";


const TableHeader = ({columns}) => {
    return (
        <div className={'flex'}>
            {
                columns.map((column, index) => {
                    return (
                            <div key={index} className={`${column.title === 'Client' ? 'w-2/5' : 'w-1/5'}`}>
                                <span className={'uppercase font-sans text-sm text-secondaryLight font-semibold'}>{column.title}</span>
                            </div>
                    )
                })
            }
        </div>
    )
}

const TableRow = ({data}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
    return (
        <div className={'flex border-b-1 border-neutral-200'}>
            {
                Object.keys(data).map((item, index) => {
                    return (
                        item === 'status' ? (
                                <div key={index} className={'p-1 bg-[#E1FFEF] flex rounded-full h-8 my-auto w-12 justify-center items-center'}>
                                    <span className={'text-xs font-sans font-bold mx-auto text-[#18D84A]'}>{data[item]}</span>
                                </div>
                        ): (
                            <div key={index} className={`h-16 flex items-center font-sans font-bold ${item === 'client' ? 'w-2/5 cursor-pointer hover:underline' : 'w-1/5'}`}>
                                <span className={' text-neutral-600 font-sans'}>{item === 'date' && isSmallScreen ? data[item].split('/')[0] + '/' + data[item].split('/')[1] : data[item]}</span>
                            </div>
                        )
                    )
                })
            }
        </div>
    )
}

const HomePageTable = ({columns, data}) => {
    return (
        <div className={'mt-5'}>
            <TableHeader columns={columns}/>
            {
                data.map((item, index) => {
                    return (
                        <TableRow key={index} data={item}/>
                    )
                })
            }
        </div>
    )
}

export default HomePageTable;