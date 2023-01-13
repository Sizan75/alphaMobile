import { useQuery } from '@tanstack/react-query';


const ReportedItems = () => {

    const url='https://alpha-mobile-server.vercel.app//reports'
  
    const { data: reports = [] } = useQuery({
        queryKey: ['reports', ],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json()
            return data
        }
    })
    return (
        <div>
            <h2 className='text-3xl'>Reported Items</h2>
            <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        
                        <th>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        reports.map((report, i) => <tr key={report._id} className="hover">
                            <th>{i + 1}</th>
                            <td>
                                <div className="avatar">
                                    <div className="w-24 rounded-xl">
                                        <img src={report.image} alt="" />
                                    </div>
                                </div>
                            </td>

                            <td>{report.productName}</td>
                            <td>{report.email}</td>
                            <td>{report.sellerName}</td>
                            
                           
                            
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
        </div>
    );
};

export default ReportedItems;