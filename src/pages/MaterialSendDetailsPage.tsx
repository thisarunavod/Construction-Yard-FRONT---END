import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store.ts";
import {
    addMaterialSendDetails,
    deleteMaterialSendDetails,
    getAllMaterialSendDetails,
    updateMaterialSendDetails,
} from "../reducers/materialSendDetailsReducer.ts";
import { getAllMaterials } from "../reducers/materialReducer.ts";
import { getALlProjects } from "../reducers/projectReducer.ts";
import { getAllVehicles } from "../reducers/vehicleReducer.ts";
import MaterialSendDetails from "../model/materialSendDetails.ts"; // Import the MaterialSendDetails model
import Material from "../model/Material.ts";
import Project from "../model/project.ts";
import Vehicle from "../model/vehicle.ts";
import {useNavigate} from "react-router";

export function MaterialSendDetailsPage() {
    const materialSendDetails: MaterialSendDetails[] = useSelector((state: RootState) => state.materialSend);
    const materials: Material[] = useSelector((state: RootState) => state.material);
    const projectDetails = useSelector((state: RootState) => state.project);
    const vehicleDetails = useSelector((state: RootState) => state.vehicle);
    const dispatch = useDispatch<AppDispatch>();

    const [issueId, setIssueId] = useState('');
    const [mId, setMId] = useState('');
    const [projectNo, setProjectNo] = useState('');
    const [issueQty, setIssueQty] = useState(0);
    const [vId, setVId] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [relevantDetails, setRelevantDetails] = useState(materialSendDetails);

    useEffect(() => {
        setRelevantDetails(materialSendDetails);
    }, [materialSendDetails]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken){
            dispatch(getAllMaterialSendDetails());
            dispatch(getAllMaterials())
            dispatch(getALlProjects())
            dispatch(getAllVehicles())
        }else {
            navigate('/')
        }

    }, []);

    const [errors, setErrors] = useState({
        issueId: '',
        mId: '',
        projectNo: '',
        issueQty: '',
        vId: '',
        issueDate: ''
    });


    const handleInputChange = (setter: (value: any) => void, field: string, value: any) => {
        setter(value);
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' })); // Clear the corresponding error
    };


    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            issueId: '',
            mId: '',
            projectNo: '',
            issueQty: '',
            vId: '',
            issueDate: ''
        };

        if (!issueId) {
            newErrors.issueId = 'Issue ID is required';
            isValid = false;
        }

        if (!mId) {
            newErrors.mId = 'Material ID is required';
            isValid = false;
        }

        if (!projectNo) {
            newErrors.projectNo = 'Project No is required';
            isValid = false;
        }

        if (issueQty <= 0) {
            newErrors.issueQty = 'Issue Quantity must be greater than 0';
            isValid = false;
        }

        if (!vId) {
            newErrors.vId = 'Vehicle ID is required';
            isValid = false;
        }

        if (!issueDate) {
            newErrors.issueDate = 'Issue Date is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    const handleAddDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const details: MaterialSendDetails = {
            issue_id: issueId,
            m_id: mId,
            project_no: projectNo,
            issue_qty: issueQty,
            v_id: vId,
            issue_date: issueDate,
        };

        dispatch(addMaterialSendDetails(details));

        setIsOpen(false);
        resetForm();
    };


    const handleUpdateDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const details: MaterialSendDetails = {
            issue_id: issueId,
            m_id: mId,
            project_no: projectNo,
            issue_qty: issueQty,
            v_id: vId,
            issue_date: issueDate,
        };

        dispatch(updateMaterialSendDetails(details));
        setIsOpen(false);
    };


    const resetForm = () => {
        setIssueId('');
        setMId('');
        setProjectNo('');
        setIssueQty(0);
        setVId('');
        setIssueDate('');
        setErrors({
            issueId: '',
            mId: '',
            projectNo: '',
            issueQty: '',
            vId: '',
            issueDate: ''
        });
    };

    // Configure update process
    const configureUpdateProcess = (details: MaterialSendDetails) => {
        resetForm();

        setIsUpdate(true);
        setIssueId(details.issue_id);
        setMId(details.m_id);
        setProjectNo(details.project_no);
        setIssueQty(details.issue_qty);
        setVId(details.v_id);
        setIssueDate(details.issue_date);
        setIsOpen(true);
    };

    // Filter details
    const filterDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();
        const filtered = materialSendDetails.filter((detail) => {
            return (
                detail.issue_id.toLowerCase().includes(searchText) ||
                detail.m_id.toLowerCase().includes(searchText) ||
                detail.project_no.toLowerCase().includes(searchText) ||
                detail.v_id.toLowerCase().includes(searchText)
            );
        });
        setRelevantDetails(filtered);
    };

    return (
        <div>
            <div className="page-material-send-page flex justify-between p-10 bg-slate-100 sticky top-0">
                <h1 className='flex flex-row gap-8 font-bold text-4xl'>
                    <span className='text-6xl'>🚚</span>
                    <span className='text-3xl mt-3'>Manage Material Send Details</span>
                </h1>
                <div className='flex flex-row gap-x-2.5'>
                    <input
                        type="search"
                        className='border outline-none border-blue-300 p-3 rounded-2xl'
                        placeholder='Search Material Send Details'
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
                        <th className='border border-gray-200 px-4 py-2'>Issue ID</th>
                        <th className='border border-gray-200 px-4 py-2'>Material ID</th>
                        <th className='border border-gray-200 px-4 py-2'>Project No</th>
                        <th className='border border-gray-200 px-4 py-2'>Issue Qty</th>
                        <th className='border border-gray-200 px-4 py-2'>Vehicle ID</th>
                        <th className='border border-gray-200 px-4 py-2'>Issue Date</th>
                        <th className='border border-gray-200 px-4 py-2'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {relevantDetails.map((detail, index) => (
                        <tr key={index}>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.issue_id}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.m_id}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.project_no}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.issue_qty}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.v_id}</td>
                            <td className='text-center border border-gray-200 px-4 py-2'>{detail.issue_date}</td>
                            <td className='flex flex-col gap-y-2 border border-gray-200 px-4 py-2'>
                                <button className='bg-blue-500 p-1 rounded-xl text-white'
                                        onClick={() => configureUpdateProcess(detail)}
                                >Edit</button>
                                <button className='bg-red-500 p-1 rounded-xl text-white'
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this detail?")) {
                                                dispatch(deleteMaterialSendDetails(detail.issue_id));
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
                            (<h1 className='text-xl text-gray-700 mb-4'>*Update Material Send Details</h1>)
                            : (<h1 className='text-xl text-gray-700 mb-4'>*Add Material Send Details</h1>)
                        }

                        {/* Issue ID */}
                        <input
                            className='rounded-xl border p-3'
                            type="text"
                            placeholder="Issue ID"
                            required
                            value={issueId}
                            onChange={(e) => handleInputChange(setIssueId, 'issueId', e.target.value)}
                        />
                        {errors.issueId && <span className="text-red-500">{errors.issueId}</span>}

                        {/* Material ID Dropdown */}
                        <select
                            className='rounded-xl border p-3'
                            required
                            value={mId}
                            onChange={(e) => handleInputChange(setMId, 'mId', e.target.value)}
                        >
                            <option value="" disabled>Select Material</option>
                            {materials.map((material) => (
                                <option key={material.material_id} value={material.material_id}>
                                    {material.material_name}
                                </option>
                            ))}
                        </select>
                        {errors.mId && <span className="text-red-500">{errors.mId}</span>}

                        {/* Project No Dropdown */}
                        <select
                            className='rounded-xl border p-3'
                            required
                            value={projectNo}
                            onChange={(e) => handleInputChange(setProjectNo, 'projectNo', e.target.value)}
                        >
                            <option value="" disabled>Select Project</option>
                            {projectDetails.projects?.map((project:Project) => (
                                <option key={project.project_no} value={project.project_no}>
                                    {project.project_name}
                                </option>
                            ))}
                        </select>
                        {errors.projectNo && <span className="text-red-500">{errors.projectNo}</span>}

                        {/* Issue Quantity */}
                        <input
                            className='rounded-xl border p-3'
                            type="number"
                            min='0'
                            placeholder="Issue Quantity"
                            required
                            value={issueQty}
                            onChange={(e) => handleInputChange(setIssueQty, 'issueQty', Number(e.target.value))}
                        />
                        {errors.issueQty && <span className="text-red-500">{errors.issueQty}</span>}

                        {/* Vehicle ID Dropdown */}
                        <select
                            className='rounded-xl border p-3'
                            required
                            value={vId}
                            onChange={(e) => handleInputChange(setVId, 'vId', e.target.value)}
                        >
                            <option value="" disabled>Select Vehicle</option>
                            {vehicleDetails.vehicles?.map((vehicle:Vehicle) => (
                                <option key={vehicle.v_id} value={vehicle.v_id}>
                                    { vehicle.v_id +' ----> '+vehicle.v_name }
                                </option>
                            ))}
                        </select>
                        {errors.vId && <span className="text-red-500">{errors.vId}</span>}

                        {/* Issue Date */}
                        <input
                            className='rounded-xl border p-3'
                            type="date"
                            placeholder="Issue Date"
                            required
                            value={issueDate}
                            onChange={(e) => handleInputChange(setIssueDate, 'issueDate', e.target.value)}
                        />
                        {errors.issueDate && <span className="text-red-500">{errors.issueDate}</span>}

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