import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store.ts";
import { addEmployee, deleteEmployee, getAllEmployees, updateEmployee } from "../reducers/employeeReducer.ts";
import Employee from "../model/employee.ts"; // Import the Employee model

export function EmployeePage() {
    const employees = useSelector((state: RootState) => state.employee);

    const dispatch = useDispatch<AppDispatch>();
    const [eId, setEId] = useState('');
    const [eName, setEName] = useState('');
    const [eAddress, setEAddress] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [availability, setAvailability] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [relevantEmployees, setRelevantEmployees] = useState(employees);

    useEffect(() => {
        setRelevantEmployees(employees);
    }, [employees]);

    useEffect(() => {
        dispatch(getAllEmployees());
    }, []);

    const [errors, setErrors] = useState({
        eId: '',
        eName: '',
        eAddress: '',
        jobTitle: '',
        availability: ''
    });

    function filterEmployees(e) {
        const searchText = e.target.value.toLowerCase();
        const filtered = employees.filter((employee) => {
            return (
                employee.e_id.toLowerCase().includes(searchText) ||
                employee.e_name.toLowerCase().includes(searchText) ||
                employee.e_address.toLowerCase().includes(searchText) ||
                employee.job_title.toLowerCase().includes(searchText) ||
                employee.availability.toLowerCase().includes(searchText)
            );
        });
        setRelevantEmployees(filtered);
    }

    function validateForm() {
        let isValid = true;
        const newErrors = {
            eId: '',
            eName: '',
            eAddress: '',
            jobTitle: '',
            availability: ''
        };

        if (!eId) {
            newErrors.eId = 'Employee ID is required';
            isValid = false;
        }

        if (!eName) {
            newErrors.eName = 'Employee Name is required';
            isValid = false;
        }

        if (!eAddress) {
            newErrors.eAddress = 'Employee Address is required';
            isValid = false;
        }

        if (!jobTitle) {
            newErrors.jobTitle = 'Job Title is required';
            isValid = false;
        }

        if (!availability) {
            newErrors.availability = 'Availability is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    function handleAddEmployee(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const employee: Employee = {
            e_id: eId,
            e_name: eName,
            e_address: eAddress,
            job_title: jobTitle,
            availability: availability,
        };

        dispatch(addEmployee(employee));
        setIsOpen(false); // Close the modal after adding the employee
        resetForm(); // Reset the form fields
    }

    function resetForm() {
        setEId('');
        setEName('');
        setEAddress ('');
        setJobTitle('');
        setAvailability ('');
        setErrors({
            eId: '' ,
            eName: '' ,
            eAddress: '',
            jobTitle: '',
            availability: ''
        });
    }

    function configureUpdateProcess(employee: Employee) {
        resetForm();
        setIsUpdate(true);
        setEId(employee.e_id);
        setEName(employee.e_name);
        setEAddress(employee.e_address);
        setJobTitle(employee.job_title);
        setAvailability(employee.availability);
        setIsOpen(true);
    }

    function handleInputChange(setter: (value: any) => void, field: string, value: any) {
        setter(value); // Update the state
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' })); // Clear the corresponding error
    }

    function handleUpdateEmployee(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const employee: Employee = {
            e_id: eId,
            e_name: eName,
            e_address: eAddress,
            job_title: jobTitle,
            availability: availability,
        };

        dispatch(updateEmployee(employee));
        setIsOpen(false);
    }

    return (
        <div>
            <div className="page-employee-page flex justify-between p-10 bg-slate-100 sticky top-0">
                <h1 className='flex flex-row gap-8 font-bold text-4xl'>
                    <span className='text-6xl'>👤</span>
                    <span className='text-3xl mt-3'>Manage Employees</span>
                </h1>
                <div className='flex flex-row gap-x-2.5'>
                    <input
                        type="search"
                        className='border outline-none border-blue-300 p-3 rounded-2xl'
                        placeholder='Search Employee'
                        onChange={filterEmployees}
                    />
                    <button
                        className='bg-cyan-500 p-4 rounded-3xl text-white font-bold hover:scale-[1.05] transition-all duration-200 hover:bg-cyan-600'
                        onClick={() => {
                            setIsOpen(true);
                            setIsUpdate(false);
                            resetForm();
                        }}>
                        Add Employee
                    </button>
                </div>
            </div>
            <div className='flex flex-col justify-center pr-8 pl-8 mt-2'>
                <table className='w-full border-collapse border border-gray-300 max-h-[500px] overflow-y-auto'>
                    <thead>
                    <tr>
                        <th className='border border-gray-200 px-4 py-2'>Employee ID</th>
                        <th className='border border-gray-200 px-4 py-2'>Employee Name</th>
                        <th className='border border-gray-200 px-4 py-2'>Employee Address</th>
                        <th className='border border-gray-200 px-4 py-2'>Job Title</th>
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
                            <td className='flex flex-col gap-y-2 border border-gray-200 px-4 py-2'>
                                <button className='bg-blue-500 p-1 rounded-xl text-white'
                                        onClick={() => configureUpdateProcess(employee)}
                                >Edit</button>
                                <button className='bg-red-500 p-1 rounded-xl text-white'
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this employee?")) {
                                                dispatch(deleteEmployee(employee.e_id));
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
                            (<h1 className='text-xl text-gray-700 mb-4'>*Update Employee</h1>)
                            : (<h1 className='text-xl text-gray-700 mb-4'>*Add Employee</h1>)
                        }

                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Employee ID"
                            required
                            value={eId}
                            onChange={(e) => handleInputChange(setEId, 'eId', e.target.value)}
                        />
                        {errors.eId && <span className="text-red-500">{errors.eId}</span>}
                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Employee Name"
                            required
                            value={eName}
                            onChange={(e) => handleInputChange(setEName, 'eName', e.target.value)}
                        />
                        {errors.eName && <span className="text-red-500">{errors.eName}</span>}
                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Employee Address"
                            required
                            value={eAddress}
                            onChange={(e) => handleInputChange(setEAddress, 'eAddress', e.target.value)}
                        />
                        {errors.eAddress && <span className="text-red-500">{errors.eAddress}</span>}
                        <select
                            className='rounded-xl border p-3'
                            required
                            value={jobTitle}
                            onChange={(e) => handleInputChange(setJobTitle, 'jobTitle', e.target.value)}
                        >
                            <option value="" disabled>Select Job title</option>
                            <option value="DRIVER">DRIVER</option>
                            <option value="LABOR">LABOR</option>
                        </select>
                        {errors.jobTitle && <span className="text-red-500">{errors.jobTitle}</span>}
                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Availability"
                            required
                            value={availability}
                            onChange={(e) => handleInputChange(setAvailability, 'availability', e.target.value)}
                        />
                        {errors.availability && <span className="text-red-500">{errors.availability}</span>}
                        <div className='flex flex-row justify-end gap-x-2.5 mt-5'>
                            {!isUpdate && (
                                <button
                                    onClick={(e) => handleAddEmployee(e)}
                                    className='rounded-xl w-1/2 bg-blue-600 p-2 text-white'
                                >Save</button>
                            )}
                            {isUpdate && (
                                <button
                                    onClick={(e) => handleUpdateEmployee(e)}
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