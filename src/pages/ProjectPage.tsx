import {useState} from "react";

export function ProjectPage() {

    const [isOpen, setIsOpen] = useState(false);

    const projects = [
        { project_no: "P001", project_name: "Matara Road", location: "Matara", start_date: "2024-03-08", completion_date: "2026-03-08" },
        { project_no: "P002", project_name: "Colombo Bridge", location: "Colombo", start_date: "2023-11-15", completion_date: "2025-06-30" },
        { project_no: "P003", project_name: "Kandy Housing", location: "Kandy", start_date: "2024-01-20", completion_date: "2025-12-20" },
        { project_no: "P004", project_name: "Jaffna Hospital", location: "Jaffna", start_date: "2023-09-01", completion_date: "2026-09-01" },
        { project_no: "P005", project_name: "Galle Port Expansion", location: "Galle", start_date: "2024-04-10", completion_date: "2027-04-10" },
        { project_no: "P006", project_name: "Anuradhapura School", location: "Anuradhapura", start_date: "2023-12-05", completion_date: "2025-05-05" },
        { project_no: "P007", project_name: "Trincomalee Resort", location: "Trincomalee", start_date: "2024-02-28", completion_date: "2026-08-28" },
        { project_no: "P008", project_name: "Batticaloa Airport", location: "Batticaloa", start_date: "2023-10-22", completion_date: "2026-02-22" },
        { project_no: "P009", project_name: "Kurunegala Dam", location: "Kurunegala", start_date: "2024-05-18", completion_date: "2027-11-18" },
        { project_no: "P010", project_name: "Badulla Park", location: "Badulla", start_date: "2023-11-30", completion_date: "2025-04-30" },
        { project_no: "P011", project_name: "Hambantota Stadium", location: "Hambantota", start_date: "2024-03-25", completion_date: "2026-10-25" },
        { project_no: "P012", project_name: "Polonnaruwa Museum", location: "Polonnaruwa", start_date: "2023-09-15", completion_date: "2025-07-15" },
        { project_no: "P013", project_name: "Kegalle Highway", location: "Kegalle", start_date: "2024-01-12", completion_date: "2027-01-12" },
        { project_no: "P014", project_name: "Ratnapura Market", location: "Ratnapura", start_date: "2023-12-20", completion_date: "2026-06-20" },
        { project_no: "P015", project_name: "Monaragala Farm", location: "Monaragala", start_date: "2024-04-05", completion_date: "2025-09-05" },
        { project_no: "P016", project_name: "Ampara Power Plant", location: "Ampara", start_date: "2023-10-01", completion_date: "2028-03-01" },
        { project_no: "P017", project_name: "Puttalam Wind Farm", location: "Puttalam", start_date: "2024-02-18", completion_date: "2026-12-18" },
        { project_no: "P018", project_name: "Vavuniya Library", location: "Vavuniya", start_date: "2023-11-10", completion_date: "2025-08-10" },
        { project_no: "P019", project_name: "Kalutara Beach Resort", location: "Kalutara", start_date: "2024-05-01", completion_date: "2027-05-01" },
        { project_no: "P020", project_name: "Gampaha Railway", location: "Gampaha", start_date: "2023-09-25", completion_date: "2026-01-25" },
    ];
    const materials = [
        { id: "M001", name: "River Sand", type: "SAND", qty: 25, unit: "Cube" },
        { id: "M002", name: "Gravel", type: "AGGREGATE", qty: 50, unit: "Tons" },
        { id: "M003", name: "Cement", type: "BINDER", qty: 100, unit: "Bags" },
        { id: "M004", name: "Reinforcement Steel", type: "METAL", qty: 30, unit: "Tons" },
        { id: "M005", name: "Bricks", type: "MASONRY", qty: 5000, unit: "Pieces" },
        { id: "M006", name: "Timber Planks", type: "WOOD", qty: 150, unit: "Pieces" },
        { id: "M007", name: "Concrete Blocks", type: "MASONRY", qty: 2000, unit: "Pieces" },
        { id: "M008", name: "Asphalt", type: "PAVING", qty: 75, unit: "Tons" },
        { id: "M009", name: "Ceramic Tiles", type: "FINISHING", qty: 800, unit: "Sq Ft" },
        { id: "M010", name: "PVC Pipes", type: "PLUMBING", qty: 200, unit: "Meters" },
        /*{ id: "M011", name: "Electrical Wires", type: "ELECTRICAL", qty: 300, unit: "Meters" },
        { id: "M012", name: "Granite Slabs", type: "FINISHING", qty: 50, unit: "Pieces" },
        { id: "M013", name: "Topsoil", type: "LANDSCAPING", qty: 40, unit: "Cube" },
        { id: "M014", name: "Crushed Stone", type: "AGGREGATE", qty: 60, unit: "Tons" },
        { id: "M015", name: "Plywood Sheets", type: "WOOD", qty: 100, unit: "Sheets" },
        { id: "M016", name: "Roofing Tiles", type: "ROOFING", qty: 1200, unit: "Pieces" },
        { id: "M017", name: "Insulation Material", type: "INSULATION", qty: 150, unit: "Rolls" },
        { id: "M018", name: "Paint", type: "FINISHING", qty: 50, unit: "Liters" },
        { id: "M019", name: "Nails", type: "FASTENERS", qty: 1000, unit: "Pieces" },
        { id: "M020", name: "Bolts", type: "FASTENERS", qty: 800, unit: "Pieces" },
        { id: "M021", name: "Window Frames", type: "WINDOWS", qty: 30, unit: "Pieces" },
        { id: "M022", name: "Door Frames", type: "DOORS", qty: 25, unit: "Pieces" },*/
    ];

    const [relevantProjects , setRelevantProjects] =useState(projects);

    function filterProjects(e) {
        const searchText = e.target.value.toLowerCase();

        if (!searchText ) {
            setRelevantProjects(projects); // Reset to original if search is empty
            return;
        }
        const filteredProjects = relevantProjects.filter((project) => {
            return(
                project.project_no.toLowerCase().includes(searchText) ||
                project.project_name.toLowerCase().includes(searchText) ||
                project.location.toLowerCase().includes(searchText)
            );
        })
        setRelevantProjects(filteredProjects);

    }

    return (
        <div className="project">
            <div className="page-project-page flex justify-between p-10 bg-slate-100 sticky top-0 ">

                <h1 className='flex flex-row  gap-8 font-bold text-4xl'>
                    <span className='text-6xl'>🏗️</span>
                    <span className='text-3xl mt-3'>Manage Projects</span>
                </h1>
                <div className='flex flex-row gap-x-2.5'>
                    <input
                        type="search"
                        className=' border  outline-none border-blue-300  p-3 rounded-2xl '
                        placeholder='Search Projects'
                        onChange={filterProjects} // Directly call filterMaterials
                    />
                    <button
                        className='bg-cyan-500 p-4 rounded-3xl text-white font-bold hover:scale-[1.05] transition-all duration-200 hover:bg-cyan-600'
                        onClick={() => setIsOpen(true)}>
                        Add Project
                    </button>
                </div>
            </div>
            <div className={'overflow-y-auto max-h-[calc(10990vh-100px)]'}> {/* Adjusted max-h */}
                {/*{relevantProjects.map((project) => (
                    <div key={project.project_no} className={'flex justify-center items-center'}>
                        <div
                            className="flex flex-col justify-start w-3/4 rounded-xl h-auto bg-sky-200 mt-5 gap-y-8 p-2 hover:bg-sky-300 transition-all duration-400 cursor-pointer">
                            <span className='ml-20'>Project No: <span>{project.project_no}</span></span>
                            <span className='ml-20'>Project Name: <span>{project.project_name}</span></span>
                            <span className='ml-20'>Project Location: <span>{project.location}</span></span>
                            <div className='flex flex-row justify-center items-center gap-8'>
                                <button className='w-1/3 bg-blue-500 p-2 rounded text-white hover:bg-blue-600 transition-colors'>Edit Project Details</button>
                                <button className='w-1/3 bg-green-500 p-2 rounded text-white hover:bg-green-600 transition-colors'>Show Project Details</button>
                                <button className='w-1/3 bg-red-500 p-2 rounded text-white hover:bg-red-600 transition-colors'>Remove Project</button>
                            </div>
                        </div>
                    </div>
                ))}*/}
                {relevantProjects.map((project) => (
                    <div key={project.project_no} className="flex justify-center items-center py-3"> {/* Added py-3 for vertical spacing */}
                        <div className="w-3/4 rounded-lg shadow-md bg-sky-50 p-6 transition-all duration-300 hover:bg-sky-200 hover:shadow-lg cursor-pointer"> {/* Improved styling */}
                            <div className="mb-4"> {/* Added margin for spacing */}
                                <span className="font-semibold text-gray-700">Project No:</span> <span className="text-gray-600">{project.project_no}</span>
                            </div>
                            <div className="mb-4">
                                <span className="font-semibold text-gray-700">Project Name:</span> <span className="text-gray-600">{project.project_name}</span>
                            </div>
                            <div className="mb-6"> {/* Increased margin */}
                                <span className="font-semibold text-gray-700">Project Location:</span> <span className="text-gray-600">{project.location}</span>
                            </div>
                            <div className="flex justify-center items-center gap-4"> {/* Reduced gap */}
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">Edit</button>
                                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">Details</button>
                                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            { isOpen &&
                <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center flex-row p-4'>
                    {/*<form action="" className=' bg-white  flex flex-row w-auto gap-x-2 p-4 rounded-xl '>
                        <div className='flex flex-col gap-y-2 border border-gray-200 px-4 py-2'>
                            <h1 className='text-xl text-gray-700 mb-4'>*Project</h1>
                            <input className=' rounded-xl border p-3' type="text" placeholder="Project NO" required
                                   onChange={() => {
                                   }}/>
                            <input className='rounded-xl border p-3' type="text" placeholder="Project Name"
                                   onChange={() => {
                                   }} required/>

                            <input className='rounded-xl border p-3' type="number" min='0' placeholder="Location Name"
                                   onChange={() => {
                                   }} required/>
                            <input className='rounded-xl border p-3' type="date" placeholder="start date"
                                   onChange={() => {
                                   }} required/>
                            <input className='rounded-xl border p-3' type="date" placeholder="Location Name"
                                   onChange={() => {
                                   }} required/>

                            <div className='flex flex-row justify-end gap-x-2.5 mt-5'>
                                <button onClick={() => {
                                }} className='rounded-xl w-1/2 bg-blue-600 p-2 text-white'>Save
                                </button>
                                <button onClick={() => setIsOpen(false)}
                                        className={'bg-red-500  w-1/2 outline-none rounded-xl p-2 text-white'}>Close
                                </button>
                            </div>
                        </div>
                        <div className='bg-white  flex flex-col pt-2 pl-2 border '>

                            {materials.map((material) => (
                                <div className='flex flex-row justify-evenly gap-8'>
                                    <div className={'bg-cyan-100'}>
                                        <h1 className=''>{material.id}</h1>
                                    </div>
                                    <div className='bg-blue-600 flex flex-row pr-1'>
                                        <input type="text" placeholder={'required Quantity'} className='border  rounded '/>
                                        <input type="text" placeholder={'supplied Quantity'} className='border  rounded '/>
                                    </div>
                                    <div className={''}>
                                        <label htmlFor="">{material.unit}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </form>*/}
                    <form action="" className='bg-white flex flex-row w-auto gap-x-2 p-4 rounded-xl'>
                        <div className='flex flex-col gap-y-2 border border-gray-200 px-4 py-2'>
                            <h1 className='text-xl text-gray-700 mb-4'>*Project</h1>
                            <input className='rounded-xl border p-3' type="text" placeholder="Project NO" required
                                   onChange={() => {
                                   }}/>
                            <input className='rounded-xl border p-3' type="text" placeholder="Project Name"
                                   onChange={() => {
                                   }} required/>
                            <input className='rounded-xl border p-3' type="number" min='0' placeholder="Location Name"
                                   onChange={() => {
                                   }} required/>
                            <input className='rounded-xl border p-3' type="date" placeholder="start date"
                                   onChange={() => {
                                   }} required/>
                            <input className='rounded-xl border p-3' type="date" placeholder="Location Name"
                                   onChange={() => {
                                   }} required/>
                            <div className='flex flex-row justify-end gap-x-2.5 mt-5'>
                                <button onClick={() => {
                                }} className='rounded-xl w-1/2 bg-blue-600 p-2 text-white'>Save
                                </button>
                                <button onClick={() => setIsOpen(false)}
                                        className={'bg-red-500 w-1/2 outline-none rounded-xl p-2 text-white'}>Close
                                </button>
                            </div>
                        </div>
                        <div
                            className='reqpart bg-white flex flex-col pt-2 pl-2 border w-3/4 max-h-[400px] overflow-y-auto'> {/* Added max-h and overflow-y-auto */}
                            {materials.map((material) => (
                                <div key={material.id}
                                     className='flex flex-row items-center justify-between gap-4 p-2 border-b last:border-b-0'>
                                    <div className='bg-cyan-100 p-2 rounded-md'>
                                        <h1 className='text-sm'>{material.id}</h1>
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        <input type="text" placeholder={`Required ${material.name}`}
                                               className='border rounded p-1 text-sm' />
                                        <input type="text" placeholder={`Supplied ${material.name}`}
                                               className='border rounded p-1 text-sm' value={'0'} />
                                    </div>
                                    <div className='text-sm'>
                                        <label>{material.unit}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </form>

                </div>

            }
        </div>
    );
}