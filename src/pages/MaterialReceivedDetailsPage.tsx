import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store.ts";
import {
    addMaterialReceivedDetails,
    deleteMaterialReceivedDetails,
    getAllMaterialReceivedDetails,
    updateMaterialReceivedDetails,
} from "../reducers/materialReceivedDetailsReducer.ts";
import { getAllSuppliers } from "../reducers/supplierReducer.ts";
import { getAllMaterials } from "../reducers/materialReducer.ts";
import MaterialReceivedDetails from "../model/materialReceivedDetails.ts";
import Supplier from "../model/supplier.ts";
import Material from "../model/Material.ts";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router";

export function MaterialReceivedDetailsPage() {
    const materialReceivedDetails: MaterialReceivedDetails[] = useSelector((state: RootState) => state.materialReceived);
    const suppliers: Supplier[] = useSelector((state: RootState) => state.supplier);
    const materials: Material[] = useSelector((state: RootState) => state.material);


    const dispatch = useDispatch<AppDispatch>();
    const [receivedId, setReceivedId] = useState('');
    const [supId, setSupId] = useState('');
    const [mId, setMId] = useState('');
    const [materialName, setMaterialName] = useState('');
    const [type, setType] = useState('');
    const [receivedQty, setReceivedQty] = useState(0);
    const [unit, setUnit] = useState('');
    const [receivedDate, setReceivedDate] = useState('');
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [relevantDetails, setRelevantDetails] = useState(materialReceivedDetails);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const { role } = jwtDecode(accessToken);
            console.log(role)
            if (role == 'Admin'){ navigate('/')}
        }else{navigate('/')}
    }, []);

    useEffect(() => {
        setRelevantDetails(materialReceivedDetails);
    }, [materialReceivedDetails]);

    useEffect(() => {
        dispatch(getAllMaterialReceivedDetails());
        dispatch(getAllSuppliers());
        dispatch(getAllMaterials());
    }, []);

    const [errors, setErrors] = useState({
        receivedId: '',
        supId: '',
        mId: '',
        materialName: '',
        type: '',
        receivedQty: '',
        unit: '',
        receivedDate: ''
    });

    // Handle material selection
    const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMaterial = materials.find(m => m.material_id === e.target.value);
        if (selectedMaterial) {
            setMId(selectedMaterial.material_id);
            setMaterialName(selectedMaterial.material_name);
            setType(selectedMaterial.type);
            setUnit(selectedMaterial.unit);
        }
    };

    // Handle input change
    const handleInputChange = (setter: (value: any) => void, field: string, value: any) => {
        setter(value); // Update the state
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' })); // Clear the corresponding error
    };

    // Validate form
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            receivedId: '',
            supId: '',
            mId: '',
            materialName: '',
            type: '',
            receivedQty: '',
            unit: '',
            receivedDate: ''
        };

        if (!receivedId) {
            newErrors.receivedId = 'Received ID is required';
            isValid = false;
        }

        if (!supId) {
            newErrors.supId = 'Supplier ID is required';
            isValid = false;
        }

        if (!mId) {
            newErrors.mId = 'Material ID is required';
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

        if (receivedQty <= 0) {
            newErrors.receivedQty = 'Received Quantity must be greater than 0';
            isValid = false;
        }

        if (!unit) {
            newErrors.unit = 'Unit is required';
            isValid = false;
        }

        if (!receivedDate) {
            newErrors.receivedDate = 'Received Date is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle add details
    const handleAddDetails = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const details: MaterialReceivedDetails = {
            received_id: receivedId,
            sup_id: supId,
            m_id: mId,
            material_name: materialName,
            type: type,
            received_qty: receivedQty,
            unit: unit,
            received_date: receivedDate,
        };

        dispatch(addMaterialReceivedDetails(details));

        setIsOpen(false); // Close the modal after adding the details
        resetForm(); // Reset the form fields
    };

    // Handle update details
    const handleUpdateDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const details: MaterialReceivedDetails = {
            received_id: receivedId,
            sup_id: supId,
            m_id: mId,
            material_name: materialName,
            type: type,
            received_qty: receivedQty,
            unit: unit,
            received_date: receivedDate,
        };

        dispatch(updateMaterialReceivedDetails(details));
        setIsOpen(false);
    };

    // Reset form
    const resetForm = () => {
        setReceivedId('');
        setSupId('');
        setMId('');
        setMaterialName('');
        setType('');
        setReceivedQty(0);
        setUnit('');
        setReceivedDate('');
        setErrors({
            receivedId: '',
            supId: '',
            mId: '',
            materialName: '',
            type: '',
            receivedQty: '',
            unit: '',
            receivedDate: ''
        });
    };

    // Configure update process
    const configureUpdateProcess = (details: MaterialReceivedDetails) => {
        resetForm();
        setIsUpdate(true);
        setReceivedId(details.received_id);
        setSupId(details.sup_id);
        setMId(details.m_id);
        setMaterialName(details.material_name);
        setType(details.type);
        setReceivedQty(details.received_qty);
        setUnit(details.unit);
        setReceivedDate(details.received_date);
        setIsOpen(true);
    };

    // Filter details
    const filterDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();
        const filtered = materialReceivedDetails.filter((detail) => {
            return (
                detail.received_id.toLowerCase().includes(searchText) ||
                detail.sup_id.toLowerCase().includes(searchText) ||
                detail.m_id.toLowerCase().includes(searchText) ||
                detail.material_name.toLowerCase().includes(searchText) ||
                detail.type.toLowerCase().includes(searchText)
            );
        });
        setRelevantDetails(filtered);
    };

    return (
        <div>
            <div className="page-material-received-page flex justify-between p-10 bg-slate-100 sticky top-0">
                <h1 className='flex flex-row gap-8 font-bold text-4xl'>
                    <span className='text-6xl'>📦</span>
                    <span className='text-3xl mt-3'>Manage Material Received Details</span>
                </h1>
                <div className='flex flex-row gap-x-2.5'>
                    <input
                        type="search"
                        className='border outline-none border-blue-300 p-3 rounded-2xl'
                        placeholder='Search Material Received Details'
                        onChange={filterDetails}
                    />
                    <button
                        className='bg-cyan-500 p-4 rounded-3xl text-white font-bold hover:scale-[1.05] transition-all duration-200 hover:bg-cyan-600'
                        onClick={() => {
                            setIsOpen(true);
                            setIsUpdate(false);
                            resetForm();
                        }}>
                        Add Details
                    </button>
                </div>
            </div>
            <div className='flex flex-col justify-center pr-8 pl-8 mt-2'>
                <table className='w-full border-collapse border border-gray-300 max-h-[500px] overflow-y-auto'>
                    <thead>
                    <tr>
                        <th className='border border-gray-200 px-4 py-2'>Received ID</th>
                        <th className='border border-gray-200 px-4 py-2'>Supplier ID</th>
                        <th className='border border-gray-200 px-4 py-2'>Material ID</th>
                        <th className='border border-gray-200 px-4 py-2'>Material Name</th>
                        <th className='border border-gray-200 px-4 py-2'>Type</th>
                        <th className='border border-gray-200 px-4 py-2'>Received Qty</th>
                        <th className='border border-gray-200 px-4 py-2'>Unit</th>
                        <th className='border border-gray-200 px-4 py-2'>Received Date</th>
                        <th className='border border-gray-200 px-4 py-2'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {relevantDetails.map((detail, index) => (
                        <tr key={index}>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.received_id}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.sup_id}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.m_id}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.material_name}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.type}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.received_qty}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.unit}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.received_date}</td>
                            <td className='flex flex-col gap-y-2 border border-gray-200 px-4 py-2'>
                                <button className='bg-blue-500 p-1 rounded-xl text-white'
                                        onClick={() => configureUpdateProcess(detail)}
                                >Edit</button>
                                <button className='bg-red-500 p-1 rounded-xl text-white'
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this detail?")) {
                                                dispatch(deleteMaterialReceivedDetails(detail.received_id));
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
                            (<h1 className='text-xl text-gray-700 mb-4'>*Update Material Received Details</h1>)
                            : (<h1 className='text-xl text-gray-700 mb-4'>*Add Material Received Details</h1>)
                        }

                        {/* Received ID */}
                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Received ID"
                            required
                            value={receivedId}
                            onChange={(e) => handleInputChange(setReceivedId, 'receivedId', e.target.value)}
                        />
                        {errors.receivedId && <span className="text-red-500">{errors.receivedId}</span>}

                        {/* Supplier ID Dropdown */}
                        <select
                            className='rounded-xl border p-3'
                            required
                            value={supId}
                            onChange={(e) => handleInputChange(setSupId, 'supId', e.target.value)}
                        >
                            <option value="" disabled>Select Supplier</option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.sup_id} value={supplier.sup_id}>
                                    {supplier.company_name}
                                </option>
                            ))}
                        </select>
                        {errors.supId && <span className="text-red-500">{errors.supId}</span>}

                        {/* Material ID Dropdown */}
                        <select
                            className='rounded-xl border p-3'
                            required
                            value={mId}
                            onChange={handleMaterialChange}
                        >
                            <option value="" disabled>Select Material</option>
                            {materials.map((material) => (
                                <option key={material.material_id} value={material.material_id}>
                                    {material.material_name}
                                </option>
                            ))}
                        </select>
                        {errors.mId && <span className="text-red-500">{errors.mId}</span>}

                        {/* Material Name (Read-only, auto-filled from Material ID selection) */}
                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Material Name"
                            required
                            value={materialName}
                            readOnly
                        />
                        {errors.materialName && <span className="text-red-500">{errors.materialName}</span>}

                        {/* Type (Read-only, auto-filled from Material ID selection) */}
                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Type"
                            required
                            value={type}
                            readOnly
                        />
                        {errors.type && <span className="text-red-500">{errors.type}</span>}

                        {/* Received Quantity */}
                        <input
                            className='rounded-xl border p-3'
                            type="number"
                            min='0'
                            placeholder="Received Quantity"
                            required
                            value={receivedQty}
                            onChange={(e) => handleInputChange(setReceivedQty, 'receivedQty', Number(e.target.value))}
                        />
                        {errors.receivedQty && <span className="text-red-500">{errors.receivedQty}</span>}

                        {/* Unit (Read-only, auto-filled from Material ID selection) */}
                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Unit"
                            required
                            value={unit}
                            readOnly
                        />
                        {errors.unit && <span className="text-red-500">{errors.unit}</span>}

                        {/* Received Date */}
                        <input
                            className='rounded-xl border p-3'
                            type="date"
                            placeholder="Received Date"
                            required
                            value={receivedDate}
                            onChange={(e) => handleInputChange(setReceivedDate, 'receivedDate', e.target.value)}
                        />
                        {errors.receivedDate && <span className="text-red-500">{errors.receivedDate}</span>}

                        {/* Save/Update and Close Buttons */}
                        <div className='flex flex-row justify-end gap-x-2.5 mt-5'>
                            {!isUpdate && (
                                <button
                                    onClick={(e) => handleAddDetails(e)}
                                    className='rounded-xl w-1/2 bg-blue-600 p-2 text-white'
                                >Save</button>
                            )}
                            {isUpdate && (
                                <button
                                    onClick={(e) => handleUpdateDetails(e)}
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