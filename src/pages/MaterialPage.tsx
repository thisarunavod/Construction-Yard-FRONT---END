import {useState} from "react";


export function MaterialPage() {
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
        { id: "M011", name: "Electrical Wires", type: "ELECTRICAL", qty: 300, unit: "Meters" },
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
        { id: "M022", name: "Door Frames", type: "DOORS", qty: 25, unit: "Pieces" },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [relevantMaterials, setRelevantMaterials] = useState(materials); // Initialize with all materials


    function filterMaterials(e) {
        const searchText = e.target.value.toLowerCase();
        const filtered = materials.filter((material) => {
            return (
                material.id.toLowerCase().includes(searchText) ||
                material.name.toLowerCase().includes(searchText) ||
                material.type.toLowerCase().includes(searchText)
            );
        });

        setRelevantMaterials(filtered);
    }

    return (
        <div>
            <div className="page-material-page  flex justify-between p-10 bg-slate-100 sticky top-0 ">
                <h1 className='flex flex-row  gap-8 font-bold text-4xl'>
                    <span className='text-6xl'>🧱</span>
                    <span className='text-3xl mt-3'>Manage Materials</span>
                </h1>
                <div className='flex flex-row gap-x-2.5'>
                    <input
                        type="search"
                        className=' border  outline-none border-blue-300  p-3 rounded-2xl '
                        placeholder='Search Material'
                        onChange={filterMaterials} // Directly call filterMaterials
                    />
                    <button
                        className='bg-cyan-500 p-4 rounded-3xl text-white font-bold hover:scale-[1.05] transition-all duration-200 hover:bg-cyan-600'
                        onClick={() => setIsOpen(true)}>
                        Add Material
                    </button>
                </div>
            </div>
            <div className='flex flex-col justify-center pr-8 pl-8 mt-2'>
                <table className='w-full border-collapse border border-gray-300 max-h-[500px] overflow-y-auto'>
                    <thead>
                        <tr>
                            <th className='border border-gray-200 px-4 py-2'>Material Id</th>
                            <th className='border border-gray-200 px-4 py-2'>Material Name</th>
                            <th className='border border-gray-200 px-4 py-2'>Type</th>
                            <th className='border border-gray-200 px-4 py-2'>Qty Available</th>
                            <th className='border border-gray-200 px-4 py-2'>unit</th>
                            <th className='border border-gray-200 px-4 py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {relevantMaterials.map((material, index) => (
                            <tr key={index}>
                                <td className='text-center border border-gray-200 px-4 py-2'>{material.id}</td>
                                <td className='text-center border border-gray-200 px-4 py-2'>{material.name}</td>
                                <td className='text-center border border-gray-200 px-4 py-2'>{material.type}</td>
                                <td className='text-center border border-gray-200 px-4 py-2'>{material.qty}</td>
                                <td className='text-center border border-gray-200 px-4 py-2'>{material.unit}</td>
                                <td className='flex flex-col gap-y-2 border  border-gray-200 px-4 py-2'>
                                    <button className='bg-blue-500 p-1 rounded-xl text-white'>Edit</button>
                                    <button className='bg-red-500 p-1 rounded-xl text-white'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            { isOpen &&
                <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center flex-col'
                     onClick={() => {}}>
                    <form action="" className=' bg-white  flex flex-col w-1/2 gap-y-2 p-4 rounded-xl'>
                        <h1 className='text-xl text-gray-700 mb-4'>* ADD Material</h1>
                        <input className=' rounded-xl border p-3' type="text" placeholder="Material ID" required
                               onChange={() => {
                               }}/>
                        <input className='rounded-xl border p-3' type="text" placeholder="Name" onChange={() => {
                        }} required/>
                        <select className='rounded-xl border p-3' required>
                            <option value="" disabled selected>select type</option>
                            <option value="SAND">SAND</option>
                            <option value="CEMENT">CEMENT</option>
                            <option value="REINFORCEMENT">REINFORCEMENT</option>
                            <option value="AGGREGATE">AGGREGATE</option>
                            <option value="PLYWOOD">PLYWOOD</option>
                        </select>
                        <input className='rounded-xl border p-3' type="number" min='0' placeholder="Available Qty"
                               onChange={() => {
                               }} required />
                        <select className='rounded-xl border p-3' required>
                            <option value="" disabled selected>select unit</option>
                            <option value="CUBE">CUBE</option>
                            <option value="BAGS">BAGS</option>
                            <option value="TON">TON</option>
                            <option value="Sq.M">Sq.M</option>
                        </select>
                        <div className='flex flex-row justify-end gap-x-2.5 mt-5'>
                            <button onClick={() => {}} className='rounded-xl w-1/2 bg-blue-600 p-2 text-white' >Save </button>
                            <button onClick={() => setIsOpen(false)} className={'bg-red-500  w-1/2 outline-none rounded-xl p-2 text-white'}>Close</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
}

/*
material_id
material_name
type
    qty_available
unit*/
