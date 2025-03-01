import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {
    addMaterial,
    deleteMaterial,
    getAllMaterials,
    updateMaterial,
} from "../reducers/materialReducer.ts";
import Material from "../model/Material.ts";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router";

export function MaterialPage() {
    const materials = useSelector((state: RootState) => state.material);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [materialId, setMaterialId] = useState('');
    const [materialName, setMaterialName] = useState('');
    const [type, setMaterialType] = useState('');
    const [qtyAvailable, setQtyAvailable] = useState(0);
    const [unit, setUnit] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [relevantMaterials, setRelevantMaterials] = useState(materials);


    useEffect(() => {
        setRelevantMaterials(materials);
    }, [materials]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        accessToken ? dispatch(getAllMaterials()):navigate('/')
    }, []);

    const [errors, setErrors] = useState({
        materialId: '',
        materialName: '',
        type: '',
        qtyAvailable: '',
        unit: ''
    });

    function filterMaterials(e) {
        const searchText = e.target.value.toLowerCase();
        const filtered = materials.filter((material) => {
            return (
                material.material_id.toLowerCase().includes(searchText) ||
                material.material_name.toLowerCase().includes(searchText) ||
                material.type.toLowerCase().includes(searchText)
            );
        });
        setRelevantMaterials(filtered);
    }

    function validateForm() {
        let isValid = true;
        const newErrors = {
            materialId: '',
            materialName: '',
            type: '',
            qtyAvailable: '',
            unit: ''
        };

        if (!materialId) {
            newErrors.materialId = 'Material ID is required';
            isValid = false;
        }

        if (!materialName) {
            newErrors.materialName = 'Material Name is required';
            isValid = false;
        }

        if (!type) {
            newErrors.type = 'Type is required';
            isValid = false;
        }

        if (qtyAvailable <= 0) {
            newErrors.qtyAvailable = 'Quantity must be greater than 0';
            isValid = false;
        }

        if (!unit) {
            newErrors.unit = 'Unit is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    function handleAddMaterial(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const material: Material = {
            material_id: materialId,
            material_name: materialName,
            type: type,
            qty_available: qtyAvailable,
            unit: unit,
        };

        dispatch(addMaterial(material));

        setIsOpen(false); // Close the modal after adding the material
        resetForm(); // Reset the form fields
    }

    function resetForm() {
        setMaterialId('');
        setMaterialName('');
        setMaterialType('');
        setQtyAvailable(0);
        setUnit('');
        setErrors({
            materialId: '',
            materialName: '',
            type: '',
            qtyAvailable: '',
            unit: ''
        });
    }


    function configureUpdateProcess(material: Material) {
        resetForm()
        setIsUpdate(true)
        setMaterialId(material.material_id)
        setMaterialName(material.material_name)
        setMaterialType(material.type)
        setQtyAvailable(material.qty_available)
        setUnit(material.unit)
        setIsOpen(true)
    }

    function handleInputChange(setter: (value: any) => void, field: string, value: any) {
        setter(value); // Update the state
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' })); // Clear the corresponding error
    }

    function handleUpdateMaterial(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const material: Material = {
            material_id: materialId,
            material_name: materialName,
            type: type,
            qty_available: qtyAvailable,
            unit: unit,
        };
        console.log(material)
        dispatch(updateMaterial(material))
        setIsOpen(false)
    }

    return (
        <div>
            <div className="page-material-page flex justify-between p-10 bg-slate-100 sticky top-0">
                <h1 className='flex flex-row gap-8 font-bold text-4xl'>
                    <span className='text-6xl'>🧱</span>
                    <span className='text-3xl mt-3'>Manage Materials</span>
                </h1>
                <div className='flex flex-row gap-x-2.5'>
                    <input
                        type="search"
                        className='border outline-none border-blue-300 p-3 rounded-2xl'
                        placeholder='Search Material'
                        onChange={filterMaterials}
                    />
                    <button
                        className='bg-cyan-500 p-4 rounded-3xl text-white font-bold hover:scale-[1.05] transition-all duration-200 hover:bg-cyan-600'
                        onClick={() => {
                            setIsOpen(true)
                            setIsUpdate(false)
                            resetForm();
                        }}>
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
                        <th className='border border-gray-200 px-4 py-2'>Unit</th>
                        <th className='border border-gray-200 px-4 py-2'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {relevantMaterials.map((material, index) => (
                        <tr key={index}>
                            <td className='text-center border border-gray-200 px-4 py-2'>{material.material_id}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{material.material_name}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{material.type}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{material.qty_available}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{material.unit}</td>
                            <td className='flex flex-col gap-y-2 border border-gray-200 px-4 py-2'>
                                <button className='bg-blue-500 p-1 rounded-xl text-white'
                                        onClick={()=> {
                                            configureUpdateProcess(material)
                                        }}
                                >Edit</button>
                                <button className='bg-red-500 p-1 rounded-xl text-white'
                                    onClick={()=>{
                                        if (window.confirm("Are you sure you want to delete this material?")) {
                                            dispatch(deleteMaterial(material.material_id));
                                        }
                                    }}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {isOpen &&
                <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center flex-col'
                     onClick={() => setIsOpen(false)}>
                    <form action="" className='bg-white flex flex-col w-1/2 gap-y-2 p-4 rounded-xl'
                          onClick={(e) => e.stopPropagation()}>
                        {isUpdate ?
                            (<h1 className='text-xl text-gray-700 mb-4'>*Update Material</h1>)
                            :(<h1 className='text-xl text-gray-700 mb-4'>*Add Material</h1>)
                        }

                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Material ID"
                            required
                            value={materialId}
                            onChange={(e) => handleInputChange(setMaterialId, 'materialId', e.target.value)}
                        />
                        {errors.materialId && <span className="text-red-500">{errors.materialId}</span>}
                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Name"
                            required
                            value={materialName}
                            onChange={(e) => handleInputChange(setMaterialName, 'materialName', e.target.value)}
                        />
                        {errors.materialName && <span className="text-red-500">{errors.materialName}</span>}
                        <select
                            className='rounded-xl border p-3'
                            required
                            value={type}
                            onChange={(e) => handleInputChange(setMaterialType, 'type', e.target.value)}
                        >
                            <option value="" disabled>Select type</option>
                            <option value="SAND">SAND</option>
                            <option value="CEMENT">CEMENT</option>
                            <option value="REINFORCEMENT">REINFORCEMENT</option>
                            <option value="AGGREGATE">AGGREGATE</option>
                            <option value="PLYWOOD">PLYWOOD</option>
                        </select>
                        {errors.type && <span className="text-red-500">{errors.type}</span>}
                        <input
                            className='rounded-xl border p-3'
                            type="number"
                            min='0'
                            placeholder="Available Qty"
                            required
                            value={qtyAvailable}
                            onChange={(e) => handleInputChange(setQtyAvailable, 'qtyAvailable', Number(e.target.value))}
                        />
                        {errors.qtyAvailable && <span className="text-red-500">{errors.qtyAvailable}</span>}
                        <select
                            className='rounded-xl border p-3'
                            required
                            value={unit}
                            onChange={(e) => handleInputChange(setUnit, 'unit', e.target.value)}
                        >
                            <option value="" disabled>Select unit</option>
                            <option value="CUBE">CUBE</option>
                            <option value="BAGS">BAGS</option>
                            <option value="TON">TON</option>
                            <option value="Sq.M">Sq.M</option>
                        </select>
                        {errors.unit && <span className="text-red-500">{errors.unit}</span>}
                        <div className='flex flex-row justify-end gap-x-2.5 mt-5'>
                            {!isUpdate && (
                                <button
                                    onClick={(e) => handleAddMaterial(e)}
                                    className='rounded-xl w-1/2 bg-blue-600 p-2 text-white'
                                >Save</button>
                            )}
                            {isUpdate && (
                                <button
                                    onClick={(e) => handleUpdateMaterial(e)}
                                    className='rounded-xl w-1/2 bg-blue-600 p-2 text-white'
                                >Update</button>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className='bg-red-500 w-1/2 outline-none rounded-xl p-2 text-white'
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
}