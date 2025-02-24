import {useState} from "react";

export function EmployeesPage() {
    const employees = [
        { e_id: "E001", e_name: "Alice Smith", e_address: "123 Main St, Anytown", job_title: "Software Engineer", availability: "Full-time" },
        { e_id: "E002", e_name: "Bob Johnson", e_address: "456 Oak Ave, Anytown", job_title: "Project Manager", availability: "Part-time" },
        { e_id: "E003", e_name: "Charlie Brown", e_address: "789 Pine Ln, Anytown", job_title: "Data Analyst", availability: "Full-time" },
        { e_id: "E004", e_name: "Diana Lee", e_address: "101 Elm Rd, Anytown", job_title: "UX Designer", availability: "Contract" },
        { e_id: "E005", e_name: "Edward Green", e_address: "202 Maple Dr, Anytown", job_title: "QA Tester", availability: "Full-time" },
        { e_id: "E006", e_name: "Fiona White", e_address: "303 Birch Ct, Anytown", job_title: "Sales Representative", availability: "Part-time" },
        { e_id: "E007", e_name: "George Black", e_address: "404 Cedar Pl, Anytown", job_title: "Marketing Specialist", availability: "Full-time" },
        { e_id: "E008", e_name: "Hannah Gray", e_address: "505 Willow Way, Anytown", job_title: "Customer Support", availability: "Contract" },
        { e_id: "E009", e_name: "Ian Purple", e_address: "606 Spruce Blvd, Anytown", job_title: "Network Engineer", availability: "Full-time" },
        { e_id: "E010", e_name: "Julia Orange", e_address: "707 Redwood Ln, Anytown", job_title: "Human Resources", availability: "Part-time" },
        { e_id: "E011", e_name: "Kevin Yellow", e_address: "808 Oakwood Dr, Anytown", job_title: "Financial Analyst", availability: "Full-time" },
        { e_id: "E012", e_name: "Laura Blue", e_address: "909 Pinewood Ct, Anytown", job_title: "Operations Manager", availability: "Contract" },
        { e_id: "E013", e_name: "Michael Red", e_address: "1010 Cedarwood Ln, Anytown", job_title: "Security Analyst", availability: "Full-time" },
        { e_id: "E014", e_name: "Nancy Green", e_address: "1111 Willowwood Dr, Anytown", job_title: "Technical Writer", availability: "Part-time" },
        { e_id: "E015", e_name: "Oliver Brown", e_address: "1212 Oakwood Ave, Anytown", job_title: "Business Analyst", availability: "Full-time" },
        { e_id: "E016", e_name: "Patricia Black", e_address: "1313 Pinewood Rd, Anytown", job_title: "Product Designer", availability: "Contract" },
        { e_id: "E017", e_name: "Quentin Gray", e_address: "1414 Cedarwood Ct, Anytown", job_title: "Content Writer", availability: "Full-time" },
        { e_id: "E018", e_name: "Rachel White", e_address: "1515 Willowwood Ln, Anytown", job_title: "Accountant", availability: "Part-time" },
        { e_id: "E019", e_name: "Steven Yellow", e_address: "1616 Oakwood Pl, Anytown", job_title: "Sales Manager", availability: "Full-time" },
        { e_id: "E020", e_name: "Tara Blue", e_address: "1717 Pinewood Way, Anytown", job_title: "Marketing Manager", availability: "Contract" },
        { e_id: "E021", e_name: "Ulysses Red", e_address: "1818 Cedarwood Dr, Anytown", job_title: "Research Scientist", availability: "Full-time" },
        { e_id: "E022", e_name: "Victoria Green", e_address: "1919 Willowwood Ave, Anytown", job_title: "Data Scientist", availability: "Part-time" },
        { e_id: "E023", e_name: "Walter Brown", e_address: "2020 Oakwood Rd, Anytown", job_title: "DevOps Engineer", availability: "Full-time" },
        { e_id: "E024", e_name: "Xenia Black", e_address: "2121 Pinewood Ct, Anytown", job_title: "Cloud Engineer", availability: "Contract" },
        { e_id: "E025", e_name: "Yara Gray", e_address: "2222 Cedarwood Ln, Anytown", job_title: "Database Administrator", availability: "Full-time" }
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [relevantEmployees, setRelevantEmployee] = useState(employees); // Initialize with all materials


    function filterEmployees(e) {
        const searchText = e.target.value.toLowerCase();
        const filtered = employees.filter((employee) => {
            return (
                employee.e_id.toLowerCase().includes(searchText) ||
                employee.e_name.toLowerCase().includes(searchText) ||
                employee.e_address.toLowerCase().includes(searchText)
            );
        });

        setRelevantEmployee(filtered);
    }

    return (
        <div>
            <div className="page-material-page  flex justify-between p-10 bg-slate-100 sticky top-0 ">
                <h1 className='flex flex-row  gap-8 font-bold text-4xl'>
                    <span className='text-6xl'>🧱</span>
                    <span className='text-3xl mt-3'>Manage Employees</span>
                </h1>
                <div className='flex flex-row gap-x-2.5'>
                    <input
                        type="search"
                        className=' border  outline-none border-blue-300  p-3 rounded-2xl '
                        placeholder='Search Employees'
                        onChange={filterEmployees} // Directly call filterMaterials
                    />
                    <button
                        className='bg-cyan-500 p-4 rounded-3xl text-white font-bold hover:scale-[1.05] transition-all duration-200 hover:bg-cyan-600'
                        onClick={() => setIsOpen(true)}>
                        Add Employee
                    </button>
                </div>
            </div>
            <div className='flex flex-col justify-center pr-8 pl-8 mt-2'>
                <table className='w-full border-collapse border border-gray-300 max-h-[500px] overflow-y-auto'>
                    <thead>
                    <tr>
                        <th className='border border-gray-200 px-4 py-2'>Employee Id</th>
                        <th className='border border-gray-200 px-4 py-2'>Name</th>
                        <th className='border border-gray-200 px-4 py-2'>Address</th>
                        <th className='border border-gray-200 px-4 py-2'>Job title</th>
                        <th className='border border-gray-200 px-4 py-2'>Availability</th>
                        <th className='border border-gray-200 px-4 py-2'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {relevantEmployees.map((employee, index) => (
                        <tr key={index}>
                            <td className='text-center border border-gray-200 px-4 py-2'>{employee.e_id}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{employee.e_name}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{employee.e_address}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{employee.job_title}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{employee.availability}</td>
                            <td className='flex flex-row gap-4 border  border-gray-200 px-2 py-1'>
                                <button className='bg-blue-500 p-1 rounded-xl text-white'>Edit</button>
                                <button className='bg-red-500 p-1 rounded-xl text-white'>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {isOpen &&
                <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center flex-col'
                     onClick={() => {
                     }}>
                    <form action="" className=' bg-white  flex flex-col w-1/2 gap-y-2 p-4 rounded-xl'>
                        <h1 className='text-xl text-gray-700 mb-4'>* ADD Employee</h1>
                        <input className=' rounded-xl border p-3' type="text" placeholder="Emmployee ID" required
                               onChange={() => {
                               }}/>
                        <input className='rounded-xl border p-3' type="text" placeholder="Name" onChange={() => {
                        }} required/>
                        <input className='rounded-xl border p-3' type="number" min='0' placeholder="Address"
                               onChange={() => {
                               }} required/>
                        <select className='rounded-xl border p-3' required>
                            <option value="" disabled selected>select Job type</option>
                            <option value="DRIVER">DRIVER</option>
                            <option value="LABOR">LABOR</option>
                        </select>
                        <select className='rounded-xl border p-3' required>
                            <option value="" disabled selected>Employee availability</option>
                            <option value="DRIVER">AVA</option>
                            <option value="LABOR">N/A</option>
                        </select>

                        <div className='flex flex-row justify-end gap-x-2.5 mt-5'>
                            <button onClick={() => {
                            }} className='rounded-xl w-1/2 bg-blue-600 p-2 text-white'>Save
                            </button>
                            <button onClick={() => setIsOpen(false)}
                                    className={'bg-red-500  w-1/2 outline-none rounded-xl p-2 text-white'}>Close
                            </button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
}