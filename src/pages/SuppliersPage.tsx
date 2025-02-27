import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store.ts";
import { addSupplier, deleteSupplier, getAllSuppliers, updateSupplier } from "../reducers/supplierReducer.ts";
import Supplier from "../model/supplier.ts";
import {deleteMaterial} from "../reducers/materialReducer.ts";

export function SuppliersPage() {
    const suppliers = useSelector((state: RootState) => state.supplier);

    const dispatch = useDispatch<AppDispatch>();
    const [supId, setSupId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [relevantSuppliers, setRelevantSuppliers] = useState(suppliers);

    useEffect(() => {
        setRelevantSuppliers(suppliers);
    }, [suppliers]);

    useEffect(() => {
        dispatch(getAllSuppliers());
    }, []);

    const [errors, setErrors] = useState({
        supId: '',
        companyName: '',
        companyEmail: ''
    });

    function filterSuppliers(e) {
        const searchText = e.target.value.toLowerCase();
        const filtered = suppliers.filter((supplier) => {
            return (
                supplier.sup_id.toLowerCase().includes(searchText) ||
                supplier.company_name.toLowerCase().includes(searchText) ||
                supplier.company_email.toLowerCase().includes(searchText)
            );
        });
        setRelevantSuppliers(filtered);
    }

    function validateForm() {
        let isValid = true;
        const newErrors = {
            supId: '',
            companyName: '',
            companyEmail: ''
        };

        if (!supId) {
            newErrors.supId = 'Supplier ID is required';
            isValid = false;
        }

        if (!companyName) {
            newErrors.companyName = 'Company Name is required';
            isValid = false;
        }

        if (!companyEmail) {
            newErrors.companyEmail = 'Company Email is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    function handleAddSupplier(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const supplier: Supplier = {
            sup_id: supId,
            company_name: companyName,
            company_email: companyEmail,
        };

        dispatch(addSupplier(supplier));
        setIsOpen(false); // Close the modal after adding the supplier
        resetForm(); // Reset the form fields
    }

    function resetForm() {
        setSupId('');
        setCompanyName('');
        setCompanyEmail('');
        setErrors({
            supId: '',
            companyName: '',
            companyEmail: ''
        });
    }

    function configureUpdateProcess(supplier: Supplier) {
        resetForm();
        setIsUpdate(true);
        setSupId(supplier.sup_id);
        setCompanyName(supplier.company_name);
        setCompanyEmail(supplier.company_email);
        setIsOpen(true);
    }

    function handleInputChange(setter: (value: any) => void, field: string, value: any) {
        setter(value); // Update the state
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' })); // Clear the corresponding error
    }

    function handleUpdateSupplier(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const supplier: Supplier = {
            sup_id: supId,
            company_name: companyName,
            company_email: companyEmail,
        };

        dispatch(updateSupplier(supplier));
        setIsOpen(false);
    }

    return (
        <div>
            <div className="page-supplier-page flex justify-between p-10 bg-slate-100 sticky top-0">
                <h1 className='flex flex-row gap-8 font-bold text-4xl'>
                    <span className='text-6xl'>🏢</span>
                    <span className='text-3xl mt-3'>Manage Suppliers</span>
                </h1>
                <div className='flex flex-row gap-x-2.5'>
                    <input
                        type="search"
                        className='border outline-none border-blue-300 p-3 rounded-2xl'
                        placeholder='Search Supplier'
                        onChange={filterSuppliers}
                    />
                    <button
                        className='bg-cyan-500 p-4 rounded-3xl text-white font-bold hover:scale-[1.05] transition-all duration-200 hover:bg-cyan-600'
                        onClick={() => {
                            setIsOpen(true);
                            setIsUpdate(false);
                            resetForm();
                        }}>
                        Add Supplier
                    </button>
                </div>
            </div>
            <div className='flex flex-col justify-center pr-8 pl-8 mt-2'>
                <table className='w-full border-collapse border border-gray-300 max-h-[500px] overflow-y-auto'>
                    <thead>
                    <tr>
                        <th className='border border-gray-200 px-4 py-2'>Supplier ID</th>
                        <th className='border border-gray-200 px-4 py-2'>Company Name</th>
                        <th className='border border-gray-200 px-4 py-2'>Company Email</th>
                        <th className='border border-gray-200 px-4 py-2'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {relevantSuppliers.map((supplier, index) => (
                        <tr key={index}>
                            <td className='text-center border border-gray-200 px-4 py-2'>{supplier.sup_id}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{supplier.company_name}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{supplier.company_email}</td>
                            <td className='flex flex-col gap-y-2 border border-gray-200 px-4 py-2'>
                                <button className='bg-blue-500 p-1 rounded-xl text-white'
                                        onClick={() => configureUpdateProcess(supplier)}
                                >Edit</button>
                                <button className='bg-red-500 p-1 rounded-xl text-white'
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this supplier?")) {
                                                dispatch(deleteSupplier(supplier.sup_id));
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
                            (<h1 className='text-xl text-gray-700 mb-4'>*Update Supplier</h1>)
                            : (<h1 className='text-xl text-gray-700 mb-4'>*Add Supplier</h1>)
                        }

                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Supplier ID"
                            required
                            value={supId}
                            onChange={(e) => handleInputChange(setSupId, 'supId', e.target.value)}
                        />
                        {errors.supId && <span className="text-red-500">{errors.supId}</span>}
                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Company Name"
                            required
                            value={companyName}
                            onChange={(e) => handleInputChange(setCompanyName, 'companyName', e.target.value)}
                        />
                        {errors.companyName && <span className="text-red-500">{errors.companyName}</span>}
                        <input
                            className='rounded-xl border p-3'
                            type="email"
                            placeholder="Company Email"
                            required
                            value={companyEmail}
                            onChange={(e) => handleInputChange(setCompanyEmail, 'companyEmail', e.target.value)}
                        />
                        {errors.companyEmail && <span className="text-red-500">{errors.companyEmail}</span>}
                        <div className='flex flex-row justify-end gap-x-2.5 mt-5'>
                            {!isUpdate && (
                                <button
                                    onClick={(e) => handleAddSupplier(e)}
                                    className='rounded-xl w-1/2 bg-blue-600 p-2 text-white'
                                >Save</button>
                            )}
                            {isUpdate && (
                                <button
                                    onClick={(e) => handleUpdateSupplier(e)}
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