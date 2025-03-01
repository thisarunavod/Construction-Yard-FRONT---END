import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store.ts";
import {addVehicle, deleteVehicle, getAllDrivers, getAllVehicles, updateVehicle} from "../reducers/vehicleReducer.ts";
import Vehicle from "../model/vehicle.ts";
import Employee from "../model/employee.ts"; // Import the Vehicle model

export function VehiclePage() {
    const vehicleDetails = useSelector((state: RootState) => state.vehicle);

    const dispatch = useDispatch<AppDispatch>();
    const [vId, setVId] = useState('');
    const [vName, setVName] = useState('');
    const [eId, setEId] = useState<string | null>(null);
    const [rootStatus, setRootStatus] = useState('');
    const [driverAvailability, setDriverAvailability] = useState<string | null>(null);
    const [removeOrWorking, setRemoveOrWorking] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [relevantVehicles, setRelevantVehicles] = useState(vehicleDetails.vehicles);
    const [availableDrivers, setAvailableDrivers] = useState(vehicleDetails.availableDrivers);

    useEffect(() => {
        setRelevantVehicles(vehicleDetails.vehicles);
        setAvailableDrivers(vehicleDetails.availableDrivers);
    }, [vehicleDetails]);

    useEffect(() => {
        dispatch(getAllVehicles());
        dispatch(getAllDrivers());
    }, []);

    const [errors, setErrors] = useState({
        vId: '',
        vName: '',
        rootStatus: '',
        removeOrWorking: ''
    });

    function filterVehicles(e) {
        const searchText = e.target.value.toLowerCase();
        const filtered = vehicleDetails.vehicles.filter((vehicle) => {
            return (
                vehicle.v_id.toLowerCase().includes(searchText) ||
                vehicle.v_name.toLowerCase().includes(searchText) ||
                vehicle.root_status.toLowerCase().includes(searchText) ||
                vehicle.remove_or_working.toLowerCase().includes(searchText)
            );
        });
        setRelevantVehicles(filtered);
    }

    function validateForm() {
        let isValid = true;
        const newErrors = {
            vId: '',
            vName: '',
            rootStatus: '',
            removeOrWorking: ''
        };

        if (!vId) {
            newErrors.vId = 'Vehicle ID is required';
            isValid = false;
        }

        if (!vName) {
            newErrors.vName = 'Vehicle Name is required';
            isValid = false;
        }

        if (!rootStatus) {
            newErrors.rootStatus = 'Root Status is required';
            isValid = false;
        }

        if (!removeOrWorking) {
            newErrors.removeOrWorking = 'Remove/Working status is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    function handleAddVehicle(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!validateForm()) { return; }

        const vehicle: Vehicle = {
            v_id: vId,
            v_name: vName,
            e_id: eId,
            root_status: rootStatus,
            driver_availability: driverAvailability,
            remove_or_working: removeOrWorking,
        };

        dispatch(addVehicle(vehicle));
        setIsOpen(false);
        resetForm();
    }

    function resetForm() {
        setVId('');
        setVName('');
        setEId(null);
        setRootStatus('');
        setDriverAvailability(null);
        setRemoveOrWorking('');
        setErrors({
            vId: '',
            vName: '',
            rootStatus: '',
            removeOrWorking: ''
        });
    }

    function configureUpdateProcess(vehicle: Vehicle) {
        resetForm();
        setIsUpdate(true);
        setVId(vehicle.v_id);
        setVName(vehicle.v_name);
        setEId(vehicle.e_id);
        setRootStatus(vehicle.root_status);
        setDriverAvailability(vehicle.driver_availability);
        setRemoveOrWorking(vehicle.remove_or_working);
        setIsOpen(true);
    }

    function handleInputChange(setter: (value: any) => void, field: string, value: any) {
        setter(value); // Update the state
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' })); // Clear the corresponding error
    }

    function handleUpdateVehicle(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const vehicle: Vehicle = {
            v_id: vId,
            v_name: vName,
            e_id: eId,
            root_status: rootStatus,
            driver_availability: driverAvailability,
            remove_or_working: removeOrWorking,
        };

        dispatch(updateVehicle(vehicle));
        setIsOpen(false);
    }

    return (
        <div>
            <div className="page-vehicle-page flex justify-between p-10 bg-slate-100 sticky top-0">
                <h1 className='flex flex-row gap-8 font-bold text-4xl'>
                    <span className='text-6xl'>🚚</span>
                    <span className='text-3xl mt-3'>Manage Vehicles</span>
                </h1>
                <div className='flex flex-row gap-x-2.5'>
                    <input
                        type="search"
                        className='border outline-none border-blue-300 p-3 rounded-2xl'
                        placeholder='Search Vehicle'
                        onChange={filterVehicles}
                    />
                    <button
                        className='bg-cyan-500 p-4 rounded-3xl text-white font-bold hover:scale-[1.05] transition-all duration-200 hover:bg-cyan-600'
                        onClick={() => {
                            setIsOpen(true);
                            setIsUpdate(false);
                            resetForm();
                        }}>
                        Add Vehicle
                    </button>
                </div>
            </div>
            <div className='flex flex-col justify-center pr-8 pl-8 mt-2'>
                <table className='w-full border-collapse border border-gray-300 max-h-[500px] overflow-y-auto'>
                    <thead>
                    <tr>
                        <th className='border border-gray-200 px-4 py-2'>Vehicle ID</th>
                        <th className='border border-gray-200 px-4 py-2'>Vehicle Name</th>
                        <th className='border border-gray-200 px-4 py-2'>Employee ID</th>
                        <th className='border border-gray-200 px-4 py-2'>Root Status</th>
                        <th className='border border-gray-200 px-4 py-2'>Driver Availability</th>
                        <th className='border border-gray-200 px-4 py-2'>Remove/Working</th>
                        <th className='border border-gray-200 px-4 py-2'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {relevantVehicles.map((vehicle, index) => (
                        <tr key={index}>
                            <td className='text-center border border-gray-200 px-4 py-2'>{vehicle.v_id}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{vehicle.v_name}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{vehicle.e_id || 'N/A'}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{vehicle.root_status}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{vehicle.driver_availability || 'N/A'}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{vehicle.remove_or_working}</td>
                            <td className='flex flex-col gap-y-2 border border-gray-200 px-4 py-2'>
                                <button className='bg-blue-500 p-1 rounded-xl text-white'
                                        onClick={() => configureUpdateProcess(vehicle)}
                                >Edit</button>
                                <button className='bg-red-500 p-1 rounded-xl text-white'
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this vehicle?")) {
                                                dispatch(deleteVehicle(vehicle.v_id));
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
                            (<h1 className='text-xl text-gray-700 mb-4'>*Update Vehicle</h1>)
                            : (<h1 className='text-xl text-gray-700 mb-4'>*Add Vehicle</h1>)
                        }

                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Vehicle ID"
                            required
                            value={vId}
                            onChange={(e) => handleInputChange(setVId, 'vId', e.target.value)}
                        />
                        {errors.vId && <span className="text-red-500">{errors.vId}</span>}
                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Vehicle Name"
                            required
                            value={vName}
                            onChange={(e) => handleInputChange(setVName, 'vName', e.target.value)}
                        />
                        {errors.vName && <span className="text-red-500">{errors.vName}</span>}
                        <select
                            className='rounded-xl border p-3'
                            required
                            /*value={ eId||''}*/
                            onChange={(e) => handleInputChange(setEId, 'eId', e.target.value)}
                        >
                            {isUpdate && <option>{eId}</option>}
                            {!isUpdate && availableDrivers?.map((emp:Employee, index) => (
                                <option value={emp.e_id} key={emp.e_id}>{emp.e_id}</option>
                            ))}
                        </select>
                        {/*<input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Employee ID (Optional)"
                            value={eId || ''}
                            onChange={(e) => handleInputChange(setEId, 'eId', e.target.value)}
                        />*/}
                        <select
                            className='rounded-xl border p-3'
                            required
                            value={rootStatus}
                            onChange={(e) => handleInputChange(setRootStatus, 'rootStatus', e.target.value)}
                        >
                            <option value="" disabled>Set Root Status</option>
                            <option value="ON-YARD">ON-YARD</option>
                            <option value="ON-ROOT">ON-ROOT</option>
                        </select>
                        {errors.rootStatus && <span className="text-red-500">{errors.rootStatus}</span>}

                        <select
                            className='rounded-xl border p-3'
                            required
                            value={driverAvailability || ''}
                            onChange={(e) => handleInputChange(setDriverAvailability, 'driverAvailability', e.target.value)}
                        >
                            <option value="" disabled>Select Driver Availability</option>
                            <option value="AV">AV</option>
                            <option value="N/A">N/A</option>
                        </select>
                        <select
                            className='rounded-xl border p-3'
                            required
                            value={removeOrWorking}
                            onChange={(e) => handleInputChange(setRemoveOrWorking, 'removeOrWorking', e.target.value)}
                        >
                            <option value="" disabled>Current Condition</option>
                            <option value="REMOVE">Remove</option>
                            <option value="WORKING">Working</option>
                        </select>
                        {errors.removeOrWorking && <span className="text-red-500">{errors.removeOrWorking}</span>}

                        <div className='flex flex-row justify-end gap-x-2.5 mt-5'>
                            {!isUpdate && (
                                <button
                                    onClick={(e) => handleAddVehicle(e)}
                                    className='rounded-xl w-1/2 bg-blue-600 p-2 text-white'
                                >Save</button>
                            )}
                            {isUpdate && (
                                <button
                                    onClick={(e) => handleUpdateVehicle(e)}
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